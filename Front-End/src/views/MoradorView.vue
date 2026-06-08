<template>
  <div class="morador-container">
    <header class="header">
      <div class="header-content">
        <div class="header-brand">
          <svg class="icon-home" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
          </svg>
          <h1>MORADOR</h1>
        </div>
        <button class="menu-btn">☰</button>
      </div>
    </header>

    <main class="main-content">
      <div class="content-grid">
        <section class="left-panel">
          <button class="btn-report">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
            </svg>
            REPORTAR PROBLEMA
          </button>

          <div class="report-form">
            <h3>Tipo de Problema</h3>
            <div class="radio-group">
              <label class="radio-item">
                <input type="radio" name="problem" value="acumulado" checked />
                <span>LIXO ACUMULADO</span>
              </label>
              <label class="radio-item">
                <input type="radio" name="problem" value="coleta-atrasada" />
                <span>COLETA ATRASADA</span>
              </label>
              <label class="radio-item">
                <input type="radio" name="problem" value="descarte" />
                <span>DESCARTE IRREGULAR</span>
              </label>
            </div>

            <h3 style="margin-top: 20px">DESCRIÇÃO</h3>
            <textarea class="description-field" placeholder="Descreva o problema..."></textarea>

            <div class="media-section">
              <div class="media-input">
                <svg class="media-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54h2.63l2.96-3.83c.3-.38.94-.42 1.3-.09l2.15 1.97v-4.78h-7.29l2.3 2.96z"></path>
                </svg>
                <span>FOTO</span>
              </div>
              <div class="media-input">
                <svg class="media-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                </svg>
                <span>LOCALIZAÇÃO</span>
              </div>
            </div>
          </div>
        </section>

        <section class="right-panel">
          <h2>MINHAS SOLICITAÇÕES</h2>
          <div class="requests-list">
            <div class="request-card pending">
              <div class="request-header">
                <p class="request-title">LIXO ACUMULADO</p>
                <span class="request-status pending">PENDENTE</span>
              </div>
              <p class="request-location">RUA DAS FLORES, 123</p>
            </div>

            <div class="request-card in-progress">
              <div class="request-header">
                <p class="request-title">COLETA ATRASADA</p>
                <span class="request-status in-progress">EM ANDAMENTO</span>
              </div>
              <p class="request-location">AV. BRASIL, 456</p>
            </div>

            <div class="request-card resolved">
              <div class="request-header">
                <p class="request-title">DESCARTE IRREGULAR</p>
                <span class="request-status resolved">RESOLVIDO</span>
              </div>
              <p class="request-location">RUA DAS ÁRVORES, 78</p>
            </div>
          </div>
        </section>
      </div>

      <button class="btn-submit">ENVIAR DENÚNCIA</button>

      <div class="info-box">
        <h3>Tela do Morador</h3>
        <p>Esta tela permite que o morador reporte problemas relacionados à coleta de lixo de forma fácil. Por meio dela, o usuário pode registrar denúncias de lixo acumulado, coleta atrasada ou descarte irregular, informando uma descrição, foto e localização do problema. Além disso, a tela permite acompanhar o status das solicitações enviadas, facilitando a comunicação entre os prestadores de serviço e o morador.</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.morador-container {
  width: 100%;
  min-height: 100vh;
  background-color: #f8fafc;
  font-family: 'Inter', system-ui, sans-serif;
  color: #0f172a;
}

.header {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.header-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon-home {
  width: 28px;
  height: 28px;
  color: #10b981;
}

.header-brand h1 {
  font-size: 22px;
  font-weight: 700;
  color: #0f172a;
}

.menu-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #0f172a;
}

.main-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 40px;
}

.left-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.btn-report {
  padding: 14px 20px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
}

.btn-report:hover {
  background: #059669;
  transform: translateY(-2px);
}

.btn-icon {
  width: 20px;
  height: 20px;
}

.report-form {
  background: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.report-form h3 {
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 12px;
  text-transform: uppercase;
  color: #0f172a;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.radio-item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  color: #0f172a;
}

.radio-item input[type="radio"] {
  cursor: pointer;
}

.description-field {
  width: 100%;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 13px;
  font-family: inherit;
  min-height: 100px;
  resize: vertical;
}

.media-section {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.media-input {
  flex: 1;
  padding: 12px;
  border: 2px dashed #e2e8f0;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.media-input:hover {
  border-color: #10b981;
  background: #f0fdf4;
}

.media-icon {
  width: 24px;
  height: 24px;
  color: #10b981;
}

.media-input span {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
}

.right-panel h2 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
}

.requests-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.request-card {
  background: white;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s;
}

.request-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.request-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.request-title {
  font-size: 13px;
  font-weight: 700;
  color: #0f172a;
}

.request-status {
  display: inline-block;
  padding: 4px 8px;
  font-size: 11px;
  font-weight: 600;
  border-radius: 4px;
  text-transform: uppercase;
}

.request-status.pending {
  background: #fef3c7;
  color: #f59e0b;
}

.request-status.in-progress {
  background: #dbeafe;
  color: #0284c7;
}

.request-status.resolved {
  background: #dcfce7;
  color: #16a34a;
}

.request-location {
  font-size: 12px;
  color: #64748b;
}

.btn-submit {
  width: 100%;
  padding: 16px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 40px;
}

.btn-submit:hover {
  background: #059669;
  transform: translateY(-2px);
}

.info-box {
  background: #fcd34d;
  padding: 24px;
  border-radius: 8px;
  border-left: 4px solid #f59e0b;
}

.info-box h3 {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #0f172a;
}

.info-box p {
  font-size: 14px;
  line-height: 1.6;
  color: #0f172a;
}

@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}
</style>
