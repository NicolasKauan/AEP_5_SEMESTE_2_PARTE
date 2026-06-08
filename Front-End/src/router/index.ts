import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import PrestadorView from '../views/PrestadorView.vue'
import MoradorView from '../views/MoradorView.vue'
import EcologistaView from '../views/EcologistaView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/prestador',
      name: 'prestador',
      component: PrestadorView,
    },
    {
      path: '/morador',
      name: 'morador',
      component: MoradorView,
    },
    {
      path: '/ecologista',
      name: 'ecologista',
      component: EcologistaView,
    },
  ],
})

export default router
