<template>
  <nav class="navbar navbar-expand-lg header">
    <div class="container-fluid">
      <a class="navbar-brand logo" href="#">GABINI</a>
      <button class="navbar-toggler hamburger" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse nav" id="navbarNavDropdown">
        <ul class="navbar-nav mx-auto nav-list">
          <li class="nav-item"><a class="nav-link active" href="#">HOME</a></li>
          <li class="nav-item"><a class="nav-link" href="#">SALE</a></li>
          <li class="nav-item"><a class="nav-link" href="#">BUNDLE & SAVE</a></li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">SHOP BY CATEGORY</a>
            <ul class="dropdown-menu dropdown-content">
              <li class="dropdown-submenu">
                <a class="dropdown-item dropdown-toggle" href="#">ITEM 01</a>
                <ul class="dropdown-menu sub-dropdown">
                  <li><a class="dropdown-item" href="#">ITEM 05</a></li>
                  <li><a class="dropdown-item" href="#">ITEM 06</a></li>
                </ul>
              </li>
              <li><a class="dropdown-item" href="#">ITEM 02</a></li>
              <li><a class="dropdown-item" href="#">ITEM 03</a></li>
              <li><a class="dropdown-item" href="#">ITEM 04</a></li>
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
      }
    };
  },
  methods: {
    async fetchUserProfile() {
      const token = localStorage.getItem('authToken');
      const userId = localStorage.getItem('userId');

      console.log("Token recuperado:", token);
      console.log("UserId recuperado:", userId);

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

          console.log('Perfil do usuário carregado com sucesso:', this.userProfile);
        } catch (error) {
          console.error('Erro ao buscar o perfil do usuário:', error);
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
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css");


* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Inter", serif !important;
}

.header {
    background: #fff;
    padding-inline: 16px;
    border-bottom: 0.01rem solid rgba(0, 0, 0, 0.164);
}

.logo {
    font-size: 24px;
    font-weight: bold;
    color: #000000;
}

.nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.nav-list {
    display: flex;
    align-items: center;
    gap: 32px;
    list-style: none;
    margin: 0;
}

.nav-list a {
    color: #000;
    font-size: 15px;
    text-transform: uppercase;
    text-decoration: none !important;
    padding-block: 16px;
    transition: color 0.3s;
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

.dropdown-content a {
    color: black;
    padding: 8px 15px;
    display: block;
    font-size: 14px;
}

.dropdown:hover .dropdown-content {
    display: block;
}

/* Sub-dropdown */
.sub-dropdown {
    display: none;
    position: absolute;
    background-color: white;
    top: 0;
    left: 100%;
    min-width: 160px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    padding: 10px 0;
}

.dropdown-content li:hover .sub-dropdown {
    display: block;
}

/* Botão de Menu Hamburger */
.hamburger {
    display: none;
    background: none;
    border-top: 3px solid #000;
    cursor: pointer;
}

.hamburger::after,
.hamburger::before {
    content: " ";
    display: block;
    width: 30px;
    height: 3px;
    background: #000;
    margin-top: 5px;
    transition: 0.3s;
}

/* Login e Autenticação */
.sign-in,
.sign-up-text {
    color: #000;
    font-size: 15px;
    font-weight: bold;
    text-decoration: none;
}

.sign-up-text:hover,
.sign-in:hover {
    color: #0D82FE;
}

/* Ajuste de Espaçamento e Alinhamento para LOGIN */
.nav-item.d-flex.align-items-center {
    display: flex;
    align-items: center;
    gap: 10px;
}

.user-box {
    position: relative;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 5px;
}

.user-photo {
    width: 30px;
    height: 30px;
    border-radius: 50%;
}

.user-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: white;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
    padding: 10px;
    display: none;
    z-index: 10;
}

.user-box:hover .user-dropdown {
    display: block;
}

/* Estilos de Sign In e Sign Up */
.auth-links {
    display: flex;
    align-items: center;
    gap: 8px; /* Espaçamento entre os links */
}

/* Responsivo */
@media (max-width: 844px) {
    .hamburger {
        display: block;
    }

    .nav-list {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        clip-path: circle(100px at 90% -15%);
        transition: 1s ease-out;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
        gap: 20px;
        pointer-events: none;
    }

    .nav-list a {
        font-size: 24px;
        opacity: 0;
    }

    .nav.active .nav-list {
        clip-path: circle(1500px at 90% -15%);
        pointer-events: all;
    }

    .nav.active .hamburger {
        position: fixed;
        top: 26px;
        right: 16px;
        border-top-color: transparent;
    }

    .nav.active .hamburger::before {
        transform: rotate(135deg);
    }

    .nav.active .hamburger::after {
        transform: rotate(-135deg);
        top: -7px;
    }
}
</style>
