import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import Cadastro from '../components/Validacoes/Cadastro.vue';
import Login from '../components/Validacoes/Login.vue'; // Importa o componente Login

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/cadastro', // Rota para Cadastro
      name: 'cadastro',
      component: Cadastro
    },
    {
      path: '/login', // Rota para Login
      name: 'login',
      component: Login
    }
  ]
});

export default router;
