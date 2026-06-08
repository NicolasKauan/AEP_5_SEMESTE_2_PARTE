<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { isAuthenticated, nome, tipo, logout } = useAuth()

const tipoLabel = computed(() => {
  if (tipo.value === 'ECOLOGISTA') return 'Ecologista'
  if (tipo.value === 'PRESTADOR') return 'Prestador'
  return 'Morador'
})

function sair() {
  logout()
  router.push('/login')
}
</script>

<template>
  <div class="app">
    <header v-if="isAuthenticated" class="topbar">
      <div>
        <strong>🏛️ Zeladoria</strong>
        <span class="user">{{ nome }} — {{ tipoLabel }}</span>
      </div>
      <nav>
        <template v-if="tipo === 'MORADOR' || tipo === 'ECOLOGISTA'">
          <RouterLink to="/morador/registrar">Registrar</RouterLink>
          <RouterLink to="/morador/buscar">Buscar Protocolo</RouterLink>
        </template>
        <RouterLink v-if="tipo === 'ECOLOGISTA'" to="/ecologista/painel">Painel Ecologista</RouterLink>
        <RouterLink v-if="tipo === 'PRESTADOR'" to="/prestador/painel">Painel Prestador</RouterLink>
        <button class="link-btn" @click="sair">Sair</button>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style>
:root {
  font-family: 'Segoe UI', system-ui, sans-serif;
  color: #1f2937;
  background: #f3f4f6;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

.app {
  min-height: 100vh;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: #166534;
  color: white;
}

.topbar .user {
  margin-left: 0.75rem;
  opacity: 0.9;
  font-size: 0.9rem;
}

.topbar nav {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.topbar a {
  color: white;
  text-decoration: none;
  font-weight: 500;
}

.topbar a.router-link-active {
  text-decoration: underline;
}

.link-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.6);
  color: white;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
}

main {
  padding: 2rem 1rem;
  display: flex;
  justify-content: center;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.card.wide {
  max-width: 960px;
}

h1 {
  margin: 0 0 0.25rem;
}

.subtitle {
  color: #6b7280;
  margin-top: 0;
  margin-bottom: 1.5rem;
}

form,
fieldset {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

fieldset {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
}

legend {
  font-weight: 600;
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-weight: 500;
}

label.checkbox {
  flex-direction: row;
  align-items: center;
}

input,
select,
textarea,
button {
  font: inherit;
}

input,
select,
textarea {
  padding: 0.65rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
}

button {
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  background: #166534;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

button.secondary {
  background: #e5e7eb;
  color: #111827;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.erro {
  color: #b91c1c;
  margin: 0;
}

.sucesso,
.detalhe,
.info {
  padding: 1rem;
  border-radius: 8px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
}

.link {
  margin-top: 1rem;
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th,
td {
  border-bottom: 1px solid #e5e7eb;
  padding: 0.75rem;
  text-align: left;
  font-size: 0.95rem;
}

.lista-chamados {
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
}

.chamado-item {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 1rem;
}

.chamado-item header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.badge {
  background: #dbeafe;
  color: #1d4ed8;
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
  font-size: 0.85rem;
}

.acoes {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.75rem;
}
</style>
