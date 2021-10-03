

const Cloth = {
    data(){
        return{
            price: 0,
            selected: '',
            quantity:0,
            cloth: {},
            stock_by_size: {}
        }
    },
    props: ['id'],
    template: `<div class="col-sm-3 shadow mx-3 my-4 cloth-card" style="text-align: center;">
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
                window.location.href = "/dashboard/clothes/" + this.$props.id;
            },
            changeSize(event){
                let size = event.target.innerHTML;
                this.selected = size;
                this.price = this.stock_by_size[size]["price"];
                this.quantity = this.stock_by_size[size]["quantity"];
            }
       },
       
       created: function(){
            axios.get('/api/marketplace/clothes/' + this.$props.id)
            .then(response => {
                this.cloth = response.data;
                this.cloth["url"] = "/images/marketplace/" + this.$props.id + "/profile";
                axios.get('/api/marketplace/stock/' + this.$props.id)
                .then(response => {
                    this.cloth["stock"] = response.data;
                    for(var i = 0; i < response.data.length; i++){
                            this.stock_by_size[response.data[i]["size"]] = response.data[i]; 
                    }

                    const anystock = response.data[0];
                    this.price = anystock["price"];
                    this.quantity = anystock["quantity"];
                    this.selected = anystock["size"];
                })
                
            })
            .catch(error =>{
                console.log(error);
            })
       }
       
}


const app = Vue.createApp({})

app.component('Cloth',Cloth);

const List = {

    data(){
        return {
            cloth_ids:[]
        }
    },

    template:`<div id = "cloth-body" class="row mt-4 justify-content-sm-center">
                    <Cloth v-for= "id in cloth_ids"  :id="id" ></Cloth>
              </div>`,

             
    created:function(){

        axios.get('/api/marketplace/clothes')
        .then(respone =>{
            var clothes = respone.data;
            for(let i = 0; i < clothes.length; i++){
                this.cloth_ids.push(clothes[i]["cloth_id"]);
            }
        })
    }
    

}



app.component('List',List);

app.mount("#app");



$(window).resize(function(){
        if($(window).width() <= 1423){
            var elems = document.getElementsByClassName("cloth-card");
            for(var i = 0; i < elems.length; i++){
                var cur = elems[i];
                cur.classList.remove("col-sm-3");
                cur.classList.add("col-sm-5");
            }
        }  
        if($(window).width() <= 1054){
            var elems = document.getElementsByClassName("cloth-card");
            for(var i = 0; i < elems.length; i++){
                var cur = elems[i];
                cur.classList.remove("col-sm-5");
                cur.classList.add("col-sm-8");
            }
        }
        if($(window).width() > 1054 && $(window).width() <= 1423){
            var elems = document.getElementsByClassName("cloth-card");
            for(var i = 0; i < elems.length; i++){
                var cur = elems[i];
                cur.classList.remove("col-sm-8");
                cur.classList.add("col-sm-5");
            }
        }
        
        if($(window).width() > 1423){
            var elems = document.getElementsByClassName("cloth-card");
            for(var i = 0; i < elems.length; i++){
                var cur = elems[i];
                cur.classList.remove("col-sm-5");
                cur.classList.add("col-sm-3");
            }
        }
});