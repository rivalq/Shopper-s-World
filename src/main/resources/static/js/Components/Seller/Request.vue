<template>
    <div class="main-content">
        <div class="row mt-3 justify-content-md-center">
            <div class="col-11">
                <h3>Pending Requests</h3>
                <div v-if="pending.length == 0" style="text-align: center">
                    <i class="fas fa-shopping-cart fa-5x" style="opacity: 0.6"></i>
                    <h5 class="mt-5">Pending Cloth Stock Requests will Appear Here</h5>
                </div>
                <table class="table table-hover" v-if="pending.length > 0 && clothesLen > 0">
                    <thead>
                        <tr>
                            <th scope="col">Cloth</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Size</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="request in pending" :key="request">
                            <td style="cursor: pointer" @click="showCloth(request.cloth_id)">
                                <div class="user-info">
                                    <div class="user-info__img">
                                        <img :src="clothes[request.cloth_id].url" alt="Unavailable" />
                                    </div>
                                    <div class="user-info__basic">
                                        <h5 class="mb-0 text-wrap" style="max-width: 300px">{{ clothes[request.cloth_id].name }}</h5>
                                        <p class="mb-0 text-muted">{{ "@" + clothes[request.cloth_id].brand }}</p>
                                    </div>
                                </div>
                            </td>
                            <td>{{ request.quantity }}</td>
                            <td>{{ request.size }}</td>
                            <td>{{ "Rs " + request.price }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-11 mt-5">
                <h3>Older Requests</h3>
                <table class="table table-hover" v-if="older.length > 0 && clothesLen > 0">
                    <thead>
                        <tr>
                            <th scope="col">Cloth</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Size</th>
                            <th scope="col">Price</th>
                            <th scope="col">Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="request in older" :key="request">
                            <td style="cursor: pointer" @click="showCloth(request.cloth_id)">
                                <div class="user-info">
                                    <div class="user-info__img">
                                        <img :src="clothes[request.cloth_id].url" alt="Unavailable" />
                                    </div>
                                    <div class="user-info__basic">
                                        <h5 class="mb-0 text-wrap" style="max-width: 300px">{{ clothes[request.cloth_id].name }}</h5>
                                        <p class="mb-0 text-muted">{{ "@" + clothes[request.cloth_id].brand }}</p>
                                    </div>
                                </div>
                            </td>
                            <td>{{ request.quantity }}</td>
                            <td>{{ request.size }}</td>
                            <td>{{ "Rs " + request.price }}</td>
                            <td v-if="request.result == 1">
                                Accepted
                                <svg class="MuiSvgIcon-root jss312" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>
                            </td>
                            <td v-if="request.result == 0">
                                Rejected
                                <svg class="MuiSvgIcon-root" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" focusable="false" viewBox="0 0 24 24">
                                    <line x1="6" y1="6" x2="20" y2="20" stroke="red" stroke-width="2" />
                                    <line x1="20" y1="6" x2="6" y2="20" stroke="red" stroke-width="2" />
                                </svg>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        pending() {
            return this.$store.getters.getRequests.filter((request) => request["status"] == 0);
        },
        older() {
            return this.$store.getters.getRequests.filter((request) => request["status"] == 1);
        },
        clothesLen() {
            return this.$store.getters.getClothes.length;
        },
        clothes() {
            var obj = new Object();
            let cloth = this.$store.getters.getClothes;
            for (let i = 0; i < cloth.length; i++) {
                obj[cloth[i]["cloth_id"]] = cloth[i];
            }
            return obj;
        },
    },
    methods: {
        showCloth(id) {
            window.location.href = "/seller/clothes/" + id;
        },
    },
};
</script>
