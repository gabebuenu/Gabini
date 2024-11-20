<template>
  <div class="dashboard-container">
    <!-- Sidebar -->
    <nav id="sidebar" :class="{ 'open-sidebar': sidebarOpen }">
      <div id="sidebar_content">
        <div id="user">
          <img v-if="isAuthenticated" :src="userProfile.foto" id="user_avatar" alt="Avatar" />
          <p id="user_infos">
            <span class="item-description" v-if="isAuthenticated">{{ userProfile.username }}</span>
            <span class="item-description" v-else>Bem-vindo!</span>
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
          <v-btn @click="goToHome">
            Voltar à Tela Inicial
          </v-btn>
<<<<<<< HEAD
=======
          <Router-Link to="/">
          <v-btn @click="goToHome">
            Voltar à Tela Inicial
          </v-btn>
>>>>>>> c92fbd9b2a1774b2c2f2e92a6bd45c2ab0649759
          </Router-Link>
        </div>
      </div>

      <v-container>
        <v-row justify="space-between" align="center" class="mb-4">
          <h2>Gerenciar Produtos</h2>
        </v-row>

        <!-- Tabela Desktop -->
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
        </v-data-table>

        <!-- Exibição Mobile -->
        <div v-else-if="isMobile && products.length" class="mobile-table">
          <div v-for="product in products" :key="product.id" class="product-card">
            <div class="product-info">
              <strong>Nome:</strong> {{ product.nome }}
            </div>
            <div class="product-info">
              <strong>Preço:</strong> {{ product.preco }}
            </div>
            <div class="product-info">
              <strong>Marca:</strong> {{ product.marcaId }}
            </div>
            <div v-if="product.imagem" class="product-info">
              <v-img :src="product.imagem" max-height="100" max-width="100" />
            </div>
            <div class="product-actions">
              <v-btn color="primary" text @click="openUpdateDialog(product)">Editar</v-btn>
              <v-btn color="error" text @click="deleteProduct(product.id)">Deletar</v-btn>
            </div>
          </div>
        </div>

        <!-- Carregamento -->
        <v-row justify="center" v-if="loading">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-row>

        <!-- Mensagem caso não haja produtos -->
        <v-row justify="center" v-if="!loading && !products.length">
          <p>Nenhum produto encontrado. Adicione um novo produto para começar.</p>
        </v-row>
      </v-container>

      <!-- Diálogo de Criação e Atualização -->
      <v-dialog v-model="dialog.open" max-width="500px">
        <v-card>
          <v-card-title>
            {{ dialog.type === 'product' ? 'Criar/Editar Produto' : 'Criar Marca' }}
          </v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                v-if="dialog.type === 'product'"
                v-model="formData.nome"
                label="Nome do Produto"
                required
              />
              <v-text-field
                v-if="dialog.type === 'product'"
                v-model="formData.preco"
                label="Preço"
                type="number"
                required
              />
              <v-text-field
                v-if="dialog.type === 'product'"
                v-model="formData.marcaId"
                label="ID da Marca"
                type="number"
                required
              />
              <v-file-input
                v-if="dialog.type === 'product'"
                v-model="formData.imagemArquivo"
                label="Imagem do Produto"
                accept="image/*"
              />
              <v-file-input
                v-if="dialog.type === 'product'"
                v-model="formData.imagemHoverArquivo"
                label="Imagem Hover"
                accept="image/*"
              />
              <v-text-field
                v-if="dialog.type === 'brand'"
                v-model="formData.nome"
                label="Nome da Marca"
                required
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="dialog.type === 'product' ? saveProduct() : saveBrand()">
              Salvar
            </v-btn>
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
        { text: "Produtos", href: "#dashboard", icon: "fa fa-tachometer-alt" },
        { text: "Marcas", href: "#marcas", icon: "fa fa-box" },
        { text: "Permissões", href: "#permissao", icon: "fa fa-tag" },
      ],
      products: [],
      headers: [
        { text: "ID", value: "id" },
        { text: "Nome", value: "nome" },
        { text: "Preço", value: "preco" },
        { text: "Marca ID", value: "marcaId" },
        { text: "Imagem", value: "imagem" },
        { text: "Ações", value: "actions" },
      ],
      loading: false,
      isMobile: window.innerWidth <= 768,
      dialog: { open: false, type: null },
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
<<<<<<< HEAD
    navigateTo(href) {
      this.menuItems.forEach((item) => (item.active = item.href === href));
      this.$router.push(href);
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
=======
    goToHome() {
    this.$router.push("/");
>>>>>>> c92fbd9b2a1774b2c2f2e92a6bd45c2ab0649759
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
      const formData = new FormData();
      formData.append("Id", this.formData.id);
      if (this.formData.nome) formData.append("Nome", this.formData.nome);
      if (this.formData.preco !== null) formData.append("Preco", this.formData.preco);
      if (this.formData.marcaId !== null) formData.append("MarcaId", this.formData.marcaId);
      if (this.formData.imagemArquivo)
        formData.append("imagem", this.formData.imagemArquivo);
      if (this.formData.imagemHoverArquivo)
        formData.append("imagemHover", this.formData.imagemHoverArquivo);

<<<<<<< HEAD
      try {
        const response = await axios.put(
          `https://localhost:7250/api/product/${this.formData.id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        this.showSnackbar("Produto salvo com sucesso!", "success");
        await this.fetchProducts();
        this.closeDialog();
      } catch (error) {
        const backendErrors = error.response?.data.errors;
        let errorMessage = error.response?.data?.title || "Erro ao salvar produto.";
        if (backendErrors) {
          errorMessage += "\n" + Object.entries(backendErrors)
            .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : value}`)
            .join("\n");
        }
        this.showSnackbar(errorMessage, "error");
      }
    },
