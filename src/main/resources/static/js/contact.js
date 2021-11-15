const app = Vue.createApp({
    data() {
        return {
            loading: true,
            name: "",
            email: "",
            message: "",
        };
    },
    mounted() {
        this.loading = false;
        loadingScreen(false);
    },
    methods: {
        send() {
            this.loading = true;
            if (this.name == "" || this.message == "") {
                displayError("All fields are Mandotry");
                return;
            }
            const valid_email = (email) => {
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            };
            if (!valid_email(this.email)) {
                displayError("Enter A valid Email Address");
                return;
            }
            const contact = {
                name: this.name,
                email: this.email,
                message: this.message,
            };
            axios
                .post("/api/contact", contact)
                .then(async (data) => {
                    this.loading = false;
                    displaySuccess("Message Sent");
                    displayInfo("redirecting in 5 seconds...");
                    await new Promise((r) => setTimeout(r, 5000));
                    window.location.href = "/";
                })
                .catch((error) => {
                    this.loading = false;
                    displayError(error.response.data);
                });
        },
    },
});
const components = [
    ["nav-bar", NavBar],
    ["footer-menu", Footer],
];
addComponents(components).then((data) => app.mount("#app"));
