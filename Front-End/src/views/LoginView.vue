<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '@/services/api'

const router = useRouter()
const email = ref('')
const senha = ref('')
const erro = ref('')
const carregando = ref(false)

async function entrar() {
  erro.value = ''
  carregando.value = true
  try {
    const resp: any = await api.login(email.value, senha.value)
    // redirect by tipo
    if (resp.tipo === 'MORADOR') router.push('/morador')
    else if (resp.tipo === 'ECOLOGISTA') router.push('/ecologista/painel')
    else if (resp.tipo === 'PRESTADOR') router.push('/prestador/painel')
    else router.push('/')
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Erro ao autenticar'
    erro.value = msg
    import('@/services/toast').then(m => m.toast.error(msg))
  } finally {
    carregando.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-md bg-white p-6 rounded shadow">
      <h2 class="text-2xl font-semibold mb-4">Entrar</h2>

      <label class="block mb-2 text-sm">E-mail
        <input v-model="email" type="email" class="w-full border rounded px-3 py-2 mt-1" />
      </label>

      <label class="block mb-2 text-sm">Senha
        <input v-model="senha" type="password" class="w-full border rounded px-3 py-2 mt-1" />
      </label>

      <p v-if="erro" class="text-red-600 text-sm mb-2">{{ erro }}</p>

      <button class="w-full bg-blue-600 text-white py-2 rounded" :disabled="carregando" @click="entrar">
        {{ carregando ? 'Entrando...' : 'Entrar' }}
      </button>

      <p class="text-center text-sm mt-4">Não tem uma conta? <a href="/cadastro" class="text-blue-600">Registre-se</a></p>
    </div>
  </div>
</template>

<style scoped>
.auth-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.auth-container {
  display: flex;
  width: 100%;
  max-width: 900px;
  background: white;
  border: 1px solid #333;
}

.auth-section {
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
}

.vertical-line {
  width: 1px;
  background-color: #333;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.form-group label {
  font-size: 12px;
  margin-bottom: 5px;
}

.form-group input {
  padding: 10px;
  border: 1px solid #333;
}

.forgot-link {
  font-size: 12px;
  color: #666;
  text-decoration: none;
  margin-bottom: 20px;
  text-align: right;
}

.no-account {
  text-align: center;
  margin-bottom: 10px;
  font-size: 14px;
}

.btn-filled {
  padding: 12px;
  background-color: #e0e0e0;
  border: 1px solid #333;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
}

.btn-outlined {
  padding: 12px;
  background-color: transparent;
  border: 1px solid #333;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 30px 0;
  color: #333;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #333;
}

.divider span {
  padding: 0 10px;
}

.profile-label {
  font-size: 14px;
  margin-bottom: 10px;
}

.profile-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.btn-profile {
  padding: 10px;
  border: 1px solid #ccc;
  background: #f9f9f9;
  text-align: left;
  cursor: pointer;
}

.btn-profile.active {
  background: #666;
  color: white;
  border-color: #666;
}

.mt-auto {
  margin-top: auto;
}
</style>

