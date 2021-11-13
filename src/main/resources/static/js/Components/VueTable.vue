<template>
    <div>
        <table class="table table-hover">
            <thead>
                <slot name="head" />
            </thead>
            <tbody>
                <slot name="body" :f_data="page_data" />
            </tbody>
        </table>
        <pagination :data="filtered_data" ref="page"></pagination>
    </div>
</template>

<script>
export default {
    name: "vue-table",
    data() {
        return {
            msg: "Jatin Garg",
            loading: 1,
        };
    },
    props: {
        data: {
            type: Object,
            required: true,
        },
    },
    mounted() {
        this.loading = 0;
    },
    computed: {
        filtered_data() {
            return this.$props.data;
        },
        page_data() {
            if (this.loading) return [];
            return this.$refs.page.page_data;
        },
    },
};
</script>
