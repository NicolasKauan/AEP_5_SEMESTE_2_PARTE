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
      tipo: tipo.value,
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
  <div class="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-slate-50">
    <div class="w-full max-w-[1100px] grid lg:grid-cols-[0.8fr_1.2fr] bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100">

      <!-- Lado Esquerdo: Branding/Infos -->
      <section class="hidden lg:flex flex-col justify-between p-12 bg-emerald-600 text-white relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div class="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-[120px]"></div>
          <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-400 rounded-full blur-[100px]"></div>
        </div>

        <div class="relative z-10">
          <RouterLink to="/" class="inline-flex items-center gap-2 text-2xl font-bold tracking-tight">
            <span class="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-sm font-black text-white">EC</span> 
            EcoColeta
          </RouterLink>

          <div class="mt-20">
            <h1 class="text-5xl font-bold leading-tight">
              Faça parte da <br />
              <span class="text-emerald-200 font-extrabold italic">mudança</span>.
            </h1>
            <p class="mt-6 text-emerald-50 text-lg max-w-sm leading-relaxed">
              Crie sua conta e ajude-nos a construir uma cidade mais limpa, sustentável e organizada para todos.
            </p>
          </div>
        </div>

        <div class="relative z-10 space-y-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <p class="font-medium">Protocolos transparentes</p>
          </div>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <p class="font-medium">Respostas rápidas</p>
          </div>
        </div>
      </section>

      <!-- Lado Direito: Formulário -->
      <section class="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
        <div class="w-full max-w-md mx-auto">
          <header class="mb-10 text-center lg:text-left">
            <h2 class="text-3xl font-bold text-slate-900 tracking-tight">Crie sua conta</h2>
            <p class="text-slate-500 mt-2">Preencha os campos abaixo para começar</p>
          </header>

          <form @submit.prevent="cadastrar" class="space-y-6">
            <Input
              v-model="nome"
              label="Nome completo"
              placeholder="Como prefere ser chamado?"
              required
            />

            <Input
              v-model="email"
              type="email"
              label="E-mail"
              placeholder="seu@email.com"
              required
            />

            <div class="grid sm:grid-cols-2 gap-4">
              <Input
                v-model="cpf"
                label="CPF"
                placeholder="000.000.000-00"
                required
              />
              <Input
                v-model="senha"
                type="password"
                label="Senha"
                placeholder="Min. 6 caracteres"
                required
              />
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold text-slate-700 px-1">Quem é você?</label>
              <div class="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  @click="tipo = 'MORADOR'"
                  :class="[
                    'py-3 rounded-2xl border text-sm font-semibold transition-all',
                    tipo === 'MORADOR' ? 'bg-emerald-50 border-emerald-500 text-emerald-700 ring-2 ring-emerald-500/10' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  ]"
                >
                  Morador
                </button>
                <button
                  type="button"
                  @click="tipo = 'ECOLOGISTA'"
                  :class="[
                    'py-3 rounded-2xl border text-sm font-semibold transition-all',
                    tipo === 'ECOLOGISTA' ? 'bg-emerald-50 border-emerald-500 text-emerald-700 ring-2 ring-emerald-500/10' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  ]"
                >
                  Ecologista
                </button>
                <button
                  type="button"
                  @click="tipo = 'PRESTADOR'"
                  :class="[
                    'py-3 rounded-2xl border text-sm font-semibold transition-all',
                    tipo === 'PRESTADOR' ? 'bg-emerald-50 border-emerald-500 text-emerald-700 ring-2 ring-emerald-500/10' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  ]"
                >
                  Prestador
                </button>
              </div>
            </div>

            <Button
              type="submit"
              :loading="carregando"
              full-width
              class="mt-4"
            >
              Criar minha conta
            </Button>

            <p class="text-center text-sm text-slate-500 pt-4">
              Já faz parte do EcoColeta?
              <RouterLink to="/login" class="font-bold text-emerald-600 hover:text-emerald-500">Fazer login</RouterLink>
            </p>
          </form>

          <div v-if="erro" class="mt-8 p-4 bg-red-50 border border-red-100 rounded-2xl">
            <p class="text-sm text-red-600 font-medium text-center">{{ erro }}</p>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>