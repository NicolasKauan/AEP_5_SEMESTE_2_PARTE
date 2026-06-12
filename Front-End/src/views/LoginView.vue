<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '@/services/api'
import { toast } from '@/services/toast'
import { useAuth } from '@/composables/useAuth'
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'

const router = useRouter()
const { setSession } = useAuth()

const email = ref('')
const senha = ref('')
const erro = ref('')
const carregando = ref(false)

async function entrar() {
  erro.value = ''
  carregando.value = true
  try {
    const resp = await api.login(email.value, senha.value)
    setSession(resp)

    toast.success(`Bem-vindo, ${resp.nome}!`)

    if (resp.tipo === 'MORADOR') router.push('/morador')
    else if (resp.tipo === 'ECOLOGISTA') router.push('/ecologista/painel')
    else if (resp.tipo === 'PRESTADOR') router.push('/prestador/painel')
    else router.push('/')
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Erro ao autenticar'
    erro.value = msg
    toast.error(msg)
  } finally {
    carregando.value = false
  }
}
</script>

<template>
  <div class="min-h-[calc(100vh-80px)] flex items-center justify-center bg-slate-50 px-4">

    <div class="w-full max-w-md bg-white rounded-3xl shadow-lg border border-slate-100 p-10">

      <header class="text-center mb-10">

        <RouterLink to="/" class="inline-flex items-center gap-3 text-2xl font-bold text-slate-900">
          <div
            class="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white text-xs font-black">
            EC
          </div>

          EcoColeta
        </RouterLink>

        <h1 class="mt-8 text-3xl font-bold text-slate-900">
          Bem-vindo
        </h1>

        <p class="mt-3 text-slate-500">
          Faça login para acessar sua conta.
        </p>

      </header>

      <form @submit.prevent="entrar" class="space-y-8">

        <Input v-model="email" type="email" label="E-mail" placeholder="Digite seu e-mail" required />

        <div>
          <Input v-model="senha" type="password" label="Senha" placeholder="Digite sua senha" required />

          <div class="mt-3 text-right">
            <a href="#" class="text-sm text-emerald-600 hover:text-emerald-500">
              Esqueceu sua senha?
            </a>
          </div>
        </div>

        <Button type="submit" :loading="carregando" full-width class="h-14">
          Entrar
        </Button>

      </form>

      <p class="mt-8 text-center text-sm text-slate-500">
        Não possui conta?

        <RouterLink to="/cadastro" class="font-semibold text-emerald-600 hover:text-emerald-500">
          Criar agora
        </RouterLink>
      </p>

      <div v-if="erro" class="mt-6 p-4 rounded-xl bg-red-50 border border-red-200">
        <p class="text-sm text-red-600 text-center">
          {{ erro }}
        </p>
      </div>

    </div>

  </div>
</template>
