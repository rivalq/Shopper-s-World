<template>
    <div class="col-auto p-2 pt-0">
        <h4>Product Specifications</h4>
        <table class="table table-bordered mt-3">
            <thead>
                <tr>
                    <td scope="col" style="min-width: 200px">Feature Name</td>
                    <td scope="col" style="min-width: 200px; text-align: left">Value</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(itr, index) in features" :key="itr">
                    <td>
                        <input type="text" class="input" placeholder="Feature Name" style="width: 200px" v-model="itr.feature_name" />
                    </td>
                    <td>
                        <input type="text" class="input" placeholder="value" style="width: 200px" v-model="itr.value" />
                        <i class="fas fa-times-circle ms-3 cursor" @click="removeFeature(index)"></i>
                    </td>
                </tr>
            </tbody>
        </table>
        <button type="button" class="btn btn-primary" @click="addFeature">Add new Feature</button>
        <div class="col-auto">
            <button type="button" class="btn btn-primary mt-3" @click="save">Save</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id: 0,
        };
    },
    computed: {
        features() {
            return this.$store.getters.getCloth["features"];
        },
    },
    created: function () {
        this.id = this.$store.getters.getCloth["cloth_id"];
    },
    methods: {
        addFeature() {
            this.features.push({
                cloth_id: this.id,
                feature_name: "",
                value: "",
            });
        },
        removeFeature(index) {
            this.features.splice(index, 1);
        },
        save() {
            for (let i = 0; i < this.features.length; i++) {
                if (this.features[i].feature_name == "" || this.features[i].value == "") {
                    displayError("All fields should be Non empty");
                    return;
                }
            }
            var data = new FormData();
            data.append("features", new Blob([JSON.stringify(this.features)], { type: "application/json" }));
            var id = this.$store.getters.getCloth["cloth_id"];
            axios({
                url: "/api/admin/features/" + id,
                method: "PUT",
                data: data,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then((response) => {
                    displaySuccess("Specs Updated");
                })
                .catch((response) => {
                    displayError("Some error Occured");
                });
        },
    },
};
</script>
<style scoped>
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
    text-align: left;
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
