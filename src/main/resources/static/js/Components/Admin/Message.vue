<template>
    <div class="main-content">
        <div class="row mt-3 justify-content-md-center">
            <div class="col-11">
                <h3>Messages</h3>
                <table class="table table-hover" v-if="messages.length > 0">
                    <thead>
                        <tr>
                            <th scope="col" v-for="col in columns" :key="col">
                                {{ col }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="msg in page_data" :key="msg">
                            <td>{{ msg.name }}</td>
                            <td>{{ msg.email }}</td>
                            <td>{{ msg.message }}</td>
                        </tr>
                    </tbody>
                </table>
                <pagination ref="page" :data="messages"></pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            messages: [],
            columns: ["Name", "Email", "Message"],
        };
    },
    created() {
        axios.get("/api/contact").then((data) => {
            this.messages = data.data;
        });
    },
    computed: {
        page_data() {
            return this.$refs.page.page_data;
        },
    },
};
</script>
