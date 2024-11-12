<!-- <template>
<div class="container-footer">
        <footer class="py-5">
            <div class="row">
                <h1>GABINI</h1>
                <div class="col-6 col-md-2 mb-3">
                <h5>Menu</h5>
                <ul class="nav flex-column">
                    <li class="nav-item mb-2"><a href="#">Home</a></li>
                    <li class="nav-item mb-2"><a href="#">About US</a></li>
                    <li class="nav-item mb-2"><a href="#">Product</a></li>
                    <li class="nav-item mb-2"><a href="#">Pricing</a></li>
                </ul>
                </div>
                <div class="col-6 col-md-2 mb-3">
                <h5>Resources</h5>
                <ul class="nav flex-column">
                    <li class="nav-item mb-2"><a href="#">Forum</a></li>
                    <li class="nav-item mb-2"><a href="#">Support</a></li>
                    <li class="nav-item mb-2"><a href="#">Partners</a></li>
                    <li class="nav-item mb-2"><a href="#">Events</a></li>
                </ul>
                </div>
        
                <div class="col-6 col-md-2 mb-3">
                <h5>My account</h5>
                <ul class="nav flex-column">
                    <li class="nav-item mb-2"><a href="#">My Orders</a></li>
                    <li class="nav-item mb-2"><a href="#">FAQ</a></li>
                    <li class="nav-item mb-2"><a href="#">Sales Conditions</a></li>
                    <li class="nav-item mb-2"><a href="#">Contact</a></li>
                    <li class="nav-item mb-2"><a href="#">Legal mentions</a></li>
                </ul>
                </div>
        
                <div class="col-md-5 offset-md-1 mb-3">
                <form>
                    <h5>Subscribe to Newsletter</h5>
                    <p>Sign up for exclusive offters, original stories, events and more.</p>
                    <div class="d-flex flex-column flex-sm-row w-100 gap-2">
                    <label for="newsletter1" class="visually-hidden">Email address</label>
                    <input id="newsletter1" type="text" class="form-control" placeholder="Email address">
                    </div>
                </form>
                </div>
            </div>
        
            <div class="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
                <p>&copy; 2024 Company, Inc. All rights reserved.</p>
                <ul class="list-unstyled d-flex">
                <li class="ms-3"><a class="link-body-emphasis" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#twitter"/></svg></a></li>
                <li class="ms-3"><a class="link-body-emphasis" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#instagram"/></svg></a></li>
                <li class="ms-3"><a class="link-body-emphasis" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#facebook"/></svg></a></li>
                </ul>
            </div>
        </footer>
</div>
</template>
<style scoped>
.container-footer{
    background-color: black;
    color: white;
}

.container-footer .row h1{
    font-weight: bold;
    padding-left: 5rem;
    padding-bottom: 1.5rem;
}

.container-footer li a{
    text-decoration: none;
    color:rgb(193, 193, 193);
}

.container-footer form input{
    background-color: #7e7e7e;
    border: none;
    border-radius: 20px;
    min-height: 50px;
    max-width: 25rem;
}


.container-footer form p{
    color: rgb(193, 193, 193);
    max-width: 18rem;
}
</style> -->

<template>
    <div class="container">
            <div class="footer-g">
                <div class="footer-g-box">
                    <img src="@/assets/img/Gabini.png" alt="" class="logos">
                    <div class="layer1">
                        <div class="footer-menu-box">
                            <div class="footer-menu">
                                <h5>Menu</h5>
                                <a href="">Home</a>
                                <a href="">About Us</a>
                                <a href="">Product </a>
                                <a href="">Pricing</a>
                            </div>
                            <div class="footer-menu">
                                <h5>Resources</h5>
                                <a href="">Forum</a>
                                <a href="">Support</a>
                                <a href="">Partners </a>
                                <a href="">Events</a>
                            </div>
                            <div class="footer-menu">
                                <h5>My Account</h5>
                                <a href="">My Orders</a>
                                <a href="">FAQ</a>
                                <a href="">Sales conditions</a>
                                <a href="">Contact </a>
                                <a href="">Legal mentions</a>
                            </div>
                        </div>

                        <div class="sub">
                            <h5>Subscribe to Newsletter</h5>
                            <p>Sign up for exclusive offers, original <br> stories, events and more.</p>
                            <button class="btn_footer">Email Address <div class="btn-ball"><img src="@/assets/img/arrow.svg" alt=""></div></button>
                        </div>
                    </div>
                    <img class="f-logo" src="@/assets/img/rodape-gabini.svg" alt="">
                 
                    <div class="layer2">
                        <div class="line">&nbsp;</div>
                        <div class="copy">
                            <p>© 2024 Gabini Headset Store. - All Rights Reserved</p>
                            <div class="l-box">
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

.footer-g-box {
  position: relative;
  width: 85%;
  display: flex;
  flex-direction: column;
}

.logos {
  filter: invert(1);
  max-width: 204px;
  margin-bottom: 50px;
}

.footer-menu-box {
  display: flex;
  gap: 130px;
}

.footer-menu {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sub {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.btn_footer {
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

.btn-ball {
  filter: invert(0) !important;
}

.f-logo {
  margin-top: 40px;
}

.layer2 {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #000;
  height: 8vh;
}

.line {
  width: 100%;
  height: 1px;
  background-color: #4B4B4B;
  margin-top: 40px;
  margin-bottom: 30px;
}

.l-box {
  display: flex;
  gap: 16px;
}

.copy {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.copy p, .copy a {
  margin: 0;
  color: #fff !important;
  text-decoration-thickness: 2px;
}

.copy a {
  text-decoration: underline !important;
}

.footer-g {
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

.layer1 {
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

.footer-g-box {
  position: relative;
  width: 85%;
  display: flex;
  flex-direction: column;

  & .logos {
    filter: invert(1);
    max-width: 204px;
    margin-bottom: 50px;
  }

}

.footer-menu-box {
  display: flex;
  gap: 130px;
}



.footer-menu {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sub {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.btn_footer {
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

  & .btn-ball {
    filter: invert(0) !important;
  }
}

.f-logo {
  margin-top: 40px;
}

.layer2{
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #000;
  height: 8vh;
}

.line {
  width: 100%;
  height: 1px;
  background-color: #4B4B4B;
  margin-top: 40px;
  margin-bottom: 30px;
}

.l-box {
  display: flex;
  gap: 16px;
}

.copy {
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