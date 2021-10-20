<template>
    <div class="container">
        <div class="main-content">
            <h3>Your Purchased Clothes</h3>
            <div v-if="orders.length == 0" style="text-align: center" class="mt-5">
                <i class="fas fa-shopping-cart fa-5x" style="opacity: 0.6"></i>
                <h5 class="mt-5">Your purchased clothes will appear here</h5>
            </div>
            <table class="table table-hover" v-if="orders.length > 0">
                <thead>
                    <tr>
                        <th scope="col" v-for="col in columns" :key="col">{{ col }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(ord, index) in page_data" :key="ord">
                        <td style="cursor: pointer" @click="showCloth(ord.cloth.cloth_id)">
                            <div class="user-info">
                                <div class="user-info__img">
                                    <img :src="ord.cloth.url" alt="Unavailable" />
                                </div>
                                <div class="user-info__basic">
                                    <h5 class="mb-0 text-wrap" style="max-width: 300px">{{ ord.cloth.name }}</h5>
                                    <p class="text-muted mb-0">{{ "@" + ord.cloth.brand }}</p>
                                </div>
                            </div>
                        </td>
                        <td>{{ ord.size }}</td>
                        <td>{{ ord.quantity }}</td>
                        <td>{{ "Rs " + ord.quantity * ord.price }}</td>
                        <td>MarketPlace Credits</td>
                        <td>
                            <div class="dropdown">
                                <a @click="toggle" class="px-2 cursor" :id="getid(index)" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fa fa-ellipsis-v"></i>
                                </a>
                                <ul class="dropdown-menu" :aria-labelledby="getid(index)">
                                    <li><a class="dropdown-item">Rate Cloth</a></li>
                                    <li><a class="dropdown-item">Give review</a></li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <pagination ref="page" :data="orders"></pagination>
            <a class="nav-link mt-5" href="/dashboard/clothes"> Continue Shopping here ></a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            columns: ["Cloth", "Size", "Quantity", "Total", "Payment Method"],
        };
    },
    computed: {
        ...mapGetters({ orders: "getOrders" }),
        page_data() {
            return this.$refs.page.page_data;
        },
    },
    methods: {
        showCloth(id) {
            window.location.href = "/dashboard/clothes/" + id;
        },
        getid(index) {
            return "triggerId" + index;
        },
    },
};
</script>
