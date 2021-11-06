const store = Vuex.createStore({
    state() {
        return {
            cart: [],
        };
    },
    mutations: {
        setCart(state, payload) {
            state.cart = payload;
            console.log(state.cart);
        },
        removeCart(state, payload) {
            state.cart.splice(payload, 1);
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
                    cart[i]["price"] = await state.dispatch("getPrice", `${id}/${size}`);
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
            const data = {
                quantity: state.getters.getCart[payload]["quantity"],
                size: state.getters.getCart[payload]["size"],
            };
            $.ajax({
                url: "/api/marketplace/cart/" + id,
                type: "DELETE",
                data: data,
                success: function (data) {
                    displaySuccess("Cart updated");
                    state.commit("removeCart", payload);
                },
                error: function (data) {
                    displayError("Some error Occurred");
                },
            });
        },
        async checkout(state, payload) {
            let prices = [];
            let cart = state.getters.getCart;
            for (var i = 0; i < cart.length; i++) {
                prices.push(cart[i]["price"]);
            }
            const data = {
                prices: prices,
            };
            $.ajax({
                url: "/api/marketplace/checkout",
                type: "POST",
                success: function (data) {
                    displaySuccess("Order Successful");
                    //window.location.href = "/dashboard/clothes";
                },
                error: function (data) {
                    displayError("Some error occured");
                },
            });
        },
    },
    getters: {
        getCartLength: (state) => state.cart.length,
        getCart: (state) => state.cart,
    },
});

const cart_card = {
    data() {
        return {};
    },
    props: ["id"],
    template: /*html*/ `
                <div class="row py-2 mt-2 border-bottom">
                    <div class="col-sm-auto">
                        <img :src = cart.url  width = 175 height = 175> 
                    </div>
                    <div class="col-sm-8 py-2">
                        <div class="row">
                            <div class="col fw-bold fs-4 grey-1 text-wrap">{{cart.cloth.name}}</div>
                            <div class="col-sm-auto ms-auto">
                                <div class="btn-group" role = "group">
                                        <button @click = "decrease" class = "btn border border-2 border-end-0 shadow-none" style = "color:red;"> - </button>
                                        <input  @input = "changeCart"  class = "form-control input-group-sm border border-2 shadow-none" style = "width:70px" type="number" v-model = "cart.quantity">
                                        <button @click = "increase"  class = "btn border border-2 border-start-0 shadow-none" style = "color:green;"> + </button>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-1">
                            <div class="col grey-2">{{cart.cloth.brand + ' | ' + cart.cloth.category}}</div>
                        </div>
                        <div class="row mt-3">
                            <div class="col grey-2">{{'Size: ' + cart.size}}</div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-sm-auto grey-2 text-wrap">
                                    <div  @click = "removeItem"  class="row g-2 remove-item">
                                        <div class="col"> <i class="fas fa-trash-alt"></i></div>
                                        <div class="col-sm-auto"> Remove Item</div>
                                    </div>
                            </div>
                            <div class="col-sm-auto grey-1 ms-auto fs-5">{{'Rs ' + cart.price }}</div>
                        </div>
                    </div>
                </div>
    `,
    computed: {
        cart: {
            get() {
                return this.$store.getters.getCart[this.$props.id - 1];
            },
        },
    },
    methods: {
        increase() {
            this.cart["quantity"]++;
            this.$store.dispatch("updateCart", this.$props.id - 1);
        },
        decrease() {
            this.cart["quantity"]--;
            this.$store.dispatch("updateCart", this.$props.id - 1);
        },
        changeCart() {
            this.$store.dispatch("updateCart", this.$props.id - 1);
        },
        removeItem() {
            this.$store.dispatch("removeCart", this.$props.id - 1);
        },
    },
};

const main = {
    data() {
        return {};
    },
    template: /*html*/ `
        <div class="container">
                <div class="row mt-5 justify-content-sm-center">
                    <div class="col-sm-auto grey-1">
                        <h3>Shopping Cart</h3>
                    </div>
                </div>
                
                <div class="row mt-5">
                        <div class="col-md-8">
                                <div class="row">
                                    <div class="col grey-1" style = "font-size:20px;font-weight:550;line-height:24px">
                                        {{'Cart (' + cartLen +  ' items)'}}
                                    </div>
                                </div>
                               <transition-group name="list-complete" tag = "div">
                                    <cart-card v-for = "num in cartLen" :key = "num"  :id = num  class = "list-complete-item"  ></cart-card> 
                               </transition-group>
                               <div class="row mt-5 text-primary">
                                   <div class="col-sm-auto"><i class="fas fa-info-circle"></i></div>
                                   <div class="col"> Do not delay the purchase, adding items to your cart does not mean booking them.</div>
                               </div>   
                        </div>
                        <div class="col-md-4 pt-2 ps-4 ms-auto">
                                <div class="row ">
                                    <div class="col grey-1 fs-4">Details</div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col grey-1 fs-5">Items</div>
                                </div>
                                <div class="row border-bottom pb-3">
                                    <div class="col">
                                        <div class="row mt-3" v-for = "ct in cart" :key = "ct" >
                                            <div class="col text-wrap grey-3">{{ct.cloth.name}}</div>
                                            <div class="col text-wrap ms-auto grey-3" style = "font-size:16px">{{ 'Rs ' + ct.price + ' x (' + ct.quantity + ')'}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-2">
                                        <div class="col text-wrap grey-1 fs-5 fw-bold">Total Amount</div>
                                        <div class="col text-wrap grey-1 fs-5 fw-bold"> {{'Rs ' + total}} </div>
    
                                </div>
                                <div class="row mt-4 justify-content-sm-center">
                                    <div  @click = checkout  class="col-sm-11 rounded py-2 bg-primary" style = "color:white;text-align:center;cursor:pointer;font-weight:550" >
                                             Checkout
                                    </div>
                                </div>
                        </div>
                </div>
                
        </div>
    `,
    created: function () {
        this.$store.dispatch("setCart");
    },
    methods: {
        checkout() {
            this.$store.dispatch("checkout");
        },
    },
    computed: {
        ...mapGetters({ cartLen: "getCartLength" }),
        ...mapGetters({ cart: "getCart" }),
        total() {
            let val = 0;
            for (let i = 0; i < this.cartLen; i++) {
                val += this.cart[i]["price"] * this.cart[i]["quantity"];
            }
            return val;
        },
    },
};

const app = Vue.createApp({});
app.use(store);
app.component("mycomp", main);
app.component("cart-card", cart_card);
const components = [["nav-bar", NavBar]];

addComponents(components).then((data) => app.mount("#app"));
