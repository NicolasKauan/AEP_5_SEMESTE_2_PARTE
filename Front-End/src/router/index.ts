import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import MoradorView from '../views/morador/MoradorView.vue'
import EcologistaPanel from '../views/ecologista/EcologistaPanel.vue'
import PrestadorPanel from '../views/prestador/PrestadorPanel.vue'
import AnonymousChoice from '../views/AnonymousChoice.vue'

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
      path: '/morador',
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

export default router
