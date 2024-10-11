<template>
    <div class="d-flex justify-content-center">
      <div class="spinner-border blinking-spinner" role="status">
      </div>
    </div>
</template>

<style scoped>
.blinking-spinner {
  width: 1.5rem;
  height: 1.5rem;
  border-width: 0.2rem;
  border-style: solid;
  border-color: white transparent white transparent;
  animation: spin 0.75s linear infinite, blink 1s infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes blink {
  0%, 100% {
    border-color: white transparent white transparent;
  }
  50% {
    border-color: currentColor transparent currentColor transparent;
  }
}
</style>
