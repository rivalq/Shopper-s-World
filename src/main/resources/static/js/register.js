const app = Vue.createApp({
    data() {
        return {
            loading: true,
            username: "",
            password: "",
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            city: "",
            street: "",
        };
    },
    mounted() {
        this.loading = false;
        loadingScreen(false);
    },
    methods: {
        async register(event) {
            this.loading = true;
            loadingScreen(true);

            const valid = (num) => {
                let s = num.toString();
                console.log(s);
                if (s.length != 10) return false;
                let isnum = /^\d+$/.test(num);
                return isnum;
            };
            const valid_email = (email) => {
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            };

            let flag = 0;
            if (this.username == "") {
                flag = 1;
                displayError("Username Should be non empty");
            } else if (this.password.length < 8) {
                flag = 1;
                displayError("Password should have at least 8 characters");
            } else if (this.first_name == "" || this.last_name == "") {
                flag = 1;
                displayError("First name and Last name should be Non empty");
            } else if (this.city == "" || this.street == "") {
                flag = 1;
                displayError("City and Street should be Non empty");
            } else if (!valid(this.phone)) {
                flag = 1;
                displayError("Enter A valid Mobile Number");
            } else if (!valid_email(this.email)) {
                flag = 1;
                displayError("Enter A valid Email Address");
            }
            if (flag == 1) {
                this.loading = false;
                loadingScreen(false);
            } else {
                var data = new FormData();
                let url = "https://avatars.dicebear.com/api/human/" + this.username + ".svg";
                /*await axios
                    .get(url, {
                        responseType: "arraybuffer",
                        headers: { "Access-Control-Allow-Origin": "*" },
                    })
                    .then((response) => {
                        var file = Buffer.from(response.data, "binary").toString("base64");
                        data.append("image", file);
                    });*/
                const user = {
                    username: this.username,
                    password: this.password,
                    email: this.email,
                    first_name: this.first_name,
                    last_name: this.last_name,
                    phone: this.phone,
                    city: this.city,
                    street: this.street,
                    profile_image: url,
                };
                data.append("user", new Blob([JSON.stringify(user)], { type: "application/json" }));

                axios({
                    url: "/register",
                    method: "POST",
                    data: data,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                    .then((response) => {
                        var data = new FormData();
                        data.set("username", this.username);
                        data.set("password", this.password);
                        axios.post("/login", data).then((data) => {
                            window.location.href = "/login";
                        });
                    })
                    .catch((error) => {
                        displayError(error.response.data);
                        //displayError(data);
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
