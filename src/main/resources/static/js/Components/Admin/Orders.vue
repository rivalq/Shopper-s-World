<template>
    <div class="container">
        <div class="main-content">
            <h3>Purchased Clothes</h3>
            <div v-if="orders.length == 0" style="text-align: center" class="mt-5">
                <i class="fas fa-shopping-cart fa-5x" style="opacity: 0.6"></i>
                <h5 class="mt-5">Purchased clothes will appear here</h5>
            </div>
            <table class="table table-hover" v-if="orders.length > 0 && this.$store.getters.getClothes.length > 0">
                <thead>
                    <tr>
                        <th scope="col" v-for="col in columns" :key="col">{{ col }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="ord in page_data" :key="ord">
                        <td>
                            {{ ord.username }}
                        </td>
                        <td style="cursor: pointer" @click="showCloth(ord.cloth_id)">
                            <div class="user-info">
                                <div class="user-info__img">
                                    <img :src="clothes[ord.cloth_id].url" alt="Unavailable" />
                                </div>
                                <div class="user-info__basic">
                                    <h5 class="mb-0 text-wrap" style="max-width: 300px">{{ clothes[ord.cloth_id].name }}</h5>
                                </div>
                            </div>
                        </td>
                        <td>{{ ord.size }}</td>
                        <td>{{ ord.quantity }}</td>
                        <td>{{ "Rs " + ord.quantity * ord.price }}</td>
                        <td>MarketPlace Credits</td>
                    </tr>
                </tbody>
            </table>
            <pagination ref="page" :data="orders"></pagination>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            columns: ["Buyer", "Cloth", "Size", "Quantity", "Total Price", "Payment Method"],
        };
    },
    computed: {
        ...mapGetters({ orders: "getOrders" }),
        clothes() {
            var cloth = this.$store.getters.getClothes;
            var obj = new Object();
            for (let i = 0; i < cloth.length; i++) {
                obj[cloth[i]["cloth_id"]] = cloth[i];
            }
            return obj;
        },
        page_data() {
            return this.$refs.page.page_data;
        },
    },
    methods: {
        showCloth(id) {
            window.location.href = "/dashboard/clothes/" + id;
        },
    },
};
</script>
