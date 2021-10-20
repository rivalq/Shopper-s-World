const store = Vuex.createStore({
    state() {
        return {
            orders: [],
        };
    },
    mutations: {
        setOrders(state, payload) {
            state.orders = payload;
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
                func().then((data) => state.commit("setOrders", orders));
            });
        },
    },
    getters: {
        getOrders: (state) => state.orders,
    },
});
const app = Vue.createApp({
    created: function () {
        this.$store.dispatch("getOrders");
    },
});
app.use(store);
const components = [
    ["nav-bar", NavBar],
    ["order-app", "/js/Components/Orders.vue"],
    ["pagination", "/js/Components/pagination.vue"],
];

addComponents(components).then((data) => app.mount("#app"));
