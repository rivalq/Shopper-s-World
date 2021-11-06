<template>
    <div class="container">
        <div class="main-content">
            <h3>Your Wishlist</h3>
            <div v-if="wishlist.length == 0" style="text-align: center" class="mt-5">
                <i class="fas fa-shopping-cart fa-5x" style="opacity: 0.6"></i>
                <h5 class="mt-5">Your WishList is empty</h5>
            </div>
            <table class="table table-hover" v-if="wishlist.length > 0">
                <thead>
                    <tr>
                        <th scope="col" v-for="col in columns" :key="col">{{ col }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(itr, index) in page_data" :key="itr">
                        <td style="cursor: pointer" @click="showCloth(itr.cloth.cloth_id)">
                            <div class="user-info">
                                <div class="user-info__img">
                                    <img :src="itr.cloth.url" alt="Unavailable" />
                                </div>
                                <div class="user-info__basic">
                                    <h5 class="mb-0 text-wrap" style="max-width: 300px">{{ itr.cloth.name }}</h5>
                                    <span class="mb-0"><star-rating :readOnly="true" :starSize="25" :increment="0.01" :rating="itr.rating"></star-rating></span>
                                </div>
                            </div>
                        </td>
                        <td>{{ itr.cloth.brand }}</td>
                        <td>{{ itr.cloth.category }}</td>
                        <td>
                            <div @click="removeItem(index)" class="row g-2 remove-item">
                                <div class="col"><i class="fas fa-trash-alt"></i> Remove</div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <pagination ref="page" :data="wishlist"></pagination>
            <a class="nav-link mt-5" href="/dashboard/clothes"> Continue Shopping here ></a>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            columns: ["Cloth", "Brand", "Category", "Actions"],
        };
    },
    computed: {
        ...mapGetters({ wishlist: "getWishlist" }),
        ...mapGetters({ loading: "getloading" }),
        page_data() {
            return this.$refs.page.page_data;
        },
    },
    methods: {
        getid(index) {
            return "triggerId" + index;
        },
        showCloth(id) {
            window.location.href = "/dashboard/clothes/" + id;
        },
        removeItem(index) {
            this.$store.dispatch("removeWish", index);
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
.remove-item {
    cursor: pointer;
    color: rgb(108, 117, 125);
}
.remove-item:hover {
    color: rgb(79, 79, 79);
}
</style>
