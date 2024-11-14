<template>
  <div class="hero">
      <div class="container d-flex align-items-center justify-content-between">
          <div class="text-box">
              <h1>Gabini <br>Headset <br> Store</h1>
              <div class="info">
                  <h2>Welcome to Gabini quality, at <br> our most welcoming price.</h2>
                  <button class="btn_hero">See More Details <div class="btn-ball"><img src="../../assets/img/arrow.svg" alt=""></div></button>
              </div>
              <div class="ratings">
                  <div class="stars"><div class="stars-box"><h3>4.8</h3><img src="../../assets/img/gati.svg" alt=""></div><p>2,290 ratings</p></div>
                  <div class="ten-k"><h2>10k+</h2><p>Bought in past month</p></div>
              </div>
          </div>
          <div class="card-head"> <img class="phone" src="../../assets/img/image_.svg" alt="">
          <div class="ch-desc"> <div class="ch-circle"><img src="../../assets/img/line.svg" alt=""></div><div class="ch-text"><p>Warranty</p><b>2 years</b></div></div>
          <div class="ch-desc1"> <div class="ch-circle"><img src="../../assets/img/line1.svg" alt=""></div><div class="ch-text"><p>Battery</p><b>78 Hours</b></div></div>
          </div>
      </div>
      <div class="hl-box">
          <div class="line1">
              <div class="line-box"><span>Your text here</span> <img src="../../assets/img/line.png" alt="" class="vector"></div>
          </div>
          <div class="line2">
              <div class="line-box1"><span>Your text here</span> <img src="../../assets/img/line.png" alt="" class="vector"></div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
mounted() {
  const line1 = this.$el.querySelector('.line1');
  const line2 = this.$el.querySelector('.line2');

  const originalContentLine1 = line1.innerHTML;
  const originalContentLine2 = line2.innerHTML;

  const numberOfCopies = 100;

  for (let i = 0; i < numberOfCopies; i++) {
    line1.innerHTML += originalContentLine1; 
    line2.innerHTML += originalContentLine2; 
  }
}
}
</script>

<style scoped>
.hero {
  overflow: visible !important;
  width: 100%;
  height: auto;
  position: relative;
  display: flex;
  align-items: center;
  overflow-y: auto;
  height: auto;
  justify-content: center;
  padding: 20px;
  min-height: 100vh;
}

