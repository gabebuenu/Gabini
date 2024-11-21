import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Cadastro from '../components/Validacoes/Cadastro.vue';
import Login from '../components/Validacoes/Login.vue';
import Editar from '@/components/Validacoes/EditarPerfil.vue';
import ProductView from '../views/ProductView.vue'; 
import ProductsView from '../views/ProductsView.vue'; 
import DashboardView from '../views/DashboardView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: Cadastro,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/editar-perfil',
      name: 'editar',
      component: Editar,
    },
    {
      path: '/product/:id',
      name: 'product',
      component: ProductView,
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true }, // Define que esta rota requer autenticação
    },
  ],
});

// Guard de Rota
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;
  const token = localStorage.getItem('authToken');
  const userId = localStorage.getItem('userId');

  if (requiresAuth) {
    if (token && userId) {
      // Verifica se o usuário tem permissão para acessar o Dashboard
      const allowedUsers = ['2', '3'];
      if (allowedUsers.includes(userId)) {
        next(); // Permite o acesso
      } else {
        next('/'); // Redireciona para a home
      }
    } else {
      next('/login'); // Redireciona para login se não autenticado
    }
  } else {
    next(); // Continua para as rotas públicas
  }
});

export default router;
