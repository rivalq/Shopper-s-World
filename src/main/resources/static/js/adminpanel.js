
const mapGetters = Vuex.mapGetters;

const store = Vuex.createStore({
    state(){
        return{
            clothes: [],
            users:[],
            orders:[],
            requests:[],
            seller_clothes:[],
            selected_menu:0,
        }
    },
    mutations:{
        setClothes(state,payload){
            state.clothes = payload;
        },
        setRequests(state,payload){
            state.requests = payload;
        },
        setSellerClothes(state,payload){
            state.seller_clothes = payload;
        },
        setSelectedMenu(state,payload){
            state.selected_menu = payload;
        }
    },
    actions:{

        async getClothes(state,payload){

            var images = await axios.get("/api/admin/images");
            images = images.data;
            var stock  = await axios.get("/api/admin/stock"); 
            stock = stock.data;

            axios.get("/api/marketplace/clothes")
            .then(response => {
                let clothes = response.data;
                for(let i = 0; i < clothes.length; i++){
                    clothes[i]["stock"] = new Array();
                    clothes[i]["images"] = new Array();
                    clothes[i]["url"] = "/images/marketplace/" + clothes[i]["cloth_id"] + "/profile";
                    for(let j = 0; j < stock.length; j++){
                        if(stock[j]["cloth_id"] == clothes[i]["cloth_id"]){
                            clothes[i]["stock"].push(stock[j]);
                        }
                    }
                    for(let j = 0; j < images.length; j++){
                        if(images[j]["cloth_id"] == clothes[i]["cloth_id"]){
                            clothes[i]["images"].push(images[j]);
                        }
                    }
                }
                state.commit("setClothes",clothes);
                
            })
        },

        async getRequests(state,payload){
            axios.get("/api/admin/requests")
            .then(response => {
                state.commit("setRequests",response.data);
            })
        },
        
        async getSellerClothes(state,payload){

            var images = await axios.get("/api/admin/seller_clothes/images");
            images = images.data;

            axios.get("/api/admin/seller_clothes")
            .then(response => {
                   state.commit("setSellerClothes",response.data); 
            })   
        }


    },
    getters:{
        getClothes: state => state.clothes,
        getRequests: state => state.requests,
        getSellerClothes: state => state.seller_clothes,
        getSelectedMenu: state => state.selected_menu,
    },
});


const Cloth = {
    data(){
        return{
            price: 0,
            selected: '',
            quantity:0,
            stock_by_size: {}
        }
    },
    
    props: ['cloth'],
    template: /*html*/`<div class="col-sm-3 shadow mx-3 my-4 cloth-card" style="text-align: center;">
                    <div class="row">
                        <div class="col-sm-auto">
                            <img :src = cloth.url width = "300" height = "300">
                        </div>
    			
                    </div>
                    <div class="row mt-2">
                        <div class = "col-sm-12" ><h5 style = "text-overflow: ellipsis;white-space: nowrap;overflow: hidden;"  >{{cloth.name}}</h5></div>
                    </div>
                    <div class="row px-2 mt-2">
                        <div class = "col-sm-auto" style="text-align: left;">{{cloth.brand + ' | ' + cloth.category}}</div>
                        <div class = "col float-end" style="text-align: right;" >Rating</div>
                    </div>
                    <div class="row px-2 mt-3">
                        <div class = "col  fs-5" style="text-align: left;">
                            <div class="btn-group" role="group">
                                      <button  v-for = "stock in cloth.stock" :key = "stock"  @click=changeSize  :class="{btn:1,'shadow-none':0,'btn-outline-primary': selected != stock.size, 'btn-primary': selected == stock.size }" > {{stock.size}}</button>
                            </div>
			    
                        </div>
                        <div class = "col fs-5 float-end fw-bold text-wrap" style="text-align: right;" >{{'Rs '+price}}</div>
                    </div>
                    <div class="row mt-4">
                        <div @click = buynow class = "col bg-primary fs-4 rounded-bottom buynow-btn py-2" style="color: white;">
                                Buy Now
                        </div>
                        
                    </div>
                </div>`,
       methods: {
            buynow(){
                window.location.href = "/dashboard/clothes/" + this.$props.cloth["cloth_id"];
            },
            changeSize(event){
                let size = event.target.innerHTML;
                this.selected = size;
                this.price = this.stock_by_size[size]["price"];
                this.quantity = this.stock_by_size[size]["quantity"];
            }
       },
       
       created: function(){
            let stocks = this.$props.cloth["stock"];    
            for(var i = 0; i < stocks.length; i++){
                    this.stock_by_size[stocks[i]["size"]] = stocks[i];
            }
            const anystock = stocks[0];
            this.price = anystock["price"];
            this.quantity = anystock["quantity"];
            this.selected = anystock["size"];

       }
       
}


const catalog = {

    data(){
        return{

        }
    },

    template: /*html*/ `
                <div class="row mt-3">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope = "col">Cloth id</th>
                                <th scope = "col">Cloth Name</th>
                                <th scope = "col">Brand</th>
                                <th scope = "col">Category</th>
                                <th scope = "col">Status</th>
                                <th scope = "col">Visible</th>
                            </tr>
                        </thead>
                        <tbody>
                                <tr v-for = "cloth in clothes" :key = "cloth"  >
                                    <th scope = "row">{{cloth.cloth_id}}</th>
                                    <td style = "cursor:pointer" @click = showCloth >{{cloth.name}}</td>
                                    <td>{{cloth.brand}}</td>
                                    <td>{{cloth.category}}</td>
                                    <td>In stock</td>
                                    <td>Yes</td>
                                </tr>
                        </tbody>
                    </table>
                </div>
    `,
    methods: {
        showCloth(e){
            var id = e.target.parentNode.childNodes[0].innerHTML;
            window.location.href = "/dashboard/clothes/" + id;
        }
    },
    computed:{
        ...mapGetters({clothes:"getClothes"}),
    }

};


