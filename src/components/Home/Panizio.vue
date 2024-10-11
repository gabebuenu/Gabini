<template>
    <div class="offer-container">
      <div class="text-section">
        <h1>Save 20% or more<br>on Headset</h1>
        <p>Enjoy for a limited time</p>
        <div class="countdown">
          <div>
            <span>{{ hours }}</span>
            <div class="countdown-label">HOURS</div>
          </div>
          <div>
            <span>{{ minutes }}</span>
            <div class="countdown-label">MINUTES</div>
          </div>
          <div>
            <span>{{ seconds }}</span>
            <div class="countdown-label">SECONDS</div>
          </div>
        </div>
        <a href="#" class="shop-now">
          <span>SHOP NOW</span>
          <div class="arrow-circle">➜</div>
        </a>
        <h2 class="terms">Ends 18/08. Restrictions apply. See details.</h2>
      </div>
      <img src="@/assets/img/headset.png" alt="Headset" class="headset-img">
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        hours: 12,
        minutes: 25,
        seconds: 45,
        interval: null
      };
    },
    methods: {
      startCountdown() {
        const countDownDate = new Date().getTime() + 12 * 60 * 60 * 1000;
  
        this.interval = setInterval(() => {
          const now = new Date().getTime();
          const distance = countDownDate - now;
  
          this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
          if (distance < 0) {
            clearInterval(this.interval);
            this.hours = this.minutes = this.seconds = 0;
          }
        }, 1000);
      }
    },
    mounted() {
      this.startCountdown();
    },
    beforeUnmount() {
      if (this.interval) {
        clearInterval(this.interval);
      }
    }
  };
</script>

<style scoped>
.offer-container {
    background: linear-gradient(to right, #2472d1, #15bbe9);
    border-radius: 25px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    padding: 10px 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 88%;
    max-width: 1200px;
    margin: 0 auto; 
}

.text-section {
    text-align: left;
    flex: 1;
}

.offer-container h1 {
    font-size: 3.8em;
    color: #ffffff;
    margin-bottom: 10px;
}

.offer-container p {
    color: #ffffff;
    font-size: 1em;
    margin: 0 0 30px 0;
    font-weight: bold;
}

.countdown {
    font-size: 6em;
    color: #ffffff;
    margin: 20px 0;
    display: flex;
    gap: 80px;
}

.countdown div {
    text-align: center;
    width: 100px;
    font-weight: bold;
}

.countdown-label {
    font-size: 0.17em;
    color: #e0e0e0;
    margin-bottom: 10px;
}

.shop-now {
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

.shop-now:hover {
    background-color: #f1f1f1;
}

.shop-now span {
    margin-right: auto;
    padding: 5px;
}

.shop-now .arrow-circle {
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

.offer-container h2 {
    font-size: 0.7em;
    color: #e0e0e0;
    margin-top: 15px;
    margin-bottom: 35px;
}

.headset-img {
    max-width: 45%;
    height: auto;
    margin-left: 30px;
}
</style>