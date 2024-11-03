<template>
  <div>
    <div v-if="loading" class="spinner-overlay">
      <Sppiner />
    </div>

    <div v-else class="wrapper">
      <h1 class="cadastro-title">CADASTRO</h1>

      <div class="progress-bar">
        <div class="step-circle" :class="{'active': step >= 1}"><span>1</span></div>
        <div class="line" :class="{'filled': step >= 2, 'animating': step === 2}"></div>
        <div class="step-circle" :class="{'active': step >= 2}"><span>2</span></div>
        <div class="line" :class="{'filled': step === 3, 'animating': step === 3}"></div>
        <div class="step-circle" :class="{'active': step === 3}"><span>3</span></div>
      </div>

      <div class="container">
        <div v-if="step === 1" class="form-step">
          <input type="text" v-model="formData.nome" placeholder="Nome Completo" />
          <input type="text" v-model="formData.nomeSocial" placeholder="Nome Social" />
          <input type="text" v-model="formData.cpf" placeholder="CPF" />
          <input type="text" v-model="formData.nacionalidade" placeholder="Nacionalidade" />
          <input type="email" v-model="formData.email" placeholder="Email" />
          <input type="email" v-model="formData.confirmEmail" placeholder="Confirmar Email" />
          <input type="password" v-model="formData.senha" placeholder="Senha" />
          <input type="password" v-model="formData.confirmSenha" placeholder="Confirmar Senha" />
          <div class="button-container">
            <button @click="nextStep">Próximo</button>
          </div>
        </div>

        <div v-if="step === 2" class="form-step">
          <input type="text" v-model="formData.logradouro" placeholder="Logradouro" />
          <input type="text" v-model="formData.complemento" placeholder="Complemento" />
          <input type="text" v-model="formData.cep" placeholder="CEP" />
          <input type="text" v-model="formData.telefone" placeholder="Telefone" />
          <div class="button-container">
            <button class="button-voltar" @click="prevStep">Voltar</button>
            <button @click="nextStep">Próximo</button>
          </div>
        </div>

        <div v-if="step === 3" class="form-step icon-selection">
          <div class="icon-navigation">
            <div class="arrow arrow-left" @click="prevIcon">&#9664;</div>
            <transition name="fade">
              <div>
                <div v-if="selectedIcon === 'masculino'" key="masculino">
                  <svg class="user-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="4" fill="#000" />
                    <rect x="9" y="12" width="6" height="10" fill="#000" />
                  </svg>
                </div>
                <div v-if="selectedIcon === 'feminino'" key="feminino">
                  <svg class="user-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="4" fill="#E91E63" />
                    <path d="M12 12 l-3 10 h6 l-3 -10" fill="#E91E63" />
                  </svg>
                </div>
              </div>
            </transition>
            <div class="arrow arrow-right" @click="nextIcon">&#9654;</div>
          </div>

          <div class="button-section">
            <label>Cor:</label>
            <select v-model="formData.cor">
              <option value="">Selecione</option>
              <option value="branco">Branco</option>
              <option value="negro">Negro</option>
              <option value="pardo">Pardo</option>
            </select>
            <input type="file" @change="onFileChange" accept=".png, .jpeg, .jpg" />
          </div>

          <div class="button-container">
            <button class="button-voltar" @click="prevStep">Voltar</button>
            <button class="button-finalizar" @click="submitForm">Finalizar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Sppiner from '@/components/Animacoes/Sppiner.vue';

