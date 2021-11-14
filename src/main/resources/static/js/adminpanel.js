const store = Vuex.createStore({
    state() {
        return {
            clothes: [],
            users: [],
            orders: [],
            requests: [],
            seller_clothes: [],
            selected_menu: 2,
            wishlist: [],
            reviews: [],
            user: {},
            total: 0,
        };
    },
    mutations: {
        setClothes(state, payload) {
            state.clothes = payload;
            state.total++;
        },
        setRequests(state, payload) {
            state.requests = payload;
            state.total++;
        },
        setSellerClothes(state, payload) {
            state.seller_clothes = payload;
            state.total++;
        },
        setSelectedMenu(state, payload) {
            state.selected_menu = payload;
        },
        setWishlist(state, payload) {
            state.wishlist = payload;
        },
        setOrders(state, payload) {
            state.orders = payload;
            state.total++;
        },
        setReviews(state, payload) {
            state.reviews = payload;
            state.total++;
        },
        setUsers(state, payload) {
            state.users = payload;
            state.total++;
        },
        setUser(state, payload) {
            state.user = payload;
            state.total++;
        },
        deleteUser(state, payload) {
            state.users.splice(payload, 1);
        },
    },
    actions: {
        async getClothes(state, payload) {
            var images = await axios.get("/api/admin/images");
            images = images.data;
            var stock = await axios.get("/api/admin/stock");
            stock = stock.data;

            axios.get("/api/marketplace/clothes").then((response) => {
                let clothes = response.data;
                for (let i = 0; i < clothes.length; i++) {
                    clothes[i]["stock"] = new Array();
                    clothes[i]["images"] = new Array();
                    clothes[i]["url"] = "/images/marketplace/" + clothes[i]["cloth_id"] + "/profile";
                    for (let j = 0; j < stock.length; j++) {
                        if (stock[j]["cloth_id"] == clothes[i]["cloth_id"]) {
                            clothes[i]["stock"].push(stock[j]);
                        }
                    }
                    for (let j = 0; j < images.length; j++) {
                        if (images[j]["cloth_id"] == clothes[i]["cloth_id"]) {
                            clothes[i]["images"].push(images[j]);
                        }
                    }
                }
                state.commit("setClothes", clothes);
            });
        },

        async getRequests(state, payload) {
            axios.get("/api/admin/requests").then((response) => {
                state.commit("setRequests", response.data);
            });
        },

        async getSellerClothes(state, payload) {
            var images = await axios.get("/api/admin/seller_clothes/images");
            images = images.data;

            axios.get("/api/admin/seller_clothes").then((response) => {
                state.commit("setSellerClothes", response.data);
            });
        },
        async getWishlist(state, payload) {
            axios.get("/api/admin/wishlist").then((response) => {
                state.commit("setWishlist", response.data);
            });
        },
        async getOrders(state, payload) {
            axios.get("/api/admin/purchased").then((response) => {
                state.commit("setOrders", response.data);
            });
        },
        async getReviews(state, payload) {
            axios.get("/api/admin/reviews").then((response) => {
                let reviews = response.data;
                for (let i = 0; i < reviews.length; i++) {
                    var seconds = reviews[i]["time"];
                    var date = new Date(0);
                    date.setMilliseconds(seconds);
                    reviews[i]["time"] = date.toLocaleDateString("en-US");
                }
                state.commit("setReviews", reviews);
            });
        },
        async getUsers(state, payload) {
            axios.get("/api/users").then((response) => {
                state.commit("setUsers", response.data);
            });
        },
        async getUser(state, payload) {
            axios.get("/api/user").then((response) => {
                state.commit("setUser", response.data);
            });
        },
    },
    getters: {
        getClothes: (state) => state.clothes,
        getRequests: (state) => state.requests,
        getSellerClothes: (state) => state.seller_clothes,
        getSelectedMenu: (state) => state.selected_menu,
        getWishlist: (state) => state.wishlist,
        getOrders: (state) => state.orders,
        getReviews: (state) => state.reviews,
        getUsers: (state) => state.users,
        getUser: (state) => state.user,
        getTotal: (state) => state.total,
    },
});

