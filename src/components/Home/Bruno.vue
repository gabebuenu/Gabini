<template>
    <nav class="navbar navbar-expand-lg navbar-custom">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">GABINI</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">HOME</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">SALE</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">BUNDLE & SAVE</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                SHOP BY CATEGORY
              </a>
              <ul class="dropdown-menu">
                <li class="dropdown-submenu">
                  <a class="dropdown-item dropdown-toggle" href="#">ITEM 01</a>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">ITEM 05</a></li>
                    <li><a class="dropdown-item" href="#">ITEM 06</a></li>
                  </ul>
                </li>
                <li><a class="dropdown-item" href="#">ITEM 02</a></li>
                <li><a class="dropdown-item" href="#">ITEM 03</a></li>
                <li><a class="dropdown-item" href="#">ITEM 04</a></li>
              </ul>
            </li>
  
            <li class="nav-item">
              <a class="nav-link" href="#">SUPPORT</a>
            </li>
            <li class="nav-item d-flex align-items-center">
              <!-- Usa RouterLink para o redirecionamento para a página de login -->
              <RouterLink class="nav-link sign-in" to="/login">SIGN IN</RouterLink>
              <span class="nav-link px-2">|</span>
              <RouterLink class="sign-up-text" to="/cadastro">SIGN UP FOR FREE</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  
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
  
<style scoped>
.navbar-custom {
    background-color: white;
    border-width: 0.5px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
}

.navbar-custom .navbar-brand,
.navbar-custom .nav-link,
.navbar-custom .dropdown-toggle {
    color: rgb(0, 0, 0);
}

.navbar-custom .nav-link:hover,
.navbar-custom .dropdown-toggle:hover {
    color:  #007bff;
}

.navbar-brand {
    margin-left: 10rem;
    font-size: 40px; 
    font-weight: bold;
}

.navbar-nav {
    display: flex;
    justify-content: center;
    width: 100%;
}

.navbar-custom .nav-link.sign-in {
    margin-left: 100px; 
}

.nav-item .nav-link.px-2 {
    color: black; 
    margin: 0 10px;
}

.nav-item .sign-up-text {
    color: #007bff;
    text-decoration: none; 
    margin-left: 10px; 
}

.nav-item .sign-up-text:hover {
    color: #034790; 
}

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