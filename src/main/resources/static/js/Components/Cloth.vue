<template>
    <div class="col-sm-auto shadow mx-3 my-4 cloth-card" style="text-align: center; width: 320px" v-if="cloth != undefined">
        <div class="row">
            <div class="col-sm-auto" style="text-align: center">
                <img :src="cloth.url" width="300" height="300" />
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-sm-12">
                <h5 style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden">{{ cloth.name }}</h5>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-12" style="text-align: left; text-overflow: ellipsis; white-space: nowrap; overflow: hidden">{{ cloth.brand + " | " + cloth.category }}</div>
        </div>
        <div class="row mt-2">
            <span class="mb-0"><star-rating :readOnly="true" :starSize="20" :increment="0.01" :rating="rating"></star-rating></span>
        </div>
        <div class="row mt-3">
            <div class="col fs-5" style="text-align: left">
                <div class="btn-group" role="group">
                    <button v-for="stock in cloth.stock" :key="stock" @click="changeSize" :class="{ btn: 1, 'shadow-none': 0, 'btn-outline-primary': selected != stock.size, 'btn-primary': selected == stock.size }">{{ stock.size }}</button>
                    <span v-if="cloth.stock.length == 0" class="mt-2" style="color: red">Out of Stock</span>
                </div>
            </div>
            <div class="col fs-5 ms-auto fw-bold text-wrap" style="text-align: right" v-if="cloth.stock.length > 0">{{ "Rs " + price }}</div>
        </div>
        <div class="row mt-4">
            <div @click="buynow" class="col bg-primary fs-4 rounded-bottom buynow-btn py-2" style="color: white">Buy Now</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            price: 0,
            selected: "",
            quantity: 0,
            stock_by_size: {},
        };
    },

    props: {
        index: Number,
    },
    methods: {
        buynow() {
            window.location.href = "/dashboard/clothes/" + this.cloth["cloth_id"];
        },
        changeSize(event) {
            let size = event.target.innerHTML;
            this.selected = size;
            this.price = this.stock_by_size[size]["price"];
            this.quantity = this.stock_by_size[size]["quantity"];
        },
    },
    computed: {
        cloth() {
            return this.$store.getters.getClothes[this.$props.index];
        },
        rating() {
            if (this.cloth["custom"] == 1) return this.cloth["admin_rating"];
            return this.cloth["rating"];
        },
    },
    created: function () {
        if (this.cloth["stock"].length > 0) {
            let anystock = this.cloth["stock"][0];
            this.price = anystock["price"];
            this.selected = anystock["size"];
            this.quantity = anystock["quantity"];
            for (let i = 0; i < this.cloth["stock"].length; i++) {
                this.stock_by_size[this.cloth["stock"][i]["size"]] = this.cloth["stock"][i];
            }
        }
    },
};
</script>
