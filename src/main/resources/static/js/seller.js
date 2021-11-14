const components = [
    ["nav-bar", NavBar],
    ["builder-menu", "/js/Components/Seller/Builder.vue"],
    ["catalog-menu", "/js/Components/Seller/Catalog.vue"],
    ["request-menu", "/js/Components/Seller/Request.vue"],
];

const store = Vuex.createStore({
    state() {
        return {
            selected_menu: 2,
            clothes: [],
            user: [],
            requests: [],
            total: 0,
        };
    },
    mutations: {
        setSelectedMenu(state, payload) {
            state.selected_menu = payload;
        },
        setClothes(state, payload) {
            state.clothes = payload;
            state.total++;
        },
        setUser(state, payload) {
            state.user = payload;
            state.total++;
        },
        setRequests(state, payload) {
            state.requests = payload;
            state.total++;
        },
        addRequest(state, payload) {
            state.requests.push(payload);
        },
    },
    actions: {
        async getClothes(state, payload) {
            let username = state.getters.getUser["username"];
            axios.get("/api/seller/clothes").then((response) => {
                let clothes = response.data;
                for (let i = 0; i < clothes.length; i++) {
                    clothes[i]["url"] = "/images/" + username + "/created/" + clothes[i]["cloth_id"] + "/profile";
                }
                state.commit("setClothes", clothes);
            });
        },
        async getUser(state, payload) {
            await axios.get("/api/user").then((response) => {
                state.commit("setUser", response.data);
            });
        },
        async getRequests(state, payload) {
            axios.get("/api/seller/request").then((response) => {
                state.commit("setRequests", response.data);
            });
        },
    },

    getters: {
        getSelectedMenu: (state) => state.selected_menu,
        getUser: (state) => state.user,
        getClothes: (state) => state.clothes,
        getRequests: (state) => state.requests,
        getTotal: (state) => state.total,
    },
});

const side_menu = {
    data() {
        return {
            columns: ["Catlog", "Cloth Orders", "Add New Cloth"],
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

const display_menu = {
    data() {
        return {};
    },
    template: /*html*/ `
            <div class="col" style="height: 100vh; overflow: auto">
                <builder-menu v-show = "selected_menu == 2" ></builder-menu>
                <catalog-menu v-show = "selected_menu == 0"></catalog-menu>
                <request-menu v-show = "selected_menu == 1"></request-menu>
            </div>
    `,
    computed: {
        ...mapGetters({ selected_menu: "getSelectedMenu" }),
    },
};

const app = Vue.createApp({
    data() {
        return {
            loading: true,
        };
    },
    created: function () {
        this.$store.dispatch("getUser").then((data) => this.$store.dispatch("getClothes"));
        this.$store.dispatch("getRequests");
    },
    computed: {
        total() {
            var total = this.$store.getters.getTotal;
            if (total < 3) {
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
app.component("display-menu", display_menu);
addComponents(components).then((data) => app.mount("#app"));
