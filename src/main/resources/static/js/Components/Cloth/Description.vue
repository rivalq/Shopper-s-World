<template>
    <div class="container px-3 py-1">
        <div class="row">
            <div class="col-lg pt-3">
                <div v-html="preview"></div>
            </div>
            <div class="col-lg pt-3">
                <h4>Specifications</h4>
                <div class="row">
                    <div class="col-6 p-2" v-for="itr in features" :key="itr">
                        <div class="feature">
                            <div class="col text-muted" style="font-size: 14px">{{ itr.feature_name }}</div>
                            <div class="col">{{ itr.value }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        preview() {
            let cloth = this.$store.getters.getCloth;
            if (cloth == undefined || cloth["long_description"] == undefined) return "";
            return marked(cloth["long_description"]);
        },
        features() {
            return this.$store.getters.getCloth["features"];
        },
    },
};
</script>

<style scoped>
.feature {
    border-bottom: 1px solid #eaeaec;
}
</style>
