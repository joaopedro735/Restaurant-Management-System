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
            <tr v-for="(manager) in managers" :key="manager.id">
                <td>{{ manager.name }}</td>
                <td>{{ manager.type }}</td>
                <td>{{ manager.email }}</td>
                <td align="center"><img :src="getPhoto(manager.photo_url)"></td>
            </tr>
        </tbody>
    </table>
</template>

<script>
module.exports = {
    props: ["managers"],
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