<template>
  <div>
    <!-- Navbar Bruno -->
    <Bruno class="bruno-navbar" />

    <!-- Container Principal de Produtos -->
    <div class="products-view">
      <!-- Barra de Pesquisa e Filtro -->
      <div class="search-filter">
        <input v-model="searchQuery" type="text" placeholder="Pesquisar produtos..." class="search-input" />
        <select v-model="selectedCategory" class="category-select">
          <option value="">Todas Categorias</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>

      <!-- Grid de Produtos -->
      <div class="products-grid">
        <div
          v-for="product in paginatedProducts"
          :key="product.id"
          class="product-card"
        >
          <img :src="product.image" alt="Imagem do Produto" class="product-image" />
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-description">{{ product.description }}</p>
          <p class="product-price">{{ product.price }}</p>
          <router-link :to="`/product/${product.id}`" class="details-link">Ver Detalhes</router-link>
        </div>
      </div>

      <!-- Paginação -->
      <div class="pagination" v-if="totalPages > 1">
        <button @click="currentPage--" :disabled="currentPage === 1">Anterior</button>
        <button
          v-for="page in totalPages"
          :key="page"
          @click="currentPage = page"
          :class="{ active: currentPage === page }"
        >
          {{ page }}
        </button>
        <button @click="currentPage++" :disabled="currentPage === totalPages">Próxima</button>
      </div>
    </div>

    <!-- Footer Bruno -->
    <FooterBruno />
  </div>
</template>

<script>
import Bruno from '@/components/Home/Bruno.vue';
import FooterBruno from '@/components/Home/FooterBruno.vue';
import axios from 'axios';

export default {
  components: {
    Bruno,
    FooterBruno
  },
  data() {
    return {
      searchQuery: '',
      selectedCategory: '',
      products: [],
      productsPerPage: 10,
      currentPage: 1
    };
  },
  computed: {
    categories() {
      return [...new Set(this.products.map(product => product.category))];
    },
    filteredProducts() {
      return this.products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesCategory = this.selectedCategory ? product.category === this.selectedCategory : true;
        return matchesSearch && matchesCategory;
      });
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.productsPerPage;
      const end = start + this.productsPerPage;
      return this.filteredProducts.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.productsPerPage);
    }
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
  try {
    const response = await axios.get('https://localhost:7250/api/Product');
    console.log("API Response:", response.data);  // Verifique o formato da resposta da API

    // Verifique se response.data.$values existe e é um array
    if (response.data && Array.isArray(response.data.$values)) {
      this.products = response.data.$values.map(product => ({
        id: product.id,
        name: product.nome,
        description: 'Descrição do produto', // Ajuste conforme necessário
        price: `R$ ${product.preco.toFixed(2)}`,
        category: product.category || 'Categoria Padrão', // Ajuste conforme necessário
        image: product.imagem
      }));
    } else if (Array.isArray(response.data)) {
      this.products = response.data.map(product => ({
        id: product.id,
        name: product.nome,
        description: 'Descrição do produto', // Ajuste conforme necessário
        price: `R$ ${product.preco.toFixed(2)}`,
        category: product.category || 'Categoria Padrão', // Ajuste conforme necessário
        image: product.imagem
      }));
    } else {
      console.error("Erro: `response.data` não é um array de produtos nem contém `$values`", response.data);
    }
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
  }
    }
  }
};
</script>
  
  <style scoped>
  .bruno-navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000; /* Certifique-se de que está acima dos outros elementos */
    background-color: white; /* Defina a cor de fundo para que seja visível */
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Opcional: adicione uma sombra para destacar */
  }

  /* Estilo UI Design e Responsivo */
  .products-view {
    padding: 20px;
    max-width: 1200px;
    margin: 100px auto;
  }
  
  .search-filter {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    justify-content: space-between;
  }
  
  .search-input,
  .category-select {
    padding: 10px;
    font-size: 16px;
    flex: 1;
    max-width: 200px;
  }
  
  .products-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }
  
  .product-card {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    width: 100%;
    max-width: 250px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.2s;
  }
  
  .product-card:hover {
    transform: translateY(-5px);
  }
  
  .product-image {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 10px;
  }
  
  .product-name {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin: 10px 0;
  }
  
  .product-description {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
  }
  
  .product-price {
    font-weight: bold;
    color: #007bff;
    margin-bottom: 10px;
  }
  
  .details-link {
    display: inline-block;
    margin-top: 10px;
    color: #007bff;
    text-decoration: none;
    font-weight: bold;
  }
  
  .details-link:hover {
    text-decoration: underline;
  }
  
  /* Responsivo */
  @media (max-width: 768px) {
    .search-filter {
      flex-direction: column;
      align-items: stretch;
    }
  
    .products-grid {
      flex-direction: column;
      align-items: center;
    }
  
    .product-card {
      width: 90%;
      max-width: none;
    }
  }
  .pagination {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
}

.pagination button.active {
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
  </style>
  