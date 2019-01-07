<template>
    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th><strong>Prato</strong></th>
                <th><strong>Preço</strong></th>
                <th><strong>Descrição</strong></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(dish) in dishes" :key="dish.id">
                <td><strong>{{ dish.name }}</strong></td>
                <td>{{ dish.price }}</td>
                <td>{{ dish.description }}</td>
                <td align="center"><img :src="getPhoto(dish.photo_url)"></td>
            </tr>
        </tbody>
    </table>
</template>

<script>
module.exports = {
    props: ['dishes'],
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