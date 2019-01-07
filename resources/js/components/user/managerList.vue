<template>
    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th><strong>Nome</strong></th>
                <th><strong>Categoria</strong></th>
                <th><strong>Email</strong></th>
                <th><strong>Fotografia</strong></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(manager) in managers" :key="manager.id">
                <td><strong>{{ manager.name }}</strong></td>
                <td>{{ manager.type }}</td>
                <td>{{ manager.email }}</td>
                <td align="center"><img :src="getPhoto(manager.photo_url)"></td>
            </tr>
        </tbody>
    </table>
</template>

<script>
module.exports = {
    props: ['managers'],
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