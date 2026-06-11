<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { api } from '@/services/api'
import { useAuth } from '@/composables/useAuth'
import type { Solicitacao } from '@/types'

const { nome } = useAuth()
const chamados = ref<Solicitacao[]>([])
const erro = ref('')
const carregando = ref(false)
const acao = ref('')

async function carregar() {
  erro.value = ''
  carregando.value = true
  try {
    chamados.value = await api.listarParaPrestador()
  } catch (e) {
    erro.value = e instanceof Error ? e.message : 'Erro ao carregar chamados.'
  } finally {
    carregando.value = false
  }
}

async function executar(operacao: 'aceitar' | 'desistir' | 'concluir', protocolo: string) {
  erro.value = ''
  acao.value = protocolo
  try {
    if (operacao === 'aceitar') await api.aceitar(protocolo)
    if (operacao === 'desistir') await api.desistir(protocolo)
    if (operacao === 'concluir') await api.concluir(protocolo)
    await carregar()
  } catch (e) {
    erro.value = e instanceof Error ? e.message : 'Erro ao atualizar chamado.'
  } finally {
    acao.value = ''
  }
}

function podeAceitar(chamado: Solicitacao) {
  return chamado.status === 'ABERTA'
}

function podeGerenciar(chamado: Solicitacao) {
  return chamado.status === 'ANDAMENTO' && chamado.prestadorNome === nome.value
}

onMounted(carregar)
</script>

<template>
  <div class="card wide">
    <h1>Painel do Prestador</h1>
    <p class="subtitle">Aceite, desista ou conclua chamados de zeladoria</p>

    <button class="secondary" :disabled="carregando" @click="carregar">Atualizar</button>
    <p v-if="erro" class="erro">{{ erro }}</p>

    <div v-if="carregando" class="info">Carregando...</div>

    <div v-else class="lista-chamados">
      <article v-for="chamado in chamados" :key="chamado.protocolo" class="chamado-item">
        <header>
          <strong>{{ chamado.protocolo }}</strong>
          <span class="badge">{{ chamado.status }}</span>
        </header>
        <p>{{ chamado.descricao }}</p>
        <p>
          <strong>Prioridade:</strong> {{ chamado.prioridade }} |
          <strong>Prazo:</strong> {{ chamado.prazo }}
        </p>
        <p v-if="chamado.prestadorNome">
          <strong>Responsável:</strong> {{ chamado.prestadorNome }}
        </p>

        <div class="acoes">
          <button
            v-if="podeAceitar(chamado)"
            :disabled="acao === chamado.protocolo"
            @click="executar('aceitar', chamado.protocolo)"
          >
            Aceitar
          </button>
          <button
            v-if="podeGerenciar(chamado)"
            class="secondary"
            :disabled="acao === chamado.protocolo"
            @click="executar('desistir', chamado.protocolo)"
          >
            Desistir
          </button>
          <button
            v-if="podeGerenciar(chamado)"
            :disabled="acao === chamado.protocolo"
            @click="executar('concluir', chamado.protocolo)"
          >
            Concluir
          </button>
        </div>
      </article>
    </div>
  </div>
</template>
