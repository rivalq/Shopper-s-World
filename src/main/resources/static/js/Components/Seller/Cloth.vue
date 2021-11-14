<template>
    <div class="row mt-5">
        <div class="col-lg-6">
            <div class="row">
                <div class="col-2" style="max-height: 600px; overflow: auto">
                    <div v-for="(img, index) in cloth.images" :key="img" :class="{ 'img-box': 1, 'selected-box': selected_image == index, cursor: 1 }" @click="changeImage(index)">
                        <img :src="img" style="width: 100%" height="60" />
                    </div>
                </div>
                <div class="col-10">
                    <div id="carouselExampleControls" class="carousel carousel-fade" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <div v-for="(img, index) in cloth.images" :key="img" :class="{ 'carousel-item': 1, active: selected_image == index }">
                                <img :src="img" class="d-block w-100 width" height="500" alt="..." />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-6 px-4">
            <div class="row mt-3">
                <div class="col" style="font-size: 34px; font-weight: 400; color: rgb(0, 0, 0, 0.87)">
                    {{ cloth.name }}
                </div>
            </div>
            <div class="row mt-1">
                <div class="col-md-auto">{{ cloth.brand + " | " + cloth.category }}</div>
            </div>
            <div class="row mt-3">
                <div class="col text-muted text-wrap lh-base">
                    {{ cloth.short_description }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            selected_image: 0,
        };
    },
    props: ["id"],
    methods: {
        changeImage(index) {
            this.selected_image = index;
        },
    },

    computed: {
        ...mapGetters({ cloth: "getCloth" }),
    },
};
</script>
<style scoped>
.img-box {
    padding: 5px;
    border: 0.5px solid grey;
    margin-bottom: 7px;
    margin-top: 7px;
}
.selected-box {
    border: 0px;
    box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
}
</style>
