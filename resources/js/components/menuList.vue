<template>
    <div>
        <h2>Pratos</h2>
        <list-dishes :dishes="dishes"></list-dishes>
        <hr>
        <h2>Bebidas</h2>
        <list-drinks :drinks="drinks"></list-drinks>
    </div>
</template>

<script>
module.exports = {
    props: ["dishes"],
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
</style>