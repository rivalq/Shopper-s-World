const store = Vuex.createStore({
    state() {
        return {
            cart: [],
            loading: true,
            user: [],
            checkout_loading: false,
        };
    },
    mutations: {
        setCart(state, payload) {
            state.cart = payload;
            state.loading = false;
        },
        removeCart(state, payload) {
            state.cart.splice(payload, 1);
        },
        setUser(state, payload) {
            state.user = payload;
        },
        setCheckout(state, payload) {
            state.checkout_loading = payload;
            var elem = document.getElementById("root");

            if (payload == true) {
                elem.classList.add("content");
                elem.parentNode.replaceChild(elem.cloneNode(true), elem);
            } else {
                elem.classList.remove("content");
                elem.removeAttribute("disabled");
            }
        },
    },

    actions: {
        async getCloth(state, payload) {
            const resp = await axios.get("/api/marketplace/clothes/" + payload);
            return resp.data;
        },
        async getPrice(state, payload) {
            const resp = await axios.get("/api/marketplace/stock/" + payload);
            return resp.data;
        },

        async setCart(state, payload) {
            axios.get("/api/cart").then(async (response) => {
                let cart = response.data;
                let cnt = 0;
                let n = 2 * response.data.length;
                for (let i = 0; i < response.data.length; i++) {
                    var id = response.data[i]["cloth_id"];
                    var size = response.data[i]["size"];
                    cart[i]["cloth"] = await state.dispatch("getCloth", id);
                    const stock = await state.dispatch("getPrice", `${id}/${size}`);
                    cart[i]["price"] = stock["price"];
                    cart[i]["stock"] = stock["quantity"];
                    cart[i]["url"] = "/images/marketplace/" + id + "/profile";
                }
                state.commit("setCart", cart);
            });
        },
        async updateCart(state, payload) {
            let id = state.getters.getCart[payload]["cloth_id"];
            const data = {
                quantity: state.getters.getCart[payload]["quantity"],
                size: state.getters.getCart[payload]["size"],
            };
            if (data["quantity"] == "") return;
            $.ajax({
                url: "/api/marketplace/cart/" + id,
                type: "POST",
                data: data,
                success: function (data) {
                    displaySuccess("Cart Updated");
                },
                error: function (data) {
                    displayError("Some error Occured");
                },
            });
        },

        async removeCart(state, payload) {
            let id = state.getters.getCart[payload]["cloth_id"];
            let cart = state.getters.getCart[payload];
            axios
                .delete("/api/marketplace/cart/" + id, { data: cart })
                .then((response) => {
                    displaySuccess("Cart updated");
                    state.commit("removeCart", payload);
                })
                .catch((response) => {
                    displayError("Some error Occurred");
                });
        },
        async checkout(state, payload) {
            state.commit("setCheckout", true);
            let success = 0;
            await axios
                .post("/api/marketplace/checkout")
                .then((data) => {
                    success = 1;
                    displaySuccess("Checkout Successfull");
                })
                .catch((data) => {
                    displayError("Some error Occured");
                })
                .finally(async (data) => {
                    await new Promise((r) => setTimeout(r, 2000));
                    state.commit("setCheckout", false);
                    if (success) window.location.href = "/dashboard/orders";
                });
        },
        async getUser(state, payload) {
            axios.get("/api/user").then((data) => state.commit("setUser", data.data));
        },
    },
    getters: {
        getCartLength: (state) => state.cart.length,
        getCart: (state) => state.cart,
        getUser: (stata) => stata.user,
        getCheckout: (state) => state.checkout_loading,
    },
});

const app = Vue.createApp({
    computed: {
        ...mapGetters({ checkout: "getCheckout" }),
    },
    created: function () {
        this.$store.dispatch("setCart");
        this.$store.dispatch("getUser");
    },
});
app.use(store);
const components = [
    ["nav-bar", NavBar],
    ["cart-menu", "/js/Components/Cart.vue"],
    ["footer-menu", Footer],
];

addComponents(components).then((data) => app.mount("#app"));
