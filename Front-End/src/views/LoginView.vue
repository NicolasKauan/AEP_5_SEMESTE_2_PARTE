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
  <div class="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-slate-50">
    <div class="w-full max-w-[1000px] grid lg:grid-cols-2 bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100">

      <!-- Lado Esquerdo: Branding/Infos -->
      <section class="hidden lg:flex flex-col justify-between p-12 bg-slate-900 text-white relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div class="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500 rounded-full blur-[100px]"></div>
          <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-500 rounded-full blur-[100px]"></div>
        </div>

        <div class="relative z-10">
          <RouterLink to="/" class="inline-flex items-center gap-2 text-2xl font-bold tracking-tight">
            <span class="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-sm font-black">EC</span>
            EcoColeta
          </RouterLink>

          <div class="mt-20">
            <h1 class="text-5xl font-bold leading-tight">
              Transforme sua <br />
              <span class="text-emerald-400 font-extrabold italic">cidade</span> hoje.
            </h1>
            <p class="mt-6 text-slate-400 text-lg max-w-sm leading-relaxed">
              Junte-se a milhares de cidadãos que estão fazendo a diferença na zeladoria urbana e preservação ambiental.
            </p>
          </div>
        </div>

        <div class="relative z-10 grid grid-cols-2 gap-8">
          <div>
            <p class="text-3xl font-bold text-emerald-400">85%</p>
            <p class="text-sm text-slate-400 mt-1">Taxa de resolução</p>
          </div>
          <div>
            <p class="text-3xl font-bold text-emerald-400">+1.2k</p>
            <p class="text-sm text-slate-400 mt-1">Coletas mensais</p>
          </div>
        </div>
      </section>

      <!-- Lado Direito: Formulário -->
      <section class="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
        <div class="w-full max-w-sm mx-auto">
          <header class="mb-10">
            <h2 class="text-3xl font-bold text-slate-900 tracking-tight">Bem-vindo de volta</h2>
            <p class="text-slate-500 mt-2">Insira seus dados para acessar sua conta</p>
          </header>

          <form @submit.prevent="entrar" class="space-y-6">
            <Input
              v-model="email"
              type="email"
              label="E-mail"
              placeholder="exemplo@email.com"
              required
            />

            <div class="space-y-1">
              <Input
                v-model="senha"
                type="password"
                label="Senha"
                placeholder="••••••••"
                required
              />
              <div class="flex justify-end">
                <a href="#" class="text-xs font-semibold text-emerald-600 hover:text-emerald-500 transition-colors">Esqueceu a senha?</a>
              </div>
            </div>

            <Button
              type="submit"
              :loading="carregando"
              full-width
              class="mt-4"
            >
              Acessar plataforma
            </Button>

            <div class="relative py-4">
              <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-slate-100"></div></div>
              <div class="relative flex justify-center text-xs uppercase"><span class="bg-white px-2 text-slate-400 font-medium">Ou continue com</span></div>
            </div>

            <div class="grid grid-cols-2 gap-4">
               <button type="button" class="flex items-center justify-center gap-2 py-3 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-colors text-sm font-semibold text-slate-700">
                 Google
               </button>
               <button type="button" class="flex items-center justify-center gap-2 py-3 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-colors text-sm font-semibold text-slate-700">
                 Apple
               </button>
            </div>

            <p class="text-center text-sm text-slate-500 pt-4">
              Ainda não tem conta?
              <RouterLink to="/cadastro" class="font-bold text-emerald-600 hover:text-emerald-500">Criar agora</RouterLink>
            </p>
          </form>

          <div v-if="erro" class="mt-8 p-4 bg-red-50 border border-red-100 rounded-2xl animate-in fade-in slide-in-from-bottom-2">
            <p class="text-sm text-red-600 font-medium text-center">{{ erro }}</p>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>