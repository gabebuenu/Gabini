<template>
    <div>
      <!-- Navbar Bruno -->
      <Bruno />
  
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
            v-for="product in filteredProducts"
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
      </div>
  
      <!-- Footer Bruno -->
      <FooterBruno />
    </div>
  </template>
  
  <script>
  import Bruno from '@/components/Home/Bruno.vue';
  import FooterBruno from '@/components/Home/FooterBruno.vue';
  import mainImage1 from '@/assets/img/1.svg';
  import mainImage2 from '@/assets/img/2.svg';
  
  export default {
    components: {
      Bruno,
      FooterBruno
    },
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
            image: mainImage1
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
  /* Estilo UI Design e Responsivo */
  .products-view {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
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
  </style>
  