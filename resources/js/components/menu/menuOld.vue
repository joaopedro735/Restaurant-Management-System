<template>
    <v-container fluid grid-list-md text-xs-center>
        <v-layout row>
            <v-flex xs6>
                <v-card class="px-0">
                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">Drinks</h3>
                        </div>
                    </v-card-title>
                    <v-list>
                        <v-list-tile
                                v-for="drink in drinks"
                                :key="drink.name"
                                avatar
                                @click="">
                            <v-list-tile-content>
                                <v-tooltip bottom>
                                    <div slot="activator">
                                        <v-list-tile-title v-text="drink.name"></v-list-tile-title>
                                        <v-list-tile-sub-title v-text="drink.price"></v-list-tile-sub-title>
                                    </div>
                                    <span>{{drink.description}}</span>
                                </v-tooltip>
                            </v-list-tile-content>

                            <v-list-tile-avatar>
                                <img :src="drink.photo_url">
                            </v-list-tile-avatar>
                        </v-list-tile>
                    </v-list>
                </v-card>
            </v-flex>
            <v-flex xs6>
                <v-card class="px-0">
                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">Dishes</h3>
                        </div>
                    </v-card-title>
                    <v-list>
                        <v-list-tile
                                v-for="dish in dishes"
                                :key="dish.name"
                                avatar
                                @click="">

                            <v-list-tile-content>
                                <v-tooltip bottom>
                                    <div slot="activator">
                                        <v-list-tile-title v-text="dish.name"></v-list-tile-title>
                                        <v-list-tile-sub-title v-text="dish.price"></v-list-tile-sub-title>
                                    </div>
                                    <span>{{dish.description}}</span>
                                </v-tooltip>
                            </v-list-tile-content>

                            <v-list-tile-avatar>
                                <img :src="dish.photo_url">
                            </v-list-tile-avatar>
                        </v-list-tile>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
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
                showAll: true,
                showProfile: true,
            };
        },
        methods: {},
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