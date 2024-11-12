<template>
  <div class="container d-flex align-items-center justify-content-between">
    <div class="item-card">
      <div class="item-desc">
        <div class="item-icon">
          <img src="../../assets/img/Icons.svg" alt="">
        </div>
        <div class="item-info">
          <p>Item Weight</p>
          <b>2.6 Pounds</b>
        </div>
      </div>
      <h1>Find the <br> Perfect gifts</h1>
      <img class="item-bg" src="../../assets/img/preto.png" alt="">
    </div>
    <div class="item-card">
      <div class="item-desc">
        <div class="item-icon">
          <img src="../../assets/img/Icons.svg" alt="">
        </div>
        <div class="item-info">
          <p>Item Weight</p>
          <b>2.6 Pounds</b>
        </div>
      </div>
      <h1>Find the <br> Perfect gifts</h1>
      <img class="item-bg" src="../../assets/img/rosa.png" alt="">
    </div>
  </div>
</template>
  
  <style scoped>
  
  .item-card {
    position: relative;
    width: 100%;
    max-width: 630px;
    height: 620px;
    border-radius: 20px;
    background-color: #000;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    margin: 16px;
  
    h1 {
      color: #fff !important;
      font-size: 60px !important;
      padding: 0 0 32px 32px;
      z-index: 100;
      text-transform: none;
    }
  
    @media (max-width: 768px) {
      height: auto;
      padding: 16px;
      h1 {
        font-size: 36px !important;
        padding: 16px;
      }
    }
  }
  
  .item-card .item-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: 400ms;
    filter: opacity(0.8);
  }
  
  .item-card .item-bg:hover {
    transform: scale(1.2);
    filter: opacity(0.5);
  }
  
  .item-desc {
    padding-left: 16px;
    width: 260px;
    margin: 32px;
    display: flex;
    align-items: center;
    height: 92px;
    background: rgba(0, 0, 0, 0.1);
    z-index: 100;
    border-radius: 60px;
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
  }
  
  .item-icon {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 50%;
    border: 1px solid #616161;
  }
  
  .item-info {
    display: flex;
    flex-direction: column;
    line-height: 0.5;
    margin-left: 16px;
  
    p {
      color: rgba(0, 0, 0, 0.5);
      font-size: 18px;
    }
  
    b {
      font-size: 20px;
    }
  }
  
  @media (max-width: 768px) {
    .container {
      flex-direction: column;
      align-items: center;
    }
  
    .item-card {
      width: 100%;
      max-width: 400px;
      height: auto;
      margin: 8px 0;
    }
  }
  </style>
  