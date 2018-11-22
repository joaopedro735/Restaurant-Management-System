<template>
    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Email</th>
                <th>Fotografia</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(waiter) in waiters" :key="waiter.id">
                <td>{{ waiter.name }}</td>
                <td>{{ waiter.type }}</td>
                <td>{{ waiter.email }}</td>
                <td align="center"><img :src="getPhoto(waiter.photo_url)"></td>
            </tr>
        </tbody>
    </table>
</template>

<script>
module.exports = {
    props: ["waiters"],
    data: function() {
        return {};
    },
    methods: {
        getPhoto: function (photo_url) {
            return photo_url;
        },
    },
    mounted() {}
};
</script>

<style scoped>
    img {
        max-height: 60px;
        border-radius: 3px;
    }
</style>