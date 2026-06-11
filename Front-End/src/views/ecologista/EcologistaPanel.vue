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
  <div class="min-h-screen bg-slate-50 py-12">
    <div class="container mx-auto px-4 max-w-6xl">
      <header class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest mb-2">
            Monitoramento Ambiental
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight">Painel do Ecologista</h1>
          <p class="text-slate-500">Visualize e monitore os pontos críticos de descarte na cidade.</p>
        </div>

        <Button @click="carregar" variant="outline" :loading="carregando">
          Atualizar Dados
        </Button>
      </header>

      <div v-if="carregando" class="flex flex-col items-center justify-center py-24 gap-4">
        <div class="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        <p class="text-slate-400 font-bold animate-pulse">Sincronizando dados...</p>
      </div>

      <div v-else-if="erro" class="p-8 bg-red-50 border border-red-100 rounded-[2.5rem] text-center">
        <p class="text-red-600 font-bold mb-4">{{ erro }}</p>
        <Button @click="carregar" variant="danger">Tentar novamente</Button>
      </div>

      <div v-else>
        <div v-if="lista.length > 0" class="grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CardSolicitacao v-for="s in lista" :key="s.protocolo" :solicitacao="s" />
        </div>

        <div v-else class="py-24 px-8 rounded-[3rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/40 text-center space-y-4">
           <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
             <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>    
           </div>
           <h3 class="text-xl font-bold text-slate-900">Tudo limpo por aqui!</h3>
           <p class="text-slate-500 max-w-xs mx-auto">Não há solicitações pendentes de monitoramento no momento.</p>
        </div>
      </div>
    </div>
  </div>
</template>
