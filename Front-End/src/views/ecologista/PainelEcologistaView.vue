<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { api } from '@/services/api'
import type { Solicitacao } from '@/types'

const chamados = ref<Solicitacao[]>([])
const erro = ref('')
const carregando = ref(false)

async function carregar() {
  erro.value = ''
  carregando.value = true
  try {
    chamados.value = await api.listarParaEcologista()
  } catch (e) {
    erro.value = e instanceof Error ? e.message : 'Erro ao carregar chamados.'
  } finally {
    carregando.value = false
  }
}

onMounted(carregar)
</script>

<template>
  <div class="card wide">
    <h1>Painel do Ecologista</h1>
    <p class="subtitle">Chamados abertos, em andamento e concluídos</p>

    <button class="secondary" :disabled="carregando" @click="carregar">Atualizar</button>
    <p v-if="erro" class="erro">{{ erro }}</p>

    <div v-if="carregando" class="info">Carregando...</div>

    <table v-else-if="chamados.length">
      <thead>
        <tr>
          <th>Protocolo</th>
          <th>Cidadão</th>
          <th>Prioridade</th>
          <th>Status</th>
          <th>Prestador</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="chamado in chamados" :key="chamado.protocolo">
          <td>{{ chamado.protocolo }}</td>
          <td>{{ chamado.nomeCidadao }}</td>
          <td>{{ chamado.prioridade }}</td>
          <td>{{ chamado.status }}</td>
          <td>{{ chamado.prestadorNome ?? '—' }}</td>
          <td>{{ new Date(chamado.dataCriacao).toLocaleString('pt-BR') }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else class="info">Nenhum chamado encontrado.</p>
  </div>
</template>
