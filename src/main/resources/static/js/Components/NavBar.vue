<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a :class="{ 'navbar-brand': 1, 'font-l': 1 }" :style="{ 'padding-left': padding }"><img src="/images/s.png" width="40" height="40" class="me-3" />Shopper's World</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav custom me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link font-s" href="/dashboard">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link font-s" href="/dashboard/clothes">Shop</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link font-s" href="/dashboard/clothes">Contact us</a>
                    </li>
                </ul>
                <div class="col-auto ms-auto me-5" v-if="user.username == undefined">
                    <button type="button" class="btn btn-outline-danger" style="width: 100px" @click="login">Log in</button>
                </div>
                <ul class="navbar-nav custom-2 me-5 mb-2 mb-lg-0" v-if="user.username != undefined">
                    <li class="nav-item" v-show="width > 992">
                        <a class="nav-link font-s" href="/dashboard/wishlist">
                            <img src="/images/heart.png" class="me-4" />
                        </a>
                    </li>
                    <li class="nav-item" v-show="width > 992">
                        <a class="nav-link font-s" href="/dashboard/cart">
                            <img src="/images/cart.png" class="me-4" />
                        </a>
                    </li>
                    <li class="nav-item dropdown" v-show="width > 992">
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
                    </li>
                    <li class="nav-item font-s" v-show="width <= 992">
                        <details>
                            <summary>{{ user.first_name + " " + user.last_name }}</summary>
                            <ul>
                                <li><a class="nav-link" href="/profile">Your Profile</a></li>
                                <li><a class="nav-link" href="/dashboard/cart">Your Cart</a></li>
                                <li><a class="nav-link" href="/dashboard/wishlist">Your Wishlist</a></li>
                                <li><a class="nav-link" href="/dashboard/orders">Purchased Items</a></li>
                                <li><a class="nav-link" href="/dashboard/reviews">Your Reviews</a></li>
                                <li><a class="nav-link" v-if="user.isAdmin" href="/admin">Admin Panel</a></li>
                                <li><a class="nav-link" href="/seller">Seller Panel</a></li>
                                <li><a class="nav-link" href="/logout">Log Out</a></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            user: {},
            width: 0,
            m: -5.0,
        };
    },
    created: function () {
        axios
            .get("/api/user")
            .then((response) => {
                this.user = response.data;
            })
            .catch((data) => {});
    },
    mounted: function () {
        this.width = $(window).width();
        console.log(this.width);
        window.addEventListener("resize", () => {
            this.width = $(window).width();
        });
    },
    methods: {
        login() {
            window.location.href = "/login";
        },
    },
    computed: {
        padding() {
            if (this.width <= 1100) {
                return 20 + "px";
            } else {
                return Math.max(0, (1524 - this.width) / this.m + 215) + "px";
            }
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
.max_p {
    padding-left: 215px;
}
.custom > li {
    padding-left: 15px;
    padding-right: 15px;
}
details > ul > li {
    list-style: none;
}
</style>
