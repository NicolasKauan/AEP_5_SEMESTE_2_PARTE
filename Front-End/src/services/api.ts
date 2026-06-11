import type { AuthResponse, RegistroSolicitacaoInput, Solicitacao, TipoUsuario } from '@/types'

const BASE_URL = 'http://localhost:8080/api'

type UserSession = {
  token: string
  id: string
  nome: string
  email: string
  tipo: TipoUsuario
}

function getSession(): UserSession | null {
  const raw = localStorage.getItem('session')
  return raw ? JSON.parse(raw) : null
}

function saveSession(session: UserSession) {
  localStorage.setItem('session', JSON.stringify(session))
  localStorage.setItem('token', session.token)
  localStorage.setItem('id', session.id.toString())
  localStorage.setItem('nome', session.nome)
  localStorage.setItem('email', session.email)
  localStorage.setItem('tipo', session.tipo)
}

function clearSession() {
  localStorage.removeItem('session')
  localStorage.removeItem('token')
  localStorage.removeItem('id')
  localStorage.removeItem('nome')
  localStorage.removeItem('email')
  localStorage.removeItem('tipo')
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const session = getSession()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }

  if (session?.token) {
    headers.Authorization = `Bearer ${session.token}`
  }

  const response = await fetch(`${BASE_URL}${path}`, { ...options, headers })

  if (response.status === 401) {
    clearSession()
    window.location.href = '/login'
    throw new Error('Não autorizado')
  }

  const contentType = response.headers.get('content-type') || ''
  const body = contentType.includes('application/json') ? await response.json() : await response.text()

  if (!response.ok) {
    if (typeof body === 'object' && body?.mensagem) {
      throw new Error(body.mensagem)
    }
    throw new Error(body?.toString() || 'Erro inesperado')
  }

  return body as T
}

export const api = {
  login(email: string, senha: string) {
    return request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, senha }),
    })
  },

  cadastro(data: { nome: string; email: string; cpf: string; senha: string; tipo: TipoUsuario }) {
    return request<AuthResponse>('/auth/cadastro', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  registrarChamado(data: RegistroSolicitacaoInput) {
    return request<Solicitacao>('/solicitacoes', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  buscarProtocolo(protocolo: string) {
    return request<Solicitacao>(`/solicitacoes/${encodeURIComponent(protocolo)}`)
  },

  listarParaPrestador() {
    return request<Solicitacao[]>('/prestador/solicitacoes')
  },

  aceitar(protocolo: string) {
    return request<Solicitacao>(`/prestador/solicitacoes/${encodeURIComponent(protocolo)}/aceitar`, {
      method: 'POST',
    })
  },

  desistir(protocolo: string) {
    return request<Solicitacao>(`/prestador/solicitacoes/${encodeURIComponent(protocolo)}/desistir`, {
      method: 'POST',
    })
  },

  concluir(protocolo: string) {
    return request<Solicitacao>(`/prestador/solicitacoes/${encodeURIComponent(protocolo)}/concluir`, {
      method: 'POST',
    })
  },

  listarParaEcologista() {
    return request<Solicitacao[]>('/ecologista/solicitacoes')
  },

  getSession,
  saveSession,
  clearSession,
}

export default api
