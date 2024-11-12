<template>
<header class="home">
    <div class="container">
      <div class="titulo">
        <h1>GABINI HEADSET STORE</h1>
        <h3>Welcome to Gabini quality, at our most welcoming price</h3>
        <img src="@/assets/img/botãoseefordetails.png" alt="">
      </div>
      <div class="image">
        <img src="@/assets/img/fonerazer.svg" alt="fone">
      </div>
      <div class="background-blur"></div>
    </div>
</header>
</template>

<style>
header.home {
    background-color: #ffffff; 
    color: #000000; 
    width: 100%; 
    min-height: 80vh;
    display: flex; 
    align-items: center; 
    justify-content: space-between; 
    padding: 2rem;
    box-sizing: border-box; 
}

header.home .container {
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    width: 75%; 
}

header.home .titulo {
    max-width: 50%; 
    text-align: left;
}

header.home .titulo h1 {
    max-width: 20%;
    line-height: 0.9;
    font-weight: bold;
    font-size: 6rem; 
    margin-bottom: 1rem;
}

header.home .titulo h3 {
    max-width: 63%;
    font-size: 1.5rem; 
    margin-bottom: 1.5rem; 
    color: #444444;
}

header.home .titulo img {
    max-width: 250px; 
    height: auto; 
}

header.home .image img {
    max-width: 550px; 
    height: auto; 
}
</style>