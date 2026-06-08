export type TipoUsuario = 'MORADOR' | 'ECOLOGISTA' | 'PRESTADOR'

export type NivelPrioridade = 'BAIXA' | 'MEDIA' | 'ALTA' | 'URGENTE'

export type StatusSolicitacao =
  | 'ABERTA'
  | 'ANDAMENTO'
  | 'AGUARDANDO_MATERIAIS'
  | 'FINALIZADA'
  | 'CANCELADA'

export interface AuthResponse {
  token: string
  id: number
  nome: string
  email: string
  tipo: TipoUsuario
}

export interface Solicitacao {
  protocolo: string
  nomeCidadao: string
  cpf: string
  descricao: string
  prioridade: NivelPrioridade
  status: StatusSolicitacao
  statusDescricao: string
  prazo: string
  dataCriacao: string
  criadorNome: string | null
  prestadorNome: string | null
}

export interface RegistroSolicitacaoInput {
  anonimo: boolean
  nome: string | null
  cpf: string | null
  pontosObstrucao: number
  pontosRisco: number
  pontosLocal: number
  pontosVolume: number
  endereco: string
  observacao: string
}
