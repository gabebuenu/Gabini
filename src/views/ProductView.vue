<template>
  <!-- Navbar Bruno -->
  <Bruno class="bruno-navbar" />

  <!-- Product Container -->
  <div ref="productContainer" class="product-container">
    <div class="product-image-section">
      <!-- Botão de seta esquerda -->
      <button class="arrow-button left-arrow" @click="previousImage">‹</button>
      
      <!-- Imagem principal do produto -->
      <img :src="currentImage" alt="Produto" class="main-image" />
      
      <!-- Botão de seta direita -->
      <button class="arrow-button right-arrow" @click="nextImage">›</button>
      
      <!-- Imagem de pré-visualização menor -->
      <img :src="previewImage" alt="Pré-visualização" class="preview-image" @click="swapImages" />
    </div>

    <div class="product-details">
      <!-- Nome do Produto -->
      <h2 class="product-name">{{ product.name }}</h2>

      <!-- Descrição do Produto -->
      <p class="product-description">{{ product.description }}</p>

      <!-- Preço do Produto -->
      <div class="product-price">{{ product.price }}</div>

      <!-- Botão de Compra -->
      <button @click="addToCart" class="buy-button">Comprar</button>
    </div>
  </div>

  <!-- Footer Bruno -->
  <FooterBruno />
</template>


<script>
import Bruno from '@/components/Home/Bruno.vue';
import FooterBruno from '@/components/Home/FooterBruno.vue';
import mainImage1 from '@/assets/img/1.svg';
import previewImage1 from '@/assets/img/2.svg';

export default {
  components: {
    Bruno,
    FooterBruno
  },
  props: ['id'],
  data() {
    const products = [
      {
        mainImages: [mainImage1, previewImage1],
        name: 'Gabini® K-29 Premium Headset',
        description: 'Headset with Multi-Device Connectivity and Noise-Canceling Technology, Black.',
        price: 'R$ 199,99'
      },
      {
        mainImages: [mainImage1, previewImage1],
        name: 'Gabini® K-30 Premium Headset',
        description: 'Another product description here.',
        price: 'R$ 299,99'
      }
    ];

    return {
      product: products[this.$route.params.id] || products[0],
      currentImageIndex: 0,
    };
  },
  computed: {
    currentImage() {
      return this.product.mainImages[this.currentImageIndex];
    },
    previewImage() {
      return this.product.mainImages[1 - this.currentImageIndex]; 
    }
  },
  methods: {
    addToCart() {
      console.log('Produto adicionado ao carrinho!');
    },
    swapImages() {
      this.currentImageIndex = 1 - this.currentImageIndex;
    },
    previousImage() {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.product.mainImages.length) % this.product.mainImages.length;
    },
    nextImage() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.product.mainImages.length;
    }
  },
  mounted() {
    // Usa o ref para rolar até o início da `product-container`
    this.$nextTick(() => {
      if (this.$refs.productContainer) {
        this.$refs.productContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
};
</script>


<style scoped>
/* Estilo fixo para a barra de navegação */
.bruno-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* Certifique-se de que está acima dos outros elementos */
  background-color: white; /* Defina a cor de fundo para que seja visível */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Opcional: adicione uma sombra para destacar */
}

/* Ajuste o padding superior para que o conteúdo abaixo da navbar não fique escondido */
.product-container {
  display: flex;
  gap: 170px;
  padding: 80px 20px 20px; /* 80px de padding-top para evitar sobreposição */
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  box-sizing: border-box;
}

/* Resto dos estilos... */
.product-image-section {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-image {
  width: 400px;
  height: 400px;
  border: 1px solid black;
  border-radius: 10px;
  object-fit: cover;
  margin-bottom: 10px;
}

.preview-image {
  width: 50px;
  height: 50px;
  border: 1px solid black;
  border-radius: 5px;
  object-fit: cover;
  cursor: pointer;
  margin-top: 10px;
}

.arrow-button {
  position: absolute;
  top: 40%;
  transform: translateY(-50%);
  font-size: 2em;
  background: transparent;
  border: none;
  color: black;
  cursor: pointer;
}

.left-arrow {
  left: -40px;
}

.right-arrow {
  right: -40px;
}

.product-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
}

.product-name {
  font-size: 1.5em;
  font-weight: bold;
  margin: 0;
}

.product-description {
  color: #333;
  margin: 0;
}

.product-price {
  font-size: 2em;
  font-weight: bold;
  color: black;
}

.buy-button {
  background-color: black;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s;
}

.buy-button:hover {
  background-color: #333;
}

/* Responsividade para telas menores */
@media (max-width: 768px) {
  .product-container {
    flex-direction: column;
    gap: 20px;
    padding: 90px 10px 10px; /* Ajuste para compensar a navbar fixa */
  }
  
  .main-image {
    width: 300px;
    height: 300px;
  }

  .preview-image {
    width: 40px;
    height: 40px;
  }

  .arrow-button {
    font-size: 1.5em;
  }

  .left-arrow {
    left: -20px;
  }

  .right-arrow {
    right: -20px;
  }

  .product-name {
    font-size: 1.2em;
  }

  .product-price {
    font-size: 1.5em;
  }

  .buy-button {
    font-size: 0.9em;
    padding: 8px 16px;
  }
}

/* Ajustes adicionais para dispositivos muito pequenos */
@media (max-width: 480px) {
  .product-container {
    gap: 15px;
    padding: 100px 5px 5px; /* Ajuste para compensar a navbar fixa */
  }

  .main-image {
    width: 250px;
    height: 250px;
  }

  .preview-image {
    width: 30px;
    height: 30px;
  }

  .product-details {
    text-align: center;
    padding: 0 10px;
  }

  .product-name {
    font-size: 1em;
  }

  .product-description, .product-price {
    font-size: 1em;
  }

  .buy-button {
    font-size: 0.8em;
    padding: 6px 12px;
  }

  .arrow-button {
    font-size: 2.2em;
    top: 45%;
    left: -300px;
    right: -10px;
  }
  .right-arrow{
    font-size: 2.2em;
    top: 45%;
    left: -10px;
    right: -300px;
  }
}
</style>
