<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '@/services/api'
import { toast } from '@/services/toast'
const session = api.getSession()
const nome = session?.nome
const router = useRouter()

function logout() {
  api.clearSession()
  toast.info('Sessão encerrada')
  router.push('/login')
}
</script>

<template>
  <header class="flex items-center justify-between py-4 px-6 bg-white shadow">
    <div class="flex items-center gap-4">
      <div class="text-xl font-bold">Eco Coleto</div>
    </div>
    <div class="flex items-center gap-3">
      <template v-if="nome">
        <div class="text-sm">{{ nome }}</div>
        <button @click="logout" class="text-sm text-blue-600">Sair</button>
      </template>
      <template v-else>
        <a class="text-sm text-blue-600" href="/login">Login</a>
        <a class="text-sm text-gray-700" href="/cadastro">Registrar-se</a>
      </template>
    </div>
  </header>
</template>
