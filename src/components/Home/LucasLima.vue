<template>
    <div class="container">
            <div class="products">
                <div>
                    <h1>TESTIMONIALS</h1>
                    <p>Voices of Satisfaction: Discover What Our Clients Have to Say</p>
                </div>
        
                <div class="r-card-box">
                    <div class="r-card" id="card1">
                        <img src="@/assets/img/gate.svg" alt="">
                        <p>I absolutely love this coffee maker! I use it every morning. Cold coffee is my favorite and this little machine makes great cold coffee. It is strong and tasty. I regular coffee cup or a larger stainless steel cup will work. </p>
                        <img src="@/assets/img/user01.svg" alt="">
                    </div>
                    <div class="r-card" id="card2">
                        <img src="@/assets/img/gate.svg" alt="">
                        <p>I love the slim design of this Keurig. It works well except for the cold coffee. It states it does both hot and cold but I haven't found that to be accurate. The hot is perfect but it doesn't produce the cold coffee.</p>
                        <img src="@/assets/img/user02.svg" alt="">
                    </div>
                    <div class="r-card" id="card3">
                        <img src="@/assets/img/gate.svg" alt="">
                        <p>Nothing wrong with the maker but seller had it "On sale"truns out their supposed sale price was actually what the product actually sells for normally. It's retail price is 119.99. And is currently on sale for 64.99 </p>
                        <img src="@/assets/img/user03.svg" alt="">
                    </div>
                    <div class="r-card" id="card4">
                        <img src="@/assets/img/gate.svg" alt="">
                        <p>I absolutely love this coffee maker! I use it every morning. Cold coffee is my favorite and this little machine makes great cold coffee. It is strong and tasty. I regular coffee cup or a larger stainless steel cup will work. </p>
                        <img src="@/assets/img/user04.svg" alt="">
                    </div>
                    <div class="r-card" id="card5">
                        <img src="@/assets/img/gate.svg" alt="">
                        <p>I love the slim design of this Keurig. It works well except for the cold coffee. It states it does both hot and cold but I haven't found that to be accurate. The hot is perfect but it doesn't produce the cold coffee.</p>
                        <img src="@/assets/img/user05.svg" alt="">
                    </div>
                    <div class="r-card" id="card6">
                        <img src="@/assets/img/gate.svg" alt="">
                        <p>Nothing wrong with the maker but seller had it "On sale"truns out their supposed sale price was actually what the product actually sells for normally. It's retail price is 119.99. And is currently on sale for 64.99 </p>
                        <img src="@/assets/img/user06.svg" alt="">
                    </div>
                </div>
        
                <div class="btn-box">
                    <button class="prox">
                        <img src="@/assets/img/icon-next.svg" alt="">
                    </button>
                    <button class="nex">
                        <img src="@/assets/img/icon-next.svg" alt="">
                    </button>
                </div>
            </div>
        </div>

</template>

<script>
export default {
mounted() {
  const testimonialContainer = this.$el.querySelector(".testimonial-carousel");
  const prevButton = this.$el.querySelector(".prev-nav");
  const nextButton = this.$el.querySelector(".next-nav");
  const cards = this.$el.querySelectorAll(".testimonial-item");
  let currentPage = 0; 

  function updateCarousel() {
    testimonialContainer.style.transition = "transform 0.5s ease-in-out";
    
    const offset = -currentPage * 100;
    testimonialContainer.style.transform = `translateX(${offset}%)`;
    
    prevButton.style.background = currentPage === 0 ? "transparent" : "#000";
    nextButton.style.background = currentPage === 1 ? "transparent" : "#000";
  }

  prevButton.addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage--;
      updateCarousel();
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentPage < 1) {
      currentPage++;
      updateCarousel();
    }
  });

  updateCarousel();
}
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css");

.testimonial-area {
margin-top: 5%;
overflow: hidden;
background: #F3F5F9;
width: 100%;
padding: 100px 0px;
min-height: 100vh;
gap: 30px;
border-radius: 30px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;

& h1 {
  font-size: 40px !important;
}

& p {
  color: #8c8a8a;
  font-size: 18px;
  margin-top: 15px;
  font-weight: 400;
}
}

.testimonial-item-wrapper {
opacity: 1;
z-index: 2;
cursor: pointer;
background-color: #F3F5F9;
transition: opacity 0.4s ease; 
}

.testimonial-item-hidden {
position: absolute;
top: 0;
left: 0;
z-index: 1;
opacity: 10;
transition: opacity 0.4s ease; 
}

.testimonial-item-wrapper:hover {
opacity: 0; 
}

.testimonial-item-hidden:hover {
opacity: 1; 
}

.item-frame {
max-width: 250px;
}

.testimonial-item {
background-color: #fff;
border-radius: 30px;
max-width: 381px;
height: 445px;
position: relative;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 16px;

& p {
  max-width: 280px;
  color: #2a2929;
}
}

.carousel-navigation {
display: flex;
gap: 30px;
margin-top: 5%;
}

.prev-nav, .next-nav {
align-items: center;
justify-content: center;
border-radius: 50%;
width: 55px;
height: 55px;
border: 1px solid rgb(168, 168, 168);
}

.next-nav {
background: #000;
img {
  rotate: 180deg;
}
}

.testimonial-carousel {
display: flex;
gap: 20px;
margin-left: 4.3%;
margin-top: 20px;
transition: transform 0.5s ease-in-out; 
}

#testimonial4 {
margin-left: 3%;
}

.testimonial-item {
flex: 0 0 calc(33.33% - 20px); 
& p {
  font-size: 15px;
}
}

.prev-nav:disabled, .next-nav:disabled {
background: transparent;
opacity: 0.5;
cursor: not-allowed;
}

.prev-nav, .next-nav {
transition: background 0.3s ease;
}

</style>
