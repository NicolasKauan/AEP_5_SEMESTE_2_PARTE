<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { api } from '@/services/api'
import CardSolicitacao from '@/components/CardSolicitacao.vue'

const lista = ref([])
const erro = ref('')

async function carregar() {
  erro.value = ''
  try {
    lista.value = await api.listarParaEcologista()
  } catch (e) {
    erro.value = e instanceof Error ? e.message : 'Erro ao carregar'
  }
}

onMounted(() => carregar())
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-4">Painel do Ecologista</h1>
    <p v-if="erro" class="text-red-600">{{ erro }}</p>
    <div class="grid md:grid-cols-2 gap-4">
      <CardSolicitacao v-for="s in lista" :key="s.protocolo" :solicitacao="s" />
    </div>
  </div>
</template>
