<template>
    <div class="container">
        <div class="row">
            <h1 class="text-center">Menu</h1>
        </div>

        <hr>

        <div class="container">
            <div class="btn-group btn-group-justified">
                <div class="btn-group">
                    <button @click="showDishes = true; showDrinks = true; showAll = true" id="all" type="button" class="btn " v-bind:class="{'btn-primary': showAll, 'btn-secondary': !showAll}">Tudo</button>
                </div>
                <div class="btn-group">
                    <button @click="showDishes = true; showDrinks = false; showAll = false" id="dishes" type="button" class="btn " v-bind:class="{'btn-primary': showDishes && !showAll, 'btn-secondary': !showDishes}">Pratos</button>
                </div>
                <div class="btn-group">
                    <button @click="showDishes = false; showDrinks = true; showAll = false" id="drinks" type="button" class="btn " v-bind:class="{'btn-primary': showDrinks && !showAll, 'btn-secondary': !showDrinks}">Bebidas</button>
                </div>
            </div>
        </div>

        <div class="container" v-if="showDishes">
            <h2>Pratos</h2>
            <list-dishes :dishes="dishes"></list-dishes>
        </div>

        <div class="container" v-if="showDishes && showDrinks">
            <hr>
        </div>

        <div class="container" v-if="showDrinks">
            <h2>Bebidas</h2>
            <list-drinks :drinks="drinks"></list-drinks>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                title: 'Menu',
                menu: [],
                dishes: [],
                drinks: [],
                showDishes: true,
                showDrinks: true,
                showAll: true
            };
        },
        methods: {
        },
        mounted() {
            axios.get('/api/menu').then(response => {
                this.menu = response.data.data;

                this.drinks = this.menu.filter(function (elem) {
                    return elem.type == 'drink';
                });

                this.dishes = this.menu.filter(function (elem) {
                    return elem.type == 'dish';
                });
            })
            .catch((error) => {
                console.dir(error);
            })
        }
    }
</script>

<style scoped>
</style>