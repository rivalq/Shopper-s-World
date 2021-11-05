<template>
    <div v-html="preview"></div>
</template>

<script>
export default {
    computed: {
        preview() {
            let cloth = this.$store.getters.getCloth;
            if (cloth == undefined || cloth["long_description"] == undefined) return "";
            return marked(cloth["long_description"]);
        },
    },
};
</script>
