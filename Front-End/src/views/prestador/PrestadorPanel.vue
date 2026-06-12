Snippet de código
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
  <div class="min-h-screen bg-slate-50 py-10 flex flex-col items-center">
    <div class="w-full max-w-3xl px-4">

      <header class="flex flex-col items-center text-center gap-4 mb-10">
        <div class="px-3 py-1 rounded bg-blue-100 text-blue-700 text-[11px] font-bold uppercase tracking-wider">
          Zeladoria e Operações
        </div>
        <h1 class="text-3xl font-bold text-slate-900">Painel do Prestador</h1>
        <p class="text-slate-600">Gerencie suas ordens de serviço e atualize o status das coletas.</p>

        <div class="mt-2">
          <Button @click="carregar" variant="outline" :loading="carregando">
            Sincronizar Chamados
          </Button>
        </div>
      </header>

      <div v-if="carregando" class="flex justify-center py-12">
        <p class="text-slate-500 font-medium">Carregando ordens de serviço...</p>
      </div>

      <div v-else-if="erro" class="p-6 bg-red-50 border border-red-200 rounded-xl text-center">
        <p class="text-red-600 font-medium mb-4">{{ erro }}</p>
        <Button @click="carregar" variant="danger">Tentar novamente</Button>
      </div>

      <div v-else class="space-y-6">
        <div v-if="lista.length > 0" class="flex flex-col gap-5">
          <CardSolicitacao v-for="s in lista" :key="s.protocolo" :solicitacao="s">
            <template #actions>
              <div class="flex items-center gap-2 w-full sm:w-auto">
                <Button v-if="s.status === 'ABERTA'" @click="aceitar(s.protocolo)" variant="primary" fullWidth>
                  Aceitar
                </Button>

                <template v-else-if="s.status === 'ANDAMENTO' && s.prestadorNome === session?.nome">
                  <Button @click="concluir(s.protocolo)" variant="primary">
                    Concluir
                  </Button>
                  <Button @click="desistir(s.protocolo)" variant="outline">
                    Desistir
                  </Button>
                </template>

                <span v-else-if="s.status === 'CONCLUIDA'"
                  class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Serviço Finalizado
                </span>

                <span v-else class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Em atendimento
                </span>
              </div>
            </template>
          </CardSolicitacao>
        </div>

        <div v-else class="py-16 px-6 rounded-xl bg-white border border-slate-200 text-center space-y-2">
          <h3 class="text-lg font-bold text-slate-800">Nenhum chamado pendente</h3>
          <p class="text-slate-500 text-sm">Bom trabalho! Todas as solicitações da sua área foram atendidas.</p>
        </div>
      </div>
    </div>
  </div>
</template>
