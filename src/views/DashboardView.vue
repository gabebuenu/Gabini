<template>
  <div class="dashboard-container">
    <!-- Sidebar -->
    <nav id="sidebar" :class="{ 'open-sidebar': sidebarOpen }">
      <div id="sidebar_content">
        <div id="user" v-if="isAuthenticated">
          <img :src="userProfile.foto" id="user_avatar" alt="Avatar do Usuário" />
          <p id="user_infos">
            <span class="item-description">{{ userProfile.username }}</span>
            <span class="item-description">Bem-vindo!</span>
          </p>
        </div>
        <div v-else id="user">
          <p id="user_infos">
            <RouterLink class="nav-link sign-in" to="/login">Entrar</RouterLink>
            <span class="separator">|</span>
            <RouterLink class="sign-up-text" to="/cadastro">Cadastrar</RouterLink>
          </p>
        </div>

        <ul id="side_items">
          <li
            v-for="item in menuItems"
            :key="item.text"
            :class="['side-item', { active: item.active }]"
            @click="navigateTo(item.href)"
          >
            <a :href="item.href">
              <i :class="item.icon"></i>
              <span class="item-description">{{ item.text }}</span>
            </a>
          </li>
        </ul>

        <button id="open_btn" @click="toggleSidebar">
          <i id="open_btn_icon" class="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      <div id="logout" v-if="isAuthenticated">
        <button id="logout_btn" @click="logout">
          <i class="fa-solid fa-right-from-bracket"></i>
          <span class="item-description">Logout</span>
        </button>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="content">
      <div class="header">
        <h1>Dashboard</h1>
        <div class="actions">
          <v-btn color="primary" @click="openCreateDialog('product')">Criar Produto</v-btn>
          <v-btn color="secondary" @click="openCreateDialog('brand')">Criar Marca</v-btn>
          <Router-Link to="/">
            <v-btn>Voltar à Tela Inicial</v-btn>
          </Router-Link>
        </div>
      </div>

      <v-container>
        <!-- Produtos - Tabela Desktop -->
        <v-data-table
          v-if="!isMobile && products.length"
          :headers="headers"
          :items="products"
          item-value="id"
          class="elevation-1 desktop-table"
          dense
        >
          <template #item.imagem="{ item }">
            <v-img :src="item.imagem" max-height="50" max-width="50" v-if="item.imagem" />
            <span v-else>Sem imagem</span>
          </template>
          <template #item.actions="{ item }">
            <v-btn color="primary" text @click="openUpdateDialog(item)">Editar</v-btn>
            <v-btn color="error" text @click="deleteProduct(item.id)">Deletar</v-btn>
          </template>
          <template v-slot:top>
            <tr>
              <th class="th-center" v-for="header in headers" :key="header.text"></th>
            </tr>
          </template>
        </v-data-table>

        <!-- Mensagem caso não haja produtos -->
        <v-row justify="center" v-if="!loading && !products.length">
          <p>Nenhum produto encontrado. Adicione um novo produto para começar.</p>
        </v-row>
      </v-container>

      <!-- Diálogo de Criação e Atualização -->
      <v-dialog v-model="dialog.open" max-width="500px">
        <v-card>
          <v-card-title>
            {{ isEditing ? 'Editar Produto' : dialog.type === 'product' ? 'Criar Produto' : 'Criar Marca' }}
          </v-card-title>
          <v-card-text>
            <v-form ref="form">
  <!-- Nome do Produto -->
  <v-text-field
    v-if="dialog.type === 'product'"
    v-model="formData.nome"
    label="Nome do Produto"
    required
  />

  <!-- Preço -->
  <v-text-field
    v-if="dialog.type === 'product'"
    v-model="formData.preco"
    label="Preço"
    type="number"
    required
  />

  <!-- ID da Marca -->
  <v-text-field
    v-if="dialog.type === 'product'"
    v-model="formData.marcaId"
    label="ID da Marca"
    type="number"
    required
  />

  <!-- Imagem do Produto -->
  <v-file-input
    v-if="dialog.type === 'product'"
    v-model="formData.imagemArquivo"
    label="Imagem do Produto"
    accept="image/*"
  />

  <!-- Imagem Hover -->
  <v-file-input
    v-if="dialog.type === 'product'"
    v-model="formData.imagemHoverArquivo"
    label="Imagem Hover do Produto"
    accept="image/*"
  />

  <!-- Nome da Marca -->
  <v-text-field
    v-if="dialog.type === 'brand'"
    v-model="formData.nome"
    label="Nome da Marca"
    required
  />
