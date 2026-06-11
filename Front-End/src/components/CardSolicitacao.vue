<script setup lang="ts">
import { computed } from 'vue'
import Badge from './Badge.vue'
const props = defineProps({ solicitacao: Object })

function formatDate(dt: string) {
  if (!dt) return null
  const d = new Date(dt)
  return d.toLocaleString()
}

const prioridadeVariant = computed(() => {
  const p = props.solicitacao?.prioridade
  if (!p) return 'baixa'
  return p.toString().toLowerCase()
})
</script>

<template>
  <div class="border rounded p-4 shadow-sm bg-white">
    <div class="flex justify-between items-start">
      <div>
        <div class="text-sm text-gray-500">{{ solicitacao.protocolo }}</div>
        <h3 class="font-semibold text-lg">{{ solicitacao.descricao || 'Sem descrição' }}</h3>
      </div>
      <div class="space-y-1 text-right">
        <Badge :variant="prioridadeVariant">{{ solicitacao.prioridade }}</Badge>
        <div class="text-xs text-gray-600">{{ solicitacao.prazo }}</div>
      </div>
    </div>

    <div class="mt-3 text-sm text-gray-700">
      <div><strong>Status:</strong> {{ solicitacao.statusDescricao }}</div>
      <div><strong>Prestador:</strong> {{ solicitacao.prestadorNome || 'Aguardando prestador' }}</div>
      <div><strong>Endereço:</strong> {{ solicitacao.endereco || '-' }}</div>
      <div class="text-xs text-gray-500 mt-2">Criado: {{ formatDate(solicitacao.dataCriacao) }}</div>
    </div>
  </div>
</template>
