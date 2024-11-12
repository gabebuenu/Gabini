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
    const cardBox = this.$el.querySelector(".r-card-box");
    const prevButton = this.$el.querySelector(".prox");
    const nextButton = this.$el.querySelector(".nex");
    const cards = this.$el.querySelectorAll(".r-card");
    let currentPage = 0; // Initial page

    // Function to update the display of the cards
    function updateCarousel() {
      // Add transition animation
      cardBox.style.transition = "transform 0.5s ease-in-out";
      
      // Calculate the carousel position based on the current page
      const offset = -currentPage * 100; // Shift position left or right
      cardBox.style.transform = `translateX(${offset}%)`;
      
      // Update the appearance of the navigation buttons
      prevButton.style.background = currentPage === 0 ? "transparent" : "#000";
      nextButton.style.background = currentPage === 1 ? "transparent" : "#000";
    }

    // Set up click events for the buttons
    prevButton.addEventListener("click", () => {
      if (currentPage > 0) {
        currentPage--; // Move back one page
        updateCarousel();
      }
    });

    nextButton.addEventListener("click", () => {
      if (currentPage < 1) {
        currentPage++; // Move forward one page
        updateCarousel();
      }
    });

    // Initialize the carousel in the correct position
    updateCarousel();
  }
}

</script>

<style scooped>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css");

.products {
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
  
.h-1 {
  opacity: 1;
  z-index: 2;
  cursor: pointer;
  background-color: #F3F5F9;
  transition: opacity 0.4s ease; 
}

.h-2 {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  opacity: 10;
  transition: opacity 0.4s ease; 
}


.h-1:hover {
  opacity: 0; 
}

.h-2:hover {
  opacity: 1; 
}



.frame {
  max-width: 250px;
}

.r-card {
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

.btn-box {
  display: flex;
  gap: 30px;
  margin-top: 5%;
}

.prox, .nex {
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 55px;
  height: 55px;
  border: 1px solid rgb(168, 168, 168);
}

.nex {

  background: #000;
  img {
    rotate: 180deg;
  }
}


.r-card-box {
  display: flex;
  gap: 20px;
  margin-left: 4.3%;
  margin-top: 20px;
  transition: transform 0.5s ease-in-out; 
}

#card4 {
  margin-left: 3%;
}
.r-card {
  flex: 0 0 calc(33.33% - 20px); 
  & p {
    font-size: 15px;
  }
}

.prox:disabled, .nex:disabled {
  background: transparent;
  opacity: 0.5;
  cursor: not-allowed;
}

.prox, .nex {
  transition: background 0.3s ease;
}

</style>