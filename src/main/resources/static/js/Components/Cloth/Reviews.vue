<template>
    <div class="container">
        <div class="main-content">
            <h5>Product Review Display</h5>
            <table class="table">
                <tbody>
                    <tr v-for="itr in reviews" :key="itr">
                        <td style="width: 300px">
                            <div class="user-info">
                                <div class="user-info__img"><img :src="`https://avatars.dicebear.com/api/initials/${itr.username}.svg`" alt="Unavailable" /></div>
                                <div class="user-info__basic">
                                    <h5 class="mb-0 text-wrap" style="max-width: 300px">{{ itr.username }}</h5>
                                    <p class="text-muted mt-2">{{ itr.time }}</p>
                                </div>
                            </div>
                        </td>
                        <td style="text-align: left">
                            <h6>{{ itr.head }}</h6>
                            <p class="text-muted">{{ itr.body }}</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            Avatar: "https://avatars.dicebear.com/api/human/ihojfowhfo.svg",
        };
    },
    computed: {
        ...mapGetters({ reviews: "getReviews" }),
    },
};
</script>
<style scoped>
.user-info__img img {
    margin-right: 15px;
    height: 80px;
    width: 80px;
    border-radius: 45px;
    border: 3px solid #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
