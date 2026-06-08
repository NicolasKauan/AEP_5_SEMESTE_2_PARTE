import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import type { TipoUsuario } from '@/types'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: () => (useAuth().isAuthenticated.value ? useAuth().homeRoute() : '/login'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { public: true },
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: () => import('@/views/CadastroView.vue'),
      meta: { public: true },
    },
    {
      path: '/morador/registrar',
      name: 'morador-registrar',
      component: () => import('@/views/morador/RegistrarChamadoView.vue'),
      meta: { roles: ['MORADOR', 'ECOLOGISTA'] as TipoUsuario[] },
    },
    {
      path: '/morador/buscar',
      name: 'morador-buscar',
      component: () => import('@/views/morador/BuscarProtocoloView.vue'),
      meta: { roles: ['MORADOR', 'ECOLOGISTA'] as TipoUsuario[] },
    },
    {
      path: '/ecologista/painel',
      name: 'ecologista-painel',
      component: () => import('@/views/ecologista/PainelEcologistaView.vue'),
      meta: { roles: ['ECOLOGISTA'] as TipoUsuario[] },
    },
    {
      path: '/prestador/painel',
      name: 'prestador-painel',
      component: () => import('@/views/prestador/PainelPrestadorView.vue'),
      meta: { roles: ['PRESTADOR'] as TipoUsuario[] },
    },
  ],
})

router.beforeEach((to) => {
  const { isAuthenticated, tipo, homeRoute } = useAuth()

  if (to.meta.public) {
    if (isAuthenticated.value && (to.name === 'login' || to.name === 'cadastro')) {
      return homeRoute()
    }
    return true
  }

  if (!isAuthenticated.value) {
    return '/login'
  }

  const roles = to.meta.roles as TipoUsuario[] | undefined
  if (roles && tipo.value && !roles.includes(tipo.value)) {
    return homeRoute()
  }

  return true
})

export default router
