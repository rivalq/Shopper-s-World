const store = Vuex.createStore({
    state() {
        return {
            reviews: [],
        };
    },
    mutations: {
        setReviews(state, payload) {
            state.reviews = payload;
        },
    },
    actions: {
        async getReviews(state, payload) {
            axios.get("/api/marketplace/reviews").then((response) => {
                let reviews = response.data;
                const getCloths = async () => {
                    for (let i = 0; i < reviews.length; i++) {
                        let id = reviews[i]["cloth_id"];
                        await axios.get("/api/marketplace/clothes/" + id).then((response) => {
                            reviews[i]["cloth"] = response.data;
                            reviews[i]["cloth"]["url"] = "/images/marketplace/" + id + "/profile";
                        });
                    }
                };
                getCloths().then((data) => state.commit("setReviews", reviews));
            });
        },
    },
    getters: {
        getReviews: (state) => state.reviews,
    },
});

const app = Vue.createApp({
    created: function () {
        this.$store.dispatch("getReviews");
    },
});
app.use(store);

const components = [
    ["nav-bar", NavBar],
    ["review-menu", "/js/Components/Reviews.vue"],
];

addComponents(components).then((data) => app.mount("#app"));
