<template>
    <div class="main-content">
        <div class="row mt-3 justify-content-md-center">
            <div class="col-11">
                <h3>Clothes Catalog</h3>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col" class = "hide">Cloth id</th>
                            <th scope="col">Cloth Name</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Category</th>
                            <th scope="col">Status</th>
                            <th scope="col">Visible</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cloth in clothes" :key="cloth">
                            <th scope="row" class = "hide" >{{ cloth.cloth_id }}</th>
                            <td style="cursor: pointer" @click="showCloth">
                                <div class="user-info">
                                    <div class="user-info__img">
                                        <img :src= cloth.url alt="Unavailable">
                                    </div>
                                    <div class="user-info__basic">
                                        <h5 class="mb-0 text-wrap" style = "max-width:300px">{{cloth.name}}</h5>
                                    </div>
							    </div>
                            </td>
                            <td>{{ cloth.brand }}</td>
                            <td>{{ cloth.category }}</td>
                            <td v-if = "outOfStock(cloth.stock)" > <i class="fad fa-ban me-2" style = "color:red" ></i>Out of Stock</td>
                            <td v-else> <i class="fad fa-check me-2" style = "color:green"></i> In stock</td>
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
        return {};
    },
    methods: {
        showCloth(e) {
            var elem = e.target;
            while(elem.tagName != "TR")elem = elem.parentNode;
            var id = elem.childNodes[0].innerHTML;
            window.location.href = "/dashboard/clothes/" + id;
        },
        outOfStock(stock){
            let flag = 1;
            for(let i = 0; i < stock.length; i++){
                if(stock[i]["quantity"] > 0){
                    flag = 0;
                    break;
                }
            }
            return flag;
        },
    },
    computed: {
        ...mapGetters({ clothes: "getClothes" }),
    },
};
</script>

<style scoped>
.main-content {
    padding-top: 100px;
    padding-bottom: 100px;
}

.table {
    border-spacing: 0 15px;
    border-collapse: separate;
}
.table thead tr th,
.table thead tr td,
.table tbody tr th,
.table tfoot tr td,
.table tbody tr td {
    vertical-align: middle;
    border: none;
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
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
}
.table tfoot tr td .table tbody tr td {
    background: #fff;
}
.table tfoot tr td:nth-child(1),
.table tbody tr td:nth-child(1) {
    border-radius: 5px 0 0 5px;
}
.table tfoot tr td:nth-last-child(1),
.table tbody tr td:nth-last-child(1) {
    border-radius: 0 5px 5px 0;
}

.user-info {
    display: flex;
    align-items: center;
}
.user-info__img img {
    margin-right: 15px;
    height: 55px;
    width: 55px;
    border-radius: 45px;
    border: 3px solid #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.active-circle {
    height: 10px;
    width: 10px;
    border-radius: 10px;
    margin-right: 5px;
    display: inline-block;
}
.fa-disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>
