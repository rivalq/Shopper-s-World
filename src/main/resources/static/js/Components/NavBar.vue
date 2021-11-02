<template>
    <div class="container">
        <div class="row py-3 logo-font">
            <div class="col-lg-3 font-l" style="margin-left: 100px"><img src="/images/s.png" width="40" height="40" class="me-3" />Shopper's World</div>
            <div class="col-lg-5">
                <ul class="nav">
                    <li class="nav-item">
                        <a class="nav-link font-s" href="/dashboard">Home</a>
                    </li>
                    <li class="nav-item ms-2">
                        <a class="nav-link font-s" href="/dashboard/clothes">Shop</a>
                    </li>
                    <li class="nav-item ms-2">
                        <span class="nav-link font-s">Pages</span>
                    </li>
                    <li class="nav-item ms-2">
                        <a class="nav-link font-s" href="/contact">Contact us</a>
                    </li>
                </ul>
            </div>

            <div class="col-lg-2 ms-auto" v-if="user.username == undefined">
                <button type="button" class="btn btn-outline-danger" style="width: 100px" @click="login">Log in</button>
            </div>
            <div class="col-lg-3 ms-auto mt-1" v-if="user.username != undefined">
                <a href="/dashboard/wishlist">
                    <img src="/images/heart.png" class="me-4" />
                </a>
                <a href="/dashboard/cart">
                    <img src="/images/cart.png" class="me-4" />
                </a>
                <a class="dropdown">
                    <a class="btn font-s" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"> {{ user.first_name + " " + user.last_name }} </a>

                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li><a class="dropdown-item" href="/profile">Your Profile</a></li>
                        <li><a class="dropdown-item" href="/dashboard/cart">Your Cart</a></li>
                        <li><a class="dropdown-item" href="/dashboard/wishlist">Your Wishlist</a></li>
                        <li><a class="dropdown-item" href="/dashboard/orders">Purchased Items</a></li>
                        <li><a class="dropdown-item" href="/dashboard/reviews">Your Reviews</a></li>
                        <li><hr class="dropdown-divider" /></li>

                        <li><a class="dropdown-item" v-if="user.isAdmin" href="/admin">Admin Panel</a></li>
                        <li><a class="dropdown-item" href="/seller">Seller Panel</a></li>
                        <li><a class="dropdown-item" href="/logout">Log Out</a></li>
                    </ul>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {},
        };
    },
    created: function () {
        axios.get("/api/user").then((response) => {
            this.user = response.data;
        });
    },
    methods: {
        login() {
            window.location.href = "/login";
        },
    },
};
</script>

<style scoped>
.bg-sidebar {
    background-color: #0067b8;
}
.navbar-drop li {
    width: 170px;
    text-align: center;
    font-size: 15px;
}
.user-img {
    margin-right: 15px;
    height: 40px;
    width: 40px;
    border-radius: 50%;
}
.cart-img {
    margin-right: 15px;
    height: 35px;
    width: 35px;
}
.font-l {
    font-size: 23px;
    font-weight: 500;
    color: rgb(17, 17, 17) !important;
}
.font-s {
    font-size: 18px;
    font-weight: 400;
    color: rgb(17, 17, 17) !important;
}
.active {
    border-bottom: 2px solid rgb(229, 54, 55);
}
</style>
