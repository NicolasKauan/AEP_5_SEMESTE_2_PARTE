<template>
  <div class="home-container">
    <header class="header">
      <div class="header-content">
        <h2 class="logo">EcoColeta</h2>
        <nav class="nav-menu">
          <button class="menu-toggle">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </nav>
      </div>
    </header>

    <section class="hero">
      <div class="hero-inner">
        <div class="hero-content">
          <span class="badge">Plataforma de Zeladoria Urbana</span>
          <h1>
            Juntos por uma cidade<br>
            <span class="highlight">mais limpa e sustentável</span>
          </h1>
          <p>
            Conectamos prestadores de serviço, moradores e ecologistas de forma inteligente para construir um futuro
            melhor.
          </p>
          <div class="hero-actions">
            <RouterLink to="/login" class="btn-primary">Começar Agora</RouterLink>
          </div>
        </div>
        <div class="hero-image-container">
          <div class="image-backdrop"></div>
          <img src="/Assets/images/Banner.png" alt="Pessoas cuidando do meio ambiente" class="hero-img">
        </div>
      </div>
    </section>

    <main class="main-content">
      <section class="profiles-section">
        <div class="profile-card">
          <div class="icon-circle prestador-icon"></div>
          <div class="card-text">
            <h3>Sou PRESTADOR</h3>
            <p>Ofereça seus serviços de coleta e faça a diferença.</p>
          </div>
          <div class="card-action"></div>
        </div>

        <div class="profile-card">
          <div class="icon-circle morador-icon"></div>
          <div class="card-text">
            <h3>Sou MORADOR</h3>
            <p>Solicite coletas e ajude a manter sua região limpa.</p>
          </div>
          <div class="card-action"></div>
        </div>

        <div class="profile-card">
          <div class="icon-circle ecologista-icon"></div>
          <div class="card-text">
            <h3>Sou ECOLOGISTA</h3>
            <p>Monitore os impactos e promova mudanças ativas.</p>
          </div>
          <div class="card-action"></div>
        </div>
      </section>

      <section class="impact-wrapper">
        <div class="impact-section">
          <div class="illustrative-area">
            <div class="illustration-placeholder">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Impacto em tempo real</span>
            </div>
          </div>

          <div class="impact-stats">
            <div class="stats-header">
              <h2>Nosso Impacto Mensal</h2>
              <p>Resultados alcançados pela nossa comunidade</p>
            </div>

            <div class="stats-grid">
              <div class="stat-item">
                <span class="stat-value">1.250<span class="unit">ton</span></span>
                <span class="stat-label">Lixo Coletado</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">320</span>
                <span class="stat-label">Denúncias Resolvidas</span>
              </div>
              <div class="stat-item highlight-stat">
                <span class="stat-value">85<span class="unit">%</span></span>
                <span class="stat-label">Taxa de Resolução</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="cta-section">
        <h2>Faça parte da mudança</h2>
        <p>Junte-se a milhares de pessoas transformando a cidade.</p>
        <RouterLink to="/login" class="btn-large">Criar Minha Conta</RouterLink>
      </section>
    </main>
  </div>
</template>

<style scoped src="./HomeStyle.css"></style>
