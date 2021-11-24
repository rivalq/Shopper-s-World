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
        return {
            val_genders: [],
            val_brands: [],
            val_categories: [],
            map_genders: {},
            map_brands: {},
            map_categories: {},
            prefix: "",
            val_sort: 0,
        };
    },

    created: function () {
        this.$store.dispatch("getClothes");
    },
    computed: {
        ...mapGetters({ clothes: "getClothes" }),
        ...mapGetters({ loading: "loading" }),
        filter() {
            let cnt_genders = 0;
            let cnt_brands = 0;
            let cnt_categories = 0;
            for (let i = 0; i < this.val_brands.length; i++) {
                if (this.val_brands[i] == true) cnt_brands++;
            }
            for (let i = 0; i < this.val_categories.length; i++) {
                if (this.val_categories[i] == true) cnt_categories++;
            }
            for (let i = 0; i < this.val_genders.length; i++) {
                if (this.val_genders[i] == true) cnt_genders++;
            }
            let arr = new Array();
            let regex = new RegExp(this.prefix, "i");
            for (let i = 0; i < this.clothes.length; i++) {
                let flag = true;
                if (cnt_genders > 0) {
                    let index = this.map_genders[this.clothes[i]["gender"]];
                    if (this.val_genders[index] == false) flag = false;
                }
                if (cnt_brands > 0) {
                    let index = this.map_brands[this.clothes[i]["brand"]];
                    if (this.val_brands[index] == false) flag = false;
                }
                if (cnt_categories > 0) {
                    let index = this.map_categories[this.clothes[i]["category"]];
                    if (this.val_categories[index] == false) flag = false;
                }
                match = false;
                if (regex.test(this.clothes[i]["name"]) == true) match = true;
                if (regex.test(this.clothes[i]["brand"]) == true) match = true;
                if (regex.test(this.clothes[i]["category"]) == true) match = true;
                if (regex.test(this.clothes[i]["gender"]) == true) match = true;
                if (regex.test(this.clothes[i]["short_description"]) == true) match = true;
                if (regex.test(this.clothes[i]["long_description"]) == true) match = true;

                if (flag == true && match == true) {
                    arr.push(i);
                }
            }
            return arr;
        },
        page_data() {
            if (this.$refs.page == undefined) return [];
            return this.$refs.page.page_data;
        },
        categories() {
            let st = new Set();
            for (let i = 0; i < this.clothes.length; i++) {
                st.add(this.clothes[i]["category"]);
            }
            let arr = Array.from(st);
            this.val_categories = new Array(st.size).fill(false);
            this.map_categories = {};
            for (let i = 0; i < arr.length; i++) {
                this.map_categories[arr[i]] = i;
            }
            return arr;
        },
        genders() {
            let st = new Set();
            for (let i = 0; i < this.clothes.length; i++) {
                st.add(this.clothes[i]["gender"]);
            }
            let arr = Array.from(st);
            this.val_genders = new Array(st.size).fill(false);
            this.map_genders = {};
            for (let i = 0; i < arr.length; i++) {
                this.map_genders[arr[i]] = i;
            }
            return arr;
        },
        brands() {
            let st = new Set();
            for (let i = 0; i < this.clothes.length; i++) {
                st.add(this.clothes[i]["brand"]);
            }
            let arr = Array.from(st);
            this.val_brands = new Array(st.size).fill(false);
            this.map_brands = {};
            for (let i = 0; i < arr.length; i++) {
                this.map_brands[arr[i]] = i;
            }
            return arr;
        },
        any() {
            for (let i = 0; i < this.val_brands.length; i++) {
                if (this.val_brands[i] == true) return true;
            }
            for (let i = 0; i < this.val_categories.length; i++) {
                if (this.val_categories[i] == true) return true;
            }
            for (let i = 0; i < this.val_genders.length; i++) {
                if (this.val_genders[i] == true) return true;
            }
            if (this.prefix != "") return true;
            return false;
        },
        low() {
            if (this.$refs.page == undefined) return 0;
            return this.$refs.page.left + 1;
        },
        high() {
            if (this.$refs.page == undefined) return 0;
            return this.$refs.page.right + 1;
        },
    },
    methods: {
        clearFilter() {
            this.prefix = "";
            this.val_brands.fill(false);
            this.val_categories.fill(false);
            this.val_genders.fill(false);
        },
    },
    template: /*html*/ `
            <div v-if="loading == true" class="loading-wrapper">
                <div class="loading"></div>
                <div class="loading"></div>
                <div class="loading"></div>
                <div class="loading"></div>
                <div class="loading"></div>
                <div class="loading"></div>
            </div>
            <div v-show="loading == false">
                <nav-bar></nav-bar>
                <div class="container-fluid mt-5">
                    <div id="cloth-body" class="row mt-4" v-if="loading == false">
                        <div class="col-auto ms-3" style="width: 300px">
                            <div class="row">
                                <div class="col" style="font-size: 20px; font-weight: 500">FILTERS</div>
                                <div class="col-auto ms-auto cursor" style="color: rgb(229, 54, 55)" v-show="any" @click="clearFilter">CLEAR ALL</div>
                            </div>
                            <div class="input-wrapper">
                                <input type="text" placeholder="Search..." class="input mt-3" style="width: 300px; padding-left: 5px" v-model="prefix" />
                            </div>
                            <details class="mt-3">
                                <summary>GENDER</summary>
                                <div>
                                    <div class="form-check" v-for="(itr,index) in genders" :key="itr">
                                        <input class="form-check-input" type="checkbox" v-model="val_genders[index]" />
                                        <label class="form-check-label" for="flexCheckDefault"> {{itr}} </label>
                                    </div>
                                </div>
                            </details>
                            <details class="mt-3">
                                <summary>BRANDING</summary>
                                <div>
                                    <div class="form-check" v-for="(itr,index) in brands" :key="itr">
                                        <input class="form-check-input" type="checkbox" v-model="val_brands[index]" />
                                        <label class="form-check-label" for="flexCheckDefault"> {{itr}} </label>
                                    </div>
                                </div>
                            </details>
                            <details class="mt-3">
                                <summary>CATEGORIES</summary>
                                <div>
                                    <div class="form-check" v-for="(itr,index) in categories" :key="itr">
                                        <input class="form-check-input" type="checkbox" v-model="val_categories[index]" />
                                        <label class="form-check-label" for="flexCheckDefault"> {{itr}} </label>
                                    </div>
                                </div>
                            </details>
                        </div>
                        <div class="col-sm-9">
                            <div class="row">
                                <div class="col-auto ps-5">Showing {{low}} - {{high}} of {{filter.length}} Results</div>
                                <div class="col-auto ms-auto pe-5 me-2" v-show = "false">
                                    Sort by
                                    <select class="input ms-2" v-model="val_sort" style="width: 250px; font-weight: 500">
                                        <option value="0">Recommended</option>
                                        <option value="1">Price : Low to High</option>
                                        <option value="2">Price : High to Low</option>
                                        <option value="3">Rating</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row justify-content-md-center">
                                <cloth-menu v-for="index in page_data" :key="index" :index="index"></cloth-menu>
                            </div>
                        </div>
                    </div>
                    <pagination ref="page" :data="filter" :read="true"></pagination>
                </div>
                <footer-menu></footer-menu>
            </div>`,
});
app.use(store);

app.component("star-rating", VueStarRating.default);

addComponents(components).then((data) => app.mount("#app"));
