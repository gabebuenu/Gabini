<template>
    <div class="gabini-container">
      <div class="gabini-text-wrapper">
        <div class="gabini-text">
          <span v-for="(letra, index) in letras" :key="index" class="letra">{{ letra }}</span>
        </div>
        <div class="spinner-wrapper">
          <Sppiner />
        </div>
      </div>
    </div>
</template>

<script>
import Sppiner from './Sppiner.vue'; 

export default {
  data() {
    return {
      letras: ['G', 'A', 'B', 'I', 'N', 'I']
    };
  },
  components: {
    Sppiner
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Futo+Sans:wght@900&display=swap');

.gabini-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
  background-color: white;
}

.gabini-text-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
}

.gabini-text {
  display: flex;
  flex-direction: row;
  font-family: 'Futo Sans', sans-serif;
  font-size: 10vw;
  font-weight: 900;
  color: black;
  animation: blink 1s infinite alternate;
}

.letra {
  margin: 0 0.1em;
}

.spinner-wrapper {
  margin-top: 20px;
}

.blinking-spinner {
  width: 1.5rem;
  height: 1.5rem;
  border-width: 0.2rem;
  border-style: solid;
  border-color: black transparent black transparent;
  animation: spin 0.75s linear infinite, blink 1s infinite alternate;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes blink {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.3;
  }
}

@media (max-width: 768px) {
  .gabini-text {
    font-size: 20vw;
  }
}
</style>
