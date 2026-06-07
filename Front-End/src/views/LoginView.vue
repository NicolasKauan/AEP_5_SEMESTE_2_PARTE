<template>
  <div class="auth-wrapper">
    <div class="auth-container">

      <!-- Lado Esquerdo: LOGIN -->
      <section class="auth-section">
        <h2>LOGIN</h2>

        <div class="form-group">
          <label>E-MAIL</label>
          <input type="email" />
        </div>

        <div class="form-group">
          <label>SENHA</label>
          <input type="password" />
        </div>

        <a href="#" class="forgot-link">Esqueceu a senha?</a>
        <button class="btn-filled">ENTRAR</button>

        <div class="divider"><span>V</span></div>

        <p class="no-account">Não tem conta?</p>
        <button class="btn-outlined">CADASTRE-SE</button>
      </section>

      <div class="vertical-line"></div>

      <!-- Lado Direito: CADASTRO -->
      <section class="auth-section">
        <h2>CADASTRO</h2>

        <p class="profile-label">SELECIONE SEU PERFIL</p>
        <div class="profile-buttons">
          <button class="btn-profile active">PRESTADOR DE SERVIÇO</button>
          <button class="btn-profile">MORADOR</button>
          <button class="btn-profile">ECOLOGISTA</button>
        </div>

        <div class="form-group">
          <label>NOME COMPLETO</label>
          <input type="text" />
        </div>

        <div class="form-group">
          <label>TELEFONE</label>
          <input type="text" />
        </div>

        <div class="form-group">
          <label>LOCALIZAÇÃO</label>
          <input type="text" />
        </div>

        <button class="btn-filled mt-auto">CRIAR CONTA</button>
      </section>

    </div>
  </div>
</template>

<style scoped>
.auth-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.auth-container {
  display: flex;
  width: 100%;
  max-width: 900px;
  background: white;
  border: 1px solid #333;
}

.auth-section {
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
}

.vertical-line {
  width: 1px;
  background-color: #333;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.form-group label {
  font-size: 12px;
  margin-bottom: 5px;
}

.form-group input {
  padding: 10px;
  border: 1px solid #333;
}

.forgot-link {
  font-size: 12px;
  color: #666;
  text-decoration: none;
  margin-bottom: 20px;
  text-align: right;
}

.no-account {
  text-align: center;
  margin-bottom: 10px;
  font-size: 14px;
}

.btn-filled {
  padding: 12px;
  background-color: #e0e0e0;
  border: 1px solid #333;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
}

.btn-outlined {
  padding: 12px;
  background-color: transparent;
  border: 1px solid #333;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 30px 0;
  color: #333;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #333;
}

.divider span {
  padding: 0 10px;
}

.profile-label {
  font-size: 14px;
  margin-bottom: 10px;
}

.profile-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.btn-profile {
  padding: 10px;
  border: 1px solid #ccc;
  background: #f9f9f9;
  text-align: left;
  cursor: pointer;
}

.btn-profile.active {
  background: #666;
  color: white;
  border-color: #666;
}

.mt-auto {
  margin-top: auto;
}
</style>
