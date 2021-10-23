<template>
    <div class="container">
        <div class="main-content">
            <h3>Cloth Ratings</h3>
            <div v-if="clothes.length == 0" style="text-align: center" class="mt-5">
                <i class="fas fa-shopping-cart fa-5x" style="opacity: 0.6"></i>
                <h5 class="mt-5">Empty Catalog</h5>
            </div>
            <table class="table table-hover" v-if="clothes.length > 0">
                <thead>
                    <tr>
                        <th scope="col" v-for="col in columns" :key="col">{{ col }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(cloth, index) in page_data" :key="cloth">
                        <td style="cursor: pointer" @click="showCloth(cloth_id)">
                            <div class="user-info">
                                <div class="user-info__img">
                                    <img :src="cloth.url" alt="Unavailable" />
                                </div>
                                <div class="user-info__basic">
                                    <h5 class="mb-0 text-wrap" style="max-width: 300px">{{ cloth.name }}</h5>
                                    <span class="mb-0" v-if="cloth.custom == true"><star-rating :readOnly="true" :starSize="25" :increment="0.01" :rating="cloth.admin_rating"></star-rating></span>
                                    <span class="mb-0" v-if="cloth.custom == false"><star-rating :readOnly="true" :starSize="25" :increment="0.01" :rating="cloth.rating"></star-rating></span>
                                </div>
                            </div>
                        </td>
                        <td>{{ cloth.admin_rating }}</td>
                        <td>{{ cloth.rating }}</td>
                        <td v-if="cloth.custom == true">Admin</td>
                        <td v-if="cloth.custom == false">Calculated</td>
                        <td>
                            <a @click="rating_modal(index)" class="px-2 cursor">
                                <i class="fa fa-ellipsis-v"></i>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <pagination ref="page" :data="clothes"></pagination>
            <div id="rating-modal" class="modal fade">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header fs-5 fw-bold">
                            Change Rating
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-4 mt-3">Admin Rating:</div>
                                <div class="col">
                                    <star-rating :starSize="40" :increment="0.01" :rating="rating" ref="star"></star-rating>
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-4 mt-2">Type:</div>
                                <div class="col">
                                    <select v-model.number="choice" class="form-select">
                                        <option value="0">Calculated</option>
                                        <option value="1">Admin</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-outline-primary" data-bs-dismiss="modal">Cancel</button>
                            <button class="btn btn-primary" @click="save(index)">Save</button>
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
            columns: ["cloth", "Admin", "Calculated", "Type", "Actions"],
            index: 0,
            rating: 0,
            choice: 0,
        };
    },
    computed: {
        ...mapGetters({ clothes: "getClothes" }),
        page_data() {
            return this.$refs.page.page_data;
        },
    },
    methods: {
        showClothes(id) {
            window.location.href = "/dashboard/clothes/" + id;
        },
        rating_modal(index) {
            this.index = index;
            this.rating = this.page_data[index].admin_rating;
            this.choice = this.page_data[index].custom;
            if (this.choice == true) {
                this.choice = 1;
            } else {
                this.choice = 0;
            }
            $("#rating-modal").modal("show");
        },
        save(index) {
            this.page_data[index].custom = this.choice;
            this.page_data[index].admin_rating = this.$refs.star.selectedRating;
            this.rating = 0;

            axios
                .put("/api/admin/rating/", this.page_data[index])
                .then((response) => {
                    displaySuccess("Rating Updated");
                    $("#rating-modal").modal("hide");
                })
                .catch((response) => {
                    displayError("Some error occured");
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
.remove-item {
    cursor: pointer;
    color: rgb(108, 117, 125);
}
.remove-item:hover {
    color: rgb(79, 79, 79);
}
</style>
