<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '@/services/api'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { setSession, homeRoute } = useAuth()

const email = ref('')
const senha = ref('')
const erro = ref('')
const carregando = ref(false)

async function entrar() {
  erro.value = ''
  carregando.value = true
  try {
    const auth = await api.login(email.value, senha.value)
    setSession(auth)
    await router.push(homeRoute())
  } catch (e) {
    erro.value = e instanceof Error ? e.message : 'Erro ao fazer login.'
  } finally {
    carregando.value = false
  }
}
</script>

<template>
  <div class="card">
    <h1>Login</h1>
    <p class="subtitle">Sistema de Zeladoria — Prefeitura</p>

    <form @submit.prevent="entrar">
      <label>
        E-mail
        <input v-model="email" type="email" required />
      </label>

      <label>
        Senha
        <input v-model="senha" type="password" required minlength="6" />
      </label>

      <p v-if="erro" class="erro">{{ erro }}</p>

      <button type="submit" :disabled="carregando">
        {{ carregando ? 'Entrando...' : 'Entrar' }}
      </button>
    </form>

    <p class="link">
      Não tem conta?
      <RouterLink to="/cadastro">Cadastre-se</RouterLink>
    </p>
  </div>
</template>
