<template>
    <div style="max-width: 500px">
        <h4>Product Specifications</h4>
        <table class="table table-bordered mt-3">
            <tbody>
                <tr>
                    <td>Name</td>
                    <td>{{ cloth.name }}</td>
                </tr>
                <tr>
                    <td>Brand</td>
                    <td>{{ cloth.brand }}</td>
                </tr>
                <tr>
                    <td>Category</td>
                    <td>{{ cloth.category }}</td>
                </tr>
                <tr v-for="itr in cloth.features" :key="itr">
                    <td>
                        {{ itr.feature_name }}
                    </td>
                    <td>
                        {{ itr.value }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    computed: {
        ...mapGetters({ cloth: "getCloth" }),
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
