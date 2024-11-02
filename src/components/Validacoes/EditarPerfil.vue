<template>
    <div class="edit-profile">
      <h1>Editar Perfil</h1>
      <form @submit.prevent="updateProfile">
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
          <label for="senha">Senha:</label>
          <input type="password" id="senha" v-model="formData.senha" required />
        </div>
  
        <div class="address-section">
          <h3>Endereço</h3>
          <div class="form-group">
            <label for="logradouro">Logradouro:</label>
            <input type="text" id="logradouro" v-model="formData.enderecos[0].logradouro" required />
          </div>
  
          <div class="form-group">
            <label for="complemento">Complemento:</label>
            <input type="text" id="complemento" v-model="formData.enderecos[0].complemento" />
          </div>
  
          <div class="form-group">
            <label for="cep">CEP:</label>
            <input type="text" id="cep" v-model="formData.enderecos[0].cep" required />
          </div>
        </div>
  
        <button type="submit" class="btn-save">Salvar Alterações</button>
      </form>
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
          senha: '', 
          foto: null,
          enderecos: [
            {
              logradouro: '',
              complemento: '',
              cep: ''
            }
          ]
        }
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
            senha: '', // Limpa o campo de senha por segurança
            foto: null,
            enderecos: userData.enderecos && userData.enderecos.length > 0
              ? userData.enderecos
              : [{ logradouro: '', complemento: '', cep: '' }]
          };
        } catch (error) {
          console.error('Erro ao carregar perfil:', error);
          alert('Erro ao carregar informações do perfil.');
        }
      },
  
      onFileChange(event) {
        const file = event.target.files[0];
        if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
          this.formData.foto = file;
        } else {
          alert('Por favor, selecione uma imagem válida (PNG ou JPEG).');
        }
      },
  
      async updateProfile() {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('authToken');
  
        // Converte enderecos para um array simples, removendo possíveis proxies
        const enderecosArray = this.formData.enderecos.map(endereco => ({ ...endereco }));
  
        // Criação do objeto FormData
        const formData = new FormData();
        formData.append('username', this.formData.username || '');
        formData.append('nomeSocial', this.formData.nomeSocial || '');
        formData.append('cpf', this.formData.cpf || '');
        formData.append('nacionalidade', this.formData.nacionalidade || '');
        formData.append('email', this.formData.email || '');
        formData.append('telefone', this.formData.telefone || '');
        formData.append('sexo', this.formData.sexo || 'masculino');
        formData.append('cor', this.formData.cor || 'branco');
        formData.append('senha', this.formData.senha || '');
  
        // Adiciona os endereços (assumindo que o backend espera uma string JSON para arrays de objetos complexos)
        formData.append('enderecos', JSON.stringify(enderecosArray));
  
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
          alert('Perfil atualizado com sucesso!');
        } catch (error) {
          console.error('Erro ao atualizar perfil:', error);
          if (error.response && error.response.data) {
            alert(`Erro ao atualizar perfil: ${error.response.data.message}`);
          } else {
            alert('Erro ao atualizar perfil. Tente novamente.');
          }
        }
      }
    },
    mounted() {
      this.fetchUserProfile();
    }
  };
  </script>
  
  
  
  
  
  <style scoped>
  .edit-profile {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .edit-profile h1 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    font-weight: bold;
    color: #555;
    margin-bottom: 5px;
  }
  
  .form-group input,
  .form-group select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .address-section {
    margin-top: 20px;
    padding-top: 10px;
    border-top: 1px solid #ddd;
  }
  
  .btn-save {
    width: 100%;
    padding: 10px;
    font-size: 18px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn-save:hover {
    background-color: #45a049;
  }
  </style>
  