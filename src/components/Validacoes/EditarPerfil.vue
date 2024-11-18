<template>
  <div class="edit-profile">
    <h1>Editar Perfil</h1>
    <form @submit.prevent="updateProfile" class="form-container">
      <div class="form-group">
        <label for="username">Nome Completo:</label>
        <input type="text" id="username" v-model="formData.username" required />
      </div>
      <div class="form-group">
        <label for="nomeSocial">Nome Social:</label>
        <input type="text" id="nomeSocial" v-model="formData.nomeSocial" />
      </div>
      <div class="form-group">
        <label for="cpf">CPF:</label>
        <input type="text" id="cpf" v-model="formData.cpf" required />
      </div>
      <div class="form-group">
        <label for="nacionalidade">Nacionalidade:</label>
        <input type="text" id="nacionalidade" v-model="formData.nacionalidade" />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="formData.email" required />
      </div>
      <div class="form-group">
        <label for="telefone">Telefone:</label>
        <input type="text" id="telefone" v-model="formData.telefone" />
      </div>
      <div class="form-group">
        <label for="sexo">Sexo:</label>
        <select v-model="formData.sexo">
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
          <option value="outro">Outro</option>
        </select>
      </div>
      <div class="form-group">
        <label for="cor">Cor:</label>
        <select v-model="formData.cor">
          <option value="branco">Branco</option>
          <option value="negro">Negro</option>
          <option value="pardo">Pardo</option>
          <option value="outro">Outro</option>
        </select>
      </div>
      <div class="form-group">
        <label for="foto">Foto:</label>
        <input type="file" id="foto" @change="onFileChange" accept=".png, .jpeg, .jpg" />
      </div>
      <div class="form-group">
        <label for="novaSenha">Nova Senha:</label>
        <input type="password" id="novaSenha" v-model="formData.novaSenha" />
      </div>
      <button type="submit" class="btn-save">Salvar Alterações</button>
      <Router-link to="/"><button class="btn-save">Voltar</button></Router-link>
    </form>

    <div v-if="showSuccessMessage" class="success-message">
      <p>Perfil atualizado com sucesso!</p>
      <button @click="goBack" class="btn-back">Concluído</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        username: '',
        nomeSocial: '',
        cpf: '',
        nacionalidade: '',
        email: '',
        telefone: '',
        sexo: 'masculino', // Valor padrão para evitar campo vazio
        cor: 'branco', // Valor padrão para evitar campo vazio
        novaSenha: '',
        foto: null
      },
      showSuccessMessage: false // Controle para mostrar mensagem de sucesso
    };
  },
  methods: {
    async fetchUserProfile() {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('authToken');

      try {
        const response = await axios.get(`https://localhost:7250/api/SignUp/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const userData = response.data;

        this.formData = {
          ...userData,
          sexo: userData.sexo || 'masculino',
          cor: userData.cor || 'branco'
        };
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
      }
    },

    onFileChange(event) {
      const file = event.target.files[0];
      if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
        this.formData.foto = file;
      }
    },

    async updateProfile() {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('authToken');

      const formData = new FormData();
      formData.append('username', this.formData.username || '');
      formData.append('nomeSocial', this.formData.nomeSocial || '');
      formData.append('cpf', this.formData.cpf || '');
      formData.append('nacionalidade', this.formData.nacionalidade || '');
      formData.append('email', this.formData.email || '');
      formData.append('telefone', this.formData.telefone || '');
      formData.append('sexo', this.formData.sexo || 'masculino');
      formData.append('cor', this.formData.cor || 'branco');
      formData.append('novaSenha', this.formData.novaSenha || '');

      if (this.formData.foto) {
        formData.append('foto', this.formData.foto);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      };

      try {
        await axios.put(`https://localhost:7250/api/SignUp/editar-perfil/${userId}`, formData, config);
        this.showSuccessMessage = true; // Exibe mensagem de sucesso
      } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
      }
    },

    goBack() {
      this.$router.push('/');
    }
  },
  mounted() {
    this.fetchUserProfile();
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Quicksand:wght@300..700&display=swap');
.edit-profile {
  font-family: "Poppins", sans-serif;
  width: 90%;
  max-width: 1200px;
  height: 80vh;
  margin: 80px auto;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  text-align: center;
  overflow-y: auto;
}

.edit-profile h1 {
  font-family: "Poppins", sans-serif;
  font-size: 44px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  text-align: left;
  width: 48%;
}

.form-container {
  display: flex;
  flex-wrap: wrap;
  gap: 4%;
  justify-content: space-between;
}

.form-group label {
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.btn-save {
  display: inline-block;
  padding: 12px 20px;
  background-color: #000000;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-save:hover {
  background-color: #333333;
}

.success-message {
  margin-top: 20px;
  padding: 20px;
  background-color: #e0ffe0;
  border: 1px solid #00cc00;
  border-radius: 5px;
  color: #006600;
}

.success-message p {
  font-size: 16px;
  font-weight: bold;
}

.btn-back {
  margin-top: 10px;
  padding: 8px 15px;
  background-color: #00cc00;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-back:hover {
  background-color: #009900;
}

@media (max-width: 768px) {
  .edit-profile {
    padding: 15px;
    width: 90%;
    max-width: 100%;
  }

  .form-group {
    width: 100%;
  }
}
</style>
