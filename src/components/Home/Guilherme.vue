<template>
    <div class="banner-container">
        <div class="banner banner1">
            <div class="banner-text">Find the<br> perfect gifts</div>
        </div>
            <div class="banner banner2">
            <div class="banner-text">Find the<br> perfect gifts</div>
        </div>
    </div>
</template>
<style scoped>
.banner-container {
    display: flex;
    gap: 20px; 
    align-items: center; 
    justify-content: center; 
}

.banner {
    width: 586px;
    height: 610px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    color: white;
    text-align: left;
    font-size: 2rem;
    font-weight: bold;
    background-size: cover;
    background-position: center;
    position: relative;
    padding: 20px;
    border-radius: 20px;
    overflow: hidden;
}

.banner1 {
    background-image: url('@/assets/img/HeadseatAstro.jpg'); 
}

.banner2 {
    background-image: url('@/assets/img/HeadseatHyperx.jpg');
}

.banner-text {
    position: absolute;
    bottom: 20px;
    left: 20px;
    padding: 10px;
    border-radius: 5px;
    font-size: 4rem;
    max-width: 80%; 
    line-height: 1.2; 
    word-break: break-word; 
}

/* .item-weight {
    position: absolute;
    top: 10px; 
    left: 10px; 
    background: rgba(0, 0, 0, 0.7); 
    color: #fff; 
    padding: 5px 10px; 
    border-radius: 5px; 
    font-size: 1rem; 
    z-index: 10; 
} */
</style>