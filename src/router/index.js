import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Cadastro from '../components/Validacoes/Cadastro.vue';
import Login from '../components/Validacoes/Login.vue';
import Editar from '@/components/Validacoes/EditarPerfil.vue';
import ProductView from '../views/ProductView.vue'; // Página de detalhes do produto
import ProductsView from '../views/ProductsView.vue'; // Página de listagem de produtos
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
      path: '/product/:id', // Rota dinâmica para detalhes do produto
      name: 'product',
      component: ProductView,
    },
    {
      path: '/products', // Página de listagem de produtos
      name: 'products',
      component: ProductsView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
  ],
});

export default router;