export default {
  data() {
    return {
      step: 1,
      formData: {
        nome: '',
        nomeSocial: '',
        cpf: '',
        nacionalidade: '',
        email: '',
        confirmEmail: '',
        senha: '',
        confirmSenha: '',
        logradouro: '',
        complemento: '',
        cep: '',
        telefone: '',
        foto: null,
        cor: '',
        sexo: 'masculino'
      },
      selectedIcon: 'masculino',
      icons: ['masculino', 'feminino'],
      loading: true
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 100);
  },
  methods: {
    nextStep() {
      if (this.step < 3) this.step++;
    },
    prevStep() {
      if (this.step > 1) this.step--;
    },
    prevIcon() {
      const currentIndex = this.icons.indexOf(this.selectedIcon);
      this.selectedIcon = this.icons[(currentIndex + this.icons.length - 1) % this.icons.length];
      this.confirmSexo();
    },
    nextIcon() {
      const currentIndex = this.icons.indexOf(this.selectedIcon);
      this.selectedIcon = this.icons[(currentIndex + 1) % this.icons.length];
      this.confirmSexo();
    },
    confirmSexo() {
      this.formData.sexo = this.selectedIcon;
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
        this.formData.foto = file;
      }
    },
    async submitForm() {
      const formDataToSend = new FormData();
      formDataToSend.append('username', this.formData.nome);
      formDataToSend.append('nomeSocial', this.formData.nomeSocial);
      formDataToSend.append('cpf', this.formData.cpf);
      formDataToSend.append('nacionalidade', this.formData.nacionalidade);
      formDataToSend.append('email', this.formData.email);
      formDataToSend.append('telefone', this.formData.telefone);
      formDataToSend.append('sexo', this.formData.sexo);
      formDataToSend.append('cor', this.formData.cor);
      formDataToSend.append('senha', this.formData.senha);
      if (this.formData.foto) formDataToSend.append('foto', this.formData.foto);

      formDataToSend.append('enderecos[0][logradouro]', this.formData.logradouro);
      formDataToSend.append('enderecos[0][complemento]', this.formData.complemento);
      formDataToSend.append('enderecos[0][cep]', this.formData.cep);

      try {
        const response = await axios.post('https://localhost:7250/api/SignUp/', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Cadastro realizado com sucesso:', response.data);
        this.$router.push('/login');  // Redireciona para a rota /login
      } catch (error) {
        console.error('Erro ao realizar o cadastro:', error);
      }
    }
  },
  components: {
    Sppiner
  }
};
</script>





<style scoped>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end; 
  font-family: Arial, sans-serif;
  background-color: #fff;
}

.wrapper {
  height: 100vh; 
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.container {
  width: 100%;
  max-width: 650px;
  background-color: #ffffff;
  padding: 60px 20px;
  border-radius: 15px;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.cadastro-title {
  font-family: 'Futo Sans', sans-serif;
  font-size: 10vw;
  font-weight: 900;
  color: black;
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

@media (max-width: 480px) {
  .cadastro-title {
    font-family: 'Futo Sans', sans-serif;
    font-weight: 900;
    font-size: 14vw;
  }
}

.progress-bar {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 250px;
  width: 100%; 
}

@media (max-width: 480px) {
  .progress-bar {
    margin-bottom: 380px;
  }
}

@media (max-width: 480px) {
  .container {
    max-width: 350px;
  }
}

.line {
  width: 100px;
  height: 2px;
  background-color: lightgray;
  position: relative;
  transition: background-color 1s ease, width 1s ease;
}

.line.filled {
  background-color: #000000;
}

.line.animating {
  animation: fillLine 1s forwards;
}

@keyframes fillLine {
  0% {
    width: 0;
  }
  100% {
    width: 100px;
  }
}

.step-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: white;
  position: relative;
  transition: background-color 1.6s ease;
}

.step-circle.active {
  background-color: #000000;
}

.step-circle span {
  font-size: 16px;
}

.form-step {
  display: grid;
  grid-template-columns: 1fr 1fr; 
  gap: 25px; 
  margin-bottom: 40px;
}

input {
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
}

input::placeholder {
  font-size: 14px; 
  color: #999;
}


.button-container {
  grid-column: span 2; 
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

button {
  padding: 10px 20px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;  
  font-size: 16px;
}

.button-voltar{
  background-color: transparent;
  color: #000;
  border: 1px solid;
}
.button-voltar:hover{
  background-color: #00000044;
}

button:hover {
  background-color: #333;
}

.photo-upload {
  grid-column: span 2; 
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.photo-preview {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}


.icon-selection {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  gap: 20px;
}

.icon-navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 300px;
}

.arrow {
  font-size: 2.5rem;
  cursor: pointer;
  user-select: none;
  color: black;
}

.user-icon {
  width: 120px;
  height: 120px;
  margin: 0 auto;
}

.button-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}
.confirm-btn {
  padding: 10px 40px;
  background-color: black;
  color: white;
  font-weight: bold;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.confirm-btn:hover {
  background-color: #333;
}

.photo-btn {
  padding: 8px 30px;
  background-color: white;
  color: black;
  border: 1px solid black;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 10px; 
}

.photo-btn:hover {
  background-color: #e0e0e0;
}


.button-container {
  display: flex;
  justify-content: flex-end;
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.button-voltar {
  background-color: white;
  color: black;
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 10px; 
}

.button-voltar:hover {
  background-color: #e0e0e0;
}

.button-finalizar {
  background-color: black;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button-finalizar:hover {
  background-color: #333;
}


.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(205, 205, 205, 0.145);
  z-index: 9999; 
}

.wrapper {
  opacity: 1;
  transition: opacity 0.3s ease;
}

</style>
