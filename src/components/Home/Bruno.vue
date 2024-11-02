<template>
  <nav class="navbar navbar-expand-lg navbar-custom">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">GABINI</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item"><a class="nav-link active" href="#">HOME</a></li>
          <li class="nav-item"><a class="nav-link" href="#">SALE</a></li>
          <li class="nav-item"><a class="nav-link" href="#">BUNDLE & SAVE</a></li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">SHOP BY CATEGORY</a>
            <ul class="dropdown-menu">
              <li class="dropdown-submenu">
                <a class="dropdown-item dropdown-toggle" href="#">ITEM 01</a>
                <ul class="dropdown-menu">
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
          <li class="nav-item d-flex align-items-center">
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
            <div v-else>
              <RouterLink class="nav-link sign-in" to="/login">SIGN IN</RouterLink>
              <span class="nav-link px-2">|</span>
              <RouterLink class="sign-up-text" to="/cadastro">SIGN UP FOR FREE</RouterLink>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <header class="home">
    <div class="container">
      <div class="titulo">
        <h1>GABINI HEADSET STORE</h1>
        <h3>Welcome to Gabini quality, at our most welcoming price</h3>
        <img src="@/assets/img/botãoseefordetails.png" alt="">
      </div>
      <div class="image">
        <img src="@/assets/img/fonerazer.svg" alt="fone">
      </div>
      <div class="background-blur"></div>
    </div>
  </header>
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
.navbar-custom {
    background-color: white;
    border-width: 0.5px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    padding: 0 2rem;
    display: flex;
    align-items: center; 
    justify-content: space-between; 
}

.navbar-custom .navbar-brand {
    font-size: 40px;
    font-weight: bold;
    margin-right: 2rem; 
}

.navbar-nav {
    display: flex;
    align-items: center;
    gap: 1.5rem; 
}

.navbar-custom .nav-link,
.navbar-custom .dropdown-toggle {
    color: rgb(0, 0, 0);
}

.navbar-custom .nav-link:hover,
.navbar-custom .dropdown-toggle:hover {
    color: #007bff;
}

.navbar-custom .nav-link.sign-in,
.nav-item .sign-up-text {
    font-size: 1rem;
    font-weight: bold;
    color: #007bff;
    text-decoration: none;
    margin-left: 1rem; 
}

.navbar-custom .nav-link.sign-in:hover,
.nav-item .sign-up-text:hover {
    color: #034790;
}

.user-box {
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 10px;
    padding-right: 30px;
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 20px;
    background-color: #000000;
    color: rgb(255, 255, 255);
    cursor: pointer;
    margin-left: 20px;
}

.user-info {
    display: flex;
    align-items: center;
}

.user-photo {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
}

.user-name {
    font-weight: bold;
}

.user-dropdown {
    position: absolute;
    top: 102%;
    left: 0;
    width: 177px;
    background-color: #000000;
    border-radius: 20px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.dropdown-item {
    background: #000000;
    border: none;
    padding: 10px;
    border-radius: 8px;
    color: rgb(255, 255, 255);
    text-align: center;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s;
}

.dropdown-item:hover {
    background: #666;
}

.nav-item .sign-up-text {
    color: #007bff;
    text-decoration: none;
    margin-left: 10px;
}

.nav-item .sign-up-text:hover {
    color: #034790;
}


header.home {
    background-color: #ffffff; 
    color: #000000; 
    width: 100%; 
    min-height: 80vh;
    display: flex; 
    align-items: center; 
    justify-content: space-between; 
    padding: 2rem;
    box-sizing: border-box; 
}

header.home .container {
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    width: 75%; 
}

header.home .titulo {
    max-width: 50%; 
    text-align: left;
}

header.home .titulo h1 {
    max-width: 20%;
    line-height: 0.9;
    font-weight: bold;
    font-size: 6rem; 
    margin-bottom: 1rem;
}

header.home .titulo h3 {
    max-width: 63%;
    font-size: 1.5rem; 
    margin-bottom: 1.5rem; 
    color: #444444;
}

header.home .titulo img {
    max-width: 250px; 
    height: auto; 
}

header.home .image img {
    max-width: 550px; 
    height: auto; 
}
</style>