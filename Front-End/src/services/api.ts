const BASE_URL = 'http://localhost:8080/api'

type UserSession = {
  token: string
  id: string
  nome: string
  email: string
  tipo: string
}

function getSession(): UserSession | null {
  const raw = localStorage.getItem('session')
  return raw ? JSON.parse(raw) : null
}

function saveSession(session: UserSession) {
  localStorage.setItem('session', JSON.stringify(session))
  // also keep backward-compatible individual keys used by composables
  localStorage.setItem('token', session.token)
  localStorage.setItem('id', session.id)
  localStorage.setItem('nome', session.nome)
  localStorage.setItem('email', session.email)
  localStorage.setItem('tipo', session.tipo)
}

function clearSession() {
  localStorage.removeItem('session')
}

async function request(path: string, options: RequestInit = {}) {
  const session = getSession()
  const headers: Record<string,string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string,string> || {}),
  }
  if (session?.token) headers['Authorization'] = `Bearer ${session.token}`

  const res = await fetch(BASE_URL + path, { ...options, headers })

  if (res.status === 401) {
    clearSession()
    // redirect to login
    window.location.href = '/login'
    throw new Error('Não autorizado')
  }

  const contentType = res.headers.get('content-type') || ''
  const body = contentType.includes('application/json') ? await res.json() : await res.text()

  if (!res.ok) {
    if (typeof body === 'object' && body.mensagem) throw new Error(body.mensagem)
    throw new Error(body?.toString() || 'Erro desconhecido')
  }

  return body
}

export const api = {
  // Auth
  async login(email: string, senha: string) {
    const body = await request('/auth/login', { method: 'POST', body: JSON.stringify({ email, senha }) })
    // expected response: { token, id, nome, email, tipo }
    saveSession(body)
    return body
  },
  async cadastro(payload: any) {
    return request('/auth/cadastro', { method: 'POST', body: JSON.stringify(payload) })
  },
  async cadastrar(payload: any) {
    return request('/auth/cadastro', { method: 'POST', body: JSON.stringify(payload) })
  },

  // Solicitacoes
  async registrarChamado(payload: any) {
    return request('/solicitacoes', { method: 'POST', body: JSON.stringify(payload) })
  },
  async buscarPorProtocolo(protocolo: string) {
    return request(`/solicitacoes/${encodeURIComponent(protocolo)}`)
  },
  async buscarProtocolo(protocolo: string) {
    return request(`/solicitacoes/${encodeURIComponent(protocolo)}`)
  },

  // Prestador
  async listarParaPrestador() {
    return request('/prestador/solicitacoes')
  },
  async aceitar(protocolo: string) {
    return request(`/prestador/solicitacoes/${encodeURIComponent(protocolo)}/aceitar`, { method: 'POST' })
  },
  async desistir(protocolo: string) {
    return request(`/prestador/solicitacoes/${encodeURIComponent(protocolo)}/desistir`, { method: 'POST' })
  },
  async concluir(protocolo: string) {
    return request(`/prestador/solicitacoes/${encodeURIComponent(protocolo)}/concluir`, { method: 'POST' })
  },

  // Ecologista
  async listarParaEcologista() {
    return request('/ecologista/solicitacoes')
  },

  // session helpers
  getSession,
  saveSession,
  clearSession,
}

export default api
import type { AuthResponse, RegistroSolicitacaoInput, Solicitacao, TipoUsuario } from '@/types'

const API_BASE = '/api'

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('token')
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE}${path}`, { ...options, headers })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ mensagem: 'Erro inesperado.' }))
    throw new Error(error.mensagem ?? 'Erro inesperado.')
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

export const api = {
  cadastrar(data: {
    nome: string
    email: string
    cpf: string
    senha: string
    tipo: TipoUsuario
  }) {
    return request<AuthResponse>('/auth/cadastro', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  login(email: string, senha: string) {
    return request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, senha }),
    })
  },

  registrarChamado(data: RegistroSolicitacaoInput) {
    return request<Solicitacao>('/solicitacoes', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  buscarProtocolo(protocolo: string) {
    return request<Solicitacao>(`/solicitacoes/${protocolo}`)
  },

  listarChamadosEcologista() {
    return request<Solicitacao[]>('/ecologista/solicitacoes')
  },

  listarChamadosPrestador() {
    return request<Solicitacao[]>('/prestador/solicitacoes')
  },

  aceitarChamado(protocolo: string) {
    return request<Solicitacao>(`/prestador/solicitacoes/${protocolo}/aceitar`, { method: 'POST' })
  },

  desistirChamado(protocolo: string) {
    return request<Solicitacao>(`/prestador/solicitacoes/${protocolo}/desistir`, { method: 'POST' })
  },

  concluirChamado(protocolo: string) {
    return request<Solicitacao>(`/prestador/solicitacoes/${protocolo}/concluir`, { method: 'POST' })
  },
}
