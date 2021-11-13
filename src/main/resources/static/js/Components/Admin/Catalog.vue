<template>
    <div class="main-content">
        <div class="row mt-3 justify-content-md-center">
            <div class="col-11">
                <h3>Clothes Catalog</h3>
                <vue-table :data="clothes" ref="page">
                    <template #head>
                        <tr>
                            <th scope="col" v-for="col in columns" :key="col">{{ col }}</th>
                        </tr>
                    </template>
                    <template v-slot:body="slotProps">
                        <tr v-for="cloth in slotProps.f_data" :key="cloth">
                            <td style="cursor: pointer" @click="showCloth(cloth.cloth_id)">
                                <div class="user-info">
                                    <div class="user-info__img">
                                        <img :src="cloth.url" alt="Unavailable" />
                                    </div>
                                    <div class="user-info__basic">
                                        <h5 class="mb-0 text-wrap" style="max-width: 300px">{{ cloth.name }}</h5>
                                        <p class="mb-0 text-muted">{{ "@" + cloth.brand }}</p>
                                        <span class="mb-0" v-if="cloth.custom == true"><star-rating :readOnly="true" :starSize="25" :increment="0.01" :rating="cloth.admin_rating"></star-rating></span>
                                        <span class="mb-0" v-if="cloth.custom == false"><star-rating :readOnly="true" :starSize="25" :increment="0.01" :rating="cloth.rating"></star-rating></span>
                                    </div>
                                </div>
                            </td>
                            <td v-if="outOfStock(cloth.stock)"><i class="fad fa-ban me-2" style="color: red"></i>Out of Stock</td>
                            <td v-else><i class="fad fa-check me-2" style="color: green"></i> In stock</td>
                            <td><span class="active-circle bg-success"></span>Online</td>
                        </tr>
                    </template>
                </vue-table>
            </div>
        </div>
    </div>
</template>

<script>
import VueTable from "/js/Components/VueTable.vue";

export default {
    data() {
        return {
            columns: ["Cloth", "Status", "Visible"],
        };
    },
    components: {
        "vue-table": VueTable,
    },
    methods: {
        showCloth(id) {
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
        page_data() {
            return this.$refs.page.page_data;
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
