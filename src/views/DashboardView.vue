<template>
  <div class="dashboard-container">
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ 'sidebar-closed': !sidebarOpen }">
      <div class="sidebar-header">
        <button class="sidebar-toggle" @click="toggleSidebar">
          <i :class="sidebarOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
        </button>
      </div>
      <ul class="sidebar-menu">
        <li v-for="item in menuItems" :key="item.text">
          <a :href="item.href" class="sidebar-link">
            <i :class="item.icon"></i>
            <span v-show="sidebarOpen">{{ item.text }}</span>
          </a>
        </li>
      </ul>
    </aside>

    <!-- Main Content -->
    <div class="content">
      <div class="header">
        <h1>Dashboard</h1>
        <div class="actions">
          <v-btn color="primary" @click="openCreateDialog('product')">
            Criar Produto
          </v-btn>
          <v-btn color="secondary" @click="openCreateDialog('brand')">
            Criar Marca
          </v-btn>
          <Router-Link to="/">
          <v-btn @click="goToHome">
            Voltar à Tela Inicial
          </v-btn>
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
              <!-- Campos para produto -->
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
              <!-- Campo para marca -->
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
      menuItems: [
        { text: "Dashboard", href: "#dashboard", icon: "fa fa-tachometer-alt" },
        { text: "Produtos", href: "#produtos", icon: "fa fa-box" },
        { text: "Marcas", href: "#marcas", icon: "fa fa-tag" },
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
    goToHome() {
    this.$router.push("/");
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
  },
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
  height: 100vh;
  background: #121212;
  color: #ffffff;
}

.sidebar {
  width: 250px;
  background: #1e1e1e;
  transition: width 0.3s ease;
}
.sidebar-closed {
  width: 60px;
}
.sidebar-link {
  display: flex;
  align-items: center;
  padding: 15px;
  color: #ffffff;
}
.sidebar-link:hover {
  background: #333333;
}

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
</style>