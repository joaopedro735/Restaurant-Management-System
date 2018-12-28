<template>
    <div>
        <v-container fluid grid-list-md text-xs-center>
            <v-layout row>
                <v-flex xs6>
                    <v-card class="px-0">
                        <v-card-title class="headline info" primary-title>
                            Drinks
                            <div v-if="showManagerOptions">
                                <v-spacer></v-spacer>
                                <v-btn slot="activator" round dark class="mb-2" @click="showCreateDrink = true">Add drink</v-btn>
                            </div>
                        </v-card-title>
                        <v-data-table
                            :headers="headers"
                            :items="drinks"
                            :pagination.sync="paginationDrinks"
                            :rows-per-page-items="rowsPerPageItemsDrinks"
                            :total-items="totalDrinks"
                            :loading="loadingDrinks"
                            class="elevation-1">
                            <template slot="items" slot-scope="props">
                                <tr :key="props.item.id" @click="props.expanded = !props.expanded" :class="{
                                    'isExpanded': props.expanded }">
                                    <td>
                                        <v-list-tile-avatar>
                                            <img :src="props.item.photo_url">
                                        </v-list-tile-avatar>
                                    </td>
                                    <td display-2 align="left">
                                        <h3>{{ props.item.name }}</h3>
                                    </td>
                                    <td>{{ props.item.description.length > 80 ? props.item.description.substr(0, 80) + ('...') : props.item.description }}</td>
                                    <td><h4>{{ props.item.price }}</h4></td>
                                </tr>
                            </template>
                            <template slot="no-data">
                                <v-alert :value="true" color="info" icon="info">No drinks available</v-alert>
                            </template>
                            <template slot="expand" slot-scope="props">
                                <v-card flat>
                                    <v-card-text>
                                        <strong>Drink description:</strong> {{ props.item.description}}
                                    </v-card-text>
                                </v-card>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-flex>
                <v-flex xs6>
                    <v-card class="px-0">
                        <v-card-title class="headline info" primary-title>
                            Dishes
                            <div v-if="showManagerOptions">
                                <v-spacer></v-spacer>
                                <v-btn slot="activator" round dark class="mb-2" @click="showCreateDrink = true">Add dish</v-btn>
                            </div>
                        </v-card-title>
                        <v-data-table
                            :headers="headers"
                            :items="dishes"
                            :pagination.sync="paginationDishes"
                            :rows-per-page-items="rowsPerPageItemsDishes"
                            :total-items="totalDishes"
                            :loading="loadingDishes"
                            class="elevation-1">
                            <template slot="items" slot-scope="props">
                                <tr :key="props.item.id" @click="props.expanded = !props.expanded" :class="{'isExpanded' : props.expanded}">
                                    <td>
                                        <v-list-tile-avatar>
                                            <img :src="props.item.photo_url">
                                        </v-list-tile-avatar>
                                    </td>
                                    <td display-2 align="left">
                                        <h3>{{ props.item.name }}</h3>
                                    </td>
                                    <td>{{ props.item.description.length > 80 ? props.item.description.substr(0, 80) + ('...') : props.item.description }}</td>
                                    <td><h4>{{ props.item.price }}</h4></td>
                                    
                                </tr>
                            </template>
                            <template slot="no-data">
                                <v-alert :value="true" color="info" icon="info">No dishes available</v-alert>
                            </template>
                            <template slot="expand" slot-scope="props">
                                <v-card flat>
                                    <v-card-text>
                                        <strong>Drink description:</strong> {{ props.item.description}}
                                    </v-card-text>
                                </v-card>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                showManagerOptions: false,
                totalDrinks: 0,
                totalDishes: 0,
                drinks: [],
                dishes: [],
                loadingDrinks: true,
                loadingDishes: true,
                paginationDrinks: {},
                paginationDishes: {},
                rowsPerPageItemsDrinks: [15, 25, 50, 100],
                rowsPerPageItemsDishes: [15, 25, 50, 100],
                paginationDrinks: {
                    rowsPerPage: 15
                },
                paginationDishes: {
                    rowsPerPage: 15
                },
                headers: [
                    { text: '', value: 'photo_url' },
                    { text: 'Name', value: 'name', align: 'left' },
                    { text: 'Description', value: 'description' },
                    { text: 'Price', value: 'price' }
                ]
            }
        },
        watch: {
            paginationDrinks: {
                handler() {
                    this.getDrinkDataFromApi().then(data => {
                        this.drinks = data.data.drinks;
                        this.totalDrinks = data.data.totalDrinks;
                    });
                },
                deep: true
            },
            paginationDishes: {
                handler() {
                    this.getDishDataFromApi().then(data => {
                        this.dishes = data.data.dishes;
                        this.totalDishes = data.data.totalDishes;
                    });
                },
                deep: true
            }
        },
        methods: {
            getDrinkDataFromApi() {
                this.loadingDrinks = true;

                return axios.all([
                    axios.get('/api/menu/drinks',
                        {
                            params: {
                                page: this.paginationDrinks.page, rowsPerPage: this.paginationDrinks.rowsPerPage
                            }
                        }
                    )
                ]).then(axios.spread(drinkRes => {
                        this.loadingDrinks = false;

                        return {
                            data: {
                                drinks: drinkRes.data.data,
                                totalDrinks: drinkRes.data.meta.total
                            }
                        };
                    })
                );
            },
            getDishDataFromApi() {
                this.loadingDishes = true;

                return axios.all([
                    axios.get('/api/menu/dishes',
                        {
                            params: {
                                page: this.paginationDishes.page, rowsPerPage: this.paginationDishes.rowsPerPage
                            }
                        }
                    )
                ]).then(axios.spread(dishRes => {
                        this.loadingDishes = false;

                        return {
                            data: {
                                dishes: dishRes.data.data,
                                totalDishes: dishRes.data.meta.total
                            }
                        };
                    })
                );
            },
            getInformationFromLoggedUser() {
                this.user = this.$store.state.user;
            },
            isUserAWorker(user) {
                if (user.type == 'manager') {
                    this.showManagerOptions = true;
                    this.managerID = user.id;
                } 
            }
        },
        mounted() {
            this.getInformationFromLoggedUser();
            this.isUserAWorker(this.user);
        },
    }
</script>

<style scoped>
    .isExpanded {
        background-color: #C8E6C9;
    }
</style>