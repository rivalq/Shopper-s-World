const components = [
    ["nav-bar", NavBar],
    ["footer-menu", "/js/Components/Footer.vue"],
    ["landing-menu", "/js/Components/Landing.vue"],
];

const app = Vue.createApp({});

addComponents(components).then((data) => app.mount("#app"));
