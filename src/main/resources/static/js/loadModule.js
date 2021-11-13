const NavBar = "/js/Components/NavBar.vue";
const Footer = "/js/Components/Footer.vue";
const mapGetters = Vuex.mapGetters;

const options = {
    moduleCache: {
        vue: Vue,
    },
    getFile(url) {
        return fetch(url).then((response) => (response.ok ? response.text() : Promise.reject(response)));
    },
    addStyle(styleStr) {
        const style = document.createElement("style");
        style.textContent = styleStr;
        const ref = document.head.getElementsByTagName("style")[0] || null;
        document.head.insertBefore(style, ref);
    },
};

const { loadModule } = window["vue3-sfc-loader"];

async function Component(name, url) {
    const result = await loadModule(url, options).then((component) => {
        app.component(name, component);
    });
}

async function addComponents(components) {
    for (let i = 0; i < components.length; i++) {
        await Component(components[i][0], components[i][1]);
    }
    return 0;
}

const loadingScreen = (flag) => {
    if (flag == true) {
        var elem = document.getElementById("root");
        elem.classList.add("content");
    } else {
        var elem = document.getElementById("root");
        elem.classList.remove("content");
    }
};

const add = (arr) => {
    let object = admin;
    for (let i = 0; i < arr.length; i++) {
        let name = arr[i][1].split("/").at(-1).split(".")[0];
        app.component(arr[i][0], admin[name]);
    }
    app.mount("#app");
};
