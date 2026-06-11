<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Modal from '@/components/Modal.vue'
import { api } from '@/services/api'
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
  // mapping per spec: Não bloqueia (1), Parcial (2), Total (4)
  if (obstrucao.value === 3) return 4
  if (obstrucao.value === 2) return 2
  return 1
}

function pontosLocal() {
  // Residencial (1), Parque/Escola (2), Ecológico (3), Saúde (4)
  return local.value
}

function pontosVolume() {
  // Pequeno (1), Moderado (2), Excessivo (3), Espalhado (4)
  return volume.value
}

import { toast } from '@/services/toast'

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
      pontosLocal: pontosLocal(),
      pontosVolume: pontosVolume(),
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

function copyProtocolo() {
  if (!sucesso?.protocolo) return
  navigator.clipboard.writeText(sucesso.protocolo)
  toast.success('Protocolo copiado para a área de transferência')
}
</script>

<template>
  <div class="card wide">
    <h1>Registrar Reclamação</h1>
    <p class="subtitle">Abra um novo chamado de zeladoria</p>

    <form @submit.prevent="enviar">
      <label class="checkbox">
        <input v-model="anonimo" type="checkbox" />
        Registrar de forma anônima
      </label>

      <template v-if="!anonimo">
        <label>
          Nome completo
          <input v-model="nome" />
        </label>
        <label>
          CPF
          <input v-model="cpf" />
        </label>
      </template>

      <fieldset>
        <legend>Obstrução da via</legend>
        <label><input v-model="obstrucao" type="radio" :value="1" /> Não bloqueia</label>
        <label><input v-model="obstrucao" type="radio" :value="2" /> Parcial</label>
        <label><input v-model="obstrucao" type="radio" :value="3" /> Total</label>
      </fieldset>

      <fieldset>
        <legend>Risco sanitário</legend>
        <label><input v-model="risco" type="radio" :value="1" /> Seco</label>
        <label><input v-model="risco" type="radio" :value="2" /> Ensacado</label>
        <label><input v-model="risco" type="radio" :value="3" /> Exposto</label>
        <label><input v-model="risco" type="radio" :value="4" /> Dengue</label>
      </fieldset>

      <fieldset>
        <legend>Tipo de local</legend>
        <label><input v-model="local" type="radio" :value="1" /> Residencial</label>
        <label><input v-model="local" type="radio" :value="2" /> Parque/Escola</label>
        <label><input v-model="local" type="radio" :value="3" /> Ecológico</label>
        <label><input v-model="local" type="radio" :value="4" /> Saúde</label>
      </fieldset>

      <fieldset>
        <legend>Volume do lixo</legend>
        <label><input v-model="volume" type="radio" :value="1" /> Pequeno</label>
        <label><input v-model="volume" type="radio" :value="2" /> Moderado</label>
        <label><input v-model="volume" type="radio" :value="3" /> Excessivo</label>
        <label><input v-model="volume" type="radio" :value="4" /> Espalhado</label>
      </fieldset>

      <label>
        Endereço da ocorrência
        <input v-model="endereco" required />
      </label>

      <label>
        Observação adicional
        <textarea v-model="observacao" rows="3" />
      </label>

      <p v-if="erro" class="erro">{{ erro }}</p>

      <div v-if="sucesso" class="sucesso">
        <strong>Protocolo gerado: {{ sucesso.protocolo }}</strong>
        <p>Prioridade: {{ sucesso.prioridade }} — Prazo: {{ sucesso.prazo }}</p>
      </div>

      <button type="submit" :disabled="carregando">
        {{ carregando ? 'Enviando...' : 'Registrar chamado' }}
      </button>
    </form>

    <Modal :show="!!sucesso" @close="sucesso = null">
      <div class="text-center">
        <h2 class="text-2xl font-bold mb-2">Protocolo</h2>
        <div class="flex items-center justify-center gap-3">
          <div class="text-3xl font-mono">{{ sucesso?.protocolo }}</div>
          <button class="px-3 py-1 bg-gray-200 rounded" @click="copyProtocolo">Copiar</button>
        </div>
        <p class="mt-2">Prioridade: {{ sucesso?.prioridade }} — Prazo: {{ sucesso?.prazo }}</p>
      </div>
    </Modal>
  </div>
</template>
</script>

<template>
  <div class="card wide">
    <h1>Registrar Reclamação</h1>
    <p class="subtitle">Abra um novo chamado de zeladoria</p>

    <form @submit.prevent="enviar">
      <label class="checkbox">
        <input v-model="anonimo" type="checkbox" />
        Registrar de forma anônima
      </label>

      <template v-if="!anonimo">
        <label>
          Nome completo
          <input v-model="nome" />
        </label>
        <label>
          CPF
          <input v-model="cpf" />
        </label>
      </template>

      <fieldset>
        <legend>Obstrução da via</legend>
        <label><input v-model="obstrucao" type="radio" :value="1" /> Não bloqueia</label>
        <label><input v-model="obstrucao" type="radio" :value="2" /> Parcial</label>
        <label><input v-model="obstrucao" type="radio" :value="3" /> Total</label>
      </fieldset>

      <fieldset>
        <legend>Risco sanitário</legend>
        <label><input v-model="risco" type="radio" :value="1" /> Seco</label>
        <label><input v-model="risco" type="radio" :value="2" /> Ensacado</label>
        <label><input v-model="risco" type="radio" :value="3" /> Dengue</label>
        <label><input v-model="risco" type="radio" :value="4" /> Exposto</label>
      </fieldset>

      <fieldset>
        <legend>Tipo de local</legend>
        <label><input v-model="local" type="radio" :value="1" /> Residencial</label>
        <label><input v-model="local" type="radio" :value="2" /> Parque/Escola</label>
        <label><input v-model="local" type="radio" :value="3" /> Ecológico</label>
        <label><input v-model="local" type="radio" :value="4" /> Saúde</label>
      </fieldset>

      <fieldset>
        <legend>Volume do lixo</legend>
        <label><input v-model="volume" type="radio" :value="1" /> Espalhado</label>
        <label><input v-model="volume" type="radio" :value="2" /> Pequeno</label>
        <label><input v-model="volume" type="radio" :value="3" /> Moderado</label>
        <label><input v-model="volume" type="radio" :value="4" /> Excessivo</label>
      </fieldset>

      <label>
        Endereço da ocorrência
        <input v-model="endereco" required />
      </label>

      <label>
        Observação adicional
        <textarea v-model="observacao" rows="3" />
      </label>

      <p v-if="erro" class="erro">{{ erro }}</p>

      <div v-if="sucesso" class="sucesso">
        <strong>Protocolo gerado: {{ sucesso.protocolo }}</strong>
        <p>Prioridade: {{ sucesso.prioridade }} — Prazo: {{ sucesso.prazo }}</p>
      </div>

      <button type="submit" :disabled="carregando">
        {{ carregando ? 'Enviando...' : 'Registrar chamado' }}
      </button>
    </form>
  </div>
</template>
