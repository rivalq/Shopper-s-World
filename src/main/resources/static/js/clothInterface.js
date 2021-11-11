/**
 * Vuex Store
 *
 */

const store = Vuex.createStore({
    state() {
        return {
            cart: 0,
            cloth: {},
            images: [],
            selected_size: "",
            price: 0,
            stock_by_size: {},
            quantity: 0,
            selected_menu: 0,
            selected_crud_menu: 0,
            reviews: [],
            user: {},
            loading: true,
        };
    },
    mutations: {
        setCart(state, payload) {
            state.cart = payload;
        },
        changeSize(state, payload) {
            state.selected_size = payload;
            state.price = stock_by_size[payload]["price"];
            state.quantity = stock_by_size[payload]["quantity"];
        },
        setCloth(state, payload) {
            state.cloth = payload;
        },
        setStockBysize(state, payload) {
            state.stock_by_size = payload;
        },
        setSelectedMenu(state, payload) {
            state.selected_menu = payload;
        },
        setSelectedCrudMenu(state, payload) {
            state.selected_crud_menu = payload;
        },
        setReviews(state, payload) {
            state.reviews = payload;
        },
        setUser(state, payload) {
            state.user = payload;
        },
        setloading(state, payload) {
            state.loading = payload;
        },
    },
    actions: {
        async setCloth(state, payload) {
            axios.get("/api/marketplace/clothes/" + payload).then((response) => {
                var cloth = new Object();
                cloth = response.data;
                cloth["url"] = "/images/marketplace/" + payload + "/profile";
                const func = async () => {
                    await axios.get("/api/marketplace/stock/" + payload).then((response) => {
                        cloth["stock"] = response.data;
                        stock_by_size = new Object();
                        for (var i = 0; i < response.data.length; i++) {
                            stock_by_size[response.data[i]["size"]] = response.data[i];
                        }
                        const anystock = response.data[0];
                        state.commit("setStockBysize", stock_by_size);
                        state.commit("changeSize", anystock["size"]);
                    });
                    await axios.get("/api/marketplace/images/" + payload).then((response) => {
                        cloth["images"] = response.data;
                    });
                    await axios.get("/api/marketplace/features/" + payload).then((response) => {
                        cloth["features"] = response.data;
                    });
                };
                func().then((data) => {
                    state.commit("setCloth", cloth);
                    state.commit("setloading", false);
                });
            });
        },
        async updateClothdb(state, payload) {
            let cloth = state.getters.getCloth;
            let id = cloth["cloth_id"];
            axios
                .put("/api/marketplace/clothes/" + id, cloth)
                .then((response) => {
                    displaySuccess("Cloth Updated");
                })
                .catch((error) => {
                    displayError("Some error Occurred");
                });
        },
        async updateCart(state, payload) {
            let cloth = state.getters.getCloth;
            let id = cloth["cloth_id"];
            const data = {
                quantity: state.getters.getCart,
                size: state.getters.getSelectedSize,
            };
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
        async getReviews(state, payload) {
            var id = window.location.href.split("/").at(-1);
            axios.get("/api/marketplace/reviews/" + id).then((response) => {
                state.commit("setReviews", response.data);
            });
        },
        async getUser(state, payload) {
            axios.get("/api/user").then((response) => {
                state.commit("setUser", response.data);
            });
        },
    },
    getters: {
        getCart: (state) => state.cart,
        getCloth: (state) => state.cloth,
        getImages: (state) => state.images,
        getPrice: (state) => state.price,
        getStockBySize: (state) => state.stock_by_size,
        getQuantity: (state) => state.quantity,
        getSelectedSize: (state) => state.selected_size,
        getSelectedMenu: (state) => state.selected_menu,
        getSelectedCrudMenu: (state) => state.selected_crud_menu,
        getReviews: (state) => state.reviews,
        getUser: (state) => state.user,
        getloading: (state) => state.loading,
    },
});

/**
 * Vue Components
 */

const fab = {
    data() {
        return {};
    },
    template: /*html*/ `
            <div class = "fab btn-ripple" @click = openCrudModal>
                <div>
                    <img src = "/images/icon_pencil.svg" id="customizeIcon">
                </div>
                <div id="customizeText" style = "margin-top:6px;font-size:14px">Customize Cloth</div>
            </div>
    `,
    methods: {
        openCrudModal() {
            var modal = $("#crud_modal");
            modal.modal("show");
        },
    },
};

const crud_sidebar = {
    data() {
        return {
            hover: -1,
        };
    },

    template: /*html*/ `
    <div  data-id = "par" @click = "selectCrudMenu"  @mouseover = "upHover"  @mouseleave = "noHover"  :class = "{row:1,'py-1':1,'sidebar-item':1,'sidebar-item-hover':hover == 0 && selected != 0,'sidebar-item-selected':selected == 0}">
        <div class="col-sm-auto">
            <img src = "/images/basic.svg"   :class = "{'sidebar-icon-selected': selected == 0}"  >
        </div>
        <div class="col">Basic Settings</div>         
    </div>
    <div data-id = "par" @click = "selectCrudMenu"  @mouseover = "upHover" @mouseleave = "noHover"   :class = "{row:1,'mt-2':1,'py-1':1 , 'sidebar-item':1,'sidebar-item-hover':hover == 1,'sidebar-item-selected':selected == 1}">
        <div class="col-sm-auto">
            <img src = "/images/images.svg"   width = "19" height = "19"   :class = "{'sidebar-icon-selected': selected == 1}"  >
        </div>
        <div class="col">Images</div>
    </div>
    <div data-id = "par" @click = "selectCrudMenu"  @mouseover = "upHover" @mouseleave = "noHover"  :class = "{row:1,'mt-2':1,'py-1':1,'sidebar-item':1,'sidebar-item-hover': hover == 2,'sidebar-item-selected':selected == 2}">
        <div class="col-sm-auto">
            <img src = "/images/about.svg" width = "19" height = "19" :class = "{'sidebar-icon-selected': selected == 2}"  >
        </div>
            <div class="col">Specifications</div> 
    </div>
    `,
    methods: {
        identify(elem) {
            while (true) {
                if (elem.getAttribute("data-id") != undefined) break;
                elem = elem.parentNode;
            }
            let str = elem.childNodes[1].innerHTML;
            if (str[0] == "B") return 0;
            else if (str[0] == "I") return 1;
            else return 2;
        },
        upHover(event) {
            var elem = event.target;
            this.hover = this.identify(elem);
        },
        noHover() {
            this.hover = -1;
        },
        selectCrudMenu(event) {
            var elem = event.target;
            this.$store.commit("setSelectedCrudMenu", this.identify(elem));
        },
    },

    computed: {
        ...mapGetters({ selected: "getSelectedCrudMenu" }),
    },
};

const crud_modal = {
    data() {
        return {};
    },
    template: /*html*/ `
                <div class="modal fade" id  = "crud_modal" tabindex="-1" aria-labelledby="Label" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content" style = "width:auto;margin-top:100px">
                            <div class = "crud-modal-body shadow-lg"  >
                                    <div class="container">
                                        <div class="row mt-4 pt-1">
                                            <div class="col" style = "margin-left:221px;font-size:15px">
                                                Customize this Cloth
                                            </div>
                                        </div>
                                        <div class="row mt-4">
                                            <div class="col-sm-3" id = "sidebar">
                                                    <crud-sidebar></crud-sidebar>
                                             </div>
                                            <div class="col ms-4" id = "menu" >
                                                    <basic-settings v-if = "selected == 0" ></basic-settings>
                                                    <cloth-images  v-show = "selected == 1"></cloth-images>
                                                    <about-product v-show = "selected == 2"></about-product>
                                            </div>
                                        </div>
                                        <div class="row mb-2 justify-content-md-end">
                                                <div class="col-sm-auto">
                                                    <button style = "width:90px" type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">Close</button>
                                                </div>
                                        </div>
                                    </div>                      
                            </div>
                        </div>
                    </div>
                </div>
      `,

    computed: {
        ...mapGetters({ selected: "getSelectedCrudMenu" }),
    },
};

const Main = {
    data() {
        return {
            id: 0,
        };
    },
    template: /*html*/ `<Cloth :id = id></Cloth>
    `,
    created: function () {
        this.id = window.location.href.split("/").at(-1);
        this.$store.dispatch("getUser");
    },
};

const slider = {
    data() {
        return {};
    },
    template: /*html*/ `

            <div class="row mt-5 justify-content-center">
                   <div @click = changeMenu :class="['col-auto','py-1','cursor', selected_menu == 0 ? 'current_menu': 'text-muted']" style = "font-size:18px">Description</div> 
                   <div @click = changeMenu :class="['col-auto','py-1','cursor', selected_menu == 2 ? 'current_menu': 'text-muted']" style = "font-size:18px">Reviews</div>
            </div>

    `,
    methods: {
        changeMenu(event) {
            var text = event.target.innerHTML;
            var temp;
            if (text[0] == "D") temp = 0;
            else if (text[0] == "F") temp = 1;
            else temp = 2;
            this.$store.commit("setSelectedMenu", temp);
        },
    },
    computed: {
        ...mapGetters({ selected_menu: "getSelectedMenu" }),
    },
};

const dfr = {
    data() {
        return {};
    },
    template: /*html*/ `
        <slider></slider>
        <div class="row mt-4">
            <Description v-show = "selected == 0"></Description>
            <Reviews   v-show = "selected == 2"></Reviews>
        </div>
    `,
    computed: {
        ...mapGetters({ selected: "getSelectedMenu" }),
    },
};

/**
 * Creating Vue App
 */

const app = Vue.createApp({
    data() {
        return {
            width: 0,
        };
    },
    created: function () {
        let id = window.location.href.split("/").at(-1);
        this.$store.dispatch("setCloth", id);
        this.$store.dispatch("getReviews");
    },
    mounted: function () {
        this.width = $(window).width();
        window.addEventListener("resize", () => {
            this.width = $(window).width();
        });
    },
    computed: {
        ...mapGetters({ loading: "getloading" }),
        ...mapGetters({ user: "getUser" }),
    },
});

app.use(store);
const PATH = "/js/Components/Cloth/";
const AVATAR = "https://avatars.dicebear.com/api/human/ihojfowhfo.svg";

const components = [
    ["nav-bar", NavBar],
    ["Cloth", PATH + "Cloth.vue"],
    ["Reviews", PATH + "Reviews.vue"],
    ["footer-menu", Footer],
    ["Description", PATH + "Description.vue"],
    ["cloth-images", PATH + "Images.vue"],
    ["basic-settings", PATH + "EditCloth.vue"],
    ["about-product", PATH + "EditSpecs.vue"],
];

app.component("star-rating", VueStarRating.default);
app.component("slider", slider);
app.component("dfr", dfr);
app.component("mycomp", Main);
app.component("fab", fab);
app.component("crud-modal", crud_modal);
app.component("crud-sidebar", crud_sidebar);

addComponents(components).then((response) => app.mount("#app"));
