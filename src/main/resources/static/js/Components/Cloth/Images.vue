<template>
    <div>
        <div class="row">
            <input type="file" accept="image/*" @change="uploadImage($event)" id="file-input" class="hide" />
            <div class="col-4 p-3">
                <img src="/images/upload.jpg" style="width: 100%; height: 100%" class="cursor" @click="upload_click" />
            </div>
            <div class="col-4 p-3" style="position: relative" v-for="(image, index) in images" :key="image">
                <div :class="{ 'div-selected': selected == index, 'img-upload': 1, rounded: 1 }" @click="select_image(index)">
                    <img :src="image" :class="{ 'img-upload-selected': selected == index, 'img-upload': selected != index, rounded: 1 }" />
                    <div class="selected-check" v-if="selected == index">
                        <img src="/images/checked.svg" alt="" width="28" height="28" />
                    </div>
                    <div class="selected-circle" v-if="selected == index"></div>
                </div>
                <div class="cross" @click="remove(index)">
                    <i class="fas fa-times-circle fa-2x"></i>
                </div>
                <div class="cross-circle"></div>
            </div>
        </div>
        <div class="col-3 mt-3">
            <button class="btn btn-primary" type="button" @click="save">Save</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selected: 0,
            files: [],
            images: [],
            id: 0,
        };
    },
    created: function () {
        let arr = this.$store.getters.getCloth["images"];
        for (let i = 0; i < arr.length; i++) {
            let url = arr[i]["url"];
            this.id = arr[i]["cloth_id"];
            let val = url.split("/").at(-1);
            if (val == "profile") {
                this.selected = i;
            }
            fetch(url).then(async (response) => {
                const contentType = response.headers.get("content-type");
                const blob = await response.blob();
                const file = new File([blob], "images", { contentType });
                // access file here
                this.files.push(file);
                this.images.push(url);
            });
        }
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
        select_image(index) {
            this.selected = index;
        },
        remove(index) {
            if (this.selected == index) {
                this.selected = 0;
            }
            this.images.splice(index, 1);
            this.files.splice(index, 1);
        },
        save() {
            if (this.files.length == 0) {
                displayError("Select At least one image");
                return;
            }
            var data = new FormData();
            for (let i = 0; i < this.files.length; i++) {
                data.append("images", this.files[i]);
            }
            axios({
                url: "/api/admin/images/" + this.id + "/" + this.selected,
                method: "PUT",
                data: data,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then((response) => {
                    window.location.reload();
                })
                .catch((response) => {
                    displayError("Some error Occured");
                });
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
    cursor: default;
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
    top: 4px;
    right: 7px;
    z-index: 2;
    cursor: default;
}
.selected-circle {
    background-color: white;
    border-radius: 50%;
    box-shadow: 0 3px 6px 1px rgb(0 0 0 / 16%), 0 1px 2px 1px rgb(0 0 0 / 23%);
    height: 20px;
    left: initial;
    position: absolute;
    z-index: 1;
    right: 10px;
    top: 7px;
    width: 20px;
}
.cross {
    position: absolute;
    display: block;
    color: red;
    z-index: 2;
    top: 0px;
    left: 0px;
    cursor: pointer;
}

.cross-circle {
    background-color: white;
    border-radius: 50%;
    height: 22px;
    left: initial;
    position: absolute;
    z-index: 1;
    top: 3px;
    left: 4px;
    width: 22px;
}
</style>
