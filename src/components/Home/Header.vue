<template>
  <div class="hero">
      <div class="container d-flex align-items-center justify-content-between">
          <div class="text-box">
              <h1>Gabini <br>Headset <br> Store</h1>
              <div class="info">
                  <h2>Welcome to Gabini quality, at <br> our most welcoming price.</h2>
                  <button class="btn_hero">See More Details <div class="btn-ball"><img src="@/assets/img/seta.svg" alt=""></div></button>
              </div>
              <div class="ratings">
                  <div class="stars"><div class="stars-box"><h3>4.8</h3><img src="@/assets/img/Frame 1321314570.svg" alt=""></div><p>2,290 ratings</p></div>
                  <div class="ten-k"><h2>10k+</h2><p>Bought in past month</p></div>
              </div>
          </div>
          <div class="card-head"> <img class="phone" src="@/assets/img/image_166_1.svg" alt="">
          <div class="ch-desc"> <div class="ch-circle"><img src="@/assets/img/Vector.svg" alt=""></div><div class="ch-text"><p>Warranty</p><b>2 years</b></div></div>
          <div class="ch-desc1"> <div class="ch-circle"><img src="@/assets/img/Vector1.svg" alt=""></div><div class="ch-text"><p>Battery</p><b>78 Hours</b></div></div>
          </div>
      </div>
      <div class="hl-box">
          <div class="line1">
              <div class="line-box"><span>Your text here</span> <img src="@/assets/img/Vector.png" alt="" class="vector"></div>
          </div>
          <div class="line2">
              <div class="line-box1"><span>Your text here</span> <img src="@/assets/img/Vector.png" alt="" class="vector"></div>
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
  overflow: hidden !important;
  width: 100%;
  height: 120vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
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
  position: absolute;
  border-radius: 30px;
  right: 5%;
  position: relative;
  background-image: url(/src/assets/img/Rectangle34624248.svg);
  background-size: cover;
  width: 34rem;
  height: 35.79rem;
  display: flex;
  align-items: center;
}

.phone {
  right: -5%;
  bottom: 0;
  position: absolute;
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
</style>
