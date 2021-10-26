const store = Vuex.createStore({
    state() {
        return {
            clothes: [],
            users: [],
            orders: [],
            requests: [],
            seller_clothes: [],
            selected_menu: 8,
            wishlist: [],
            reviews: [],
        };
    },
    mutations: {
        setClothes(state, payload) {
            state.clothes = payload;
        },
        setRequests(state, payload) {
            state.requests = payload;
        },
        setSellerClothes(state, payload) {
            state.seller_clothes = payload;
        },
        setSelectedMenu(state, payload) {
            state.selected_menu = payload;
        },
        setWishlist(state, payload) {
            state.wishlist = payload;
        },
        setOrders(state, payload) {
            state.orders = payload;
        },
        setReviews(state, payload) {
            state.reviews = payload;
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
                state.commit("setReviews", response.data);
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
    },
});

const side_menu = {
    data() {
        return {
            columns: ["Catlog", "Stock", "Sellers", "Customers", "Purchased Clothes", "Cloth Requests", "Ratings", "Reviews", "Add New Cloth"],
        };
    },
    template: /*html*/ `
        <div class="col-2 pt-5 admin_sidebar" style="background-color: #0067b8;height:100vh;overflow:auto">
            
            <div class="row mt-5">
                    <div class="col" style="text-align: center;"> 
                        <img src = "/images/defalult_user_profile.png" width = "120" height = "100" >
                    </div>
            </div>
            <div class="row  mt-2 justify-content-md-center">
                <div class="col" style="text-align: center;">
                        admin
                </div>
            </div>
            <div class="row mt-3">
                
                        <div  v-for = "(col,index) in columns" :key = "col" @click = changeMenu(index) :class = "{'menu-item':1,'menu-item-selected':selected_menu == index}">{{col}}</div>
                        

                
            </div>
        </div>
    `,
    computed: {
        ...mapGetters({ selected_menu: "getSelectedMenu" }),
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
        <nav-bar style = "position:fixed;top:0;width:100%"></nav-bar>
        <div class="container-fluid">
                    
                    <div class="row">
                        <side-menu></side-menu>
                        
                        <div class="col" style = "height:100vh;overflow:auto;">
                               
                                <catalog v-show = "selected_menu == 0" ></catalog>
                                <stock-menu v-show = "selected_menu == 1" ></stock-menu>
                                <purchased-cloth v-show = "selected_menu == 4" ></purchased-cloth>
                                <request-menu  v-show = "selected_menu == 5"></request-menu>
                                <rating-menu v-show = "selected_menu == 6" ></rating-menu>
                                <review-menu v-show = "selected_menu == 7"></review-menu>
                                <builder-menu v-show = "selected_menu == 8"> </builder-menu>
                        </div>
                    </div>
            </div>
    `,

    created: function () {
        this.$store.dispatch("getClothes");
        this.$store.dispatch("getRequests");
        this.$store.dispatch("getSellerClothes");
        this.$store.dispatch("getOrders");
        this.$store.dispatch("getReviews");
    },

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
];

const app = Vue.createApp({});
app.use(store);
app.component("side-menu", side_menu);
app.component("panel", panel);
app.component("star-rating", VueStarRating.default);
addComponents(components).then((data) => app.mount("#app"));
