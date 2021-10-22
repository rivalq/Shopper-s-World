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
                                    <li><a class="dropdown-item" @click="rate_modal(index)">Rate Cloth</a></li>
                                    <li><a class="dropdown-item">Give review</a></li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <pagination ref="page" :data="orders"></pagination>
            <a class="nav-link mt-5" href="/dashboard/clothes"> Continue Shopping here ></a>

            <div id="rate-modal" class="modal fade">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header fs-5 fw-bold">
                            Rate The cloth
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="container">
                                <star-rating :ref="getRatingid(index)" :increment="0.01" :rating="5.0"></star-rating>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-outline-primary" data-bs-dismiss="modal">Cancel</button>
                            <button class="btn btn-primary" @click="sendRating">Rate Cloth</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            columns: ["Cloth", "Size", "Quantity", "Total", "Payment Method"],
            index: 0,
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
        getRatingid(index) {
            return "rating-" + index;
        },
        rate_modal(index) {
            this.index = index;
            $("#rate-modal").modal("show");
        },
        getRating(index) {
            return this.$refs[this.getRatingid(index)].selectedRating;
        },
        sendRating() {
            let rating = parseFloat(this.getRating(this.index));
            const data = {
                username: "",
                cloth_id: this.orders[this.index]["cloth_id"],
                rating: rating,
            };
            axios
                .put("/api/marketplace/sendrating", data)
                .then((response) => {
                    displaySuccess("Rating Updated");
                })
                .catch((response) => {
                    displayError("Some error Occured");
                });
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
.table thead tr th,
.table thead tr td,
.table tbody tr th,
.table tfoot tr td,
.table tbody tr td {
    font-size: 18px;
}
</style>
