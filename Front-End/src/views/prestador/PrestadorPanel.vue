<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { api } from '@/services/api'
import type { Solicitacao } from '@/types'
import CardSolicitacao from '@/components/CardSolicitacao.vue'
import Button from '@/components/Button.vue'
import { toast } from '@/services/toast'

const lista = ref<Solicitacao[]>([])
const erro = ref('')
const carregando = ref(false)
const session = api.getSession()

async function carregar() {
  erro.value = ''
  carregando.value = true
  try {
    lista.value = await api.listarParaPrestador()
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Erro ao carregar solicitações.'
    if (msg === 'Não autorizado') return
    erro.value = 'Erro ao carregar solicitações. Tente novamente mais tarde.'
  } finally {
    carregando.value = false
  }
}

async function aceitar(p: string) {
  try {
    await api.aceitar(p)
    toast.success('Chamado aceito com sucesso!')
    await carregar()
  } catch (e) {
    toast.error(e instanceof Error ? e.message : 'Erro ao aceitar')
  }
}

async function desistir(p: string) {
  try {
    await api.desistir(p)
    toast.info('Você desistiu do chamado')
    await carregar()
  } catch (e) {
    toast.error(e instanceof Error ? e.message : 'Erro ao desistir')
  }
}

async function concluir(p: string) {
  try {
    await api.concluir(p)
    toast.success('Chamado concluído! Ótimo trabalho.')
    await carregar()
  } catch (e) {
    toast.error(e instanceof Error ? e.message : 'Erro ao concluir')
  }
}

onMounted(() => carregar())
</script>

<template>
  <div class="min-h-screen bg-slate-50 py-12">
    <div class="container mx-auto px-4 max-w-5xl">
      <header class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest mb-2">
            Zeladoria e Operações
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight">Painel do Prestador</h1>
          <p class="text-slate-500">Gerencie suas ordens de serviço e atualize o status das coletas.</p>
        </div>

        <Button @click="carregar" variant="outline" :loading="carregando">
          Sincronizar Chamados
        </Button>
      </header>

      <div v-if="carregando" class="flex flex-col items-center justify-center py-24 gap-4">
        <div class="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        <p class="text-slate-400 font-bold animate-pulse">Carregando ordens de serviço...</p>
      </div>

      <div v-else-if="erro" class="p-8 bg-red-50 border border-red-100 rounded-[2.5rem] text-center">
        <p class="text-red-600 font-bold mb-4">{{ erro }}</p>
        <Button @click="carregar" variant="danger">Tentar novamente</Button>
      </div>

      <div v-else class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div v-if="lista.length > 0" class="grid gap-6">
          <CardSolicitacao v-for="s in lista" :key="s.protocolo" :solicitacao="s">
            <template #actions>
              <div class="flex items-center gap-3">
                <Button
                  v-if="s.status === 'ABERTA'"
                  @click="aceitar(s.protocolo)"
                  variant="primary"
                  size="sm"
                >
                  Aceitar Chamado
                </Button>

                <template v-else-if="s.status === 'ANDAMENTO' && s.prestadorNome === session?.nome">
                  <Button
                    @click="concluir(s.protocolo)"
                    variant="primary"
                  >
                    Concluir
                  </Button>
                  <Button
                    @click="desistir(s.protocolo)"
                    variant="danger"
                  >
                    Desistir
                  </Button>
                </template>

                <span v-else-if="s.status === 'CONCLUIDA'" class="text-xs font-bold text-slate-300 uppercase tracking-widest">
                  Serviço Finalizado
                </span>

                <span v-else class="text-xs font-bold text-slate-300 uppercase tracking-widest">
                  Em atendimento por outro prestador
                </span>
              </div>
            </template>
          </CardSolicitacao>
        </div>

        <div v-else class="py-24 px-8 rounded-[3rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/40 text-center space-y-4">
           <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
             <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
           </div>
           <h3 class="text-xl font-bold text-slate-900">Nenhum chamado pendente</h3>
           <p class="text-slate-500 max-w-xs mx-auto">Bom trabalho! Todas as solicitações da sua área foram atendidas.</p>
        </div>
      </div>
    </div>
  </div>
</template>