const side_menu = {
    data() {
        return {
            columns: ["Catlog", "Stock", "Users", "Purchased Clothes", "Cloth Requests", "Ratings", "Reviews", "Add New Cloth"],
        };
    },
    template: /*html*/ `
        <div class="col-2 pt-5 admin_sidebar" style="background-color: #0067b8;height:100vh;overflow:auto">
            
            <div class="row mt-5">
                    <div class="col user-info__img-big" style="text-align: center;"> 
                        <img :src = "user.profile_image">
                    </div>
            </div>
            <div class="row  mt-2 justify-content-md-center">
                <div class="col dropdown" style="text-align: center;">
                        <a class="btn" style = "color:white;font-size:18px" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"> {{ user.first_name + " " + user.last_name }} </a>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <li><a class="dropdown-item" href="/">Home</a></li>
                            <li><a class="dropdown-item" href="/dashboard/clothes">Shop</a></li>
                            <li><a class="dropdown-item" href="/profile">Your Profile</a></li>
                            <li><hr class="dropdown-divider" /></li>
                            <li><a class="dropdown-item" href="/dashboard/cart">Your Cart</a></li>
                            <li><a class="dropdown-item" href="/dashboard/orders">Purchased Items</a></li>
                            <li><hr class="dropdown-divider" /></li>
                            <li><a class="dropdown-item" href="/logout">Log Out</a></li>
                        </ul>
                </div>
            </div>
            <div class="row mt-3">
                <div  v-for = "(col,index) in columns" :key = "col" @click = changeMenu(index) :class = "{'menu-item':1,'menu-item-selected':selected_menu == index}">{{col}}</div>
            </div>
        </div>
    `,
    computed: {
        ...mapGetters({ selected_menu: "getSelectedMenu" }),
        ...mapGetters({ user: "getUser" }),
    },
    methods: {
        changeMenu(index) {
            this.$store.commit("setSelectedMenu", index);
        },
    },
};

const panel = {
    data() {
        return {};
    },

    template: /*html*/ `
        <div class="container-fluid">
                    
                    <div class="row">
                        <side-menu></side-menu>
                        
                        <div class="col" style = "height:100vh;overflow:auto;">
                               
                                <catalog v-show = "selected_menu == 0" ></catalog>
                                <stock-menu v-show = "selected_menu == 1" ></stock-menu>
                                <user-menu v-show = "selected_menu == 2"></user-menu>
                                <purchased-cloth v-show = "selected_menu == 3" ></purchased-cloth>
                                <request-menu  v-show = "selected_menu == 4"></request-menu>
                                <rating-menu v-show = "selected_menu == 5" ></rating-menu>
                                <review-menu v-show = "selected_menu == 6"></review-menu>
                                <builder-menu v-show = "selected_menu == 7"> </builder-menu>
                        </div>
                    </div>
            </div>
    `,

    computed: {
        ...mapGetters({ selected_menu: "getSelectedMenu" }),
    },
};

const Component_Path = "/js/Components/Admin/";

const components = [
    ["nav-bar", "/js/Components/NavBar.vue"],
    ["catalog", Component_Path + "Catalog.vue"],
    ["request-menu", Component_Path + "RequestMenu.vue"],
    ["stock-menu", Component_Path + "Stock.vue"],
    ["rating-menu", Component_Path + "Rating.vue"],
    ["pagination", "/js/Components/" + "pagination.vue"],
    ["purchased-cloth", Component_Path + "Orders.vue"],
    ["review-menu", Component_Path + "Reviews.vue"],
    ["builder-menu", Component_Path + "Builder.vue"],
    ["user-menu", Component_Path + "Users.vue"],
];

const app = Vue.createApp({
    data() {
        return {
            loading: true,
        };
    },
    created: function () {
        this.$store.dispatch("getClothes");
        this.$store.dispatch("getRequests");
        this.$store.dispatch("getSellerClothes");
        this.$store.dispatch("getOrders");
        this.$store.dispatch("getReviews");
        this.$store.dispatch("getUsers");
        this.$store.dispatch("getUser");
    },
    mounted() {
        //this.loading = false;
    },
    computed: {
        total() {
            var total = this.$store.getters.getTotal;
            if (total < 7) {
                this.loading = true;
            } else {
                this.loading = false;
            }
            return total;
        },
    },
});
app.use(store);
app.component("side-menu", side_menu);
app.component("panel", panel);
app.component("star-rating", VueStarRating.default);
addComponents(components).then((data) => app.mount("#app"));
