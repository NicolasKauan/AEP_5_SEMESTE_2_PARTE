<template>
  <div class="ecologista-container">
    <header class="header">
      <div class="header-content">
        <div class="header-brand">
          <svg class="icon-leaf" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.92 7.02C17.45 4.18 14.97 2 12 2c-2.97 0-5.45 2.18-5.92 5.02C4.97 7.55 3 9.72 3 12c0 3.31 2.69 6 6 6h9c3.31 0 6-2.69 6-6 0-2.28-1.97-4.45-4.08-4.98z"></path>
          </svg>
          <h1>ECOLOGISTA</h1>
        </div>
        <button class="menu-btn">☰</button>
      </div>
    </header>

    <main class="main-content">
      <div class="content-top">
        <section class="summary-section">
          <h2>RESUMO AMBIENTAL</h2>
          <div class="summary-cards">
            <div class="summary-card">
              <svg class="card-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 9h18v10c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V9z"></path>
              </svg>
              <div class="card-content">
                <span class="card-value">1.250 ton</span>
                <span class="card-label">Lixo Coletado</span>
              </div>
            </div>

            <div class="summary-card">
              <svg class="card-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
              </svg>
              <div class="card-content">
                <span class="card-value">320</span>
                <span class="card-label">Denúncias Resolvidas</span>
              </div>
            </div>

            <div class="summary-card">
              <svg class="card-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 17H7v-7h2V17zm4 0h-2V7h2V17zm4 0h-2v-4h2V17z"></path>
              </svg>
              <div class="card-content">
                <span class="card-value">18</span>
                <span class="card-label">Áreas Críticas</span>
              </div>
            </div>
          </div>
        </section>

        <section class="chart-section">
          <h2>GRÁFICO DE COLETA (TONELADAS)</h2>
          <div class="chart-container">
            <svg viewBox="0 0 500 250" class="chart">
              <line x1="50" y1="200" x2="450" y2="200" stroke="#e2e8f0" stroke-width="2"></line>
              <line x1="50" y1="200" x2="50" y2="50" stroke="#e2e8f0" stroke-width="2"></line>

              <polyline points="50,180 100,150 150,140 200,160 250,120 300,130 350,100 400,140 450,110" fill="none" stroke="#10b981" stroke-width="3" stroke-linejoin="round"></polyline>

              <circle cx="50" cy="180" r="4" fill="#10b981"></circle>
              <circle cx="100" cy="150" r="4" fill="#10b981"></circle>
              <circle cx="150" cy="140" r="4" fill="#10b981"></circle>
              <circle cx="200" cy="160" r="4" fill="#10b981"></circle>
              <circle cx="250" cy="120" r="4" fill="#10b981"></circle>
              <circle cx="300" cy="130" r="4" fill="#10b981"></circle>
              <circle cx="350" cy="100" r="4" fill="#10b981"></circle>
              <circle cx="400" cy="140" r="4" fill="#10b981"></circle>
              <circle cx="450" cy="110" r="4" fill="#10b981"></circle>

              <text x="50" y="225" text-anchor="middle" font-size="12" fill="#64748b">JAN</text>
              <text x="100" y="225" text-anchor="middle" font-size="12" fill="#64748b">FEV</text>
              <text x="150" y="225" text-anchor="middle" font-size="12" fill="#64748b">MAR</text>
              <text x="200" y="225" text-anchor="middle" font-size="12" fill="#64748b">ABR</text>
              <text x="250" y="225" text-anchor="middle" font-size="12" fill="#64748b">MAI</text>
              <text x="300" y="225" text-anchor="middle" font-size="12" fill="#64748b">JUN</text>
              <text x="350" y="225" text-anchor="middle" font-size="12" fill="#64748b">JUL</text>
              <text x="400" y="225" text-anchor="middle" font-size="12" fill="#64748b">AGO</text>
              <text x="450" y="225" text-anchor="middle" font-size="12" fill="#64748b">SET</text>
            </svg>
          </div>
        </section>
      </div>

      <div class="content-bottom">
        <section class="map-section">
          <h2>MAPA DE CALOR</h2>
          <div class="heatmap-placeholder">
            <svg viewBox="0 0 400 250" class="heatmap">
              <defs>
                <linearGradient id="heatGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#e2e8f0;stop-opacity:1" />
                  <stop offset="50%" style="stop-color:#fcd34d;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#f59e0b;stop-opacity:1" />
                </linearGradient>
              </defs>
              <rect width="400" height="250" fill="url(#heatGradient)"></rect>
              <circle cx="100" cy="80" r="40" fill="#f59e0b" opacity="0.6"></circle>
              <circle cx="280" cy="150" r="30" fill="#fcd34d" opacity="0.5"></circle>
              <circle cx="350" cy="100" r="25" fill="#e2e8f0" opacity="0.4"></circle>
            </svg>
          </div>
        </section>

        <section class="filters-section">
          <h3>FILTROS</h3>
          <div class="filters-grid">
            <div class="filter-group">
              <label>TIPO DE RESÍDUO</label>
              <select class="filter-select">
                <option>Todos</option>
                <option>Papel</option>
                <option>Plástico</option>
                <option>Metal</option>
              </select>
            </div>
            <div class="filter-group">
              <label>REGIÃO</label>
              <select class="filter-select">
                <option>Todos</option>
                <option>Centro</option>
                <option>Zona Norte</option>
                <option>Zona Sul</option>
              </select>
            </div>
          </div>
        </section>

        <section class="suggestions-section">
          <h3>SUGESTÕES DE MELHORIA</h3>
          <textarea class="suggestions-field" placeholder="Escreva sua sugestão..."></textarea>
        </section>

        <button class="btn-submit">ENVIAR</button>
      </div>

      <div class="reports-section">
        <h2>RELATÓRIOS AMBIENTAIS</h2>
        <div class="reports-list">
          <div class="report-item">
            <svg class="icon-file" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"></path>
            </svg>
            <span class="report-name">Relatório - Maio/2026</span>
            <a href="#" class="report-link">⬇</a>
          </div>
          <div class="report-item">
            <svg class="icon-file" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"></path>
            </svg>
            <span class="report-name">Relatório - Abril/2024</span>
            <a href="#" class="report-link">⬇</a>
          </div>
        </div>
      </div>

      <div class="info-box">
        <h3>Tela do Ecologista</h3>
        <p>Esta tela tem como objetivo o monitoramento das áreas de coleta e de foco de lixo. Ele é utilizada pelos ecologistas, que por meio do poderação acompanham estatísticas de coleta, identificam regiões críticas através do mapa de cor e analisam relatórios ambientais. Além disso, a tela permite o envio de sugestões de melhoria para auxiliar na preservação do meio ambiente e na otimização dos serviços de coleta urbana.</p>
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

