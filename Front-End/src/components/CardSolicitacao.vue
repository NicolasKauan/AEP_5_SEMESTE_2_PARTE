<script setup lang="ts">
import type { PropType } from 'vue'
import { computed } from 'vue'
import type { Solicitacao } from '@/types'
import Badge from './Badge.vue' // Certifique-se de que o componente Badge existe e funciona

const props = defineProps({
  solicitacao: { type: Object as PropType<Solicitacao>, required: true },
})

function formatDate(dt: string) {
  if (!dt) return null
  const d = new Date(dt)
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
}

const prioridadeVariant = computed<'baixa' | 'media' | 'alta' | 'urgente' | 'default'>(() => {
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
  <div class="bg-white rounded-xl p-6 border border-slate-200">
    <header class="flex flex-col gap-3 mb-5 pb-5 border-b border-slate-100">
      <div class="flex justify-between items-start gap-4">
        <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">
          # {{ solicitacao.protocolo }}
        </span>
        <Badge :variant="prioridadeVariant">{{ solicitacao.prioridade }}</Badge>
      </div>

      <h3 class="text-lg font-bold text-slate-800 break-words leading-snug">
        {{ solicitacao.descricao || 'Solicitação de Zeladoria' }}
      </h3>

      <span class="text-xs font-medium text-slate-500 bg-slate-100 self-start px-2 py-1 rounded">
        Prazo: {{ solicitacao.prazo }}
      </span>
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
      <div class="flex flex-col">
        <span class="text-[11px] font-bold text-slate-400 uppercase mb-1">Localização</span>
        <span class="text-sm text-slate-700 break-words">{{ solicitacao.endereco || 'Endereço não informado' }}</span>
      </div>

      <div class="flex flex-col">
        <span class="text-[11px] font-bold text-slate-400 uppercase mb-1">Solicitante</span>
        <span class="text-sm text-slate-700 break-words">{{ solicitacao.nomeCidadao || 'Anônimo' }}</span>
      </div>

      <div class="flex flex-col">
        <span class="text-[11px] font-bold text-slate-400 uppercase mb-1">Status Atual</span>
        <span class="text-sm font-semibold text-emerald-600 break-words">{{ solicitacao.statusDescricao }}</span>
      </div>

      <div class="flex flex-col">
        <span class="text-[11px] font-bold text-slate-400 uppercase mb-1">Responsável</span>
        <span class="text-sm text-slate-700 break-words">{{ solicitacao.prestadorNome || 'Aguardando Atribuição'
          }}</span>
      </div>
    </div>

    <footer class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
      <div class="text-[11px] font-medium text-slate-400 w-full sm:w-auto text-center sm:text-left">
        Criado em {{ formatDate(solicitacao.dataCriacao) }}
      </div>
      <div class="flex items-center w-full sm:w-auto">
        <slot name="actions" />
      </div>
    </footer>
  </div>
</template>