</v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="dialog.type === 'product' ? saveProduct() : saveBrand()">Salvar</v-btn>
            <v-btn color="grey" @click="closeDialog">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Toasts -->
      <v-snackbar
        v-model="snackbar.visible"
        :color="snackbar.color"
        timeout="3000"
        top
      >
        {{ snackbar.message }}
      </v-snackbar>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      sidebarOpen: true,
      isAuthenticated: false,
      userProfile: {
        username: "",
        foto: "",
      },
      menuItems: [
        { text: "Produtos", href: "#produtos", icon: "fa fa-tachometer-alt" },
        { text: "Marcas", href: "#marcas", icon: "fa fa-box" },
        { text: "Permissões", href: "#permissao", icon: "fa fa-tag" },
      ],
      products: [],
      headers: [
        { text: "ID", value: "id", align: "center" },
        { text: "Nome", value: "nome" },
        { text: "Preço", value: "preco", align: "right" },
        { text: "Marca ID", value: "marcaId", align: "center" },
        { text: "Imagem", value: "imagem", align: "center" },
        { text: "Ações", value: "actions", align: "center" },
      ],
      loading: false,
      isMobile: window.innerWidth <= 768,
      dialog: { open: false, type: null },
      isEditing: false, // Nova flag para diferenciar criação e edição
      formData: {
        id: null,
        nome: "",
        preco: null,
        marcaId: null,
        imagemArquivo: null,
        imagemHoverArquivo: null,
      },
      snackbar: {
        visible: false,
        message: "",
        color: "success",
      },
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    navigateTo(href) {
      this.menuItems.forEach((item) => (item.active = item.href === href));
      this.$router.push(href); // Navegação com Vue Router
    },
    async fetchUserProfile() {
      const token = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");

      if (token && userId) {
        try {
          const response = await axios.get(`https://localhost:7250/api/SignUp/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          this.userProfile = {
            username: response.data.username,
            foto: `data:image/png;base64,${response.data.foto}`,
          };
          this.isAuthenticated = true;
        } catch (error) {
          console.error("Erro ao carregar perfil do usuário:", error);
          this.isAuthenticated = false;
        }
      } else {
        console.error("Erro: `authToken` ou `userId` ausente no localStorage.");
      }
    },
    logout() {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
      this.isAuthenticated = false;
      this.$router.push("/login");
    },
    async fetchProducts() {
      this.loading = true;
      try {
        const response = await axios.get("https://localhost:7250/api/product");
        this.products = response.data.$values || [];
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        this.loading = false;
      }
    },
    openCreateDialog(type) {
      this.dialog = { open: true, type };
      this.isEditing = false; // Indica que é uma nova criação
      this.formData = {
        id: null,
        nome: "",
        preco: null,
        marcaId: null,
        imagemArquivo: null,
        imagemHoverArquivo: null,
      };
    },
    openUpdateDialog(product) {
      this.dialog = { open: true, type: "product" };
      this.isEditing = true; // Indica que é uma edição
      this.formData = {
        id: product.id,
        nome: product.nome,
        preco: product.preco,
        marcaId: product.marcaId,
        imagemArquivo: null,
        imagemHoverArquivo: null,
      };
    },
    async saveProduct() {
  try {
    const formData = new FormData();

    // Campos obrigatórios
    formData.append("Id", this.formData.id || 0); // Id = 0 para criação
    formData.append("Nome", this.formData.nome || "");
    formData.append("Preco", this.formData.preco || 0);
    formData.append("MarcaId", this.formData.marcaId || 0);

    // Strings estáticas exigidas pelo back-end
    formData.append("Imagem", "string");
    formData.append("ImagemHover", "string");

    // Arquivos de imagem
    if (this.formData.imagemArquivo) {
      formData.append("imagemArquivo", this.formData.imagemArquivo);
    }
    if (this.formData.imagemHoverArquivo) {
      formData.append("imagemHoverArquivo", this.formData.imagemHoverArquivo);
    }

    let response;

    if (this.isEditing) {
      // Requisição PUT para edição
      response = await axios.put(`https://localhost:7250/api/Product/${this.formData.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      this.showSnackbar("Produto atualizado com sucesso!", "success");
    } else {
      // Requisição POST para criação
      response = await axios.post("https://localhost:7250/api/Product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      this.showSnackbar("Produto criado com sucesso!", "success");
    }

    // Atualizar lista de produtos e fechar o diálogo
    this.fetchProducts();
    this.closeDialog();
  } catch (error) {
    console.error("Erro ao salvar produto:", error);

    // Mensagem de erro detalhada
    const errorMessage =
      error.response?.data?.title || error.response?.data?.message || "Erro ao salvar produto.";
    this.showSnackbar(errorMessage, "error");
  }
},

    async saveBrand() {
      try {
        const endpoint = `https://localhost:7250/api/brand`;
        await axios.post(endpoint, {
          nome: this.formData.nome,
        });
        this.showSnackbar("Marca criada com sucesso!", "success");
        this.closeDialog();
      } catch (error) {
        console.error("Erro ao salvar marca:", error);
        const errorMessage =
          error.response?.data?.title || "Erro ao salvar marca.";
        this.showSnackbar(errorMessage, "error");
      }
    },
    async deleteProduct(id) {
      try {
        await axios.delete(`https://localhost:7250/api/product/${id}`);
        this.fetchProducts();
        this.showSnackbar("Produto deletado com sucesso!", "success");
      } catch (error) {
        console.error("Erro ao deletar produto:", error);
        this.showSnackbar("Erro ao deletar produto. Tente novamente.", "error");
      }
    },
    closeDialog() {
      this.dialog.open = false;
    },
    showSnackbar(message, color) {
      this.snackbar.message = message;
      this.snackbar.color = color;
      this.snackbar.visible = true;
    },
  },
  mounted() {
    this.fetchProducts();
    window.addEventListener("resize", () => {
      this.isMobile = window.innerWidth <= 768;
    });

    if (localStorage.getItem("authToken") && localStorage.getItem("userId")) {
      this.fetchUserProfile();
    }
  },
};
</script>



