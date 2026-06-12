<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '@/services/api'
import { useAuth } from '@/composables/useAuth'
import { toast } from '@/services/toast'
import type { TipoUsuario } from '@/types'
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'

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
    const auth = await api.cadastro({
      nome: nome.value,
      email: email.value,
      cpf: cpf.value,
      senha: senha.value,
      tipo: tipo.value
    })

    setSession(auth)

    toast.success('Conta criada com sucesso!')

    await router.push(homeRoute())
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Erro ao cadastrar.'

    erro.value = msg
    toast.error(msg)
  } finally {
    carregando.value = false
  }
}
</script>

<template>
  <div class="min-h-[calc(100vh-80px)] flex items-center justify-center bg-slate-100 px-4 py-10">
    <div class="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 md:p-10">

      <div class="text-center mb-10">
        <h1 class="text-3xl font-bold text-slate-900">
          Criar Conta
        </h1>
        <p class="text-slate-500 mt-3">
          Preencha os dados para começar a usar o EcoColeta
        </p>
      </div>

      <form @submit.prevent="cadastrar" class="space-y-8">

        <Input v-model="nome" label="Nome completo" placeholder="Digite seu nome" required class="h-12 text-lg" />

        <Input v-model="email" type="email" label="E-mail" placeholder="seu@email.com" required class="h-12 text-lg" />

        <Input v-model="cpf" label="CPF" placeholder="000.000.000-00" required class="h-12 text-lg" />

        <Input v-model="senha" type="password" label="Senha" placeholder="Digite sua senha" required
          class="h-12 text-lg" />

        <div class="pt-2">
          <label class="block text-sm font-medium text-slate-700 mb-4">
            Tipo de usuário
          </label>

          <div class="grid grid-cols-3 gap-3 mb-6">

            <button type="button" @click="tipo = 'MORADOR'" :class="[
              'rounded-xl border py-3 font-semibold transition',
              tipo === 'MORADOR'
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'border-slate-300 text-slate-600 hover:border-emerald-600'
            ]">
              Morador
            </button>

            <button type="button" @click="tipo = 'ECOLOGISTA'" :class="[
              'rounded-xl border py-3 font-semibold transition',
              tipo === 'ECOLOGISTA'
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'border-slate-300 text-slate-600 hover:border-emerald-600'
            ]">
              Ecologista
            </button>

            <button type="button" @click="tipo = 'PRESTADOR'" :class="[
              'rounded-xl border py-3 font-semibold transition',
              tipo === 'PRESTADOR'
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'border-slate-300 text-slate-600 hover:border-emerald-600'
            ]">
              Prestador
            </button>

          </div>
        </div>

        <Button type="submit" :loading="carregando" full-width class="mt-4">
          Criar Conta
        </Button>

        <p class="text-center text-sm text-slate-500 mt-8">
          Já possui uma conta?
          <RouterLink to="/login" class="font-semibold text-emerald-600 hover:text-emerald-700 ml-1">
            Fazer login
          </RouterLink>
        </p>

      </form>

      <div v-if="erro" class="mt-8 rounded-xl border border-red-200 bg-red-50 p-4">
        <p class="text-sm text-red-600 text-center">
          {{ erro }}
        </p>
      </div>

    </div>
  </div>
</template>
