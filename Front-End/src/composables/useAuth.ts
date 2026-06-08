import { computed, ref } from 'vue'
import type { AuthResponse, TipoUsuario } from '@/types'

const token = ref<string | null>(localStorage.getItem('token'))
const nome = ref<string | null>(localStorage.getItem('nome'))
const email = ref<string | null>(localStorage.getItem('email'))
const tipo = ref<TipoUsuario | null>(localStorage.getItem('tipo') as TipoUsuario | null)

export function useAuth() {
  const isAuthenticated = computed(() => !!token.value)

  function setSession(auth: AuthResponse) {
    token.value = auth.token
    nome.value = auth.nome
    email.value = auth.email
    tipo.value = auth.tipo

    localStorage.setItem('token', auth.token)
    localStorage.setItem('nome', auth.nome)
    localStorage.setItem('email', auth.email)
    localStorage.setItem('tipo', auth.tipo)
  }

  function logout() {
    token.value = null
    nome.value = null
    email.value = null
    tipo.value = null

    localStorage.removeItem('token')
    localStorage.removeItem('nome')
    localStorage.removeItem('email')
    localStorage.removeItem('tipo')
  }

  function homeRoute() {
    if (tipo.value === 'PRESTADOR') return '/prestador/painel'
    if (tipo.value === 'ECOLOGISTA') return '/ecologista/painel'
    return '/morador/registrar'
  }

  return {
    token,
    nome,
    email,
    tipo,
    isAuthenticated,
    setSession,
    logout,
    homeRoute,
  }
}
