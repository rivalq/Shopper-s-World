

const mapGetters = Vuex.mapGetters;

const store = Vuex.createStore({
    state(){
        return{
              cart : [],  
             
        }
    },
    mutations:{
        setCart(state,payload){
            state.cart = payload;
            console.log(state.cart);
        },
    },

    
    actions:{
        
        async getCloth(state,payload){
            const resp =  await axios.get("/api/marketplace/clothes/" + payload);
            return resp.data;
        },
        async getPrice(state,payload){
            const resp =  await axios.get("/api/marketplace/stock/" + payload);
            return resp.data;
        },

        async setCart(state,payload){
            axios.get("/api/cart")
            .then(async response => {
                let cart = response.data;
                let cnt = 0;
                let n = 2*response.data.length;
                for(let i = 0; i < response.data.length; i++){
                    var id = response.data[i]["cloth_id"];
                    var size = response.data[i]["size"];
                    cart[i]["cloth"] = await state.dispatch("getCloth",id);
                    cart[i]["price"] = await state.dispatch("getPrice",`${id}/${size}`);
                    cart[i]["url"] = "/images/marketplace/" + id + "/profile";
                }
                state.commit("setCart",cart);
            })
        },
        
    },
    getters:{
        getCartLength: state => state.cart.length,
        getCart: state => state.cart,
    },
});


const cart_card = {
    data(){
        return{

        }
    },
    props:['id'],
    template: /*html*/ `
                <div class="row py-2 mt-2 border-bottom">
                    <div class="col-sm-auto">
                        <img :src = cart.url  width = 175 height = 175> 
                    </div>
                    <div class="col-md-8 py-2">
                        <div class="row">
                            <div class="col fw-bold fs-4 grey-1 text-wrap">{{cart.cloth.name}}</div>
                            <div class="col float-end" style = "text-align:end">{{cart.quantity}}</div>
                        </div>
                        <div class="row mt-1">
                            <div class="col grey-2">{{cart.cloth.brand + ' | ' + cart.cloth.category}}</div>
                        </div>
                        <div class="row mt-3">
                            <div class="col grey-2">{{'Size: ' + cart.size}}</div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-sm-auto grey-2">remove item</div>
                        </div>
                    </div>
                </div>
    `,
    computed:{
        cart:{
            get(){
                return this.$store.getters.getCart[this.$props.id - 1];
            }
        }
    }
};


const main = {
    data(){
        return{

        }
    },
    template: /*html*/ `
        <div class="container">
                <div class="row mt-5 justify-content-sm-center">
                    <div class="col-sm-auto grey-1">
                        <h3>Shopping Cart</h3>
                    </div>
                </div>
                
                <div class="row mt-5 justify-content-sm-center">
                        <div class="col-sm-8">
                                <div class="row">
                                    <div class="col grey-1" style = "font-size:20px;font-weight:550;line-height:24px">
                                        {{'Cart (' + cartLen +  ' items)'}}
                                    </div>
                                </div>
                               <cart-card v-for = "num in cartLen" :key = "num"  :id = num >

                               </cart-card>    
                        </div>
                        <div class="col-sm-2"></div>
                </div>
        </div>
    `,
    created:function(){
        this.$store.dispatch("setCart");
    },
    computed:{
        ...mapGetters({cartLen:"getCartLength"}),
    }
};


const app = Vue.createApp({});
app.use(store);
app.component("mycomp",main);
app.component("cart-card",cart_card);


app.mount("#app");

