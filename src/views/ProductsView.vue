<template>
    <div class="products-view">
      <!-- Barra de Pesquisa e Filtro -->
      <div class="search-filter">
        <input v-model="searchQuery" type="text" placeholder="Pesquisar produtos..." />
        <select v-model="selectedCategory">
          <option value="">Todas Categorias</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
  
      <!-- Lista de Produtos -->
      <div class="products-grid">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="product-card"
        >
          <img :src="product.image" alt="Imagem do Produto" class="product-image" />
          <h3>{{ product.name }}</h3>
          <p>{{ product.description }}</p>
          <p class="product-price">{{ product.price }}</p>
          <router-link :to="`/product/${product.id}`" class="details-link">Ver Detalhes</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import mainImage1 from '@/assets/img/1.svg';
  import mainImage2 from '@/assets/img/2.svg';
  
  export default {
    data() {
      return {
        searchQuery: '',
        selectedCategory: '',
        products: [
          {
            id: 0,
            name: 'Gabini® K-29 Premium Headset',
            description: 'Headset with Multi-Device Connectivity and Noise-Canceling Technology, Black.',
            price: 'R$ 199,99',
            category: 'Headsets',
            image: mainImage1 // Use a variável importada
          },
          {
            id: 1,
            name: 'Gabini® K-30 Premium Headset',
            description: 'Another product description here.',
            price: 'R$ 299,99',
            category: 'Headsets',
            image: mainImage2 
          },
        ]
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
      }
    }
  };
  </script>
  
  <style scoped>
  .products-view {
    padding: 20px;
  }
  
  .search-filter {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .search-filter input {
    padding: 8px;
    font-size: 16px;
    flex-grow: 1;
  }
  
  .search-filter select {
    padding: 8px;
    font-size: 16px;
  }
  
  .products-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .product-card {
    border: 1px solid #ddd;
    padding: 15px;
    width: 200px;
    text-align: center;
    border-radius: 8px;
  }
  
  .product-image {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
  
  .product-price {
    font-weight: bold;
    color: #333;
  }
  
  .details-link {
    display: inline-block;
    margin-top: 10px;
    color: #007bff;
    text-decoration: none;
  }
  </style>
  