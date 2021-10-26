<template>
    <div class="container">
        <div class="main-content">
            <h3>Add New Cloth</h3>
            <p>Add some Information about the cloth you want to add</p>

            <div class="col">
                <div class="col">
                    <label for="name" class="text-muted">Cloth Name*</label>
                </div>
                <input type="text" class="input" v-model="name" />
            </div>
            <div class="col mt-3">
                <div class="col"><label class="text-muted" for="brand">Brand*</label></div>
                <input type="text" class="input" v-model="brand" />
            </div>
            <div class="col mt-3">
                <div class="col"><label class="text-muted" for="category">Category*</label></div>
                <input type="text" class="input" v-model="category" />
            </div>
            <div class="col mt-3">
                <div class="col"><label class="text-muted" for="short description">Short Description*</label></div>
                <textarea type="text" class="textarea" v-model="short_description" rows="3" />
            </div>
            <div class="col mt-5">
                <h5>Image Upload</h5>
                <div class="row p-3">
                    <input type="file" accept="image/*" @change="uploadImage($event)" id="file-input" class="hide" />

                    <div class="col-md-3 p-3" style="height: 300px">
                        <img src="/images/upload.jpg" style="width: 100%; height: 100%" class="cursor" @click="upload_click" />
                    </div>
                    <div class="col-md-3 p-3" style="height: 300px" v-for="image in images" :key="image">
                        <div class="div-selected img-upload rounded">
                            <img :src="image" class="img-upload-selected rounded" />
                            <div class="selected-check">
                                <img src="/images/checked.svg" alt="" />
                            </div>
                        </div>
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
            name: "",
            brand: "",
            category: "",
            short_description: "",
            images: [],
            files: [],
        };
    },
    methods: {
        uploadImage(event) {
            var file = event.target.files[0];
            this.files.push(file);
            this.images.push(URL.createObjectURL(file));
            event.target.value = "";
        },
        upload_click() {
            $("#file-input").click();
        },
    },
};
</script>

<style scoped>
.img-upload {
    width: 100%;
    height: 100%;
    cursor: pointer;
}
.img-upload-selected {
    width: 85%;
    height: 85%;
    cursor: none;
    margin: auto;
    display: block;
}
.div-selected {
    position: relative;
    display: flex;
    justify-content: center;
    background-color: rgb(210, 227, 252);
}
.selected-check {
    position: absolute;
    display: block;
    top: 5px;
    right: 7px;
}
</style>
