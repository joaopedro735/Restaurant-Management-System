<template>
    <v-card>
        <v-card-title class="headline info white--text" primary-title>Menu
            <v-spacer></v-spacer>
            <v-btn fab dark  v-if="showManagerOptions" slot="activator" @click="showCreateItem = true">
                <v-icon>add</v-icon>
            </v-btn>
        </v-card-title>

        <v-container fluid grid-list-md text-xs-center>
            <v-layout row>
                <v-flex xs6>
                    <v-card class="px-0">
                        <v-card-title class="headline info white--text" primary-title>
                            Drinks
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
                                            <img :src="getImagePath(props.item.photo_url)">
                                        </v-list-tile-avatar>
                                    </td>
                                    <td class="text-xs-left">
                                        {{ props.item.name }}
                                    </td>
                                    <td class="text-xs-left">{{ props.item.description.length > 100 ? props.item.description.substr(0, 100) + (' ...') : props.item.description }}</td>
                                    <td class="text-xs-rigth">
                                        <h4>{{ appendSign(props.item.price) }}</h4>
                                    </td>
                                    <td class="text-xs-right">
                                        <span>
                                            <v-btn small round color="info" v-if="showManagerOptions" @click="updateItem(props.index, props.item), props.expanded=!props.expanded">
                                                <v-icon>edit</v-icon>
                                                &nbsp; Update
                                            </v-btn>
                                        </span>
                                        <span>
                                            <v-btn small round color="error" v-if="showManagerOptions" @click="deleteItem(props.index, props.item), props.expanded=!props.expanded">
                                                <v-icon>delete</v-icon>
                                                &nbsp; Delete
                                            </v-btn>
                                        </span>
                                    </td>
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
                            <template slot="footer">
                                <td :colspan="headers.length">
                                    <strong>Click on a drink for more details</strong>
                                </td>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-flex>
                <v-flex xs6>
                    <v-card class="px-0">
                        <v-card-title class="headline info white--text" primary-title>
                            Dishes
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
                                            <img :src="getImagePath(props.item.photo_url)">
                                        </v-list-tile-avatar>
                                    </td>
                                    <td class="text-xs-left">
                                        {{ props.item.name }}
                                    </td>
                                    <td class="text-xs-left">{{ props.item.description.length > 100 ? props.item.description.substr(0, 100) + (' ...') : props.item.description }}</td>
                                    <td class="text-xs-left">
                                        <h4>{{ appendSign(props.item.price) }}</h4>
                                    </td>
                                    <td class="text-xs-right">
                                        <span>
                                            <v-btn small round color="info" slot="activator" v-if="showManagerOptions" @click="updateItem(props.index, props.item), props.expanded=!props.expanded">
                                                <v-icon>edit</v-icon>
                                                &nbsp; Update
                                            </v-btn>
                                        </span>
                                        <span>
                                            <v-btn small round color="error" v-if="showManagerOptions" @click="deleteItem(props.index, props.item), props.expanded=!props.expanded">
                                                <v-icon>delete</v-icon>
                                                &nbsp; Delete
                                            </v-btn>
                                        </span>
                                    </td>
                                </tr>
                            </template>
                            <template slot="no-data">
                                <v-alert :value="true" color="info" icon="info">No dishes available</v-alert>
                            </template>
                            <template slot="expand" slot-scope="props">
                                <v-card flat>
                                    <v-card-text>
                                        <strong>Dish description:</strong> {{ props.item.description}}
                                    </v-card-text>
                                </v-card>
                            </template>
                            <template slot="footer">
                                <td :colspan="headers.length">
                                    <strong>Click on a dish for more details</strong>
                                </td>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        <create-item :visible="showCreateItem" @close="showCreateItem = false" @update="newItemRow"></create-item>
        <update-item :visible="showUpdateItem" @close="showUpdateItem = false" @update="updateItemRow" :item="currentItem"></update-item>
    </v-card>
</template>

<script>
    import CreateItem from '../manage/createItem';
    import UpdateItem from '../manage/updateItem';

    export default {
        data() {
            return {
                user: {},
                item: {
                    id: ''
                },
                currentItem: {
                    'name': '',
                    'type': '',
                    'description': '',
                    'photo_url': '',
                    'price': ''
                },
                currentItemIndex: '',
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
                headers: [
                    { text: '', value: 'photo_url', width: '1px' },
                    { text: 'Name', value: 'name', width: this.showManagerOptions ? '180px' : '250px' },
                    { text: 'Description', value: 'description', width: this.showManagerOptions ? '150px' : '550px' },
                    { text: 'Price', value: 'price', width: '20px' },
                    { text: '', value: 'actions', width: this.showManagerOptions ? '220px' : ''}
                ],
                showCreateItem: false,
                showUpdateItem: false
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
            deleteItem(index, item) {
                this.item.id = item.id;

                let config = {
                    headers: {
                        Authorization: 'Bearer ' + this.$store.state.token,
                        Accept: 'application/json'
                    }
                };

                axios.delete('/api/menu/' + this.item.id, config)
                    .then(response => {
                            if (item.type === 'drink') {
                                this.totalDrinks--;
                                this.drinks.splice(index, 1);
                            }

                            if (item.type === 'dish') {
                                this.totalDishes--;
                                this.dishes.splice(index, 1);
                            }

                            this.$toasted.success('Item deleted',
                                {

                                    icon: 'info',
                                }
                            );
                        }
                    )
                    .catch(error => {
                        this.$toasted.error(error,
                            {
                                icon: 'error',
                            }
                        );
                    });
            },
            getImagePath(filename) {
                return '/storage/items/' + filename;
            },
            appendSign(price) {
                return price + '€';
            },
            newItemRow(item) {
                if (item.type === 'drink') {
                    this.totalDrinks++;

                    if (this.drinks.length < this.paginationDrinks.rowsPerPage) {
                        Vue.set(this.drinks, this.drinks.length, item);
                    }
                }

                if (item.type === 'dish') {
                    this.totalDishes++;

                    if (this.dishes.length < this.paginationDishes.rowsPerPage) {
                        Vue.set(this.dishes, this.dishes.length, item);
                    }
                }
            },
            updateItemRow(item) {
                if (item.type === 'drink') {
                    Vue.set(this.drinks, this.currentItemIndex, item);
                }

                if (item.type === 'dish') {
                    Vue.set(this.dishes, this.currentItemIndex, item);
                }
            },
            updateItem(index, item) {
                this.currentItem = Object.assign({}, item);
                this.currentItemIndex = index;

                this.showUpdateItem = true;
            },
            getInformationFromLoggedUser() {
                this.user = this.$store.state.user;
            },
            isUserAWorker(user) {
                /* if (user.type === 'manager' && !user.blocked) {
                    this.showManagerOptions = true;
                }
                else {
                    let reason = user.blocked ? "your account is blocked" : "you don't have sufficient rights";
                    this.$toasted.show('You are not authorized to alter items because ' + reason,
                        {
                            icon: "error",
                            duration: 5000
                        }
                    ); */
                
            }
        },
        mounted() {
            this.getInformationFromLoggedUser();
            this.isUserAWorker(this.user);
            
        },
        components: {
            'create-item': CreateItem,
            'update-item': UpdateItem
        },
        computed: {
            showManagerOptions() {
                if (this.$store.state.user) {
                    return !this.$store.state.user.blocked && this.$store.state.user.type === 'manager';
                }

                return false;
            }
        }
    }
</script>

<style scoped>

</style>
