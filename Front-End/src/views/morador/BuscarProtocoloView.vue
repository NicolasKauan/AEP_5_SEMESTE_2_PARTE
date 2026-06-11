<script setup lang="ts">
import { ref } from 'vue'
import { api } from '@/services/api'
import type { Solicitacao } from '@/types'
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
import CardSolicitacao from '@/components/CardSolicitacao.vue'

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
    erro.value = e instanceof Error ? e.message : 'Protocolo não encontrado ou erro na busca.'
  } finally {
    carregando.value = false
  }
}
</script>

<template>
  <div class="space-y-8">
    <div class="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100">
      <header class="mb-10 text-center lg:text-left">
        <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Acompanhar Protocolo</h2>
        <p class="text-slate-500 mt-1">Insira o código do seu chamado para ver o status atual.</p>
      </header>

      <form @submit.prevent="buscar" class="flex flex-col sm:flex-row gap-4 items-end">
        <div class="flex-1">
          <Input
            v-model="protocolo"
            label="Número do Protocolo"
            placeholder="Ex: EC-123456"
            required
          />
        </div>
        <Button type="submit" :loading="carregando" class="h-[54px] px-8">
          Buscar
        </Button>
      </form>

      <div v-if="erro" class="mt-8 p-4 bg-red-50 border border-red-100 rounded-2xl animate-in fade-in slide-in-from-top-2">
        <p class="text-sm text-red-600 font-medium text-center">{{ erro }}</p>
      </div>
    </div>

    <div v-if="resultado" class="animate-in fade-in slide-in-from-bottom-6 duration-500">
      <CardSolicitacao :solicitacao="resultado" />
    </div>
  </div>
</template>
