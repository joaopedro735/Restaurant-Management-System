<template>
    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th>Bebida</th>
                <th>Preço</th>
                <th>Descrição</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(drink) in drinks" :key="drink.id">
                <td>{{ drink.name }}</td>
                <td>{{ drink.price }}</td>
                <td>{{ drink.description }}</td>
                <td align="center"><img :src="getPhoto(drink.photo_url)"></td>
            </tr>
        </tbody>
    </table>
</template>

<script>
module.exports = {
    props: ['drinks'],
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