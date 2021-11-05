const components = [
    ["nav-bar", NavBar],
    ["footer-menu", Footer],
    ["cloth-menu", "/js/Components/Cloth.vue"],
    ["pagination", "/js/Components/pagination.vue"],
];

const store = Vuex.createStore({
    state() {
        return {
            clothes: [],
            loading: true,
        };
    },
    mutations: {
        setClothes(state, payload) {
            state.clothes = payload;
        },
        setloading(state, payload) {
            state.loading = payload;
        },
    },
    actions: {
        async getClothes(state, payload) {
            axios.get("/api/marketplace/clothes").then((response) => {
                let clothes = response.data;
                const func = async () => {
                    await axios.get("/api/marketplace/stock").then((response) => {
                        let map = new Object();
                        for (let i = 0; i < clothes.length; i++) {
                            map[clothes[i]["cloth_id"]] = i;
                            clothes[i]["stock"] = [];
                            clothes[i]["url"] = "/images/marketplace/" + clothes[i]["cloth_id"] + "/profile";
                        }
                        for (let i = 0; i < response.data.length; i++) {
                            let idx = map[response.data[i]["cloth_id"]];
                            clothes[idx]["stock"].push(response.data[i]);
                        }
                    });
                };
                func().then((data) => {
                    state.commit("setClothes", clothes);
                    state.commit("setloading", false);
                });
            });
        },
    },
    getters: {
        getClothes: (state) => state.clothes,
        loading: (state) => state.loading,
    },
});

const app = Vue.createApp({
    data() {
        return {};
    },

    created: function () {
        this.$store.dispatch("getClothes");
    },
    computed: {
        ...mapGetters({ clothes: "getClothes" }),
        ...mapGetters({ loading: "loading" }),
        filter() {
            let arr = new Array(this.clothes.length);
            for (let i = 0; i < arr.length; i++) arr[i] = i;
            return arr;
        },
        page_data() {
            return this.$refs.page.page_data;
        },
    },
});
app.use(store);

app.component("star-rating", VueStarRating.default);

addComponents(components).then((data) => app.mount("#app"));

/*$(window).resize(function () {
    if ($(window).width() <= 1423) {
        var elems = document.getElementsByClassName("cloth-card");
        for (var i = 0; i < elems.length; i++) {
            var cur = elems[i];
            cur.classList.remove("col-sm-3");
            cur.classList.add("col-sm-5");
        }
    }
    if ($(window).width() <= 1054) {
        var elems = document.getElementsByClassName("cloth-card");
        for (var i = 0; i < elems.length; i++) {
            var cur = elems[i];
            cur.classList.remove("col-sm-5");
            cur.classList.add("col-sm-7");
        }
    }
    if ($(window).width() > 1054 && $(window).width() <= 1423) {
        var elems = document.getElementsByClassName("cloth-card");
        for (var i = 0; i < elems.length; i++) {
            var cur = elems[i];
            cur.classList.remove("col-sm-7");
            cur.classList.add("col-sm-5");
        }
    }

    if ($(window).width() > 1423) {
        var elems = document.getElementsByClassName("cloth-card");
        for (var i = 0; i < elems.length; i++) {
            var cur = elems[i];
            cur.classList.remove("col-sm-5");
            cur.classList.add("col-sm-3");
        }
    }
});*/
