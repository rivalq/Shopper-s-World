const store = Vuex.createStore({
    state() {
        return {
            wishlist: [],
            loading: true,
        };
    },
    mutations: {
        setWishlist(state, payload) {
            state.wishlist = payload;
        },
        removeWish(state, payload) {
            state.wishlist.splice(payload, 1);
        },
        setloading(state, payload) {
            state.loading = payload;
        },
    },
    actions: {
        async getWishlist(state, payload) {
            axios.get("/api/marketplace/wishlist").then((response) => {
                let wishes = response.data;
                let wishlist = new Array(wishes.length);

                const func = async () => {
                    for (let i = 0; i < wishes.length; i++) {
                        let id = wishes[i];
                        wishlist[i] = new Object();
                        await axios.get("/api/marketplace/clothes/" + id).then((response) => {
                            wishlist[i]["cloth"] = response.data;
                            wishlist[i]["cloth"]["url"] = "/images/marketplace/" + id + "/profile";
                        });
                        await axios.get("/api/marketplace/ratings/" + id).then((response) => {
                            wishlist[i]["rating"] = response.data;
                        });
                    }
                };
                func().then((data) => {
                    state.commit("setWishlist", wishlist);
                    state.commit("setloading", false);
                });
            });
        },
        async removeWish(state, payload) {
            let id = state.getters.getWishlist[payload]["cloth"]["cloth_id"];
            axios
                .delete("/api/marketplace/wishlist/" + id)
                .then((response) => {
                    state.commit("removeWish", payload);
                    displayInfo("Wishlist updated");
                })
                .catch((response) => {
                    displayError("Some Error Occured");
                });
        },
    },
    getters: {
        getWishlist: (state) => state.wishlist,
        getloading: (state) => state.loading,
    },
});

const app = Vue.createApp({
    created: function () {
        this.$store.dispatch("getWishlist");
    },
    computed: {
        ...mapGetters({ loading: "getloading" }),
    },
});

app.use(store);
app.component("star-rating", VueStarRating.default);

const components = [
    ["nav-bar", NavBar],
    ["wish-list", "/js/Components/WishList.vue"],
    ["pagination", "/js/Components/pagination.vue"],
    ["footer-menu", Footer],
];

addComponents(components).then((data) => app.mount("#app"));
