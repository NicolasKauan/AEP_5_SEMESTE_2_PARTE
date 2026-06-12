<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { toast } from '@/services/toast'
import Button from './Button.vue'

const router = useRouter()
const { nome, logout: authLogout, isAuthenticated, homeRoute } = useAuth()

function logout() {
  authLogout()
  toast.info('Sessão encerrada')
  router.push('/login')
}
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-xl">
    <div class="relative flex items-center justify-between w-full px-8 py-4">
      <RouterLink to="/" class="group flex items-center gap-2.5">
        <div
          class="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center text-xs font-black text-white shadow-md shadow-emerald-600/10 group-hover:scale-105 transition-transform">
          EC
        </div>
        <span class="text-lg font-black text-slate-900 tracking-tight">EcoColeta</span>
      </RouterLink>

      <nav class="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8">
        <RouterLink to="/" class="text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors">
          Início
        </RouterLink>

        <template v-if="isAuthenticated">
          <RouterLink :to="homeRoute()"
            class="text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors">
            Meu Painel
          </RouterLink>
        </template>

        <RouterLink to="/denunciar-anonimo"
          class="text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors">
          Denunciar
        </RouterLink>
      </nav>

      <div class="flex items-center gap-4 sm:gap-6">
        <template v-if="isAuthenticated">
          <div class="hidden sm:flex flex-col items-end leading-tight">
            <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Usuário</span>
            <span class="text-sm font-bold text-slate-900">{{ nome }}</span>
          </div>
          <Button @click="logout" variant="danger" class="!px-3 !py-2 !rounded-xl !text-[10px] !font-bold">
            Sair
          </Button>
        </template>
        <template v-else>
          <RouterLink to="/login" class="text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors">
            Entrar</RouterLink>
          <Button @click="$router.push('/cadastro')" class="!px-5 !py-2.5 !rounded-xl !text-xs">
            Começar
          </Button>
        </template>
      </div>
    </div>
  </header>
</template>
