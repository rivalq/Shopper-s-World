<template>
    <table class="table" v-if="data.length > 0">
        <tbody>
            <tr>
                <td>
                    <div class="row justify-content-md-end">
                        <div class="col-sm-auto pt-2">Items Per Page</div>
                        <div class="col-2 me-5 ms-2">
                            <select v-model.number="page_size" class="form-select" @input="changePage">
                                <option>10</option>
                                <option>20</option>
                                <option>50</option>
                                <option>100</option>
                            </select>
                        </div>
                        <div class="col-sm-auto pt-2">{{ left + 1 }} - {{ right + 1 }} of {{ data.length }} entries <i @click="prev()" :class="{ fas: 1, 'fa-chevron-left': 1, cursor: 1, 'fa-disabled': leftPos, 'ms-4': 1 }"></i> <i @click="next()" :class="{ fas: 1, 'fa-chevron-right': 1, cursor: 1, 'fa-disabled': rightPos, 'ms-4': 1 }"></i></div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    data() {
        return {
            page_size: 10,
            page: 0,
        };
    },
    props: ["data"],
    methods: {
        prev() {
            if (this.leftPos == 0) this.page--;
        },
        next() {
            if (this.rightPos == 0) this.page++;
        },
        changePage() {
            this.page = 0;
        },
    },
    computed: {
        leftPos() {
            return this.page == 0;
        },
        rightPos() {
            return (this.page + 1) * this.page_size >= this.$props.data.length;
        },
        left() {
            return Math.min(this.$props.data.length - 1, this.page_size * this.page);
        },
        right() {
            return Math.min(this.$props.data.length - 1, this.left + this.page_size - 1);
        },

        page_data() {
            return this.$props.data.filter((elem, index) => index >= this.left && index <= this.right);
        },
    },
};
</script>
<style scoped>
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
.fa-disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>