.ecologista-container {
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

.icon-leaf {
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

.content-top {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 40px;
}

.summary-section h2,
.chart-section h2,
.map-section h2,
.reports-section h2 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #0f172a;
}

.summary-cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.summary-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.card-icon {
  width: 28px;
  height: 28px;
  color: #10b981;
  flex-shrink: 0;
}

.card-content {
  display: flex;
  flex-direction: column;
}

.card-value {
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
}

.card-label {
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
}

.chart-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.chart {
  width: 100%;
  height: 250px;
}

.content-bottom {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 30px;
  margin-bottom: 40px;
}

.heatmap-placeholder {
  background: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.heatmap {
  width: 100%;
  height: auto;
}

.filters-section h3,
.suggestions-section h3 {
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 12px;
  text-transform: uppercase;
  color: #0f172a;
}

.filters-section {
  background: white;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.filters-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.filter-group label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  color: #64748b;
}

.filter-select {
  padding: 8px 10px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 13px;
  background: white;
  cursor: pointer;
}

.suggestions-section {
  background: white;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.suggestions-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 13px;
  font-family: inherit;
  min-height: 80px;
  resize: vertical;
}

.btn-submit {
  width: 100%;
  padding: 14px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-submit:hover {
  background: #059669;
  transform: translateY(-2px);
}

.reports-section {
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  margin-bottom: 40px;
}

.reports-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.report-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
}

.icon-file {
  width: 20px;
  height: 20px;
  color: #10b981;
}

.report-name {
  flex: 1;
  font-size: 13px;
  font-weight: 600;
  color: #0f172a;
}

.report-link {
  color: #10b981;
  text-decoration: none;
  font-weight: 700;
  cursor: pointer;
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
  .content-top {
    grid-template-columns: 1fr;
  }

  .content-bottom {
    grid-template-columns: 1fr;
  }
}
</style>
