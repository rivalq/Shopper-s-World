<template>
    <div class="main-content">
        <div class="row mt-3 justify-content-md-center">
            <div class="col-11">
                <h3>Clothes Catalog</h3>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col" class="hide">Cloth id</th>
                            <th scope="col">Cloth Name</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Category</th>
                            <th scope="col">Status</th>
                            <th scope="col">Visible</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cloth in clothes" :key="cloth">
                            <th scope="row" class="hide">{{ cloth.cloth_id }}</th>
                            <td style="cursor: pointer" @click="showCloth">
                                <div class="user-info">
                                    <div class="user-info__img">
                                        <img :src="cloth.url" alt="Unavailable" />
                                    </div>
                                    <div class="user-info__basic">
                                        <h5 class="mb-0 text-wrap" style="max-width: 300px">{{ cloth.name }}</h5>
                                    </div>
                                </div>
                            </td>
                            <td>{{ cloth.brand }}</td>
                            <td>{{ cloth.category }}</td>
                            <td v-if="outOfStock(cloth.stock)"><i class="fad fa-ban me-2" style="color: red"></i>Out of Stock</td>
                            <td v-else><i class="fad fa-check me-2" style="color: green"></i> In stock</td>
                            <td><span class="active-circle bg-success"></span>Online</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: "",
        };
    },
    methods: {
        showCloth(e) {
            var elem = e.target;
            while (elem.tagName != "TR") elem = elem.parentNode;
            var id = elem.childNodes[0].innerHTML;
            window.location.href = "/dashboard/clothes/" + id;
        },
        outOfStock(stock) {
            let flag = 1;
            for (let i = 0; i < stock.length; i++) {
                if (stock[i]["quantity"] > 0) {
                    flag = 0;
                    break;
                }
            }
            return flag;
        },
    },
    computed: {
        ...mapGetters({ clothes: "getClothes" }),
        compiled() {
            return marked(this.value, { sanitize: true });
        },
    },
};
</script>

<style scoped></style>
