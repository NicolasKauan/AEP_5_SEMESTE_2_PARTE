<script setup lang="ts">
import type { PropType } from 'vue'
import { computed } from 'vue'
import type { Solicitacao } from '@/types'
import Badge from './Badge.vue'

const props = defineProps({
  solicitacao: { type: Object as PropType<Solicitacao>, required: true },
})

function formatDate(dt: string) {
  if (!dt) return null
  const d = new Date(dt)
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
}

const prioridadeVariant = computed(() => {
  const p = props.solicitacao.prioridade
  if (!p) return 'baixa'
  const low = p.toString().toLowerCase()
  if (low.includes('urgente')) return 'urgente'
  if (low.includes('alta')) return 'alta'
  if (low.includes('media')) return 'media'
  return 'baixa'
})
</script>

<template>
  <div class="group relative bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-600/5 hover:-translate-y-1 overflow-hidden">
    <div class="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity"></div> 

    <header class="relative z-10 flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
      <div class="space-y-1">
        <div class="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M7 20l4-16m2 16l4-16"></path></svg>
          {{ solicitacao.protocolo }}
        </div>
        <h3 class="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
          {{ solicitacao.descricao || 'Solicitação de Zeladoria' }}
        </h3>
      </div>
      <div class="flex flex-col items-end gap-2">
        <Badge :variant="prioridadeVariant">{{ solicitacao.prioridade }}</Badge>
        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Prazo: {{ solicitacao.prazo }}</span>
      </div>
    </header>

    <div class="relative z-10 grid gap-6 sm:grid-cols-2 pt-6 border-t border-slate-50">
      <div class="space-y-4">
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          </div>
          <div class="flex-1">
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Localização</p>
            <p class="text-sm font-medium text-slate-700 leading-tight mt-0.5">{{ solicitacao.endereco || 'Endereço não informado' }}</p>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <div class="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          </div>
          <div class="flex-1">
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Solicitante</p>
            <p class="text-sm font-medium text-slate-700 mt-0.5">{{ solicitacao.nomeCidadao || 'Anônimo' }}</p>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div class="flex-1">
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status Atual</p>
            <p class="text-sm font-bold text-emerald-700 mt-0.5">{{ solicitacao.statusDescricao }}</p>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <div class="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
          </div>
          <div class="flex-1">
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Responsável</p>
            <p class="text-sm font-medium text-slate-700 mt-0.5">{{ solicitacao.prestadorNome || 'Aguardando Atribuição' }}</p>
          </div>
        </div>
      </div>
    </div>

    <footer class="relative z-10 mt-8 flex items-center justify-between pt-6 border-t border-slate-50">
      <div class="text-[10px] font-bold text-slate-300 uppercase">Criado em {{ formatDate(solicitacao.dataCriacao) }}</div>
      <slot name="actions" />
    </footer>
  </div>
</template>
