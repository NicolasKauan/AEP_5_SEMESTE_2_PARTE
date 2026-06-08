<template>
  <div class="prestador-container">
    <header class="header">
      <div class="header-content">
        <div class="header-brand">
          <svg class="icon-truck" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 18.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0M9 18.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0"></path>
            <path d="M20 8H4a2 2 0 00-2 2v8a2 2 0 002 2h16a2 2 0 002-2v-8a2 2 0 00-2-2z"></path>
          </svg>
          <h1>PRESTADOR</h1>
        </div>
        <button class="menu-btn">☰</button>
      </div>
    </header>

    <main class="main-content">
      <div class="content-grid">
        <section class="left-panel">
          <h2>CHAMADOS PRÓXIMOS</h2>
          <div class="filters">
            <select class="filter-select">
              <option>URGÊNCIA</option>
              <option>URGENTE</option>
              <option>MÉDIA</option>
              <option>BAIXA</option>
            </select>
            <select class="filter-select">
              <option>TIPO DE LIXO</option>
              <option>PAPEL</option>
              <option>PLÁSTICO</option>
              <option>METAL</option>
            </select>
          </div>

          <div class="calls-list">
            <div class="call-item urgent">
              <svg class="icon-location" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
              </svg>
              <div class="call-details">
                <p class="call-address">LIXO ACUMULADO</p>
                <p class="call-location">RUA DAS FLORES, 123</p>
                <span class="urgency-badge urgent">URGENTE</span>
              </div>
              <button class="btn-accept">ACEITAR</button>
            </div>

            <div class="call-item">
              <svg class="icon-location" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
              </svg>
              <div class="call-details">
                <p class="call-address">COLETA ATRASADA</p>
                <p class="call-location">AV. BRASIL, 456</p>
                <span class="urgency-badge">MÉDIA</span>
              </div>
              <button class="btn-accept">ACEITAR</button>
            </div>

            <div class="call-item">
              <svg class="icon-location" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
              </svg>
              <div class="call-details">
                <p class="call-address">DESCARTE IRREGULAR</p>
                <p class="call-location">RUA DAS ÁRVORES, 78</p>
                <span class="urgency-badge">BAIXA</span>
              </div>
              <button class="btn-accept">ACEITAR</button>
            </div>
          </div>
        </section>

        <section class="right-panel">
          <h2>MAPA / ROTA OTIMIZADA</h2>
          <div class="map-placeholder">
            <svg viewBox="0 0 400 300" class="map-svg">
              <path d="M50,250 Q100,200 150,180 Q200,160 250,190 Q300,220 350,200" stroke="#10b981" fill="none" stroke-width="4"></path>
              <circle cx="100" cy="200" r="8" fill="#10b981"></circle>
              <circle cx="200" cy="160" r="8" fill="#10b981"></circle>
              <circle cx="300" cy="220" r="8" fill="#059669"></circle>
            </svg>
          </div>

          <div class="productivity">
            <h3>PRODUTIVIDADE</h3>
            <div class="stats-row">
              <div class="stat-box">
                <span class="stat-number">12</span>
                <span class="stat-label">CONCLUÍDOS HOJE</span>
              </div>
              <div class="stat-box">
                <span class="stat-number">3</span>
                <span class="stat-label">EM ANDAMENTO</span>
              </div>
              <div class="stat-box">
                <span class="stat-number">85 km</span>
                <span class="stat-label">TOTAL KM</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div class="info-box">
        <h3>Tela do Prestador</h3>
        <p>Esta tela ajuda o prestador de serviço a visualizar chamados próximos e a rota otimizada para suas coletas do dia. Tem como objetivo facilitar o planejamento da rota e aumentar a produtividade do prestador de forma prática.</p>
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

.prestador-container {
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

.icon-truck {
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
  grid-template-columns: 1fr 1.5fr;
  gap: 30px;
  margin-bottom: 40px;
}

.left-panel h2,
.right-panel h2 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #0f172a;
}

.filters {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.filter-select {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  background: white;
  cursor: pointer;
  transition: border-color 0.2s;
}

.filter-select:hover {
  border-color: #10b981;
}

.calls-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.call-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  transition: all 0.2s;
}

.call-item:hover {
  border-color: #10b981;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.1);
}

.call-item.urgent {
  border-left: 4px solid #f59e0b;
}

.icon-location {
  width: 28px;
  height: 28px;
  color: #10b981;
  flex-shrink: 0;
}

.call-details {
  flex: 1;
}

.call-address {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 4px;
}

.call-location {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 8px;
}

.urgency-badge {
  display: inline-block;
  padding: 4px 8px;
  background: #f0fdf4;
  color: #10b981;
  font-size: 11px;
  font-weight: 600;
  border-radius: 4px;
}

.urgency-badge.urgent {
  background: #fef3c7;
  color: #f59e0b;
}

.btn-accept {
  padding: 8px 16px;
  background: white;
  border: 1px solid #10b981;
  color: #10b981;
  border-radius: 6px;
  font-weight: 600;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-accept:hover {
  background: #f0fdf4;
}

.map-placeholder {
  width: 100%;
  height: 300px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.map-svg {
  width: 100%;
  height: 100%;
}

.productivity {
  background: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.productivity h3 {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 16px;
}

.stats-row {
  display: flex;
  gap: 12px;
}

.stat-box {
  flex: 1;
  padding: 12px;
  background: #f8fafc;
  border-radius: 6px;
  text-align: center;
  border: 1px solid #e2e8f0;
}

.stat-number {
  display: block;
  font-size: 20px;
  font-weight: 700;
  color: #10b981;
  margin-bottom: 4px;
}

.stat-label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
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
