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
      <div class="content" :class="{ 'content-expanded': !sidebarOpen }">
        <v-container>
          <!-- Título Principal -->
          <v-row justify="space-between" align="center" class="mb-4">
            <h2>Gerencie seus produtos</h2>
          </v-row>
  
          <!-- Tabela ou Cartões (dependendo do dispositivo) -->
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
              <v-btn color="black darken-1" text @click="openUpdateDialog(item)">Atualizar</v-btn>
              <v-btn color="red darken-1" text @click="deleteProduct(item.id)">Deletar</v-btn>
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
                <v-btn color="black darken-1" text @click="openUpdateDialog(product)">Atualizar</v-btn>
                <v-btn color="red darken-1" text @click="deleteProduct(product.id)">Deletar</v-btn>
              </div>
            </div>
          </div>
  
          <!-- Carregamento -->
          <v-row justify="center" v-if="loading">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </v-row>
  
          <!-- Diálogo de Atualização -->
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>Atualizar Produto</v-card-title>
              <v-card-text>
                <v-form ref="form">
                  <v-text-field v-model="formData.nome" label="Nome do Produto" required />
                  <v-text-field v-model="formData.preco" label="Preço" type="number" required />
                  <v-text-field v-model="formData.marcaId" label="ID da Marca" type="number" required />
                  <v-text-field v-model="formData.imagem" label="URL da Imagem" />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click="updateProduct">Salvar</v-btn>
                <v-btn color="grey" @click="closeDialog">Cancelar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-container>
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
            { text: "Relatórios", href: "#relatorios", icon: "fa fa-chart-line" },
            { text: "Configurações", href: "#configuracoes", icon: "fa fa-cogs" },
            { text: "Logout", href: "#logout", icon: "fa fa-sign-out-alt" },
        ],
        products: [],
        headers: [
          { text: "ID", value: "id" },
          { text: "Nome", value: "nome" },
          { text: "Preço", value: "preco" },
          { text: "ID da Marca", value: "marcaId" },
          { text: "Imagem", value: "imagem", sortable: false },
          { text: "Ações", value: "actions", sortable: false },
        ],
        loading: false,
        dialog: false,
        formData: {
          id: null,
          nome: "",
          preco: "",
          marcaId: null,
          imagem: "",
        },
      };
    },
    methods: {
      toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen;
      },
      navigate(href) {
        window.location.href = href;
      },
      async fetchProducts() {
        this.loading = true;
        try {
          const response = await axios.get("https://localhost:7250/api/Product/");
          this.products = response.data.$values || [];
        } catch (error) {
          console.error("Erro ao buscar produtos:", error);
        } finally {
          this.loading = false;
        }
      },
      openUpdateDialog(product) {
        this.formData = { ...product };
        this.dialog = true;
      },
      async updateProduct() {
        try {
          await axios.put(
            `https://localhost:7250/api/Product/${this.formData.id}`,
            this.formData
          );
          this.fetchProducts();
          this.closeDialog();
        } catch (error) {
          console.error("Erro ao atualizar produto:", error);
        }
      },
      async deleteProduct(id) {
        try {
          await axios.delete(`https://localhost:7250/api/Product/${id}`);
          this.fetchProducts();
        } catch (error) {
          console.error("Erro ao deletar produto:", error);
        }
      },
      closeDialog() {
        this.dialog = false;
      },
    },
    mounted() {
      this.fetchProducts();
    },
  };
  </script>
  
  <style scoped>
/* Estilos globais e do container */
.dashboard-container {
  display: flex;
  height: 100vh;
  background-color: #121212; /* Fundo preto fosco */
  color: #e0e0e0; /* Texto cinza claro */
  transition: margin-left 0.3s;
}

.sidebar {
  width: 250px;
  background-color: #1e1e1e; 
  color: #e0e0e0;
  padding: 10px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100%;
  overflow-y: auto;
  z-index: 100;
  transition: width 0.3s;
}

.sidebar-closed {
  width: 60px;
}


.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sidebar-title {
  font-size: 18px;
  font-weight: bold;
  display: inline-block;
  transition: opacity 0.3s;
  white-space: nowrap;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
  margin-top: 20px;
}

.sidebar-menu li {
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 5px 0;
  border-radius: 4px;
  transition: background-color 0.3s, transform 0.2s;
}
.sidebar-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  width: 100%;
}
.sidebar-link:hover {
  background-color: #333;
  transform: translateX(5px);
}

.sidebar-link i {
  font-size: 20px;
  margin-right: 10px;
}

.sidebar-menu li:hover {
  background-color: #333;
  transform: translateX(5px);
}

.sidebar-menu li v-icon {
  margin-right: 10px;
  font-size: 18px;
}



/* Ícone do botão de abrir/fechar sidebar */
.sidebar-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  background-color: #333;
  border-radius: 50%;
  transition: background-color 0.3s;
}

.sidebar-toggle:hover {
  background-color: #555;
}

.content {
  margin-left: 250px;
  padding: 20px;
  flex-grow: 1;
  background-color: #181818;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  transition: margin-left 0.3s;
}

.content-expanded {
  margin-left: 60px; 
}


.dashboard-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #ffffff;
  text-align: center;
}

/* Estilo da Tabela */
.v-data-table {
  background-color: #1e1e1e; /* Fundo preto fosco */
  color: #e0e0e0;
  border-radius: 8px;
  max-width: 90%; /* Centraliza e ajusta tamanho */
}

.v-data-table th {
  background-color: #333; /* Fundo mais escuro para cabeçalhos */
  color: #ffffff;
}

.v-data-table td {
  color: #e0e0e0;
}

.v-btn {
  color: #fff;
  text-transform: none;
  border-radius: 6px;
  transition: background-color 0.3s;
}

.v-btn:hover {
  background-color: #555; /* Realce suave */
}

.v-dialog {
  background-color: #232323; /* Fundo escuro */
  color: #e0e0e0;
  border-radius: 8px;
}

/* Responsividade */
@media (max-width: 1024px) {
  .sidebar {
    width: 200px;
  }
  .content {
    margin-left: 200px;
  }
}

@media (max-width: 768px) {
  .sidebar {
    width: 150px;
  }
  .content {
    margin-left: 150px;
  }
}

@media (max-width: 480px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  .sidebar-closed {
    width: 100%;
  }
  .content {
    margin-left: 0;
  }
  
}
@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }

  .content {
    margin-left: 0;
    padding: 10px;
  }

  .v-data-table {
    max-width: 100%;
    overflow-x: auto;
  }
}

@media (max-width: 480px) {
  .sidebar-link span {
    display: none; /* Oculta o texto na sidebar */
  }

  .sidebar {
    padding: 5px;
  }
}

</style>