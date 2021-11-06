const store = Vuex.createStore({
    state() {
        return {
            orders: [],
            loading: true,
        };
    },
    mutations: {
        setOrders(state, payload) {
            state.orders = payload;
        },
        setloading(state, payload) {
            state.loading = false;
        },
    },
    actions: {
        async getOrders(state, payload) {
            axios.get("/api/marketplace/orders").then((response) => {
                let orders = response.data;
                const func = async () => {
                    for (let i = 0; i < response.data.length; i++) {
                        let id = orders[i]["cloth_id"];
                        await axios.get("/api/marketplace/clothes/" + id).then((response) => {
                            orders[i]["cloth"] = response.data;
                            orders[i]["cloth"]["url"] = "/images/marketplace/" + id + "/profile";
                        });
                    }
                };
                func().then((data) => {
                    state.commit("setOrders", orders);
                    state.commit("setloading", false);
                });
            });
        },
    },
    getters: {
        getOrders: (state) => state.orders,
        getloading: (state) => state.loading,
    },
});
const app = Vue.createApp({
    created: function () {
        this.$store.dispatch("getOrders");
    },
    computed: {
        ...mapGetters({ loading: "getloading" }),
    },
});
app.use(store);
app.component("star-rating", VueStarRating.default);
const components = [
    ["nav-bar", NavBar],
    ["order-app", "/js/Components/Orders.vue"],
    ["pagination", "/js/Components/pagination.vue"],
    ["footer-menu", Footer],
];

addComponents(components).then((data) => app.mount("#app"));
