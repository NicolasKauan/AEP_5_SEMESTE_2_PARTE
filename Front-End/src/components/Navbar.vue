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
    <div class="container mx-auto flex items-center justify-between px-6 py-4">
      <RouterLink to="/" class="group flex items-center gap-3">
        <div class="w-10 h-10 bg-emerald-600 rounded-2xl flex items-center justify-center text-sm font-black text-white shadow-lg shadow-emerald-600/20 group-hover:scale-110 transition-transform">
          EC
        </div>
        <span class="text-xl font-black text-slate-900 tracking-tight">EcoColeta</span>
      </RouterLink>

      <nav class="hidden md:flex items-center gap-8">
        <RouterLink to="/" class="text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors">Início</RouterLink>
        <template v-if="isAuthenticated">
          <RouterLink :to="homeRoute()" class="text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors">Meu Painel</RouterLink>    
        </template>
        <RouterLink to="/denunciar-anonimo" class="text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors">Denunciar</RouterLink> 
      </nav>

      <div class="flex items-center gap-6">
        <template v-if="isAuthenticated">
          <div class="hidden sm:flex flex-col items-end">
            <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Usuário</span>
            <span class="text-sm font-bold text-slate-900">{{ nome }}</span>
          </div>
          <Button @click="logout" variant="danger" class="!px-4 !py-2 !rounded-xl !text-xs">
            Sair
          </Button>
        </template>
        <template v-else>
          <RouterLink to="/login" class="text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors">Entrar</RouterLink>
          <Button @click="$router.push('/cadastro')" class="!px-5 !py-2.5 !rounded-xl !text-xs">
            Começar
          </Button>
        </template>
      </div>
    </div>
  </header>
</template>
