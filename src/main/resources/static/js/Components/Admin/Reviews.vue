<template>
    <div class="container">
        <div class="main-content">
            <h5>Product Reviews</h5>
            <table class="table" v-if="clothes_length">
                <tbody>
                    <tr v-for="(itr, index) in page_data" :key="itr">
                        <td style="width: 200px">
                            <div class="user-info">
                                <div class="user-info__img">
                                    <img :src="users[itr.username].profile_image" alt="Unavailable" />
                                </div>
                                <div class="user-info__basic">
                                    <h5 class="mb-0 text-wrap" style="max-width: 300px">{{ itr.username }}</h5>
                                    <p class="text-muted mt-2">{{ itr.time }}</p>
                                </div>
                            </div>
                        </td>
                        <td @click="showCloth(itr.cloth_id)">{{ clothes[itr.cloth_id].name }}</td>
                        <td style="text-align: left">
                            <h6>{{ itr.head }}</h6>
                            <p class="text-muted">{{ itr.body }}</p>
                        </td>
                        <td>
                            <div class="dropdown">
                                <a class="px-2 cursor" :id="getid(index)" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fa fa-ellipsis-v"></i>
                                </a>
                                <ul class="dropdown-menu" :aria-labelledby="getid(index)">
                                    <li><a class="dropdown-item" @click="edit_modal(index)">Edit</a></li>
                                    <li><a class="dropdown-item" @click="delete_review(index)">Delete</a></li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <pagination ref="page" :data="reviews"></pagination>
        </div>
        <div id="review-modal" class="modal fade" v-if="reviews.length > 0">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header fs-5 fw-bold">
                        Edit Review
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container">
                            <div class="row">
                                <div class="col">
                                    <strong>Heading</strong>
                                </div>
                            </div>
                            <div class="row mt-1">
                                <div class="col">
                                    <input type="text" class="form-input" v-model="reviews[index].head" width="500px" />
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col">
                                    <strong>Review</strong>
                                </div>
                            </div>
                            <div class="row mt-1">
                                <div class="col">
                                    <textarea type="text" class="form-input" v-model="reviews[index].body" rows="4" cols="26"> </textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-outline-primary" data-bs-dismiss="modal">Cancel</button>
                        <button class="btn btn-primary" @click="save">Save</button>
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
            index: 0,
        };
    },
    computed: {
        ...mapGetters({ reviews: "getReviews" }),
        clothes_length() {
            return this.$store.getters.getClothes.length > 0;
        },
        clothes() {
            var vec = new Object();
            let clothe = this.$store.getters.getClothes;
            for (let i = 0; i < clothe.length; i++) {
                vec[clothe[i]["cloth_id"]] = clothe[i];
            }
            return vec;
        },
        users() {
            var vec = new Object();
            let user = this.$store.getters.getUsers;
            for (let i = 0; i < user.length; i++) {
                vec[user[i]["username"]] = user[i];
            }
            return vec;
        },
        page_data() {
            return this.$refs.page.page_data;
        },
    },
    methods: {
        getid(id) {
            return "triggerId" + id;
        },
        showCloth(id) {
            window.location.href = "/dashboard/clothes/" + id;
        },
        edit_modal(index) {
            this.index = index;
            $("#review-modal").modal("show");
        },
        save() {
            axios
                .post("/api/marketplace/reviews", this.reviews[this.index])
                .then((response) => {
                    displaySuccess("Review saved");
                    $("#review-modal").modal("hide");
                })
                .catch((response) => {
                    displayError("Some error Occured");
                });
        },
        delete_review(index) {
            axios
                .delete("/api/marketplace/reviews", { data: this.reviews[index] })
                .then((response) => {
                    displaySuccess("Review Deleted");
                    this.reviews.splice(index, 1);
                })
                .catch((response) => {
                    displayError("Some Error occured");
                });
        },
    },
};
</script>
<style scoped>
.user-info__img img {
    margin-right: 15px;
    height: 40px;
    width: 40px;
    border-radius: 45px;
    border: 3px solid #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
