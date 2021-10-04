









const store = Vuex.createStore({
    state(){
        return{
            cart:0
        }
    },
    mutations:{
        increment (state) {
            state.cart++;
        }      
    }
})



const fab = {
    data(){
        return{
            isActive:0
        }
    },
    template: /*html*/ `
            <div @click = actionToggle  :class="{action:1,active:isActive}">
                <span>+</span>
                <ul>
                    <li>Edit Cloth</li>
                    <li>Edit Features</li>
                    <li>Edit Price</li>
                    <li>Edit Description</li>
                    <li>Manage Images</li>
                </ul>
            </div>
    `,
    methods:{
        actionToggle(){
            this.isActive ^= 1;
        }
    }
}




const CHead = {
    data() {
        return {
            price: 0,
            selected: '',
            quantity: 0,
            cloth: {},
            stock_by_size: {},
            images: [],
            wish1: 'Add to WishList',
            wish2: 'Remove from WishList',
            wish: 0,
            cart: 0,
        }
    },
    props: ['id'],
    template: /*html*/ `
        <div class="row mt-5">
                <div class="col-lg-5">
                    <img  :src = cloth.url class = "width"   height = "500">
                </div>
                <div class="col-lg-6 ps-4">
                    <div class="row mt-3">
                        <div class="col" style="font-size: 34px;font-weight: 400; color: rgb(0,0,0,0.87);">
                           {{cloth.name}}
                        </div>
                        <div class="col-sm-auto float-end">
                            <div class = "row mt-3">
                                <div class="col-sm-auto">{{wish1}}</div>
                                <div class="col-sm-auto"> <i @click = changeWish  :class="{fa:1,'fa-heart':wish,'fa-heart-o':!wish}" aria-hidden="true" ></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-1">
                        <div class="col-md-auto">{{cloth.brand + ' | ' + cloth.category}}</div>
                    </div>
                    <div class="row mt-3">
                        <div class="col fw-bold fs-4">{{'Rs '+price}}</div>
                        <div class="col float-end px-3" style="text-align: end;">Rating</div>
                    </div>
                    <div class="row mt-3">
                        <div class="col text-muted text-wrap lh-base">
                           {{cloth.long_description}}
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col">
                            <div class="btn-group" role="group">
                                      <button  v-for = "stock in cloth.stock" :key = "stock"  @click=changeSize  :class="{btn:1,'shadow-none':0,'btn-outline-primary': selected != stock.size, 'btn-primary': selected == stock.size }" > {{stock.size}}</button>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col-md-auto">
                                <div class="btn-group" role = "group">
                                        <button @click = "decrease" class = "btn border border-2 border-end-0 shadow-none" style = "color:red;"> - </button>
                                        <input  class = "form-control input-group-sm border border-2 shadow-none" style = "width:70px" type="number" v-model = "cart">
                                        <button @click = "increase"  class = "btn border border-2 border-start-0 shadow-none" style = "color:green;"> + </button>
                                </div>
                        </div>
                        
                    </div>
                    
                    <div class="row mt-4">
                        <div class="col-sm-6" style="color: white;">
                               <button class = "btn btn-primary col-sm-9">Add to Cart</button> 
                        </div>
                    </div>
                </div>
        </div>
    `,

    methods: {
        changeSize(event) {
            let size = event.target.innerHTML;
            this.selected = size;
            this.price = this.stock_by_size[size]["price"];
            this.quantity = this.stock_by_size[size]["quantity"];
        },
        changeWish(event) {
            this.wish = 1 - this.wish;
            [this.wish1, this.wish2] = [this.wish2, this.wish1];
        },
        increase(event) {
            this.cart++;
        },
        decrease(event) {
            this.cart--;
        }
    },


    created: function () {
        axios.get('/api/marketplace/clothes/' + this.$props.id)
            .then(response => {
                this.cloth = response.data;
                this.cloth["url"] = "/images/marketplace/" + this.$props.id + "/profile";
                axios.get('/api/marketplace/stock/' + this.$props.id)
                    .then(response => {
                        this.cloth["stock"] = response.data;
                        for (var i = 0; i < response.data.length; i++) {
                            this.stock_by_size[response.data[i]["size"]] = response.data[i];
                        }

                        const anystock = response.data[0];
                        this.price = anystock["price"];
                        this.quantity = anystock["quantity"];
                        this.selected = anystock["size"];
                    })

            })
            .catch(error => {
                console.log(error);
            })
    }

}

const slider = {
    data() {
        return {
            selected:0,
        }
    },
    template: /*html*/ `

            <div class="row mt-5 justify-content-md-center">
                   <div @click = changeMenu :class="['col-sm-auto','py-1','cursor', selected == 0 ? 'current_menu': 'text-muted']" style = "font-size:18px">Description</div> 
                   <div @click = changeMenu :class="['col-sm-auto','py-1','cursor', selected == 1 ? 'current_menu': 'text-muted']" style = "font-size:18px">Features</div>
                   <div @click = changeMenu :class="['col-sm-auto','py-1','cursor', selected == 2 ? 'current_menu': 'text-muted']" style = "font-size:18px">Reviews</div>
            </div>

    `,
    methods: {
        changeMenu(event) {
            var text = event.target.innerHTML;
            if (text[0] == 'D') this.selected = 0;
            else if (text[0] == 'F') this.selected = 1;
            else this.selected = 2;
            this.$emit('slider',this.selected);
        }
    }
}

const Main = {
    data() {
        return {
            id: 0,
        }
    },
    template: /*html*/ `<Cloth :id = id></Cloth>`,
    created: function () {
        this.id = window.location.href.split("/").at(-1);
        console.log(this.id);
    }
}

const Description = {
    data() {
        return {

        }
    },
    template: /*html*/ `
        <div class="col">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultricies mi eget mauris pharetra et. Vel pretium lectus quam id leo in vitae turpis massa. Orci dapibus ultrices in iaculis nunc. At auctor urna nunc id cursus metus. Integer feugiat scelerisque varius morbi enim nunc. Aliquam sem et tortor consequat id porta nibh venenatis cras. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus. Malesuada nunc vel risus commodo viverra maecenas. Neque volutpat ac tincidunt vitae semper quis.
        </div>
    `,
}
const Features = {
    data() {
        return {

        }
    },
    template: /*html*/ `
        <div class="col">
        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle 
        </div>
    `,
}
const Reviews = {
    data() {
        return {

        }
    },
    template: /*html*/ `
        <div class="col">
        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and go
        </div>
    `,
}

const dfr = {
    data() {
        return {
            selected:0,
        }
    },
    template: /*html*/ `
        <slider @slider = sliderChange ></slider>
        <div class="row mt-4">
            <Description v-show = "selected == 0"></Description>
            <Features  v-show = "selected == 2"></Features>
            <Reviews   v-show = "selected == 1"></Reviews>
        </div>
    `,
    methods:{
        sliderChange(selected){
            this.selected = selected;
        }
    }
}



const app = Vue.createApp({})
app.use(store);
app.component("Cloth", CHead);
app.component("slider", slider);
app.component("Description", Description);
app.component("Features", Features);
app.component("Reviews", Reviews);
app.component("dfr",dfr);
app.component("mycomp", Main);
app.component("fab",fab);
app.mount("#app");

store.commit('increment');
console.log(store.state.count);