<style scoped>
/* Estilos da navbar */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body {
  background-color: #000000;
}

.dashboard-container {
  display: flex;
}

#sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #0f0f0f;
  height: 100vh;
  border-radius: 0px 18px 18px 0px;
  position: relative;
  transition: all 0.5s;
  min-width: 82px;
  z-index: 2;
  color: #ffffff;
}

#sidebar_content {
  padding: 12px;
}

#user {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
}

#user_avatar {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 20px;
}

#user_infos {
  display: flex;
  flex-direction: column;
}

#user_infos span:last-child {
  color: #ffffff;
  font-size: 12px;
}

#side_items {
  display: flex;
  flex-direction: column;
  gap: 8px;
  list-style: none;
}

.side-item {
  border-radius: 8px;
  padding: 14px;
  cursor: pointer;
}

.side-item.active {
  background-color: #4f46e5;
}

.side-item:hover:not(.active),
#logout_btn:hover {
  background-color: #646464;
}

.side-item a {
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
}

.side-item.active a {
  color: #e3e9f7;
}

.side-item a i {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
}

#logout {
  border-top: 1px solid #e3e9f7;
  padding: 12px;
}

#logout_btn {
  border: none;
  padding: 12px;
  font-size: 14px;
  display: flex;
  gap: 20px;
  align-items: center;
  border-radius: 8px;
  text-align: start;
  cursor: pointer;
  background-color: transparent;
}

