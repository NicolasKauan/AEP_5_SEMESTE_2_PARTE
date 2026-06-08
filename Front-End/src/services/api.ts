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