=======
  formData.append("Id", this.formData.id); 
  if (this.formData.nome) formData.append("Nome", this.formData.nome);
  if (this.formData.preco !== null) formData.append("Preco", this.formData.preco);
  if (this.formData.marcaId !== null) formData.append("MarcaId", this.formData.marcaId);
  if (this.formData.imagemArquivo)
    formData.append("imagem", this.formData.imagemArquivo);
  if (this.formData.imagemHoverArquivo)
    formData.append("imagemHover", this.formData.imagemHoverArquivo);

  console.log("Dados enviados:", [...formData.entries()]);

  try {
    const response = await axios.put(
      `https://localhost:7250/api/product/${this.formData.id}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    console.log("Resposta do backend:", response.data);
    this.showSnackbar("Produto salvo com sucesso!", "success");

    await this.fetchProducts();

    this.closeDialog();
  } catch (error) {
    const backendErrors = error.response?.data.errors;
    console.error("Erros detalhados:", backendErrors || error.response?.data || error);

    let errorMessage = error.response?.data?.title || "Erro ao salvar produto.";
    if (backendErrors) {
      errorMessage += "\n" + Object.entries(backendErrors)
        .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : value}`)
        .join("\n");
    }

    this.showSnackbar(errorMessage, "error");
  }
},
>>>>>>> c92fbd9b2a1774b2c2f2e92a6bd45c2ab0649759
    async deleteProduct(id) {
      try {
        await axios.delete(`https://localhost:7250/api/product/${id}`);
        this.fetchProducts();
        this.showSnackbar("Produto deletado com sucesso!", "success");
      } catch (error) {
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

<<<<<<< HEAD


=======
>>>>>>> c92fbd9b2a1774b2c2f2e92a6bd45c2ab0649759
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
  background-color: #e3e9f7;
}

.dashboard-container {
  display: flex;
}

#sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #2b2b2b;
  height: 100vh;
  border-radius: 0px 18px 18px 0px;
  position: relative;
  transition: all 0.5s;
  min-width: 82px;
  z-index: 2;
}

<<<<<<< HEAD
#sidebar_content {
  padding: 12px;
=======
.sidebar {
  width: 250px;
  background: #1e1e1e;
  transition: width 0.3s ease;
>>>>>>> c92fbd9b2a1774b2c2f2e92a6bd45c2ab0649759
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
  color: #6b6b6b;
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
  background-color: #e3e9f7;
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

<<<<<<< HEAD
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
  color: #ffffff;
  background-color: transparent;
}

#open_btn {
  position: absolute;
  top: 30px;
  right: -10px;
  background-color: #0044ff;
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
  color: #ffffff;
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
=======
.content {
  flex: 1;
  padding: 20px;
}

@media (max-width: 768px) {
  .desktop-table {
    display: none;
  }
  .mobile-table {
    display: block;
  }
}
>>>>>>> c92fbd9b2a1774b2c2f2e92a6bd45c2ab0649759
</style>