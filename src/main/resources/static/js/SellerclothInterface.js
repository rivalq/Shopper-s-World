const store = Vuex.createStore({
    state() {
        return {
            cloth: {},
            images: [],
            selected_crud_menu: 0,
            loading: false,
        };
    },
    mutations: {
        setCloth(state, payload) {
            state.cloth = payload;
        },
        setSelectedCrudMenu(state, payload) {
            state.selected_crud_menu = payload;
        },
        setloading(state, payload) {
            state.loading = payload;
        },
    },
    actions: {
        async setCloth(state, payload) {
            await axios.get("/api/seller/clothes/" + payload).then((response) => {
                var cloth = new Object();
                cloth = response.data;
                const func = async () => {
                    await axios.get("/api/seller/clothes/images/" + payload).then((response) => {
                        cloth["images"] = response.data;
                    });
                    await axios.get("/api/seller/clothes/features/" + payload).then((response) => {
                        cloth["features"] = response.data;
                    });
                };
                func().then((data) => {
                    state.commit("setCloth", cloth);
                });
            });
        },
        async updateClothdb(state, payload) {
            let cloth = state.getters.getCloth;
            axios.post("/api/seller/clothes/" + cloth["cloth_id"], cloth).then((data) => {
                displaySuccess("Cloth updated");
            });
        },
    },
    getters: {
        getCloth: (state) => state.cloth,
        getImages: (state) => state.images,
        getSelectedCrudMenu: (state) => state.selected_crud_menu,
        getloading: (state) => state.loading,
    },
});

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
                                                    <cloth-images  v-if = "selected == 1"></cloth-images>
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
    },
};

const app = Vue.createApp({
    data() {
        return {
            loading: true,
            width: 0,
        };
    },
    created: function () {
        let id = window.location.href.split("/").at(-1);
        this.$store.dispatch("setCloth", id);
    },
    mounted() {
        this.loading = false;
        this.width = $(window).width();
        window.addEventListener("resize", () => {
            this.width = $(window).width();
        });
    },
});

const PATH = "/js/Components/Seller/";
components = [
    ["nav-bar", NavBar],
    ["footer-menu", Footer],
    ["Cloth", PATH + "Cloth.vue"],
    ["cloth-images", PATH + "Images.vue"],
    ["about-product", PATH + "EditSpecs.vue"],
    ["basic-settings", PATH + "EditCloth.vue"],
    ["Description", PATH + "Description.vue"],
];
app.use(store);
app.component("mycomp", Main);
app.component("fab", fab);
app.component("crud-modal", crud_modal);
app.component("crud-sidebar", crud_sidebar);
addComponents(components).then((data) => app.mount("#app"));
