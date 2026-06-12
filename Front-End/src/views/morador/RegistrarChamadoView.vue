<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Modal from '@/components/Modal.vue'
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
import { api } from '@/services/api'
import { toast } from '@/services/toast'
import type { Solicitacao } from '@/types'

const route = useRoute()
const anonimo = ref(route.query.anonimo === 'true')
const nome = ref('')
const cpf = ref('')
const obstrucao = ref(1)
const risco = ref(1)
const local = ref(1)
const volume = ref(1)
const endereco = ref('')
const observacao = ref('')
const erro = ref('')
const sucesso = ref<Solicitacao | null>(null)
const carregando = ref(false)

function pontosObstrucao() {
  if (obstrucao.value === 3) return 4
  if (obstrucao.value === 2) return 2
  return 1
}

async function enviar() {
  erro.value = ''
  sucesso.value = null
  carregando.value = true
  try {
    sucesso.value = await api.registrarChamado({
      anonimo: anonimo.value,
      nome: anonimo.value ? null : nome.value,
      cpf: anonimo.value ? null : cpf.value,
      pontosObstrucao: pontosObstrucao(),
      pontosRisco: risco.value,
      pontosLocal: local.value,
      pontosVolume: volume.value,
      endereco: endereco.value,
      observacao: observacao.value,
    })
    toast.success('Chamado registrado com sucesso')
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Erro ao registrar chamado.'
    erro.value = msg
    toast.error(msg)
  } finally {
    carregando.value = false
  }
}

async function copyProtocolo() {
  if (!sucesso.value?.protocolo) return
  await navigator.clipboard.writeText(sucesso.value.protocolo)
  toast.success('Protocolo copiado para a área de transferência')
}
</script>

<template>
  <div class="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-100">

    <header class="mb-8">
      <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Nova Solicitação</h2>
      <p class="text-slate-500 mt-2 text-sm">Forneça o máximo de detalhes para uma resolução rápida.</p>
    </header>

    <form @submit.prevent="enviar" class="space-y-6">

      <!-- ── Identificação ── -->
      <section class="space-y-4">
        <div class="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <input v-model="anonimo" type="checkbox" id="anonimo"
            class="w-5 h-5 rounded-lg border-slate-300 text-emerald-600 focus:ring-emerald-500 transition-all" />
          <label for="anonimo" class="text-sm font-bold text-slate-700 cursor-pointer select-none">
            Registrar de forma anônima
          </label>
        </div>

        <div v-if="!anonimo" class="grid sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
          <Input v-model="nome" label="Seu nome" placeholder="Nome completo" required />
          <Input v-model="cpf" label="Seu CPF" placeholder="000.000.000-00" required />
        </div>
      </section>

      <!-- ── Grade 2×2 de opções ── -->
      <section class="grid sm:grid-cols-2 gap-4">

        <!-- Obstrução -->
        <div class="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nível de Obstrução</p>
          <div class="flex flex-wrap gap-2">
            <button v-for="(v, i) in ['Não bloqueia', 'Parcial', 'Total']" :key="i" type="button"
              @click="obstrucao = i + 1" :class="['py-2 px-4 rounded-xl border text-sm font-bold transition-all',
                obstrucao === i + 1
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-700 ring-2 ring-emerald-500/10'
                  : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300']">
              {{ v }}
            </button>
          </div>
        </div>

        <!-- Risco -->
        <div class="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Risco Sanitário / Tipo</p>
          <div class="flex flex-wrap gap-2">
            <button v-for="(v, i) in ['Seco', 'Ensacado', 'Exposto', 'Dengue']" :key="i" type="button"
              @click="risco = i + 1" :class="['py-2 px-4 rounded-xl border text-sm font-bold transition-all',
                risco === i + 1
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-700 ring-2 ring-emerald-500/10'
                  : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300']">
              {{ v }}
            </button>
          </div>
        </div>

        <!-- Local -->
        <div class="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Local da Ocorrência</p>
          <div class="flex flex-wrap gap-2">
            <button v-for="(v, i) in ['Residencial', 'Parque/Escola', 'Ecológico', 'Saúde']" :key="i" type="button"
              @click="local = i + 1" :class="['py-2 px-4 rounded-xl border text-sm font-bold transition-all',
                local === i + 1
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-700 ring-2 ring-emerald-500/10'
                  : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300']">
              {{ v }}
            </button>
          </div>
        </div>

        <!-- Volume -->
        <div class="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Volume Estimado</p>
          <div class="flex flex-wrap gap-2">
            <button v-for="(v, i) in ['Pequeno', 'Moderado', 'Excessivo', 'Espalhado']" :key="i" type="button"
              @click="volume = i + 1" :class="['py-2 px-4 rounded-xl border text-sm font-bold transition-all',
                volume === i + 1
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-700 ring-2 ring-emerald-500/10'
                  : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300']">
              {{ v }}
            </button>
          </div>
        </div>

      </section>

      <!-- ── Localização e Obs ── -->
      <section class="space-y-4">
        <Input v-model="endereco" label="Endereço exato" placeholder="Rua, número, bairro..." required />

        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-slate-700 px-1">Observações adicionais</label>
          <textarea v-model="observacao" rows="4" placeholder="Descreva pontos de referência ou detalhes do descarte..."
            class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 hover:border-slate-300"></textarea>
        </div>
      </section>

      <div v-if="erro"
        class="p-4 bg-red-50 border border-red-100 rounded-2xl text-sm text-red-600 font-medium text-center">
        {{ erro }}
      </div>

      <Button type="submit" :loading="carregando" full-width class="h-14">
        Registrar Chamado
      </Button>
    </form>

    <Modal :show="!!sucesso" @close="sucesso = null" max-width="max-w-xl">
      <div class="p-8 sm:p-10 text-center">
        <div
          class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>

        <h2 class="text-2xl font-bold text-slate-900 mb-2">Chamado Registrado!</h2>
        <p class="text-slate-500 mb-8">Guarde o número do protocolo para acompanhar sua solicitação.</p>

        <div class="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-8">
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Número do Protocolo</p>
          <div class="flex items-center justify-center gap-4">
            <span class="text-3xl font-black text-slate-900 tracking-tighter">{{ sucesso?.protocolo }}</span>
            <button @click="copyProtocolo"
              class="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors text-slate-600 shadow-sm">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3">
                </path>
              </svg>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 text-left mb-10">
          <div class="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
            <p class="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Prioridade</p>
            <p class="text-lg font-bold text-emerald-700">{{ sucesso?.prioridade }}</p>
          </div>
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Prazo Est.</p>
            <p class="text-lg font-bold text-slate-700">{{ sucesso?.prazo }}</p>
          </div>
        </div>

        <Button @click="sucesso = null" variant="secondary" full-width>
          Entendido, fechar
        </Button>
      </div>
    </Modal>

  </div>
</template>
