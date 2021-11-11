<template>
    <div class="container">
        <div class="main-content">
            <h3>Cart</h3>
            <div v-if="cart.length == 0" style="text-align: center" class="mt-5">
                <i class="fas fa-shopping-cart fa-5x" style="opacity: 0.6"></i>
                <h5 class="mt-5">Your Cart is Empty</h5>
            </div>

            <table class="table table-hover" v-if="cart.length > 0">
                <thead>
                    <tr>
                        <th scope="col" v-for="col in columns" :key="col">{{ col }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(itr, index) in cart" :key="itr">
                        <td style="cursor: pointer" @click="showCloth(itr.cloth.cloth_id)">
                            <div class="user-info">
                                <div class="user-info__img">
                                    <img :src="itr.url" alt="Unavailable" />
                                </div>
                                <div class="user-info__basic">
                                    <h5 class="mb-0 text-wrap" style="max-width: 300px">{{ itr.cloth.name }}</h5>
                                    <p class="text-muted mb-0">{{ "@" + itr.cloth.brand }}</p>
                                </div>
                            </div>
                        </td>
                        <td>{{ itr.size }}</td>
                        <td>
                            <div class="col-sm-auto ms-auto">
                                <div class="btn-group" role="group">
                                    <button @click="decrease(index)" class="btn border border-2 border-end-0 shadow-none" style="color: red">-</button>
                                    <input @input="changeCart(index)" class="form-control input-group-sm border border-2 shadow-none" style="width: 70px" type="number" v-model="itr.quantity" />
                                    <button @click="increase(index)" class="btn border border-2 border-start-0 shadow-none" style="color: green">+</button>
                                </div>
                            </div>
                        </td>
                        <td>{{ "Rs " + itr.price }}</td>
                        <td>{{ "Rs " + itr.quantity * itr.price }}</td>
                        <td>
                            <div @click="removeItem(index)" class="row g-2 remove-item">
                                <div class="col"><i class="fas fa-trash-alt"></i></div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="row mt-3" v-if="cart.length > 0">
                <div class="col-auto" style="font-size: 20px">Total:</div>
                <div class="col-auto" style="font-size: 24px">
                    <h4>Rs {{ total }}</h4>
                </div>
                <div class="col-auto ms-auto">
                    <button type="button" class="btn btn-primary" @click="checkout">Checkout</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            columns: ["cloth", "size", "quantity", "price", "total"],
        };
    },
    computed: {
        ...mapGetters({ cart: "getCart" }),
        total() {
            let val = 0;
            for (let i = 0; i < this.cart.length; i++) {
                val += this.cart[i]["price"] * this.cart[i]["quantity"];
            }
            return val;
        },
        credits() {
            return this.$store.getters.getUser["credits"];
        },
    },
    methods: {
        showCloth(id) {
            window.location.href = "/dashboard/clothes" + id;
        },
        increase(index) {
            this.cart[index]["quantity"]++;
            this.$store.dispatch("updateCart", index);
        },
        decrease(index) {
            if (this.cart[index]["quantity"] <= 1) {
                displayError("You can not decrease quantity below 1");
                return;
            }
            this.cart[index]["quantity"]--;
            this.$store.dispatch("updateCart", index);
        },
        changeCart(index) {
            if (this.cart[index]["quantity"] <= 0) {
                displayError("You can not decrease quantity below 1");
                this.cart[index]["quantity"] = 1;
                return;
            }
            this.$store.dispatch("updateCart", index);
        },
        removeItem(index) {
            this.$store.dispatch("removeCart", index);
        },
        checkout() {
            if (this.credits < this.total) {
                displayError("Not enough Credits");
                return;
            }
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i]["quantity"] > this.cart[i]["stock"]) {
                    let name = this.cart[i]["cloth"]["name"];
                    let stock = this.cart[i]["stock"];
                    let size = this.cart[i]["size"];
                    displayError(`${name} has only ${stock} units of Size ${size} left`);
                    return;
                }
            }
            this.$store.dispatch("checkout");
        },
    },
};
</script>

<style scoped>
.user-info__img img {
    margin-right: 15px;
    height: 140px;
    width: 140px;
    border-radius: 45px;
    border: 3px solid #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
