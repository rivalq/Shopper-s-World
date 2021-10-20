<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
            <a class="navbar-brand ms-2">
                <img src="/images/s.png" alt="" class="cart-img" />
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/dashboard">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/dashboard/clothes">Shop</a>
                    </li>
                </ul>
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0" style="margin-right: 80px">
                    <li class="nav-item">
                        <a href="/dashboard/cart">
                            <img src="/images/c.png" alt="" class="cart-img" />
                        </a>
                    </li>
                    <li class="nav-item dropdown" style="margin-right: 10px">
                        <a class="nav-link active dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {{ user.first_name + " " + user.last_name }}
                        </a>
                        <ul class="dropdown-menu navbar-drop" aria-labelledby="navbarDropdown">
                            <li>
                                signed in as <strong>{{ user.username }}</strong>
                            </li>
                            <li><hr class="dropdown-divider" /></li>

                            <li><a class="dropdown-item" href="/profile">Your Profile</a></li>
                            <li><a class="dropdown-item" href="/dashboard/cart">Your Cart</a></li>
                            <li><a class="dropdown-item" href="/dashboard/orders">Your Orders</a></li>
                            <li><a class="dropdown-item" href="/dashboard/wishlist">Your Wishlist</a></li>
                            <li><hr class="dropdown-divider" /></li>
                            <li><a class="dropdown-item" href="/admin" v-if="user.isAdmin">Admin Panel</a></li>
                            <li><a class="dropdown-item" href="/seller" v-if="user.isSeller">Seller Panel</a></li>
                            <li><a class="dropdown-item" href="/logout">Logout</a></li>
                        </ul>
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
        };
    },
    created: function () {
        axios.get("/api/user").then((response) => {
            this.user = response.data;
        });
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
</style>
