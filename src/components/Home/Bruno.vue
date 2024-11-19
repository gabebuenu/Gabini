<template>
  <nav class="navbar navbar-expand-lg header">
    <div class="container-fluid">
      <a class="navbar-brand logo" href="#">GABINI</a>
      <button class="navbar-toggler" type="button" @click="toggleNavbar" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav mx-auto nav-list">
          <li class="nav-item"><Router-Link class="nav-link active" to="/">HOME</Router-Link></li>
          <Router-Link to="/products" class="nav-link">Produtos</Router-Link>
          <Router-Link to="/dashboard" class="nav-link">Dashboard</Router-Link>
          <li class="nav-item"><a class="nav-link" href="#">SALE</a></li>
          <li class="nav-item"><a class="nav-link" href="#">BUNDLE & SAVE</a></li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">SHOP BY CATEGORY</a>
            <ul class="dropdown-menu dropdown-content">
              <li class="dropdown-submenu">
                <a class="dropdown-item dropdown-toggle" href="#">Fones</a>
                <ul class="dropdown-menu sub-dropdown">
                  <li><a class="dropdown-item" href="#">Headphones</a></li>
                  <li><a class="dropdown-item" href="#">Earphones</a></li>
                </ul>
              </li>
              <li><a class="dropdown-item" href="#">Carregadores</a></li>
              <li><a class="dropdown-item" href="#">Acessórios</a></li>
              <li><a class="dropdown-item" href="#">Todos os Produtos</a></li>
            </ul>
          </li>
          <li class="nav-item"><a class="nav-link" href="#">SUPPORT</a></li>
          <li class="nav-item d-flex align-items-center auth-links">
            <div v-if="isAuthenticated" class="user-box" @mouseenter="showDropdown = true" @mouseleave="showDropdown = false">
              <div class="user-info">
                <img :src="userProfile.foto" alt="User Photo" class="user-photo">
                <span class="user-name">{{ userProfile.username }}</span>
              </div>
              <div v-if="showDropdown" class="user-dropdown">
                <Router-Link to="/editar-perfil"><button class="dropdown-item" @click="editProfile">Editar Perfil</button></Router-Link>
                <button class="dropdown-item" @click="logout">Sair</button>
              </div>
            </div>
            <div v-else class="auth-links">
              <RouterLink class="nav-link sign-in" to="/login">SIGN IN</RouterLink>
              <span class="separator">|</span>
              <RouterLink class="sign-up-text" to="/cadastro">SIGN UP FOR FREE</RouterLink>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { RouterLink } from 'vue-router';
import axios from 'axios';

export default {
  data() {
    return {
      isAuthenticated: false,
      showDropdown: false,
      userProfile: {
        username: '',
        foto: ''
      },
      isNavbarOpen: false,
    };
  },
  methods: {
    toggleNavbar() {
      this.isNavbarOpen = !this.isNavbarOpen;
      const navbarCollapse = document.getElementById("navbarNavDropdown");
      if (this.isNavbarOpen) {
        navbarCollapse.classList.add("show");
      } else {
        navbarCollapse.classList.remove("show");
      }
    },
    async fetchUserProfile() {
      const token = localStorage.getItem('authToken');
      const userId = localStorage.getItem('userId');

      if (token && userId) {
        try {
          const response = await axios.get(`https://localhost:7250/api/SignUp/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });

          this.userProfile = {
            username: response.data.username,
            foto: `data:image/png;base64,${response.data.foto}`
          };
          this.isAuthenticated = true;
        } catch (error) {
          this.isAuthenticated = false;
        }
      } else {
        console.error("Erro: `authToken` ou `userId` ausente no localStorage.");
      }
    },

    logout() {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
      this.isAuthenticated = false;
      this.$router.push('/login'); 
    },

    editProfile() {
      this.$router.push('/editar-perfil');
    }
  },

  mounted() {
    if (localStorage.getItem('authToken') && localStorage.getItem('userId')) {
      this.fetchUserProfile();
    }
  },

  watch: {
    $route(to, from) {
      if (to.path === '/') {
        this.fetchUserProfile();
      }
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,100..900;1,100..900&display=swap');

.header {
    background: #fff;
    padding-inline: 16px;
    border-bottom: 0.01rem solid rgba(0, 0, 0, 0.164);
}

.logo {
    font-size: 40px;
    font-weight: 900;
    margin-right: auto; 
}

.navbar-toggler {
    border: none;
    outline: none;
}

.navbar-toggler-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='rgba%280, 0, 0, 0.7%29' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}

.nav-list {
    display: flex;
    align-items: center;
    gap: 32px;
    list-style: none;
}

.nav-list a {
    color: #000;
    font-size: 15px;
    text-transform: uppercase;
    text-decoration: none;
}

.user-box {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 8px;
}

.user-photo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #ccc;
}

.user-name {
    font-size: 16px;
    font-weight: 500;
    color: #333;
}

.user-dropdown {
    display: none;
    position: absolute;
    top: 100%;
    right: 0;
    background: #fff;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    z-index: 10;
    width: 180px;
    padding: 8px 0;
    font-size: 14px;
}

.user-box:hover .user-dropdown {
    display: block;
}

.user-dropdown button {
    display: block;
    width: 100%;
    padding: 8px 16px;
    text-align: left;
    background: none;
    border: none;
    font-size: 14px;
    color: #333;
    cursor: pointer;
}

.user-dropdown button:hover {
    background: #f7f7f7;
    color: #007bff;
}

.user-dropdown button:not(:last-child) {
    border-bottom: 1px solid #eee;
}

.nav-list a:hover {
    color: #0D82FE;
}

.dropdown {
    position: relative;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: white;
    min-width: 160px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    padding: 10px 0;
    z-index: 10;
}

.dropdown:hover .dropdown-content {
    display: block;
}

.sub-dropdown {
    display: none;
    position: absolute;
    background-color: white;
    top: 0;
    left: 100%;
    min-width: 160px;
    padding: 10px 0;
}

.dropdown-content li:hover .sub-dropdown {
    display: block;
}

.user-photo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
}

.auth-links {
    display: flex;
    align-items: center;
    gap: 8px; 
}

.sign-up-text {
    color: #6798cd !important;
    text-decoration: none;
}

.sign-up-text:hover {
    color: #007bff !important;
}

.navbar-collapse {
    transition: height 0.3s ease;
}

@media (max-width: 844px) {
    .nav-list {
        flex-direction: column;
        gap: 16px;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
        padding: 16px;
        list-style: none;
    }
}
</style>