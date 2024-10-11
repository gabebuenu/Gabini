<!-- <template>
  <div class="wrapper"> 
    <h2>Cadastro de Usuário</h2>

    <div class="progress-bar">
      <div class="step-circle" :class="{'active': step === 1}">
        <span>1</span>
      </div>
      <div class="line" :class="{'filled': step >= 2}"></div>
      <div class="step-circle" :class="{'active': step === 2}">
        <span>2</span>
      </div>
      <div class="line" :class="{'filled': step === 3}"></div>
      <div class="step-circle" :class="{'active': step === 3}">
        <span>3</span>
      </div>
    </div>

    <div class="container">
      <div v-if="step === 1" class="form-step">
        <input type="text" v-model="formData.nome" placeholder="Nome" />
        <input type="text" v-model="formData.sobrenome" placeholder="Sobrenome" />
        <input type="email" v-model="formData.email" placeholder="Email" />
        <input type="email" v-model="formData.confirmEmail" placeholder="Confirmar Email" />
        <input type="password" v-model="formData.senha" placeholder="Senha" />
        <input type="password" v-model="formData.confirmSenha" placeholder="Confirmar Senha" />
        <div class="button-container">
          <button @click="nextStep">Próximo</button>
        </div>
      </div>

      <div v-if="step === 2" class="form-step">
        <input type="text" v-model="formData.endereco" placeholder="Endereço" />
        <input type="text" v-model="formData.bairro" placeholder="Bairro" />
        <input type="text" v-model="formData.complemento" placeholder="Complemento" />
        <input type="text" v-model="formData.cep" placeholder="CEP" />
        <input type="text" v-model="formData.estado" placeholder="Estado" />
        <input type="text" v-model="formData.telefone" placeholder="Telefone" />
        <div class="button-container">
          <button @click="prevStep">Voltar</button>
          <button @click="nextStep">Próximo</button>
        </div>
      </div>

      <div v-if="step === 3" class="form-step">
        <div class="photo-upload">
          <label for="photo">Anexar Foto:</label>
          <input type="file" @change="handleFileUpload" />
        </div>
        <div class="button-container">
          <button @click="prevStep">Voltar</button>
          <button @click="submitForm">Finalizar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
      formData: {
        nome: '',
        sobrenome: '',
        email: '',
        confirmEmail: '',
        senha: '',
        confirmSenha: '',
        endereco: '',
        bairro: '',
        complemento: '',
        cep: '',
        estado: '',
        telefone: '',
        foto: null
      }
    };
  },
  methods: {
    nextStep() {
      if (this.step < 3) this.step++;
    },
    prevStep() {
      if (this.step > 1) this.step--;
    },
    handleFileUpload(event) {
      this.formData.foto = event.target.files[0];
    },
    submitForm() {
      console.log('Formulário submetido:', this.formData);
      alert('Cadastro finalizado!');
    }
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
  max-width: 550px;
  background-color: #d3d3d3;
  padding: 30px 20px;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.wrapper h2 {
  position: fixed;
  top: 0;
  text-align: center; 
  font-size: 24px;
  font-weight: bold;
  color: #000;
  margin-top: 20px; 
}

.progress-bar {
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center; 
  margin-bottom: 30px;
  height: 100vh;
}

.line {
  width: 2px;
  height: 60px;
  background-color: lightgray;
}

.line.filled {
  background-color: #3b5998;
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
}

.step-circle.active {
  background-color: #3b5998;
}

.step-circle span {
  font-size: 16px;
}

.line {
  width: 60px;
  height: 2px;
  background-color: lightgray;
}

.line.filled {
  background-color: #3b5998;
}

.form-step {
  display: grid;
  grid-template-columns: 1fr 1fr; 
  gap: 15px; 
}

input {
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
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

button:hover {
  background-color: #333;
}

.photo-upload {
  grid-column: span 2; 
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}
</style> -->
<templete>
  
</templete>