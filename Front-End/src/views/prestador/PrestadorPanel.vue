<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { api } from '@/services/api'
import CardSolicitacao from '@/components/CardSolicitacao.vue'

const lista = ref([])
const erro = ref('')
const session = api.getSession()

async function carregar() {
  erro.value = ''
  try {
    lista.value = await api.listarParaPrestador()
  } catch (e) {
    erro.value = e instanceof Error ? e.message : 'Erro ao carregar'
  }
}

import { toast } from '@/services/toast'

async function aceitar(p: string) {
  try {
    await api.aceitar(p)
    toast.success('Chamado aceito')
    await carregar()
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Erro'
    toast.error(msg)
  }
}

async function desistir(p: string) {
  try {
    await api.desistir(p)
    toast.success('Você desistiu do chamado')
    await carregar()
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Erro'
    toast.error(msg)
  }
}

async function concluir(p: string) {
  try {
    await api.concluir(p)
    toast.success('Chamado concluído')
    await carregar()
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Erro'
    toast.error(msg)
  }
}

onMounted(() => carregar())
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-4">Painel do Prestador</h1>
    <p v-if="erro" class="text-red-600">{{ erro }}</p>

    <div class="space-y-4">
      <div v-for="s in lista" :key="s.protocolo" class="border rounded p-3 bg-white">
        <div class="flex justify-between">
          <div>
            <div class="text-sm text-gray-500">{{ s.protocolo }} — {{ s.dataCriacao }}</div>
            <div class="font-semibold">{{ s.descricao }}</div>
            <div class="text-sm text-gray-600">{{ s.endereco }}</div>
          </div>
          <div class="flex flex-col items-end gap-2">
            <div>{{ s.statusDescricao }}</div>
            <div class="space-x-2">
              <button v-if="s.status === 'ABERTA'" class="px-3 py-1 bg-green-600 text-white rounded" @click="aceitar(s.protocolo)">Aceitar</button>
              <template v-else-if="s.status === 'ANDAMENTO' && s.prestadorNome === session?.nome">
                <button class="px-3 py-1 bg-blue-600 text-white rounded" @click="concluir(s.protocolo)">Concluir</button>
                <button class="px-3 py-1 bg-red-600 text-white rounded" @click="desistir(s.protocolo)">Desistir</button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
