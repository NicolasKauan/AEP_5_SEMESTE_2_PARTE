import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import CadastroView from '../views/CadastroView.vue'
import MoradorView from '../views/morador/MoradorView.vue'
import EcologistaPanel from '../views/ecologista/EcologistaPanel.vue'
import PrestadorPanel from '../views/prestador/PrestadorPanel.vue'
import AnonymousChoice from '../views/AnonymousChoice.vue'
import { api } from '../services/api'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/denunciar-anonimo',
      name: 'anonimo',
      component: AnonymousChoice,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: CadastroView,
    },
    {
      path: '/morador',
      alias: '/morador/registrar',
      name: 'morador',
      component: MoradorView,
    },
    {
      path: '/ecologista/painel',
      name: 'ecologista',
      component: EcologistaPanel,
    },
    {
      path: '/prestador/painel',
      name: 'prestador',
      component: PrestadorPanel,
    },
  ],
})

// Rotas públicas que não exigem sessão
const PUBLIC_PATHS = ['/', '/login', '/cadastro', '/denunciar-anonimo']

router.beforeEach((to) => {
  const session = api.getSession()

  // Normaliza path sem query params
  const path = to.path || ''

  // Se é rota pública, permite
  if (PUBLIC_PATHS.includes(path)) return true

  // Rotas protegidas: /ecologista/painel, /prestador/painel, /morador
  if ((path.startsWith('/ecologista') || path.startsWith('/prestador') || path.startsWith('/morador')) && !session) {
    return { path: '/login' }
  }

  return true
})

export default router
