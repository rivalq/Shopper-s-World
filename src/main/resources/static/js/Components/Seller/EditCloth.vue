<template>
    <div>
        <div class="col-sm-auto">
            <label for="basic_input" class="text-muted">Name</label>
        </div>
        <div class="col mt-1">
            <input id="name" class="input" type="text" placeholder="Cloth Name" v-model="cloth.name" />
        </div>
        <div class="col-sm-auto mt-3">
            <label for="basic_input" class="text-muted">Category</label>
        </div>
        <div class="col mt-1">
            <input id="category" class="input" type="text" placeholder="Category" v-model="cloth.category" />
        </div>
        <div class="col-sm-auto mt-3">
            <label for="basic_input" class="text-muted">Brand</label>
        </div>
        <div class="col mt-1">
            <input id="brand" class="input" type="text" placeholder="Brand" v-model="cloth.brand" />
        </div>
        <div class="col-sm-auto mt-3">
            <label for="basic_input" class="text-muted">Short Description</label>
        </div>
        <div class="col mt-1">
            <textarea id="short_description" cols="6" style="min-height: 100px" class="input" type="text" placeholder="Short Description" v-model="cloth.short_description"></textarea>
        </div>
        <div class="col mt-3">
            <h5>Product Description</h5>
            <div class="row mt-3">
                <div :class="{ cursor: 1, 'text-muted': edit_mode == 0, 'col-auto': 1 }" style="font-size: 20px" @click="changeMode(1)">Editor</div>
                <div :class="{ cursor: 1, 'text-muted': edit_mode, col: 1 }" style="font-size: 20px" @click="changeMode(0)">Preview</div>
            </div>
            <textarea style="width: 500px" rows="20" v-model="cloth.long_description" class="mt-4" v-show="edit_mode"></textarea>
            <div v-html="preview" v-show="!edit_mode" class="mt-4" style="border: 1px solid black; width: 500px; min-height: 400px"></div>
        </div>
        <div class="col-sm-auto mt-3">
            <button @click="saveChanges" style="width: 90px" type="button" class="btn btn-primary">Save</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            edit_mode: 1,
        };
    },
    computed: {
        ...mapGetters({ cloth: "getCloth" }),
        preview() {
            if (this.cloth.long_description == undefined) return "";
            return marked(this.cloth.long_description);
        },
    },
    methods: {
        saveChanges() {
            if (this.cloth.name == "" || this.cloth.brand == "" || this.cloth.category == "" || this.cloth.short_description == "" || this.cloth.long_description == "") {
                displayError("All the fields should be non empty");
            } else {
                this.$store.dispatch("updateClothdb");
            }
        },
        changeMode(mode) {
            this.edit_mode = mode;
        },
    },
};
</script>
