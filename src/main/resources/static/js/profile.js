const app = Vue.createApp({
    data() {
        return {
            user: {},
            loading: true,
            edit_mode: false,
            backup: {},
        };
    },
    template: /*html*/ `
    <div class="slider" style="position: fixed; top: 0px; z-index: 1000" v-show="loading == true" th:fragment="loading">
        <div class="line"></div>
        <div class="subline inc"></div>
        <div class="subline dec"></div> 
    </div>
    <div id="root" class="content" v-show="loading == false">
        <nav-bar></nav-bar>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-3 col-12 border-end" style="text-align: center">
                    <div class="col-auto mt-5 user-info__img-big">
                        <img :src="user.profile_image" style="width: 100px; height: 100px" />
                    </div>
                    <div class="col-auto mt-3 details">{{user.first_name + " " + user.last_name}}</div>
                    <div class="col mt-2 details text-muted">@{{user.username}}</div>
                </div>
                <div class="col p-5">
                    <h3>Profile</h3>
                    <div class="row mt-3">
                        <div class="col-sm-6 col-12">
                            <label for="name">Name</label>
                            <div class="details" v-show="edit_mode == 0">{{user.first_name}}</div>
                            <input class="details form-control" v-show="edit_mode == 1" v-model="user.first_name" placeholder="First Name" style="width: 300px" />
                        </div>
                        <div class="col-sm-6 col-12 mt-sm-0 mt-3">
                            <label for="name">Surname</label>
                            <div class="details" v-show="edit_mode == 0">{{user.last_name}}</div>
                            <input class="details form-control" v-show="edit_mode == 1" v-model="user.last_name" placeholder="Last Name" style="width: 300px" />
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col">
                            <label for="name">Email</label>
                            <div class="details">{{user.email}}</div>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col">
                            <label for="name">Phone</label>
                            <div class="details">{{user.phone}}</div>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-12 col-sm-6">
                            <label for="name">City</label>
                            <div class="details text-wrap" v-show="edit_mode == 0">{{user.city}}</div>
                            <input class="details form-control" v-show="edit_mode == 1" v-model="user.city" placeholder="City" style="width: 300px" />
                        </div>
                        <div class="col-12 col-sm-6 mt-3 mt-sm-0">
                            <label for="name">Street</label>
                            <div class="details text-wrap" v-show="edit_mode == 0">{{user.street}}</div>
                            <input class="details form-control" v-show="edit_mode == 1" v-model="user.street" placeholder="Street" style="width: 300px" />
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col">
                            <label for="name">Credits</label>
                            <div class="details">{{'Rs ' + user.credits}}</div>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col">
                            <label for="name">Role</label>
                            <div class="details" v-text="getRole()"></div>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col-auto" v-show="edit_mode == 0">
                            <button type="button" class="btn btn-primary" @click="changeMode(1)">Edit Profile</button>
                        </div>
                        <div class="col-auto" v-show="edit_mode == 1">
                            <button type="button" class="btn btn-outline-primary" @click="changeMode(0)">Cancel</button>
                        </div>
                        <div class="col-auto ms-2" v-show="edit_mode == 1">
                            <button type="button" class="btn btn-primary" @click="save">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer-menu></footer-menu>
    </div>`,
    created() {
        var username = window.location.href.split("/").at(-1);
        axios.get(`/api/user/${username}`).then((data) => {
            this.user = data.data;
            this.loading = false;
            loadingScreen(false);
        });
    },
    mounted() {},
    methods: {
        getRole() {
            if (this.user.isAdmin == true) return "Admin";
            if (this.user.isSeller == true) return "Seller";
            return "Customer";
        },
        changeMode(mode) {
            if (mode == 0) {
                this.user = this.backup;
                this.edit_mode = 0;
            } else {
                this.backup = JSON.parse(JSON.stringify(this.user));
                this.edit_mode = 1;
            }
        },
        save() {
            this.loading = true;
            loadingScreen(true);

            let flag = 0;
            if (this.user.first_name == "" || this.user.last_name == "") {
                flag = 1;
                displayError("First name and Last name should be Non empty");
            } else if (this.user.city == "" || this.user.street == "") {
                flag = 1;
                displayError("City and Street should be Non empty");
            }
            if (flag != 0) {
                this.loading = false;
                loadingScreen(false);
            } else {
                axios
                    .put("/api/user/", this.user)
                    .then((data) => {
                        displaySuccess("Profile Updated");
                        this.edit_mode = 0;
                    })
                    .catch((data) => {
                        displayError("Some Error Occured");
                    })
                    .finally(() => {
                        this.loading = false;
                        loadingScreen(false);
                    });
            }
        },
    },
});

const components = [
    ["nav-bar", NavBar],
    ["footer-menu", Footer],
];

addComponents(components).then((data) => app.mount("#app"));
