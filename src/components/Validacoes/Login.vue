<template>
  <div>
    <GabiniLogo v-if="showLogo" />
    <div v-else class="login-container" :class="{ 'shake': loginError }">
      <div class="wave"></div>
      <div class="login-form">
        <h1 class="text-login">LOGIN</h1>
        <form @submit.prevent="submitLogin">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
          <span v-if="errorMessage && fieldWithError === 'email'" class="error-message">{{ errorMessage }}</span>
          
          <label for="password">Senha:</label>
          <input type="password" id="password" v-model="password" required />
          <span v-if="errorMessage && fieldWithError === 'password'" class="error-message">{{ errorMessage }}</span>
          
          <button type="submit">Entrar</button>
        </form>

        <RouterLink to="/cadastro" class="register-link">Cadastrar</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import axios from 'axios';
import GabiniLogo from '@/components/Animacoes/GabiniLogo.vue';

export default {
  data() {
    return {
      email: '',
      password: '',
      showLogo: true,
      errorMessage: '',
      fieldWithError: '',
      loginError: false
    };
  },
  methods: {
    async submitLogin() {
      try {
        const response = await axios.post('https://localhost:7250/api/SignUp/login', {
          email: this.email,
          senha: this.password
        });

        const { token, user } = response.data;
        const userId = user ? user.id : undefined;

        if (token && userId) {
          localStorage.setItem('authToken', token);
          localStorage.setItem('userId', userId);

          this.errorMessage = '';
          this.fieldWithError = '';
          this.$router.push('/');
        } else {
          throw new Error('Token ou userId não retornado.');
        }
      } catch (error) {
        this.errorMessage = 'Email ou senha incorretos.';
        this.fieldWithError = error.response?.data?.field || 'email';
        this.triggerShake();
      }
    },
    triggerShake() {
      this.loginError = true;
      setTimeout(() => {
        this.loginError = false;
      }, 500);
    }
  },
  mounted() {
    setTimeout(() => {
      this.showLogo = false;
    }, 100);
  },
  components: {
    RouterLink,
    GabiniLogo
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Futo+Sans:wght@900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap');

body {
  overflow: hidden;
  margin: 0;
  padding: 0;
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s;
}

.shake {
  animation: shake 0.5s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.wave {
  width: 1000px;
  height: 1025px;
  position: absolute;
  top: -25%;
  left: 50%;
  margin-left: -500px;
  margin-top: -500px;
  border-radius: 35%;
  background: rgba(255, 255, 255, 0.75);
  animation: wave 15s infinite linear;
}

@keyframes wave {
  from { transform: rotate(0deg);}
  from { transform: rotate(360deg);}
}

.login-form {
  position: relative;
  z-index: 1;
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  text-align: center;
}

.text-login {
  font-family: 'Futo Sans', sans-serif;
  font-weight: 900;
  color: #000000;
  font-size: 6rem;
  text-align: center;
  justify-content: center;
  display: flex;
  margin-bottom: 2rem;
}

label {
  font-family: "Poppins", sans-serif;
  display: block;
  text-align: left;
  margin-top: 1rem;
  color: #333;
}

input[type="email"],
input[type="password"] {
  font-family: "Poppins", sans-serif;
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.error-message {
  display: block;
  color: red;
  font-size: 0.9rem;
  margin-top: 0.3rem;
  text-align: left;
}

button {
  font-family: "Poppins", sans-serif;
  margin-top: 1.5rem;
  width: 100%;
  padding: 0.75rem;
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background-color: #333;
}

.register-link {
  font-family: "Poppins", sans-serif;
  display: block;
  margin-top: 1rem;
  color: #333;
  text-decoration: none; 
}

@media (max-width: 768px) {
  h1 {
    font-size: 1.5rem;
  }
  .login-form {
    padding: 1.5rem;
  }
}
</style>
