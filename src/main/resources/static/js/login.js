const app = Vue.createApp({
    data() {
        return {
            loading: true,
            username: "",
            password: "",
        };
    },
    mounted() {
        this.loading = false;
        loadingScreen(false);
    },
    methods: {
        login(event) {
            if (this.password.length == 0 || this.username.length == 0) {
                displayError("All fields should be filled");
                return;
            }

            var data = new FormData();
            data.set("username", this.username);
            data.set("password", this.password);
            this.loading = true;
            loadingScreen(true);
            axios.post("/login", data).then((data) => {
                window.location.href = "/login";
            });
        },
    },
});

const components = [
    ["nav-bar", NavBar],
    ["footer-menu", Footer],
];

addComponents(components).then((data) => app.mount("#app"));
