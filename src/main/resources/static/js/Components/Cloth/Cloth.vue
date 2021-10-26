<template>
    <div class="row mt-5">
        <div class="col-lg-5">
            <img :src="cloth.url" class="width" height="500" />
        </div>
        <div class="col-lg-6 ps-4">
            <div class="row mt-3">
                <div class="col" style="font-size: 34px; font-weight: 400; color: rgb(0, 0, 0, 0.87)">
                    {{ cloth.name }}
                </div>
                <div class="col-sm-auto float-end">
                    <div class="row mt-3">
                        <div class="col-sm-auto">{{ wish1 }}</div>
                        <div class="col-sm-auto"><i @click="changeWish" :class="{ fa: 1, 'fa-heart': wish, 'fa-heart-o': !wish }" aria-hidden="true"></i></div>
                    </div>
                </div>
            </div>
            <div class="row mt-1">
                <div class="col-md-auto">{{ cloth.brand + " | " + cloth.category }}</div>
            </div>
            <div class="row mt-3">
                <div class="col fw-bold fs-4">{{ "Rs " + price }}</div>
                <div class="col float-end px-3" style="text-align: end">Rating</div>
            </div>
            <div class="row mt-3">
                <div class="col text-muted text-wrap lh-base">
                    {{ cloth.long_description }}
                </div>
            </div>
            <div class="row mt-4">
                <div class="col">
                    <div class="btn-group" role="group">
                        <button v-for="stock in cloth.stock" :key="stock" @click="changeSize" :class="{ btn: 1, 'shadow-none': 0, 'btn-outline-primary': selected_size != stock.size, 'btn-primary': selected_size == stock.size }">{{ stock.size }}</button>
                    </div>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-md-auto">
                    <div class="btn-group" role="group">
                        <button @click="decrease" class="btn border border-2 border-end-0 shadow-none" style="color: red">-</button>
                        <input class="form-control input-group-sm border border-2 shadow-none" style="width: 70px" type="number" v-model="cart" />
                        <button @click="increase" class="btn border border-2 border-start-0 shadow-none" style="color: green">+</button>
                    </div>
                </div>
            </div>

            <div class="row mt-4">
                <div class="col-sm-6" style="color: white">
                    <button @click="addCart" class="btn btn-primary col-sm-9">Add to Cart</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            wish1: "Add to WishList",
            wish2: "Remove from WishList",
            wish: 0,
        };
    },
    props: ["id"],
    methods: {
        changeSize(event) {
            let size = event.target.innerHTML;
            this.$store.commit("changeSize", size);
        },
        changeWish(event) {
            this.wish = 1 - this.wish;
            [this.wish1, this.wish2] = [this.wish2, this.wish1];
        },
        increase(event) {
            this.$store.commit("setCart", this.cart + 1);
        },
        decrease(event) {
            this.$store.commit("setCart", this.cart - 1);
        },
        addCart() {
            if (this.cart <= 0) {
                displayError("Quantity should be greater than 0");
            } else {
                this.$store.dispatch("updateCart");
            }
        },
    },

    created: function () {
        this.$store.dispatch("setCloth", this.$props.id).then(() => {
            this.$emit("clothLoaded");
        });
    },

    computed: {
        ...mapGetters({ cloth: "getCloth" }),
        ...mapGetters({ price: "getPrice" }),
        ...mapGetters({ quantity: "getQuantity" }),
        ...mapGetters({ selected_size: "getSelectedSize" }),
        cart: {
            get() {
                return this.$store.getters.getCart;
            },
            set(value) {
                this.$store.commit("setCart", value);
            },
        },
    },
};
</script>
