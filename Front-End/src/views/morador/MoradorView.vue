<script setup lang="ts">
import { ref } from 'vue'
import BuscarProtocoloView from './BuscarProtocoloView.vue'
import RegistrarChamadoView from './RegistrarChamadoView.vue'
import './PainelMorador.css'

const activeTab = ref<'buscar' | 'registrar'>('registrar')
</script>

<template>
  <div class="painel-root">
    <div class="painel-container">

      <!-- Header -->
      <header class="painel-header">
        <div class="painel-icon-wrap">
          <svg class="painel-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
        <h1 class="painel-title">Painel do Morador</h1>
        <p class="painel-sub">
          Gerencie suas solicitações de zeladoria, abra novos chamados
          ou acompanhe protocolos existentes.
        </p>
      </header>

      <!-- Segmented Control -->
      <div class="tab-track">
        <button class="tab-btn" :class="{ 'tab-btn--active': activeTab === 'registrar' }"
          @click="activeTab = 'registrar'">
          <svg class="tab-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Registrar
        </button>
        <button class="tab-btn" :class="{ 'tab-btn--active': activeTab === 'buscar' }" @click="activeTab = 'buscar'">
          <svg class="tab-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          Buscar Protocolo
        </button>
      </div>

      <!-- Content -->
      <div class="painel-content">
        <BuscarProtocoloView v-if="activeTab === 'buscar'" />
        <RegistrarChamadoView v-else />
      </div>

    </div>
  </div>
</template>