#open_btn {
  position: absolute;
  top: 30px;
  right: -10px;
  background-color: #232323;
  color: #e3e9f7;
  border-radius: 100%;
  width: 20px;
  height: 20px;
  border: none;
  cursor: pointer;
}

#open_btn_icon {
  transition: transform 0.3s ease;
}

.open-sidebar #open_btn_icon {
  transform: rotate(180deg);
}

.item-description {
  width: 0px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  transition: width 0.6s;
  height: 0px;
}

#sidebar.open-sidebar {
  min-width: 15%;
}

#sidebar.open-sidebar .item-description {
  width: 150px;
  height: auto;
}

#sidebar.open-sidebar .side-item a {
  justify-content: flex-start;
  gap: 14px;
}
/* Estilo atualizado para o painel principal */
.content {
  flex-grow: 1;
  padding: 20px;
  background-color: #f8f9fa;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.header h1 {
  font-size: 24px;
  color: #212529;
  font-weight: bold;
}

.actions {
  display: flex;
  gap: 10px; /* Ajuste o valor do espaço entre os botões */
}


.actions v-btn {
  margin-left: 10px;
}

.desktop-table {
  width: 100%;
  background-color: #222222;
  color: #FFF;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
}

.desktop-table .v-data-table__wrapper {
  max-height: none;
}

.desktop-table .v-data-table__header {
  background-color: #f1f3f5;
  font-weight: bold;
}
.desktop-table .v-data-table__content td {
  color: #ffffff; /* Cor branca para as células da tabela */
  font-size: 14px;
  text-align: center;
}
.desktop-table .v-data-table__header {
  background-color: #343a40; /* Cor escura para o fundo do cabeçalho */
}
.desktop-table .v-data-table__header th {
  color: #ffffff; /* Cor do texto */
  font-size: 14px;
  text-align: center; /* Alinha o texto ao centro */
}

.desktop-table .v-data-table__header th {
  color: #ffffff; /* Cor branca para o texto */
  font-size: 14px;
}
.v-data-table__header th {
  color: #ffffff !important; /* Força a cor branca no texto */
  font-size: 14px;          /* Garante tamanho do texto */
  text-align: center;       /* Alinha o texto centralizado */
}

.desktop-table .v-data-table__header th {
  color: #ffffff;
  font-size: 14px;
}

.desktop-table .v-data-table__content tr {
  border-bottom: 1px solid #e9ecef;
}

.desktop-table .v-data-table__content td {
  color: #495057;
  font-size: 14px;
  text-align: center;
}

.desktop-table .v-data-table__actions {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.mobile-table .product-card {
  background-color: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
}

.mobile-table .product-info {
  font-size: 14px;
  color: #495057;
  margin-bottom: 10px;
}

.mobile-table .product-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.v-btn {
  font-size: 14px;
  font-weight: bold;
  color: #000000;
  text-transform: none;
  border-radius: 4px;
}

.v-btn.primary {
  background-color: #007bff;
}

.v-btn.primary:hover {
  background-color: #0056b3;
}

.v-btn.error {
  background-color: #dc3545;
}

.v-btn.error:hover {
  background-color: #b02a37;
}

.v-snackbar {
  border-radius: 8px;
  font-size: 14px;
}

.v-dialog .v-card {
  border-radius: 8px;
}

.v-dialog .v-card-title {
  font-size: 18px;
  font-weight: bold;
  color: #212529;
}

.v-dialog .v-text-field {
  margin-bottom: 15px;
}

.v-progress-circular {
  margin: 20px auto;
}
</style>