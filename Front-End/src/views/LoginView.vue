<template>
  <div class="auth-wrapper">
    <div class="auth-container">
      <section class="auth-section">
        <div class="section-header">
          <h2>LOGIN</h2>
        </div>

        <form @submit.prevent="handleLogin" class="form-content">
          <div class="form-group">
            <label>E-MAIL</label>
            <input v-model="loginEmail" type="email" placeholder="seu@email.com" required />
          </div>

          <div class="form-group">
            <label>SENHA</label>
            <input v-model="loginPassword" type="password" placeholder="••••••" required />
          </div>

          <a href="#" class="forgot-link">Esqueceu a senha?</a>
          <button type="submit" class="btn-primary">ENTRAR</button>
        </form>

        <div class="divider"></div>

        <p class="switch-text">Não tem conta?</p>
        <button @click="toggleForm" class="btn-secondary">CADASTRE-SE</button>
      </section>

      <div class="vertical-line"></div>

      <section class="auth-section">
        <div class="section-header">
          <h2>CADASTRO</h2>
        </div>

        <form @submit.prevent="handleRegister" class="form-content">
          <p class="profile-label">SELECIONE SEU PERFIL</p>
          <div class="profile-buttons">
            <button
              v-for="profile in profiles"
              :key="profile"
              type="button"
              :class="['btn-profile', { active: selectedProfile === profile }]"
              @click="selectedProfile = profile"
            >
              {{ profile }}
            </button>
          </div>

          <div class="form-group">
            <label>NOME COMPLETO</label>
            <input v-model="registerName" type="text" placeholder="Digite seu nome" required />
          </div>

          <div class="form-group">
            <label>TELEFONE</label>
            <input v-model="registerPhone" type="tel" placeholder="(00) 0000-0000" required />
          </div>

          <div class="form-group">
            <label>LOCALIZAÇÃO</label>
            <input v-model="registerLocation" type="text" placeholder="Sua cidade" required />
          </div>

          <button type="submit" class="btn-primary mt-auto">CRIAR CONTA</button>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loginEmail = ref('')
const loginPassword = ref('')
const registerName = ref('')
const registerPhone = ref('')
const registerLocation = ref('')
const selectedProfile = ref('PRESTADOR DE SERVIÇO')

const profiles = ['PRESTADOR DE SERVIÇO', 'MORADOR', 'ECOLOGISTA']

const handleLogin = () => {
  console.log('Login:', { email: loginEmail.value, password: loginPassword.value })
}

const handleRegister = () => {
  console.log('Register:', {
    name: registerName.value,
    phone: registerPhone.value,
    location: registerLocation.value,
    profile: selectedProfile.value
  })
}

const toggleForm = () => {
  console.log('Toggle form')
}
</script>

<style scoped>
:root {
  --cor-primaria: #10b981;
  --cor-primaria-hover: #059669;
  --cor-destaque: #fcd34d;
  --texto-principal: #0f172a;
  --texto-secundario: #64748b;
  --borda-suave: rgba(226, 232, 240, 0.7);
  --sombra-md: 0 15px 35px rgba(0, 0, 0, 0.08);
}

.auth-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f8fafc;
}

.auth-container {
  display: flex;
  width: 100%;
  max-width: 1000px;
  background: white;
  border-radius: 12px;
  box-shadow: var(--sombra-md);
  overflow: hidden;
}

.auth-section {
  flex: 1;
  padding: 50px 40px;
  display: flex;
  flex-direction: column;
}

.section-header {
  margin-bottom: 30px;
}

.section-header h2 {
  font-size: 28px;
  font-weight: 700;
  color: var(--texto-principal);
  text-align: center;
  margin: 0;
}

.form-content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.form-group label {
  font-size: 13px;
  font-weight: 600;
  color: var(--texto-principal);
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-group input {
  padding: 12px 14px;
  border: 1px solid var(--borda-suave);
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  background: #f8fafc;
}

.form-group input:focus {
  outline: none;
  border-color: var(--cor-primaria);
  background: white;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.forgot-link {
  font-size: 12px;
  color: var(--cor-primaria);
  text-decoration: none;
  margin-bottom: 20px;
  text-align: right;
  transition: color 0.2s;
}

.forgot-link:hover {
  color: var(--cor-primaria-hover);
}

.btn-primary {
  padding: 14px;
  background-color: var(--cor-primaria);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-primary:hover {
  background-color: var(--cor-primaria-hover);
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(16, 185, 129, 0.3);
}

.btn-secondary {
  padding: 14px;
  background-color: white;
  color: var(--cor-primaria);
  border: 2px solid var(--cor-primaria);
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-secondary:hover {
  background-color: #f0fdf4;
  transform: translateY(-2px);
}

.divider {
  height: 1px;
  background-color: var(--borda-suave);
  margin: 30px 0;
}

.switch-text {
  text-align: center;
  margin-bottom: 15px;
  font-size: 14px;
  color: var(--texto-secundario);
}

.profile-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--texto-principal);
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.profile-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 25px;
}

.btn-profile {
  padding: 12px 14px;
  border: 1px solid var(--borda-suave);
  background: #f8fafc;
  text-align: left;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  border-radius: 8px;
  color: var(--texto-principal);
  transition: all 0.2s;
}

.btn-profile:hover {
  border-color: var(--cor-primaria);
  background: #f0fdf4;
}

.btn-profile.active {
  background: var(--cor-primaria);
  color: white;
  border-color: var(--cor-primaria);
}

.vertical-line {
  width: 1px;
  background-color: var(--borda-suave);
}

.mt-auto {
  margin-top: auto;
}

@media (max-width: 768px) {
  .auth-container {
    flex-direction: column;
  }

  .vertical-line {
    width: 100%;
    height: 1px;
  }

  .auth-section {
    padding: 40px 30px;
  }
}
</style>
