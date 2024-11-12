<template>
  <div class="container-headi">
    <div class="produto">
      <img :src="produtoImagem" alt="Fones de Ouvido JBL">
    </div>
    <div class="detalhes-produto">
      <h1>JBL Children's <br> Bluetooth <br> Headphones</h1>
      <div class="avaliacao">
        <span>⭐⭐⭐⭐⭐</span>
        <p>18,921 (reviews)</p>
      </div>
      <div class="opcoes-cor">
        <p>Color Options</p>
        <button class="botao-cor" :class="{ selecionado: corSelecionada === 'azul' }" @click="mudarCor('azul')"></button>
        <button class="botao-cor" :class="{ selecionado: corSelecionada === 'vermelho' }" @click="mudarCor('vermelho')"></button>
      </div>
      <div class="preco">
        <span class="preco-atual">$28</span>
        <span class="preco-original">$35.99</span>
        <span class="desconto">22% off</span>
      </div>
      <a href="#" class="botao-detalhes">
        <span>SEE MORE DETAILS</span>
        <div class="arrow-circle">➜</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
data() {
  return {
    corSelecionada: 'azul',
    imagensProdutos: {
      azul: new URL('@/assets/img/produto1.png', import.meta.url).href,
      vermelho: new URL('@/assets/img/produto2.png', import.meta.url).href  
    }
  };
},
computed: {
  produtoImagem() {
    return this.imagensProdutos[this.corSelecionada];
  }
},
methods: {
  mudarCor(cor) {
    this.corSelecionada = cor;
  }
}
};
</script>

<style>
.container-headi {
    width: 90%;             
    max-width: 1400px;      
    height: 100vh;           
    background-color: #f7f7f7; 
    border: 1px solid #ddd; 
    padding: 20px;         
    margin: 60px auto; 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); 
    border-radius: 25px;
}


.produto img {
    max-width: 100%;
    height: auto;
    border-radius: 15px;
}

.detalhes-produto {
    text-align: center;
    margin-top: 20px;
}

.detalhes-produto h1 {
    font-size: 1.5rem;
    color: #000000;
}

.avaliacao {
    display: flex;
    justify-content: center;
    align-items: center;

}

.avaliacao span {
    font-size: 1.2rem;
    margin-right: 10px;
    color: #FFCC00;
}

.avaliacao p {
    color: #5c9cf1;
}

.opcoes-cor {
    display: flex;
    align-items: center;
}

.botao-cor {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid white;
    margin: 0 10px;
    position: relative;
    display: inline-block;
}

#botaoAzul {
    background: conic-gradient(from 0deg at 50% 100%, #5CD0F3 0deg, #5CD0F3 120deg, #FFA5C5 120deg, #FFA5C5 240deg);
}

#botaoVermelho {
    background: conic-gradient(from 0deg at 50% 50%, #FF5733 0deg, #FF5733 180deg, #2F3C89 180deg, #2F3C89 360deg);
}

.botao-cor::after {
    content: "";
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
}

.botao-cor.selecionado::after {
    display: block;
}

#botaoAzul.selecionado::after {
    width: 10px;
    height: 10px;
}


.preco {
    margin: 20px 0;
}

.preco-atual {
    font-size: 2rem;
    color: #333;
    margin-right: 10px;
}

.preco-original {
    text-decoration: line-through;
    color: #888;
}

.desconto {
    color: black;
    font-weight: bold;
    font-size: 16px;
    padding: 5px 15px;
    border-radius: 50px;
    border: 2px solid transparent; 
    background-image: linear-gradient(white, white),
                      linear-gradient(45deg, rgb(153, 102, 255), rgb(255, 165, 0)); 
    background-origin: border-box;
    background-clip: padding-box, border-box;
    display: inline-block;
    text-align: center;
}


.botao-detalhes {
    display: inline-flex;
    align-items: center;
    padding: 5px 15px;
    background-color: #ffffff;
    color: #000000;
    text-decoration: none;
    border-radius: 50px;
    font-size: 0.7em;
    font-weight: bold;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease;
}

.botao-detalhes:hover {
    background-color: #f1f1f1;
}

.botao-detalhes span {
    margin-right: auto;
    padding: 5px;
}

.botao-detalhes .arrow-circle {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000000;
    color: #ffffff;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    margin-left: 10px;
}

@media (min-width: 768px) {
    .container-headi {
        flex-direction: row;
    }

    .produto {
        margin-right: 20px;
    }

    .detalhes-produto {
        text-align: left;
    }

    .detalhes-produto h1 {
        font-size: 2rem;
    }
}
</style>