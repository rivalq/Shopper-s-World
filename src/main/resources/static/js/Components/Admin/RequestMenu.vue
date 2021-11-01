<template>
    <div class="main-content">
        <div class="row mt-3 justify-content-md-center">
            <div class="col-11">
                <h3>Pending Requests</h3>
                <div v-if="pendingLen == 0" style="text-align: center">
                    <i class="fas fa-shopping-cart fa-5x" style="opacity: 0.6"></i>
                    <h5 class="mt-5">New Cloth Stock Requests will Appear Here</h5>
                </div>
                <table class="table table-hover" v-if="pendingLen > 0">
                    <thead>
                        <tr>
                            <th scope="col">Seller Name</th>
                            <th scope="col">Cloth Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Size</th>
                            <th scope="col">Price</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(request, index) in pending" :key="request">
                            <div style="display: none">{{ index }}</div>
                            <td>{{ request.seller }}</td>
                            <td>{{ clothes[request.cloth_id] }}</td>
                            <td>{{ request.quantity }}</td>
                            <td>{{ request.size }}</td>
                            <td>{{ "Rs " + request.price }}</td>
                            <td>
                                <div class="dropdown">
                                    <a @click="toggle" class="px-2 cursor" :id="getid(index)" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fa fa-ellipsis-v"></i>
                                    </a>
                                    <ul class="dropdown-menu" :aria-labelledby="getid(index)">
                                        <li><a class="dropdown-item">View Cloth</a></li>
                                        <li><a class="dropdown-item" @click="accept">Accept</a></li>
                                        <li><a class="dropdown-item" @click="reject">Reject</a></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table class="table" v-if="pendingLen > 0">
                    <tbody>
                        <tr>
                            <td>
                                <div class="row justify-content-md-end">
                                    <div class="col-sm-auto pt-2">Items Per Page</div>
                                    <div class="col-2 me-5 ms-2">
                                        <select v-model.number="pending_page_size" class="form-select">
                                            <option>10</option>
                                            <option>20</option>
                                            <option>50</option>
                                            <option>100</option>
                                        </select>
                                    </div>
                                    <div class="col-sm-auto pt-2">{{ pendingL + 1 }} - {{ pendingR + 1 }} of {{ pendingLen }} entries <i @click="pageDown('pending_page', pending_page_size, pendingLen)" :class="{ fas: 1, 'fa-chevron-left': 1, cursor: 1, 'fa-disabled': downPossible(pending_page, pending_page_size, pendingLen), 'ms-4': 1 }"></i> <i @click="pageUp('pending_page', pending_page_size, pendingLen)" :class="{ fas: 1, 'fa-chevron-right': 1, cursor: 1, 'fa-disabled': upPossible(pending_page, pending_page_size, pendingLen), 'ms-4': 1 }"></i></div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="row justify-content-md-center" style="margin-top: 100px">
            <div class="col-11">
                <h3>Old Requests</h3>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Seller Name</th>
                            <th scope="col">Cloth Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Size</th>
                            <th scope="col">Price</th>
                            <th scope="col">Action Taken</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="request in older" :key="request">
                            <td>{{ request.seller }}</td>
                            <td>{{ clothes[request.cloth_id] }}</td>
                            <td>{{ request.quantity }}</td>
                            <td>{{ request.size }}</td>
                            <td>{{ "Rs " + request.price }}</td>
                            <td v-if="request.result == 1">
                                Accepted
                                <svg class="MuiSvgIcon-root jss312" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>
                            </td>
                            <td v-if="request.result == 0">
                                Rejected
                                <svg class="MuiSvgIcon-root" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" focusable="false" viewBox="0 0 24 24">
                                    <line x1="6" y1="6" x2="20" y2="20" stroke="red" stroke-width="2" />
                                    <line x1="20" y1="6" x2="6" y2="20" stroke="red" stroke-width="2" />
                                </svg>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table class="table">
                    <tbody>
                        <tr>
                            <td>
                                <div class="row justify-content-md-end">
                                    <div class="col-sm-auto pt-2">Items Per Page</div>
                                    <div class="col-2 me-5 ms-2">
                                        <select v-model.number="older_page_size" class="form-select">
                                            <option>10</option>
                                            <option>20</option>
                                            <option>50</option>
                                            <option>100</option>
                                        </select>
                                    </div>
                                    <div class="col-sm-auto pt-2">{{ olderL + 1 }} - {{ olderR + 1 }} of {{ olderLen }} entries <i @click="pageDown('older_page', older_page_size, olderLen)" :class="{ fas: 1, 'fa-chevron-left': 1, cursor: 1, 'fa-disabled': downPossible(older_page, older_page_size, olderLen), 'ms-4': 1 }"></i> <i @click="pageUp('older_page', older_page_size, olderLen)" :class="{ fas: 1, 'fa-chevron-right': 1, cursor: 1, 'fa-disabled': upPossible(older_page, older_page_size, olderLen), 'ms-4': 1 }"></i></div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div id="accept-request" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header fs-5 fw-bold">
                        Set Price and Discount
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container">
                            <div class="row">
                                <div class="col">
                                    <label class="form-label">Set MRP</label>
                                    <input type="number" class="form-control" v-model="price" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-outline-primary" data-bs-dismiss="modal">Cancel</button>
                        <button @click="accept_request" class="btn btn-primary">Accept</button>
                    </div>
                </div>
            </div>
        </div>

        <div id="reject-request" class="modal fade">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header fs-5 fw-bold">
                        Reject Request
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">Are You Sure?</div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" data-bs-dismiss="modal">No</button>
                        <button class="btn btn-primary" @click="reject_request">Yes</button>
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
            price: 0,
            pending_page: 0,
            pending_page_size: 10,
            older_page: 0,
            older_page_size: 10,
        };
    },

    computed: {
        pendingL() {
            return this.pending_page * this.pending_page_size;
        },

        pendingR() {
            return Math.min(this.pendingLen - 1, this.pendingL + this.pending_page_size - 1);
        },
        olderL() {
            return this.older_page * this.older_page_size;
        },

        olderR() {
            return Math.min(this.olderLen - 1, this.olderL + this.older_page_size - 1);
        },

        pending() {
            return this.$store.getters.getRequests
                .filter((request, index) => request["status"] == 0)
                .filter((request, index) => {
                    return index >= this.pendingL && index <= this.pendingR;
                });
        },
        older() {
            return this.$store.getters.getRequests
                .filter((request, index) => request["status"] == 1)
                .filter((request, index) => {
                    return index >= this.olderL && index <= this.olderR;
                });
        },

        pendingLen() {
            return this.$store.getters.getRequests.filter((request, index) => request["status"] == 0).length;
        },
        olderLen() {
            return this.$store.getters.getRequests.filter((request, index) => request["status"] == 1).length;
        },

        requests() {
            return this.$store.getters.getRequests;
        },

        clothes() {
            var cloth = this.$store.getters.getSellerClothes;

            var obj = new Object();

            for (let i = 0; i < cloth.length; i++) {
                obj[cloth[i]["cloth_id"]] = cloth[i]["name"];
            }

            return obj;
        },
    },
    methods: {
        downPossible(page, page_size, len) {
            return page == 0;
        },
        upPossible(page, page_size, len) {
            return (page + 1) * page_size >= len;
        },

        pageUp(page, page_size, len) {
            if (this.upPossible(this[page], page_size, len) == 0) this[page]++;
        },

        pageDown(page, page_size, len) {
            if (this.downPossible(this[page], page_size, len) == 0) this[page]--;
        },

        getid(index) {
            return "triggerId" + index;
        },

        getIndex(e) {
            var elem = e.target;
            let cnt = 4;
            while (elem.tagName != "TR") {
                elem = elem.parentNode;
            }
            return parseInt(elem.childNodes[0].innerHTML);
        },

        accept(e) {
            this.index = this.getIndex(e);
            this.price = this.pending[this.index]["price"];
            $("#accept-request").modal("show");
        },
        reject(e) {
            this.index = this.getIndex(e);
            $("#reject-request").modal("show");
        },
        accept_request() {
            let request = this.pending[this.index];
            request["price"] = this.price;
            let that = this;
            $.ajax({
                url: "/api/admin/accept_request",
                type: "POST",
                contentType: "application/json",
                datatype: "json",
                data: JSON.stringify(request),
                success: function (data) {
                    that.pending[that.index]["result"] = 1;
                    that.pending[that.index]["status"] = 1;
                    $("#accept-request").modal("hide");
                    displaySuccess("Cloth added to MarketPlace");
                },
                error: function (data) {
                    displayError("Some Error Occured");
                },
            });
        },
        reject_request() {
            let id = this.pending[this.index]["request_id"];
            axios.post("/api/admin/reject_request/" + id).then((respone) => {
                this.pending[this.index]["result"] = 0;
                this.pending[this.index]["status"] = 1;
                $("#reject-request").modal("hide");
                displayInfo("Request Rejected");
            });
        },
    },
};
</script>

<style scoped></style>