const request_menu = {

    data(){
        return{
            
        }
    },
    template: /*html*/  `
            <div class="row mt-3">
                <h3>Pending Requests</h3>
                <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope = "col">Request id</th>
                                <th scope = "col">Seller Name</th>
                                <th scope = "col">Cloth Name</th>
                                <th scope = "col">Quantity</th>
                                <th scope = "col">Size</th>
                                <th scope = "col">Price</th>

                                
                            </tr>
                        </thead>
                        <tbody>
                                <tr v-for = "(request,index) in pending" :key = "request" >
                                    <th scope = "row">{{request.request_id}}</th>
                                    <td>{{request.seller}}</td>
                                    <td>cloth name</td>
                                    <td>{{request.quantity}}</td>
                                    <td>{{request.size}}</td>
                                    <td>{{request.price}}</td>
                                </tr>
                        </tbody>
                </table>

                 <h3>Old Requests</h3>    
                 <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope = "col">Request id</th>
                                <th scope = "col">Seller Name</th>
                                <th scope = "col">Cloth Name</th>
                                <th scope = "col">Quantity</th>
                                <th scope = "col">Size</th>
                                <th scope = "col">Price</th>
                                <th scope = "col">Action Taken</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                                <tr v-for = "(request,index) in older" :key = "request"  >
                                    <th scope = "row">{{request.request_id}}</th>
                                    <td>{{request.seller}}</td>
                                    <td>{{clothes[request.cloth_id]}}</td>
                                    <td>{{request.quantity}}</td>
                                    <td>{{request.size}}</td>
                                    <td>{{'Rs '  + request.price}}</td>
                                    <td v-if = "request.result == 1" > Accepted
                                        <svg class="MuiSvgIcon-root jss312" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>
                                    </td>
                                    <td v-if = "request.result == 0" > Rejected
                                        <svg  class="MuiSvgIcon-root" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" focusable="false" viewBox="0 0 24 24">
                                            <line x1="6" y1="6" x2="20" y2="20" stroke="red" stroke-width="2" />
                                            <line x1="20" y1="6" x2="6" y2="20" stroke="red" stroke-width="2" />
                                        </svg>
                                    </td>
                                </tr>
                        </tbody>
                </table>

            </div>
    `,
    computed:{

        pending(){
            
            return this.$store.getters.getRequests.filter(request => request["status"] == 0);

        },
        older(){
            return this.$store.getters.getRequests.filter(request => request["status"] == 1);
        },

        clothes(){
            var cloth = this.$store.getters.getSellerClothes;

            var obj = new Object();

            for(let i = 0; i < cloth.length; i++){
                obj[cloth[i]["cloth_id"]] = cloth[i]["name"];
            }
            return obj;
        }
    }

};

const side_menu = {
    data(){
        return{

        }
    },
    template: /*html*/ `
        <div class="col-2 pt-5" style="background-color: #0067b8;">
            <div class="row mt-5">
                    <div class="col" style="text-align: center;"> 
                        <img src = "/images/defalult_user_profile.png" width = "120" height = "100" >
                    </div>
            </div>
            <div class="row  mt-2 justify-content-md-center">
                <div class="col" style="text-align: center;">
                        admin
                </div>
            </div>
            <div class="row mt-3">
                
                        <div @click = changeMenu :class = "{'menu-item':1,'menu-item-selected':selected_menu == 0}">Catalog</div>
                        <div @click = changeMenu :class = "{'menu-item':1,'menu-item-selected':selected_menu == 1}">Stock</div>
                        <div @click = changeMenu :class = "{'menu-item':1,'menu-item-selected':selected_menu == 2}">Sellers</div>
                        <div @click = changeMenu :class = "{'menu-item':1,'menu-item-selected':selected_menu == 3}">Customers</div>
                        <div @click = changeMenu :class = "{'menu-item':1,'menu-item-selected':selected_menu == 4}">Orders</div>
                        <div @click = changeMenu :class = "{'menu-item':1,'menu-item-selected':selected_menu == 5}">Cloth Requests</div>
                
            </div>
        </div>
    `,
    computed:{
        ...mapGetters({selected_menu:"getSelectedMenu"}),
    },
    methods:{
        changeMenu(event){
            var txt = event.target.innerHTML;
            let s = 0;
            if(txt == "Catalog")s = 0;
            else if(txt == "Stock")s = 1;
            else if(txt == "Sellers")s = 2;
            else if(txt == "Customers")s = 3;
            else if(txt == "Orders")s = 4;
            else if(txt == "Cloth Requests")s = 5;
            this.$store.commit("setSelectedMenu",s);
        }
    }
}

const panel = {
    data(){
        return{
               
        }
    },

    template: /*html*/ `
        <div class="container-fluid">
                    <div class="row">
                        <side-menu></side-menu>
                        
                        <div class="col ms-5" style = "height:100vh;overflow:auto">
                                <catalog v-show = "selected_menu == 0" ></catalog>
                                <request-menu  v-show = "selected_menu == 5"></request-menu>
                        </div>
                    </div>
            </div>
    `,

    created:function(){
        this.$store.dispatch("getClothes");
        this.$store.dispatch("getRequests");
        this.$store.dispatch("getSellerClothes");
    },

    computed:{
        ...mapGetters({selected_menu:"getSelectedMenu"}),
    }

}






const app = Vue.createApp({});
app.use(store);

app.component("side-menu",side_menu);
app.component("request-menu",request_menu);
app.component("cloth-card",Cloth);
app.component("catalog",catalog);
app.component("panel",panel);


app.mount("#app");