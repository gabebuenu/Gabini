<template>
  <div class="products-section">
    <h2>NEW PRODUCTS</h2>
    <p>Choose the headset that best suits your needs. We offer top-quality options with a variety of features to enhance your audio experience</p>
    <div class="product-list">
      <div
        class="product-card"
        v-for="(product, index) in products"
        :key="product.id"
        @click="navigateToProduct(product.id)"
        @mouseover="hoverImage(index)"
        @mouseout="resetImage(index)"
      >
        <img
          :src="product.currentSrc"
          alt="Headset"
          class="product-image"
        >
        <p>{{ product.nome }}</p>
        <div class="price">
          {{ product.preco | currency }}
        </div>
        <button>ADD TO CART<i class="bi bi-cart3"></i></button>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    const navigateToProduct = (id) => {
      router.push({ name: 'product', params: { id } });
    };

    return { navigateToProduct };
  },
  data() {
    return {
      products: [],
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('https://localhost:7250/api/Product');
        console.log('Resposta completa da API:', response.data);

        if (Array.isArray(response.data.$values)) {
          this.products = response.data.$values
            .filter(product => [1, 2, 3].includes(product.id))
            .map(this.formatProduct);
          console.log('Produtos formatados:', this.products);
        } else {
          console.error('Erro: `response.data.$values` não é uma lista de produtos', response.data);
        }
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    },
    formatProduct(product) {
      console.log('Processando produto:', product);

      const formattedProduct = {
        id: product.id,
        nome: product.nome,
        preco: product.preco,
        src: product.imagem
          ? `data:image/svg+xml;base64,${product.imagem}`
          : 'https://via.placeholder.com/150',
        hoverSrc: product.imagemHover
          ? `data:image/svg+xml;base64,${product.imagemHover}`
          : null,
        currentSrc: product.imagem
          ? `data:image/svg+xml;base64,${product.imagem}`
          : 'https://via.placeholder.com/150',
      };

      console.log(`Produto ID: ${product.id}, Nome: ${product.nome}`);
      console.log('Imagem principal:', formattedProduct.src);
      console.log('Imagem hover:', formattedProduct.hoverSrc);

      return formattedProduct;
    },
    hoverImage(index) {
      const product = this.products[index];
      console.log(`Hover na imagem do produto (index: ${index}, ID: ${product.id})`);
      console.log('Imagem atual:', product.currentSrc);
      console.log('Imagem hover:', product.hoverSrc);

      if (product.hoverSrc) {
        product.currentSrc = product.hoverSrc;
        console.log('Imagem trocada para hover:', product.currentSrc);
      } else {
        console.warn(`Produto ID: ${product.id} não possui imagem hover.`);
      }
    },
    resetImage(index) {
      const product = this.products[index];
      console.log(`Reset hover na imagem do produto (index: ${index}, ID: ${product.id})`);
      console.log('Imagem retornando para:', product.src);

      product.currentSrc = product.src;
    },
  },
  filters: {
    currency(value) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value);
    },
  },
};
</script>

<style scoped>
.products-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;           
    width: 90%;                 
    max-width: 1400px;
    padding: 40px;
    margin: 60px auto;           
    background-color: #f7f7f7;
    border: 1px solid #ddd; 
    border-radius: 25px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); 
    text-align: center; 
}

.products-section h2 {
    font-size: 28px;
    margin-bottom: 10px;
    font-weight: 700;
}

.products-section p {
    color: #666;
    margin-bottom: 30px;
    max-width: 600px;
    margin: 0 auto;
}

.product-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap; 
    gap: 20px;
}

.product-card {
    background-color: transparent;
    border-radius: 10px;
    padding: 20px;
    width: 250px;
    text-align: center;
    overflow: hidden;
    cursor: pointer; 
    transition: transform 0.3s ease; 
}

.product-card:hover {
    transform: scale(1.05); 
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2); 
}

.product-card img {
    width: 100%;
    transform: scale(3);
    transform-origin: center;
    margin-bottom: 50px;
    margin-top: 50px;
}

.product-card h3 {
    font-size: 18px;
    margin: 10px 0;
}

.product-card .price {
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
    position: relative;
    display: inline-block;
    font-weight: 700;
}

.product-card .price::before {
    content: '$';
    font-size: 14px;
    position: relative;
    top: -10px;
    margin-right: 2px;
}

.product-card .original-price {
    font-size: 12px;
    text-decoration: line-through;
    color: #ff0000;
    position: relative;
    margin-left: 5px;
    top: -10px;
}

.product-card button {
    background-color: #fff;
    color: #000;
    border: 1px solid #b9b9b9;
    border-radius: 30px;
    padding: 8px 10px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: auto;
    max-width: none;
    margin: 0 auto;
    cursor: pointer;
    position: relative;
    transition: border-color 0.3s ease;
}

.product-card button:hover {
    border-color: #000;
}

.product-card button i {
    background-color: #000;
    color: #fff;
    border-radius: 50%;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
}

@media (max-width: 768px) {
    .products-section {
        max-width: 90%;
        margin: 0 auto;
        padding: 20px;
    }

    .product-list {
        flex-direction: column;
        align-items: center;
    }

    .product-card {
        width: 100%; 
    }
}
</style>