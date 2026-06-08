<script setup lang="ts">
import { ref } from 'vue'
import { api } from '@/services/api'
import type { Solicitacao } from '@/types'

const anonimo = ref(false)
const nome = ref('')
const cpf = ref('')
const obstrucao = ref(1)
const risco = ref(1)
const local = ref(1)
const volume = ref(1)
const endereco = ref('')
const observacao = ref('')
const erro = ref('')
const sucesso = ref<Solicitacao | null>(null)
const carregando = ref(false)

function pontosObstrucao() {
  if (obstrucao.value === 3) return 4
  if (obstrucao.value === 2) return 3
  return 1
}

function pontosLocal() {
  if (local.value === 4) return 5
  if (local.value === 3) return 4
  if (local.value === 2) return 3
  return 2
}

async function enviar() {
  erro.value = ''
  sucesso.value = null
  carregando.value = true
  try {
    sucesso.value = await api.registrarChamado({
      anonimo: anonimo.value,
      nome: anonimo.value ? null : nome.value,
      cpf: anonimo.value ? null : cpf.value,
      pontosObstrucao: pontosObstrucao(),
      pontosRisco: risco.value,
      pontosLocal: pontosLocal(),
      pontosVolume: volume.value,
      endereco: endereco.value,
      observacao: observacao.value,
    })
  } catch (e) {
    erro.value = e instanceof Error ? e.message : 'Erro ao registrar chamado.'
  } finally {
    carregando.value = false
  }
}
</script>

<template>
  <div class="card wide">
    <h1>Registrar Reclamação</h1>
    <p class="subtitle">Abra um novo chamado de zeladoria</p>

    <form @submit.prevent="enviar">
      <label class="checkbox">
        <input v-model="anonimo" type="checkbox" />
        Registrar de forma anônima
      </label>

      <template v-if="!anonimo">
        <label>
          Nome completo
          <input v-model="nome" />
        </label>
        <label>
          CPF
          <input v-model="cpf" />
        </label>
      </template>

      <fieldset>
        <legend>Obstrução da via</legend>
        <label><input v-model="obstrucao" type="radio" :value="1" /> Não bloqueia</label>
        <label><input v-model="obstrucao" type="radio" :value="2" /> Parcial</label>
        <label><input v-model="obstrucao" type="radio" :value="3" /> Total</label>
      </fieldset>

      <fieldset>
        <legend>Risco sanitário</legend>
        <label><input v-model="risco" type="radio" :value="1" /> Seco</label>
        <label><input v-model="risco" type="radio" :value="2" /> Ensacado</label>
        <label><input v-model="risco" type="radio" :value="3" /> Dengue</label>
        <label><input v-model="risco" type="radio" :value="4" /> Exposto</label>
      </fieldset>

      <fieldset>
        <legend>Tipo de local</legend>
        <label><input v-model="local" type="radio" :value="1" /> Residencial</label>
        <label><input v-model="local" type="radio" :value="2" /> Parque/Escola</label>
        <label><input v-model="local" type="radio" :value="3" /> Ecológico</label>
        <label><input v-model="local" type="radio" :value="4" /> Saúde</label>
      </fieldset>

      <fieldset>
        <legend>Volume do lixo</legend>
        <label><input v-model="volume" type="radio" :value="1" /> Espalhado</label>
        <label><input v-model="volume" type="radio" :value="2" /> Pequeno</label>
        <label><input v-model="volume" type="radio" :value="3" /> Moderado</label>
        <label><input v-model="volume" type="radio" :value="4" /> Excessivo</label>
      </fieldset>

      <label>
        Endereço da ocorrência
        <input v-model="endereco" required />
      </label>

      <label>
        Observação adicional
        <textarea v-model="observacao" rows="3" />
      </label>

      <p v-if="erro" class="erro">{{ erro }}</p>

      <div v-if="sucesso" class="sucesso">
        <strong>Protocolo gerado: {{ sucesso.protocolo }}</strong>
        <p>Prioridade: {{ sucesso.prioridade }} — Prazo: {{ sucesso.prazo }}</p>
      </div>

      <button type="submit" :disabled="carregando">
        {{ carregando ? 'Enviando...' : 'Registrar chamado' }}
      </button>
    </form>
  </div>
</template>
