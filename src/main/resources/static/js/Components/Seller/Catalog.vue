<template>
    <div class="main-content">
        <div class="row mt-3 justify-content-md-center">
            <div class="col-11">
                <h3>Clothes Catalog</h3>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col" v-for="col in columns" :key="col">{{ col }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(cloth, index) in clothes" :key="cloth">
                            <td style="cursor: pointer" @click="showCloth(cloth.cloth_id)">
                                <div class="user-info">
                                    <div class="user-info__img">
                                        <img :src="cloth.url" alt="Unavailable" />
                                    </div>
                                    <div class="user-info__basic">
                                        <h5 class="mb-0 text-wrap" style="max-width: 300px">{{ cloth.name }}</h5>
                                        <p class="mb-0 text-muted">{{ "@" + cloth.brand }}</p>
                                    </div>
                                </div>
                            </td>
                            <td>{{ cloth.category }}</td>
                            <td>
                                <div class="dropdown">
                                    <a @click="toggle" class="px-2 cursor" :id="getid(index)" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fa fa-ellipsis-v"></i>
                                    </a>
                                    <ul class="dropdown-menu" :aria-labelledby="getid(index)">
                                        <li><a class="dropdown-item" @click="showCloth(cloth.cloth_id)">View Cloth</a></li>
                                        <li><a class="dropdown-item" @click="request_modal(index)">Send Stock</a></li>
                                        <li><a class="dropdown-item" @click="delete_cloth(index)">Delete</a></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div id="send-request" class="modal fade">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header fs-5 fw-bold">
                        Send Stock Units
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container">
                            <div class="row">
                                <div class="row">
                                    <label class="form-label">Size</label>
                                    <input type="text" class="form-control" v-model="size" placeholder="X" />
                                </div>
                                <div class="row mt-2">
                                    <label class="form-label">Units</label>
                                    <input type="number" min="1" class="form-control" v-model="quantity" />
                                </div>
                                <div class="row mt-2">
                                    <label class="form-label">MRP</label>
                                    <input type="number" min="1" class="form-control" v-model="price" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-outline-primary" data-bs-dismiss="modal">Cancel</button>
                        <button class="btn btn-primary" @click="send">Send</button>
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
            columns: ["Cloth", "Category", "Actions"],
            value: "",
            price: 0,
            quantity: 0,
            size: "",
            index: 0,
        };
    },
    methods: {
        showCloth(id) {
            window.location.href = "/seller/clothes/" + id;
        },
        getid(id) {
            return "triggerId" + id;
        },
        delete_cloth(index) {
            axios.delete("/api/seller/clothes/" + this.clothes[index]["cloth_id"]).then((data) => {
                displayInfo("Cloth deleted");
                this.$store.commit("delete_cloth", index);
            });
        },
        request_modal(index) {
            this.index = index;
            $("#send-request").modal("show");
        },
        send() {
            if (this.price <= 0) {
                displayError("Price should be greater than 0");
            } else if (this.quantity <= 0) {
                displayError("Quantity should be greater than 0");
            } else if (this.size == "") {
                displayError("Size should be a non empty string");
            } else {
                const request = {
                    size: this.size,
                    quantity: this.quantity,
                    price: this.price,
                    cloth_id: this.clothes[this.index]["cloth_id"],
                };
                axios
                    .post("/api/seller/request", request)
                    .then((response) => {
                        this.$store.commit("addRequest", response.data);
                        displaySuccess("Stock Request Sent");
                    })
                    .catch((data) => {
                        displayError("Some error occured");
                    });
            }
        },
    },
    computed: {
        ...mapGetters({ clothes: "getClothes" }),
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
