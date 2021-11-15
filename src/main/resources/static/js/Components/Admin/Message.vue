<template>
    <div class="main-content">
        <div class="row mt-3 justify-content-md-center">
            <div class="col-11">
                <h3>Messages</h3>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col" v-for="col in columns" :key="col">
                                {{ col }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="msg in messages" :key="msg">
                            <td>{{ msg.name }}</td>
                            <td>{{ msg.email }}</td>
                            <td>{{ msg.message }}</td>
                        </tr>
                    </tbody>
                </table>
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
};
</script>