.container {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.text-box h1 {
  font-size: 4rem;
  margin-top: 40px;
}

.vector {
  width: 10px;
  height: 10px;
  margin-right: 30px;
}

.line1, .line2 {
  text-transform: uppercase;
  position: absolute;
  display: flex;
  height: 3rem;
  white-space: nowrap;
  color: #fff;
  background: #000; 
  align-items: center;
  justify-content: center;
}

.line1 {
  z-index: -2;
  width: 120%;
  right: -30%;
  top: 300px;
  transform: rotate(26deg);
}


.line2 {
  top: 300px;
  z-index: -1;
  width: 80%;
  right: -45%;
  transform: rotate(-25deg);
}

.line-box, .line-box1 {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  animation-duration: 10s; 
  animation-timing-function: linear; 
  animation-iteration-count: infinite;
}

@keyframes moveRightToLeft {
  0% { transform: translateX(-300%); }     
  50% { transform: translateX(300%); } 
  100% { transform: translateX(-300%); }   
}

@keyframes moveLeftToRight {
  0% { transform: translateX(300%); }     
  50% { transform: translateX(-300%); } 
  100% { transform: translateX(300%); }  
}

.line-box {
  animation-name: moveRightToLeft;
}

.line-box1 {
  animation-name: moveLeftToRight;
}

h1 {
  text-transform: uppercase;
  font-weight: 700 !important;
  color: #000 !important;
  font-size: 7rem !important;
  line-height: 1 !important;
}


@media (max-width: 768px) {
  .text-box h1 {
    font-weight: 900 !important;
    text-align: left;
    font-size: 5.5rem !important; 
    line-height: 1.2 !important; 
    margin: 10px 0 !important; 
  }
}

@media (max-width: 480px) {
  .text-box h1 {
    font-weight: 900 !important;
    text-align: left;
    font-size: 4.5rem !important;
    line-height: 1.3 !important;
  }
}
@media (max-width: 480px) {
  .ten-k h2 {
    font-weight: 900 !important; 
    text-transform: uppercase;
  }

  .ten-k p{
    text-align: left;
  }
}

.text-box {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.text-box h2 {
  font-weight: 600;
  font-size: 40px;
}

.btn_hero {
  max-width: 250px;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 14px;
  align-items: center;
  gap: 20px;
  padding: 10px 5px 10px 20px;
  display: flex;
  border: 1px solid  rgba(0, 0, 0, 0.223);
  border-radius: 60px;
  background-color: #fff;
  justify-content: space-between;
  transition: 400ms;
}

.btn_hero:hover {
  border: 1px solid  #000;
}

.btn-ball {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  filter: invert(1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.info {
  display: flex;
  flex-direction: column;
  border-left: 2px solid rgba(0, 0, 0, 0.223);
  padding-left: 30px;
  gap: 30px;
}

.ratings {
  display: flex;
  gap: 40px;
  color: #000;
}

.stars  {
  display: flex;
  flex-direction: column;
}

.stars p {
  font-weight: 300;
  color: gray;
  margin-top: 10px;
}

.stars-box {
  align-items: center;
  gap: 20px;
  justify-content: center;
  display: flex;
}

.stars-box img {
  padding-bottom: 09px;
}

.ten-k {
  font-weight: 500;
}

.ten-k h2 {
  text-transform: uppercase;
}

.card-head {
  border-radius: 30px;
  background-image: url(/src/assets/img/retangulo.svg);
  background-size: cover;
  width: 100%;
  max-width: 34rem;
  height: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  position: relative;
}

.phone {
  width: 100%;
  max-width: 450px;
  position: relative;
  margin-bottom: 10px;
}

.ch-desc, .ch-desc1 {
  padding-left: 16px;
  position: absolute;
  width: 260px;
  display: flex;
  align-items: center;
  height: 92px;
  background: #fff;
  z-index: 100;
  border-radius: 60px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.ch-desc {
  top: 20%;
  right: -8%;
}

.ch-desc1 {
  top: 75%;
  left: 5%;
}

.ch-circle {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
  border-radius: 50%;
}

.ch-text {
  display: flex;
  flex-direction: column;
  line-height: 0.5;
  margin-left: 16px;
}

.ch-text p {
  color: #00000078;
  font-size: 18px;
}

.ch-text b {
  font-size: 20px;
}

/* Estilos específicos para dispositivos móveis */
@media (max-width: 768px) {
  .hero {
    flex-direction: column;
    align-items: right;
    padding: 20px;
  }

  .text-box {
    text-align: center;
    gap: 20px;
  }

  .text-box h1 {
    font-size: 1rem;
  }

  .text-box h2 {
    font-size: 1rem;
  }

  .info {
    padding-left: 0;
    border-left: none;
  }

  .ratings {
    justify-content: center;
    gap: 10px;
  }

  /* .card-head {
    width: 100%;
    max-width: 90%;
    margin: 20px 0;
  } */


}

@media (max-width: 768px) {
  .hl-box {
    overflow-y: auto;
    gap: 15px;
  }

  .line1, .line2 {
    height: 2rem; 
    width: 100%; 
    transform: none; 
    overflow: hidden;
  }

  .line1 {
    right: 0;
    top: 0;
  }

  .line2 {
    right: 0;
    top: 0;
  }

  .line-box, .line-box1 {
    gap: 5px; 

  .vector {
    width: 8px; 
    height: 8px;
  }
}
}
</style>
