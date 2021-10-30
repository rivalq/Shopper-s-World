<template>
    <div class="container">
        <div class="main-content">
            <h3>Add New Cloth</h3>
            <p>Add some Information about the cloth you want to add</p>
            <div class="row">
                <div class="col-auto">
                    <div class="col">
                        <div class="col">
                            <label for="name" class="text-muted">Cloth Name*</label>
                        </div>
                        <input type="text" class="input" v-model="name" />
                    </div>
                    <div class="col mt-3">
                        <div class="col"><label class="text-muted" for="brand">Brand*</label></div>
                        <input type="text" class="input" v-model="brand" />
                    </div>
                    <div class="col mt-3">
                        <div class="col"><label class="text-muted" for="category">Category*</label></div>
                        <input type="text" class="input" v-model="category" />
                    </div>
                    <div class="col mt-3">
                        <div class="col"><label class="text-muted" for="short description">Short Description*</label></div>
                        <textarea type="text" class="textarea" v-model="short_description" rows="3" />
                    </div>
                </div>
                <div class="col-auto p-5 pt-0">
                    <h4>Product Specifications</h4>
                    <table class="table table-bordered mt-3">
                        <thead>
                            <tr>
                                <td scope="col" style="min-width: 242px">Feature Name</td>
                                <td scope="col" style="min-width: 277px; text-align: left">Value</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{{ name }}</td>
                            </tr>
                            <tr>
                                <td>Brand</td>
                                <td>{{ brand }}</td>
                            </tr>
                            <tr>
                                <td>Category</td>
                                <td>{{ category }}</td>
                            </tr>
                            <tr v-for="(itr, index) in features" :key="itr">
                                <td>
                                    <input type="text" class="input" placeholder="Feature Name" style="width: 200px" v-model="itr[0]" />
                                </td>
                                <td>
                                    <input type="text" class="input" placeholder="value" style="width: 200px" v-model="itr[1]" />
                                    <i class="fas fa-times-circle ms-3 cursor" @click="removeFeature(index)"></i>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button type="button" class="btn btn-primary" @click="addFeature">Add new Feature</button>
                </div>
            </div>

            <div class="row">
                <div class="col mt-5">
                    <h5>Image Upload</h5>
                    <div class="row p-3">
                        <input type="file" accept="image/*" @change="uploadImage($event)" id="file-input" class="hide" />

                        <div class="col-md-3 p-3" style="height: 250px">
                            <img src="/images/upload.jpg" style="width: 100%; height: 100%" class="cursor" @click="upload_click" />
                        </div>
                        <div class="col-md-3 p-3" style="height: 250px; position: relative" v-for="(image, index) in images" :key="image">
                            <div :class="{ 'div-selected': selected == index, 'img-upload': 1, rounded: 1 }" @click="select_image(index)">
                                <img :src="image" :class="{ 'img-upload-selected': selected == index, 'img-upload': selected != index, rounded: 1 }" />
                                <div class="selected-check" v-if="selected == index">
                                    <img src="/images/checked.svg" alt="" width="28" height="28" />
                                </div>
                                <div class="selected-circle" v-if="selected == index"></div>
                            </div>
                            <div class="cross" @click="remove(index)">
                                <i class="fas fa-times-circle fa-2x"></i>
                            </div>
                            <div class="cross-circle"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mt-4">
                <div class="col">
                    <h5>From manufacturer</h5>
                    <div class="row mt-3">
                        <div :class="{ cursor: 1, 'text-muted': edit_mode == 0, 'col-auto': 1 }" style="font-size: 20px" @click="changeMode(1)">Editor</div>
                        <div :class="{ cursor: 1, 'text-muted': edit_mode, col: 1 }" style="font-size: 20px" @click="changeMode(0)">Preview</div>
                    </div>
                    <textarea cols="70" rows="20" v-model="long_description" class="mt-4" v-show="edit_mode"></textarea>
                    <div v-html="preview" v-show="!edit_mode" class="mt-4" style="border: 1px solid black; width: 969px; min-height: 400px"></div>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-auto">
                    <h4>Stock Units</h4>
                    <table class="table table-bordered mt-3">
                        <thead>
                            <tr>
                                <td scope="col" style="width: 150px">Size</td>
                                <td scope="col" style="width: 150px">Units</td>
                                <td scope="col" style="width: 200px; text-align: left">Price in Rs</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(itr, index) in stock" :key="itr">
                                <td>
                                    <input type="text" class="input" placeholder="Size" style="width: 100%" v-model="itr.size" />
                                </td>
                                <td>
                                    <input type="number" min="1" class="input" placeholder="Units" style="width: 100%" v-model.number="itr.quantity" />
                                </td>
                                <td style="text-align: left">
                                    <input type="number" min="1" class="input" placeholder="Price" style="width: 70%" v-model.number="itr.price" />
                                    <i class="fas fa-times-circle ms-3 cursor" @click="removeStock(index)"></i>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button type="button" class="btn btn-primary" @click="addStock">Add new Size</button>
                </div>
            </div>

            <div class="row mt-5 justify-content-center">
                <div class="col-auto">
                    <button type="button" class="btn btn-primary mt-5" style="width: 300px; font-size: 20px" @click="save">Add Cloth</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: "",
            brand: "",
            category: "",
            short_description: "",
            long_description: "",
            images: [],
            files: [],
            selected: 0,
            features: [],
            edit_mode: 1,
            stock: [],
        };
    },
    methods: {
        uploadImage(event) {
            var file = event.target.files[0];
            this.files.push(file);
            this.images.push(URL.createObjectURL(file));
            event.target.value = "";
        },
        upload_click() {
            $("#file-input").click();
        },
        select_image(index) {
            this.selected = index;
        },
        remove(index) {
            if (this.selected == index) {
                this.selected = 0;
            }
            this.images.splice(index, 1);
            this.files.splice(index, 1);
        },
        addFeature() {
            this.features.push(["", ""]);
        },
        removeFeature(index) {
            this.features.splice(index, 1);
        },
        changeMode(x) {
            this.edit_mode = x;
        },
        addStock() {
            this.stock.push({
                size: "",
                quantity: 1,
                price: 1,
            });
        },
        removeStock(index) {
            this.stock.splice(index, 1);
        },
        display(x) {
            displayError(`${x} should be non empty`);
        },
        isValid() {
            if (this.name == "") {
                this.display("name");
            } else if (this.brand == "") {
                this.display("brand");
            } else if (this.category == "") {
                this.display("category");
            } else if (this.images.length == 0) {
                displayError("Upload atleast 1 image");
            } else if (this.long_description == "") {
                this.display("From manufacturer section");
            } else if (this.stock.length == 0) {
                displayError("Add at least one stock unit");
            } else {
                for (let i = 0; i < this.stock.length; i++) {
                    if (this.stock[i]["size"] == "") {
                        displayError("Size should be non empty");
                        return 0;
                    }
                    if (this.stock[i]["price"] <= 0) {
                        displayError("Price should be greater than 0");
                        return 0;
                    }
                    if (this.stock[i]["quantity" <= 0]) {
                        displayError("units should be greater than 0");
                        return 0;
                    }
                    for (let j = i + 1; j < this.stock.length; j++) {
                        if (this.stock[i]["size"] == this.stock[j]["size"]) {
                            displayError("Size(s) should be unique in stock section");
                            return 0;
                        }
                    }
                }
                return 1;
            }
            return 0;
        },
        save() {
            if (this.isValid()) {
                const cloth = {
                    name: this.name,
                    brand: this.brand,
                    category: this.category,
                    short_description: this.short_description,
                    long_description: this.long_description,
                    seller: "",
                    custom: 1,
                    admin_rating: 5,
                    rating: 0,
                };
                let stock = [];
                for (let i = 0; i < this.stock.length; i++) {
                    const stk = {
                        size: this.stock[i]["size"],
                        quantity: this.stock[i]["quantity"],
                        price: this.stock[i]["price"],
                    };
                    stock.push(stk);
                }

                var data = new FormData();

                for (let i = 0; i < this.images.length; i++) {
                    data.append("images", this.files[i]);
                }
                data.append("cloth", new Blob([JSON.stringify(cloth)], { type: "application/json" }));
                data.append("stock", new Blob([JSON.stringify(stock)], { type: "application/json" }));
                axios({
                    url: "/api/admin/add/" + this.selected,
                    method: "POST",
                    data: data,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                    .then((response) => {
                        displaySuccess("Cloth Added");
                        window.location.reload();
                    })
                    .catch((response) => {
                        displayError("Some error Occured");
                    });
            }
        },
    },
    computed: {
        preview() {
            return marked(this.long_description);
        },
    },
};
</script>

<style scoped>
.img-upload {
    width: 100%;
    height: 100%;
    cursor: pointer;
}
.img-upload-selected {
    width: 85%;
    height: 85%;
    cursor: default;
    margin: auto;
    display: block;
}
.div-selected {
    position: relative;
    display: flex;
    justify-content: center;
    background-color: rgb(210, 227, 252);
}
.selected-check {
    position: absolute;
    display: block;
    top: 5px;
    right: 7px;
    z-index: 2;
    cursor: default;
}
.selected-circle {
    background-color: white;
    border-radius: 50%;
    box-shadow: 0 3px 6px 1px rgb(0 0 0 / 16%), 0 1px 2px 1px rgb(0 0 0 / 23%);
    height: 20px;
    left: initial;
    position: absolute;
    z-index: 1;
    right: 10px;
    top: 7px;
    width: 20px;
}
.cross {
    position: absolute;
    display: block;
    color: red;
    z-index: 2;
    top: 0px;
    left: 0px;
    cursor: pointer;
}

.cross-circle {
    background-color: white;
    border-radius: 50%;
    height: 22px;
    left: initial;
    position: absolute;
    z-index: 1;
    top: 3px;
    left: 4px;
    width: 22px;
}
.table {
    border-spacing: 0 0px;
    border-collapse: separate;
}
.table thead tr th,
.table thead tr td,
.table tbody tr th,
.table tfoot tr td,
.table tbody tr td {
    vertical-align: middle;
    border: 1px solid black;
    padding: 20px;
}
.table thead tr th:nth-last-child(1),
.table thead tr td:nth-last-child(1),
.table tbody tr th:nth-last-child(1),
.table tfoot tr td:nth-last-child(1),
.table tbody tr td:nth-last-child(1) {
    text-align: center;
}

.table tfoot tr,
.table tbody tr {
    box-shadow: 0 0 0 rgba(0, 0, 0, 0.1);
    border-radius: 0px;
}
.table tfoot tr td .table tbody tr td {
    background: #fff;
}
.table tfoot tr td:nth-child(1),
.table tbody tr td:nth-child(1) {
    border-radius: 0px 0 0 0px;
}
.table tfoot tr td:nth-last-child(1),
.table tbody tr td:nth-last-child(1) {
    border-radius: 0 0px 0px 0;
}
</style>
