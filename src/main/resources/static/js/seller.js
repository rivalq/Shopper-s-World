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
        };
    },
    mutations: {
        setSelectedMenu(state, payload) {
            state.selected_menu = payload;
        },
        setClothes(state, payload) {
            state.clothes = payload;
        },
        setUser(state, payload) {
            state.user = payload;
        },
        setRequests(state, payload) {
            state.requests = payload;
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
                console.log(response.data);
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
                    <div class="col" style="text-align: center;"> 
                        <img src = "/images/defalult_user_profile.png" width = "120" height = "100" >
                    </div>
            </div>
            <div class="row  mt-2 justify-content-md-center">
                <div class="col" style="text-align: center;color:white">
                        @seller
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
    created: function () {
        this.$store.dispatch("getUser").then((data) => this.$store.dispatch("getClothes"));
        this.$store.dispatch("getRequests");
    },
});
app.use(store);
app.component("side-menu", side_menu);
app.component("display-menu", display_menu);
addComponents(components).then((data) => app.mount("#app"));
