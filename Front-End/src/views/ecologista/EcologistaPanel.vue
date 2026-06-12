<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { api } from '@/services/api'
import type { Solicitacao } from '@/types'
import CardSolicitacao from '@/components/CardSolicitacao.vue'
import Button from '@/components/Button.vue'

const lista = ref<Solicitacao[]>([])
const erro = ref('')
const carregando = ref(false)

async function carregar() {
  erro.value = ''
  carregando.value = true
  try {
    lista.value = await api.listarParaEcologista()
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Erro ao carregar solicitações.'
    if (msg === 'Não autorizado') return
    erro.value = 'Erro ao carregar solicitações. Tente novamente mais tarde.'
  } finally {
    carregando.value = false
  }
}

onMounted(() => carregar())
</script>

<template>
  <div class="min-h-screen bg-slate-50 py-10 flex flex-col items-center">
    <div class="w-full max-w-3xl px-4">

      <header class="flex flex-col items-center text-center gap-4 mb-10">
        <div class="px-3 py-1 rounded bg-amber-100 text-amber-700 text-[11px] font-bold uppercase tracking-wider">
          Monitoramento Ambiental
        </div>
        <h1 class="text-3xl font-bold text-slate-900">Painel do Ecologista</h1>
        <p class="text-slate-600">Visualize e monitore os pontos críticos de descarte na cidade.</p>

        <div class="mt-2">
          <Button @click="carregar" variant="outline" :loading="carregando">
            Atualizar Dados
          </Button>
        </div>
      </header>

      <div v-if="carregando" class="flex justify-center py-12">
        <p class="text-slate-500 font-medium">Sincronizando dados...</p>
      </div>

      <div v-else-if="erro" class="p-6 bg-red-50 border border-red-200 rounded-xl text-center">
        <p class="text-red-600 font-medium mb-4">{{ erro }}</p>
        <Button @click="carregar" variant="danger">Tentar novamente</Button>
      </div>

      <div v-else class="space-y-6">
        <div v-if="lista.length > 0" class="flex flex-col gap-5">
          <CardSolicitacao v-for="s in lista" :key="s.protocolo" :solicitacao="s" />
        </div>

        <div v-else class="py-16 px-6 rounded-xl bg-white border border-slate-200 text-center space-y-2">
          <h3 class="text-lg font-bold text-slate-800">Tudo limpo por aqui!</h3>
          <p class="text-slate-500 text-sm">Não há solicitações pendentes de monitoramento no momento.</p>
        </div>
      </div>
    </div>
  </div>
</template>
