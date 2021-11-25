<template>
    <div class="main-content">
        <div class="row mt-3 justify-content-md-center">
            <div class="col-11">
                <h3>Stock Units</h3>
                <table class="table table-hover" v-if="clothes.length > 0">
                    <thead>
                        <tr>
                            <th scope="col" v-for="col in columns" :key="col">
                                {{ col }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(cloth, index) in clothes" :key="cloth">
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
                            <td>
                                <select class="form-select" v-model="selected_index[index]">
                                    <option v-for="(stk, index) in cloth.stock" :key="stk" :value="index">{{ stk.size }}</option>
                                </select>
                            </td>
                            <td>{{ cloth.stock[selected_index[index]]["quantity"] }}</td>
                            <td>{{ "Rs " + cloth.stock[selected_index[index]]["price"] }}</td>
                            <td>
                                <i @click="openModel(index)" class="fal fa-pencil-alt cursor" style="color: blue"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div id="stock-modal" class="modal fade">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header fs-5 fw-bold">
                        Edit Stock
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="undo"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container" v-if="clothes.length > 0">
                            <div class="row">
                                <div class="col">{{ "Cloth :  " + selected_cloth.name }}</div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-sm-auto me-3 mt-2">Select Size:</div>
                                <select v-model="modal_index" class="form-select" style="width: 100px">
                                    <option v-for="(stk, index) in selected_cloth.stock" :key="stk" :value="index">{{ stk.size }}</option>
                                </select>
                            </div>

                            <div class="row mt-3">
                                <div class="col-sm-auto me-3 mt-2">Units:</div>
                                <input type="number" class="form-control" style="width: 70px" v-model.number="selected_cloth.stock[modal_index].quantity" />
                            </div>

                            <div class="row mt-3">
                                <div class="col-sm-auto me-3 mt-2">Price:</div>
                                <input type="number" class="form-control" style="width: 120px" v-model.number="selected_cloth.stock[modal_index].price" />
                            </div>

                            <div class="row mt-5">
                                <h5>Add new Size</h5>
                                <div class="col-sm-auto me-3 mt-2">Size</div>
                                <input type="text" class="form-control" style="width: 70px" v-model="new_size" />
                                <button @click="addSize" type="button" class="btn btn-success ms-4" style="width: auto">Add</button>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-outline-primary" data-bs-dismiss="modal" @click="undo">Cancel</button>
                        <button class="btn btn-primary" @click="updateStock">Save</button>
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
            columns: ["Cloth", "Size", "Units Available", "Price", "Actions"],
            selected_size: [],
            selected_index: [],
            index: 0,
            modal_index: 0,
            new_size: "",
        };
    },
    backup: {},
    methods: {
        showCloth(e) {
            var elem = e.target;
            while (elem.tagName != "TR") elem = elem.parentNode;
            var id = elem.childNodes[0].innerHTML;
            window.location.href = "/dashboard/clothes/" + id;
        },
        getid(index) {
            return "triggerId" + index;
        },
        openModel(index) {
            this.index = index;
            this.$options.backup = JSON.parse(JSON.stringify(this.selected_cloth));
            $("#stock-modal").modal("show");
        },
        addSize() {
            for (let i = 0; i < this.clothes[this.index]["stock"].length; i++) {
                if (this.clothes[this.index]["stock"][i]["size"] == this.new_size) {
                    displayError(`Size ${this.new_size} already exist`);
                    return;
                }
            }
            this.clothes[this.index]["stock"].push({
                cloth_id: this.selected_cloth["cloth_id"],
                price: 0,
                quantity: 0,
                size: this.new_size,
            });
            this.new_size = "";
        },
        undo() {
            this.selected_cloth = this.$options.backup;
        },
        updateStock() {
            let stock = this.selected_cloth["stock"];
            for (let i = 0; i < stock.length; i++) {
                if (stock[i]["price"] <= 0) {
                    displayError(`Price for Size ${stock[i]["size"]} is invalid`);
                    return;
                } else if (stock[i]["quantity"] < 0) {
                    displayError(`Quantity for Size ${stock[i]["size"]} is invalid`);
                    return;
                }
            }
            const data = {
                stock: stock,
            };

            axios
                .put("/api/admin/stock", stock)
                .then((response) => {
                    $("#stock-modal").modal("hide");
                    displaySuccess("Stock Updated Successfully");
                })
                .catch((response) => {
                    displayError("Some Error Occurred");
                });

            /*$.ajax({
                url: "/api/admin/stock",
                type: "PUT",
                data: data,
                success: function (data) {
                    $("#stock-modal").modal("hide");
                    displaySuccess("Stock Updated Successfully");
                },
                error: function (data) {
                    displayError("Some Error Occurred");
                },
            });*/
        },
    },
    computed: {
        clothes() {
            let arr = this.$store.getters.getClothes;
            for (let i = 0; i < arr.length; i++) {
                this.selected_size.push(arr[i]["stock"][0]["size"]);
                this.selected_index.push(0);
            }
            return arr;
        },
        selected_cloth: {
            get() {
                if (this.clothes.length == 0) return new Object();
                return this.clothes[this.index];
            },
            set(value) {
                let temp = this.clothes;
                temp[this.index] = value;
                this.$store.commit("setClothes", temp);
            },
        },
    },
    created() {
        this.$options.backup = new Object();
    },
};
</script>

<style scoped></style>
