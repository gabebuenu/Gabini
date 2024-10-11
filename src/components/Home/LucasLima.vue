<template>
<div class="testimonials-container">
        <h2>TESTIMONIALS</h2>
        <p class="sub-heading">Voices of Satisfaction: Discover What Our Clients Have to Say</p>
        <div class="testimonials">
            <div class="testimonial">
                <div class="stars">★★★★★</div>
                <p class="feedback">
                    I absolutely love this coffee maker! I use it every morning. Cold coffee is my favorite and this little machine makes great cold coffee. It is strong and tasty. I regular coffee cup or a larger stainless steel cup will work.
                </p>
                <p class="author">Marilna Jole<br>CEO, Caffin</p>
            </div>
            <div class="testimonial">
                <div class="stars">★★★★★</div>
                <p class="feedback">
                    I love the slim design of this Keurig. It works well except for the cold coffee. It states it does both hot and cold but I haven't found that to be accurate. The hot is perfect but it doesn't produce the cold coffee.
                </p>
                <p class="author">Jhonatan Albert<br>CEO, Samsung</p>
            </div>
            <div class="testimonial">
                <div class="stars">★★★★★</div>
                <p class="feedback">
                    Nothing wrong with the maker but seller had it "On Sale" turns out their supposed sale price was actually what the product actually sells for normally. It's retail price is $119.99. And is currently on sale for 64.99.
                </p>
                <p class="author">Stevano Albert<br>CEO, Mayoun</p>
            </div>
        </div>
        <div class="pagination">
            <button class="prev">←</button>
            <button class="next">→</button>
        </div>
</div>
</template>
<style scoped>
.testimonials-container {
    text-align: center;
    min-height: 100vh; 
    background-color: #f7f7f7; 
    border: 1px solid #ddd; 
    padding: 40px;
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
}

h2 {
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
}

.sub-heading {
    font-size: 14px;
    color: #777;
    margin-bottom: 40px;
}

.testimonials {
    display: flex;
    justify-content: center; 
    margin-bottom: 20px;
    width: 100%;
}
.testimonial {
    background-color: #f8f9fc;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: 0 10px; 
}
.stars {
    color: orange;
    font-size: 24px;
    margin-bottom: 10px;
}
.feedback {
    font-size: 14px;
    color: #555;
    margin-bottom: 15px;
}
.author {
    font-size: 12px;
    font-weight: bold;
    color: #333;
}
.pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center; 
    align-items: center;
}

button {
    background-color: #000;
    color: #fff;
    border: none;
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 16px;
    margin: 0 10px; 
}

button:focus {
    outline: none;
}
</style>