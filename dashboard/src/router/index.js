import { createRouter, createWebHistory } from 'vue-router'

// seria como utilizar o () => import('componente')
const Home = () => import('../views/Home/index.vue')
const Feedbacks = () => import('../views/Feedbacks/index.vue')
const Credencials = () => import('../views/Credencials/index.vue')

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/feedbacks',
    name: 'Feedbacks',
    component: Feedbacks,
    // é um metadado que vai ter quando acessar a rota, pode ser qualquer atributo
    meta: {
      hasAuth: true
    }
  },
  {
    path: '/credencials',
    name: 'Credenciais',
    component: Credencials,
    meta: {
      hasAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*', // o vue router redireciona o usuário qnd a rota não existir para a home.
    redirect: { name: 'Home' }
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router
