<template>
    <div class="main-content">
        <div class="row mt-3 justify-content-md-center">
            <div class="col-11">
                <h3>Users</h3>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col" v-for="col in columns" :key="col">
                                {{ col }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, index) in users" :key="user">
                            <td style="cursor: pointer" @click="showProfile(user.username)">
                                <div class="user-info">
                                    <div class="user-info__img">
                                        <img :src="user.profile_image" alt="Unavailable" />
                                    </div>
                                    <div class="user-info__basic">
                                        <h5 class="mb-0 text-wrap" style="max-width: 300px">{{ user.first_name + " " + user.last_name }}</h5>
                                        <span class="mb-0 text-muted">@{{ user.username }}</span>
                                    </div>
                                </div>
                            </td>
                            <td>{{ user.email }}</td>
                            <td v-if="user.isAdmin">Admin</td>
                            <td v-else-if="user.isSeller">Seller</td>
                            <td v-else>Customer</td>
                            <td>{{ "Rs " + user.credits }}</td>
                            <td>
                                <div class="dropdown">
                                    <a @click="toggle" class="px-2 cursor" :id="getid(index)" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fa fa-ellipsis-v"></i>
                                    </a>
                                    <ul class="dropdown-menu" :aria-labelledby="getid(index)">
                                        <li><a class="dropdown-item" @click="role_modal(index)">Change Role</a></li>
                                        <li><a class="dropdown-item" @click="credit_modal(index)">Change Credits</a></li>
                                        <li><a class="dropdown-item" @click="delete_modal(index)">Delete User</a></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div id="credit-modal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header fs-5 fw-bold">
                        Set Credits
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container">
                            <div class="row">
                                <div class="col">
                                    <label class="form-label">Credits</label>
                                    <input type="number" class="form-control" v-model="credits" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-outline-primary" data-bs-dismiss="modal">Cancel</button>
                        <button @click="save_credits" class="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </div>
        <div id="role-modal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header fs-5 fw-bold">
                        Change Role
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container">
                            <div class="row">
                                <div class="col">
                                    <label class="form-label">Role</label>
                                    <select v-model="role" class="form-select">
                                        <option value="admin">Admin</option>
                                        <option value="seller">Seller</option>
                                        <option value="customer">Customer</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-outline-primary" data-bs-dismiss="modal">Cancel</button>
                        <button @click="save_role" class="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </div>
        <div id="delete-modal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header fs-5 fw-bold">
                        Delete User
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <h5>Are You Sure?</h5>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-outline-primary" data-bs-dismiss="modal">Cancel</button>
                        <button @click="delete_user" class="btn btn-primary">Yes</button>
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
            columns: ["User", "Email", "Role", "Credits"],
            credits: 0,
            index: 0,
            role: "",
        };
    },
    computed: {
        ...mapGetters({ users: "getUsers" }),
        ...mapGetters({ user: "getUser" }),
    },
    methods: {
        showProfile(username) {
            window.location.href = "/profile/" + username;
        },
        getid(index) {
            return "triggerId" + index;
        },
        credit_modal(index) {
            this.index = index;
            this.credits = this.users[index]["credits"];
            $("#credit-modal").modal("show");
        },
        getRole(user) {
            if (user.isAdmin == true) return "admin";
            else if (user.isSeller == true) return "seller";
            return "customer";
        },
        role_modal(index) {
            this.index = index;
            this.role = this.getRole(this.users[index]);
            $("#role-modal").modal("show");
        },
        delete_modal(index) {
            this.index = index;
            $("#delete-modal").modal("show");
        },
        save_credits() {
            if (this.credits < 0) {
                displayError("Credits Can not be negative");
                return;
            }
            this.users[this.index]["credits"] = this.credits;
            axios.post("/api/admin/credits", this.users[this.index]).then((response) => {
                displaySuccess("Credits Updated");
                $("#credit-modal").modal("hide");
            });
        },
        save_role() {
            if (this.users[this.index].username == this.user.username) {
                displayError("You can not change your role");
                return;
            }
            this.users[this.index]["isAdmin"] = false;
            this.users[this.index]["isSeller"] = false;

            if (this.role == "admin") {
                this.users[this.index]["isAdmin"] = true;
            } else if (this.role == "seller") {
                this.users[this.index]["isSeller"] = true;
            }
            axios.post("/api/admin/role", this.users[this.index]).then((response) => {
                displaySuccess("Role Updated");
                $("#role-modal").modal("hide");
            });
        },
        delete_user() {
            if (this.users[this.index].username == this.user.username) {
                displayError("You can not Delete your self");
                return;
            }
            axios.delete("/api/user", { data: this.users[this.index] }).then((response) => {
                displaySuccess("User Deleted");
                this.$store.commit("deleteUser", this.index);
                $("#delete-modal").modal("hide");
            });
        },
    },
};
</script>
