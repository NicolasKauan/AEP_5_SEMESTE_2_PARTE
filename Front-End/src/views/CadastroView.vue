<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '@/services/api'
import { useAuth } from '@/composables/useAuth'
import type { TipoUsuario } from '@/types'

const router = useRouter()
const { setSession, homeRoute } = useAuth()

const nome = ref('')
const email = ref('')
const cpf = ref('')
const senha = ref('')
const tipo = ref<TipoUsuario>('MORADOR')
const erro = ref('')
const carregando = ref(false)

async function cadastrar() {
  erro.value = ''
  carregando.value = true
  try {
    const auth = await api.cadastrar({
      nome: nome.value,
      email: email.value,
      cpf: cpf.value,
      senha: senha.value,
      tipo: tipo.value,
    })
    setSession(auth)
    await router.push(homeRoute())
  } catch (e) {
    erro.value = e instanceof Error ? e.message : 'Erro ao cadastrar.'
  } finally {
    carregando.value = false
  }
}
</script>

<template>
  <div class="card">
    <h1>Cadastro</h1>
    <p class="subtitle">Escolha o tipo de usuário</p>

    <form @submit.prevent="cadastrar">
      <label>
        Nome completo
        <input v-model="nome" required />
      </label>

      <label>
        E-mail
        <input v-model="email" type="email" required />
      </label>

      <label>
        CPF
        <input v-model="cpf" required minlength="11" maxlength="14" />
      </label>

      <label>
        Senha
        <input v-model="senha" type="password" required minlength="6" />
      </label>

      <label>
        Tipo de usuário
        <select v-model="tipo">
          <option value="MORADOR">Morador</option>
          <option value="ECOLOGISTA">Ecologista</option>
          <option value="PRESTADOR">Prestador de Serviço</option>
        </select>
      </label>

      <p v-if="erro" class="erro">{{ erro }}</p>

      <button type="submit" :disabled="carregando">
        {{ carregando ? 'Cadastrando...' : 'Cadastrar' }}
      </button>
    </form>

    <p class="link">
      Já tem conta?
      <RouterLink to="/login">Faça login</RouterLink>
    </p>
  </div>
</template>
