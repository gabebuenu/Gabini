<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

* {
    font-family: "Inter", sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html, body {
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
}


.section {
    margin-bottom: 20px; 
}
header.home, 
.container-footer, 
.banner-container, 
.products-section, 
.offer-container, 
.container-headi, 
.testimonials-container {
    margin-bottom: 25px; 
}
</style>
