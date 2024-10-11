<template>
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
</style>