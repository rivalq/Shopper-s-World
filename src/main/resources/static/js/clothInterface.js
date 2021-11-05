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
                func().then((data) => state.commit("setCloth", cloth));
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

const basic_settings = {
    data() {
        return {};
    },
    template: /*html*/ `
                    
                    <div class="col-sm-auto">
                        <label for="basic_input">Name</label>
                    </div>
                    <div class="col mt-1">
                        <input  id = "name" style = "width:auto"   class = "form-control" type = "text" placeholder = "Cloth Name"  v-model.strip = "cloth.name" >
                    </div>
                    
                    <div class="col-sm-auto mt-3">
                        <label for="basic_input">Category</label>
                    </div>
                    <div class="col mt-1">
                        <input  id = "category"  style = "width:auto"  class = "form-control" type = "text" placeholder = "Category" v-model.strip  = "cloth.category">
                    </div>
                    <div class="col-sm-auto mt-3">
                        <label for="basic_input">Brand</label>
                    </div>
                    <div class="col mt-1">
                        <input  id = "brand" style = "width:auto"  class = "form-control" type = "text" placeholder = "Brand" v-model.strip  = "cloth.brand">
                    </div>
                    <div class="col-sm-auto mt-3">
                        <label for="basic_input">Short Description</label>
                    </div>
                    <div class="col mt-1">
                        <textarea  id = "short_description" style = "width:400px" rows = 3  class = "form-control" type = "text" placeholder = "Short Description" v-model.strip  = "cloth.short_description"></textarea>
                    </div>
                    <div class="col-sm-auto mt-3">
                            <button @click = "saveChanges"  style = "width:90px" type="button" class="btn btn-primary">Save</button>
                    </div>

    `,
    computed: {
        ...mapGetters({ cloth: "getCloth" }),
    },
    methods: {
        saveChanges() {
            if (this.cloth.name == "" || this.cloth.brand == "" || this.cloth.category == "" || this.cloth.short_description == "") {
                displayError("All the fields should be non empty");
            } else {
                this.$store.dispatch("updateClothdb");
            }
        },
    },
};

const cloth_images = {
    data() {
        return {};
    },
    template: /*html*/ `
            images section
    `,
};

const about_product = {
    data() {
        return {};
    },
    template: /*html*/ `
            about product
    `,
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
            <div class="col">About Product</div> 
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
                                                    <cloth-images  v-if = "selected == 1"></cloth-images>
                                                    <about-product v-if = "selected == 2"></about-product>
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

            <div class="row mt-5 justify-content-md-center">
                   <div @click = changeMenu :class="['col-sm-auto','py-1','cursor', selected_menu == 0 ? 'current_menu': 'text-muted']" style = "font-size:18px">Description</div> 
                   <div @click = changeMenu :class="['col-sm-auto','py-1','cursor', selected_menu == 1 ? 'current_menu': 'text-muted']" style = "font-size:18px">Features</div>
                   <div @click = changeMenu :class="['col-sm-auto','py-1','cursor', selected_menu == 2 ? 'current_menu': 'text-muted']" style = "font-size:18px">Reviews</div>
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
    created: function () {
        this.$store.dispatch("getReviews");
    },
    computed: {
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
];

app.component("star-rating", VueStarRating.default);
app.component("slider", slider);
app.component("dfr", dfr);
app.component("mycomp", Main);

app.component("fab", fab);
app.component("basic-settings", basic_settings);
app.component("cloth-images", cloth_images);
app.component("about-product", about_product);
app.component("crud-modal", crud_modal);
app.component("crud-sidebar", crud_sidebar);

addComponents(components).then((response) => app.mount("#app"));
