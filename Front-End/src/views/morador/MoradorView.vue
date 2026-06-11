<script setup lang="ts">
import { ref } from 'vue'
import BuscarProtocoloView from './BuscarProtocoloView.vue'
import RegistrarChamadoView from './RegistrarChamadoView.vue'

const activeTab = ref<'buscar' | 'registrar'>('registrar')
</script>

<template>
  <div class="min-h-screen bg-slate-50 py-12">
    <div class="container mx-auto px-4 max-w-4xl">
      <header class="mb-12 text-center">
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-4">Painel do Morador</h1>
        <p class="text-slate-500 max-w-lg mx-auto">Gerencie suas solicitações de zeladoria, abra novos chamados ou acompanhe protocolos existentes.</p>
      </header>

      <!-- Segmented Control -->
      <div class="bg-slate-200/50 p-1.5 rounded-[2rem] flex items-center mb-10 max-w-md mx-auto">
        <button 
          @click="activeTab = 'registrar'"
          :class="[
            'flex-1 py-3 px-6 rounded-[1.75rem] text-sm font-bold transition-all duration-300',
            activeTab === 'registrar' ? 'bg-white text-emerald-700 shadow-xl shadow-emerald-600/5' : 'text-slate-500 hover:text-slate-700'
          ]"
        >
          Registrar Chamado
        </button>
        <button
          @click="activeTab = 'buscar'"
          :class="[
            'flex-1 py-3 px-6 rounded-[1.75rem] text-sm font-bold transition-all duration-300',
            activeTab === 'buscar' ? 'bg-white text-emerald-700 shadow-xl shadow-emerald-600/5' : 'text-slate-500 hover:text-slate-700'
          ]"
        >
          Buscar Protocolo
        </button>
      </div>

      <div class="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <BuscarProtocoloView v-if="activeTab === 'buscar'" />
        <RegistrarChamadoView v-else />
      </div>
    </div>
  </div>
</template>
