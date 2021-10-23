const store = Vuex.createStore({
    state() {
        return {
            clothes: [],
            users: [],
            orders: [],
            requests: [],
            seller_clothes: [],
            selected_menu: 1,
            wishlist: [],
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
    },
    getters: {
        getClothes: (state) => state.clothes,
        getRequests: (state) => state.requests,
        getSellerClothes: (state) => state.seller_clothes,
        getSelectedMenu: (state) => state.selected_menu,
        getWishlist: (state) => state.wishlist,
        getOrders: (state) => state.orders,
    },
});

const Cloth = {
    data() {
        return {
            price: 0,
            selected: "",
            quantity: 0,
            stock_by_size: {},
        };
    },

    props: ["cloth"],
    template: /*html*/ `<div class="col-sm-3 shadow mx-3 my-4 cloth-card" style="text-align: center;">
                    <div class="row">
                        <div class="col-sm-auto">
                            <img :src = cloth.url width = "300" height = "300">
                        </div>
    			
                    </div>
                    <div class="row mt-2">
                        <div class = "col-sm-12" ><h5 style = "text-overflow: ellipsis;white-space: nowrap;overflow: hidden;"  >{{cloth.name}}</h5></div>
                    </div>
                    <div class="row px-2 mt-2">
                        <div class = "col-sm-auto" style="text-align: left;">{{cloth.brand + ' | ' + cloth.category}}</div>
                        <div class = "col float-end" style="text-align: right;" >Rating</div>
                    </div>
                    <div class="row px-2 mt-3">
                        <div class = "col  fs-5" style="text-align: left;">
                            <div class="btn-group" role="group">
                                      <button  v-for = "stock in cloth.stock" :key = "stock"  @click=changeSize  :class="{btn:1,'shadow-none':0,'btn-outline-primary': selected != stock.size, 'btn-primary': selected == stock.size }" > {{stock.size}}</button>
                            </div>
			    
                        </div>
                        <div class = "col fs-5 float-end fw-bold text-wrap" style="text-align: right;" >{{'Rs '+price}}</div>
                    </div>
                    <div class="row mt-4">
                        <div @click = buynow class = "col bg-primary fs-4 rounded-bottom buynow-btn py-2" style="color: white;">
                                Buy Now
                        </div>
                        
                    </div>
                </div>`,
    methods: {
        buynow() {
            window.location.href = "/dashboard/clothes/" + this.$props.cloth["cloth_id"];
        },
        changeSize(event) {
            let size = event.target.innerHTML;
            this.selected = size;
            this.price = this.stock_by_size[size]["price"];
            this.quantity = this.stock_by_size[size]["quantity"];
        },
    },

    created: function () {
        let stocks = this.$props.cloth["stock"];
        for (var i = 0; i < stocks.length; i++) {
            this.stock_by_size[stocks[i]["size"]] = stocks[i];
        }
        const anystock = stocks[0];
        this.price = anystock["price"];
        this.quantity = anystock["quantity"];
        this.selected = anystock["size"];
    },
};

const side_menu = {
    data() {
        return {
            columns: ["Catlog", "Stock", "Sellers", "Customers", "Purchased Clothes", "Cloth Requests", "Ratings"],
        };
    },
    template: /*html*/ `
        <div class="col-2 pt-5" style="background-color: #0067b8;">
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
                
                        <div  v-for = "(col,index) in columns" :key = "col" @click = changeMenu :class = "{'menu-item':1,'menu-item-selected':selected_menu == index}">{{col}}</div>
                        

                
            </div>
        </div>
    `,
    computed: {
        ...mapGetters({ selected_menu: "getSelectedMenu" }),
    },
    methods: {
        changeMenu(event) {
            var txt = event.target.innerHTML;
            let s = 0;
            for (let i = 0; i < this.columns.length; i++) {
                if (txt == this.columns[i]) {
                    s = i;
                    break;
                }
            }
            this.$store.commit("setSelectedMenu", s);
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
                        </div>
                    </div>
            </div>
    `,

    created: function () {
        this.$store.dispatch("getClothes");
        this.$store.dispatch("getRequests");
        this.$store.dispatch("getSellerClothes");
        this.$store.dispatch("getOrders");
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
];

const app = Vue.createApp({});
//Vue = app;
app.use(store);
//app.use(Editor);
app.component("side-menu", side_menu);
app.component("cloth-card", Cloth);
app.component("panel", panel);
app.component("star-rating", VueStarRating.default);
addComponents(components).then((data) => app.mount("#app"));
