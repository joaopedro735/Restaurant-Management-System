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
            <tr v-for="(cook) in cooks" :key="cook.id">
                <td>{{ cook.name }}</td>
                <td>{{ cook.type }}</td>
                <td>{{ cook.email }}</td>
                <td align="center"><img :src="getPhoto(cook.photo_url)"></td>
            </tr>
        </tbody>
    </table>
</template>

<script>
module.exports = {
    props: ["cooks"],
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