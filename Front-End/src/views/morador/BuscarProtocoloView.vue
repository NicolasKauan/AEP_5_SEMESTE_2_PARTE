<script setup lang="ts">
import { ref } from 'vue'
import { api } from '@/services/api'
import type { Solicitacao } from '@/types'

const protocolo = ref('')
const resultado = ref<Solicitacao | null>(null)
const erro = ref('')
const carregando = ref(false)

async function buscar() {
  erro.value = ''
  resultado.value = null
  carregando.value = true
  try {
    resultado.value = await api.buscarProtocolo(protocolo.value)
  } catch (e) {
    erro.value = e instanceof Error ? e.message : 'Erro ao buscar protocolo.'
  } finally {
    carregando.value = false
  }
}
</script>

<template>
  <div class="card">
    <h1>Acompanhar Protocolo</h1>
    <p class="subtitle">Consulte o status do seu chamado</p>

    <form @submit.prevent="buscar">
      <label>
        Número do protocolo
        <input v-model="protocolo" required placeholder="Ex: AB12CD34" />
      </label>

      <p v-if="erro" class="erro">{{ erro }}</p>

      <button type="submit" :disabled="carregando">
        {{ carregando ? 'Buscando...' : 'Buscar' }}
      </button>
    </form>

    <div v-if="resultado" class="detalhe">
      <h2>{{ resultado.protocolo }}</h2>
      <p><strong>Cidadão:</strong> {{ resultado.nomeCidadao }} | CPF: {{ resultado.cpf }}</p>
      <p><strong>Prioridade:</strong> {{ resultado.prioridade }} ({{ resultado.prazo }})</p>
      <p><strong>Status:</strong> {{ resultado.status }} — {{ resultado.statusDescricao }}</p>
      <p v-if="resultado.prestadorNome">
        <strong>Prestador:</strong> {{ resultado.prestadorNome }}
      </p>
      <p><strong>Detalhes:</strong> {{ resultado.descricao }}</p>
    </div>
  </div>
</template>
