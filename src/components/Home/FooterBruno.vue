<template>
  <div class="container">
      <div class="footer-section">
          <div class="footer-box">
              <img src="@/assets/img/Gabini.png" alt="" class="brand-logo">
              <div class="content-wrapper">
                  <div class="menu-wrapper">
                      <div class="menu-column">
                          <h5>Menu</h5>
                          <a href="">Home</a>
                          <a href="">About Us</a>
                          <a href="">Product </a>
                          <a href="">Pricing</a>
                      </div>
                      <div class="menu-column">
                          <h5>Resources</h5>
                          <a href="">Forum</a>
                          <a href="">Support</a>
                          <a href="">Partners </a>
                          <a href="">Events</a>
                      </div>
                      <div class="menu-column">
                          <h5>My Account</h5>
                          <a href="">My Orders</a>
                          <a href="">FAQ</a>
                          <a href="">Sales conditions</a>
                          <a href="">Contact </a>
                          <a href="">Legal mentions</a>
                      </div>
                  </div>

                  <div class="newsletter-signup">
                      <h5>Subscribe to Newsletter</h5>
                      <p>Sign up for exclusive offers, original <br> stories, events and more.</p>
                      <button class="email-btn">Email Address <div class="arrow-btn"><img src="@/assets/img/arrow.svg" alt=""></div></button>
                  </div>
              </div>
              <img class="footer-logo" src="@/assets/img/rodape-gabini.svg" alt="">

              <div class="footer-bottom">
                  <div class="divider-line">&nbsp;</div>
                  <div class="footer-info">
                      <p>© 2024 Gabini Headset Store. - All Rights Reserved</p>
                      <div class="footer-links">
                          <a href="">Products</a>
                          <a href="">Privacy Policy</a>
                          <a href="">Customer Service</a>
                      </div>

                      <img src="@/assets/img/teste.svg" alt="">
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

.footer-box {
position: relative;
width: 85%;
display: flex;
flex-direction: column;
}

.brand-logo {
filter: invert(1);
max-width: 204px;
margin-bottom: 50px;
}

.menu-wrapper {
display: flex;
gap: 130px;
}

.menu-column {
display: flex;
flex-direction: column;
gap: 20px;
}

.newsletter-signup {
display: flex;
flex-direction: column;
gap: 20px;
}

.email-btn {
width: 400px;
font-weight: 300;
font-size: 16px;
align-items: center;
gap: 20px;
padding: 10px 10px 10px 20px;
display: flex;
color: #BFC0C2;
border-radius: 60px;
background-color: #4B4B4B;
border: 1px solid #8c8a8a;
justify-content: space-between;
transition: 400ms;
}

.arrow-btn {
filter: invert(0) !important;
}

.footer-logo {
margin-top: 40px;
}

.footer-bottom {
position: absolute;
bottom: 0;
width: 100%;
display: flex;
flex-direction: column;
background-color: #000;
height: 8vh;
}

.divider-line {
width: 100%;
height: 1px;
background-color: #4B4B4B;
margin-top: 40px;
margin-bottom: 30px;
}

.footer-links {
display: flex;
gap: 16px;
}

.footer-info {
display: flex;
align-items: center;
justify-content: space-between;
}

.footer-info p, .footer-info a {
margin: 0;
color: #fff !important;
text-decoration-thickness: 2px;
}

.footer-info a {
text-decoration: underline !important;
}

.footer-section {
position: relative;
margin: 5% 0%;
width: 100%;
height: 780px;
border-radius: 30px;
background-color: #000;
display: flex;
align-items: center;
justify-content: center;
}

.content-wrapper {
width: 100%;
display: flex;
justify-content: space-between;

& h5 {
  color: #fff;
  font-weight: 700;
  font-size: 20px;
}

& a {
  color: #b8b8b8;
  text-transform: none;
  font-size: 18px;
}

& p {
  color: #656565;
  font-size: 15px;
  font-weight: 400;
}
}

.footer-box {
position: relative;
width: 85%;
display: flex;
flex-direction: column;

& .brand-logo {
  filter: invert(1);
  max-width: 204px;
  margin-bottom: 50px;
}

}

.menu-wrapper {
display: flex;
gap: 130px;
}

.menu-column {
display: flex;
flex-direction: column;
gap: 20px;
}

.newsletter-signup {
display: flex;
flex-direction: column;
gap: 20px;
}

.email-btn {
width: 400px;
text-transform: none;
font-weight: 300;
font-size: 16px;
align-items: center;
gap: 20px;
padding: 10px 10px 10px 20px;
display: flex;
color: #BFC0C2;
border-radius: 60px;
background-color: #4B4B4B;
border: 1px solid #8c8a8a;

justify-content: space-between;
transition: 400ms;

& i {
  font-size: 20px;
}

& .arrow-btn {
  filter: invert(0) !important;
}
}

.footer-logo {
margin-top: 40px;
}

.footer-bottom{
position: absolute;
bottom: 0;
width: 100%;
display: flex;
flex-direction: column;
background-color: #000;
height: 8vh;
}

.divider-line {
width: 100%;
height: 1px;
background-color: #4B4B4B;
margin-top: 40px;
margin-bottom: 30px;
}

.footer-links {
display: flex;
gap: 16px;
}

.footer-info {
display: flex;
align-items: center;
justify-content: space-between;

& p, a {
  margin: 0;
  color: #fff !important;
  text-decoration-thickness: 2px; 
  
}

& a {
  text-decoration: underline !important; 
}
}
</style>
