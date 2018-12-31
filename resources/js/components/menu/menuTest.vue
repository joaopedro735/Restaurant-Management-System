<template>
    <div>
        <v-card>
            <v-card-title class="headline info" primary-title>Menu
                <v-spacer v-if="showManagerOptions"></v-spacer>
                <v-btn v-if="showManagerOptions" slot="activator" round dark class="mb-2" @click="showCreateItem = true">Add item</v-btn>
            </v-card-title>

            <v-container fluid grid-list-md text-xs-center>
                <v-layout row>
                    <v-flex xs6>
                        <v-card class="px-0">
                            <v-card-title class="headline info" primary-title>
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
                                                <img :src="props.item.photo_url">
                                            </v-list-tile-avatar>
                                        </td>
                                        <td display-2 align="left">
                                            {{ props.item.name }}
                                        </td>
                                        <td>{{ props.item.description.length > 60 ? props.item.description.substr(0, 60) + ('...') : props.item.description }}</td>
                                        <td><h4>{{ props.item.price }}</h4></td>
                                        <td class="text-xs-right"  v-if="showManagerOptions">
                                            <span>
                                                <v-btn small round color="info" @click="updateItem(props.index, props.item), props.expanded=!props.expanded">Update</v-btn>
                                            </span>
                                            <span>
                                                <v-btn small round color="error" @click="deleteItem(props.index, props.item), props.expanded=!props.expanded">Delete</v-btn>
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
                            </v-data-table>
                        </v-card>
                    </v-flex>
                    <v-flex xs6>
                        <v-card class="px-0">
                            <v-card-title class="headline info" primary-title>
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
                                                <img :src="props.item.photo_url">
                                            </v-list-tile-avatar>
                                        </td>
                                        <td display-2 align="left">
                                            {{ props.item.name }}
                                        </td>
                                        <td>{{ props.item.description.length > 60 ? props.item.description.substr(0, 60) + ('...') : props.item.description }}</td>
                                        <td><h4>{{ props.item.price }}</h4></td>
                                        <td class="text-xs-right"  v-if="showManagerOptions">
                                            <span>
                                                <v-btn small round color="info" slot="activator" @click="updateItem(props.index, props.item), props.expanded=!props.expanded">Update</v-btn>
                                            </span>
                                            <span>
                                                <v-btn small round color="error" @click="deleteItem(props.index, props.item)">Delete</v-btn>
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
                            </v-data-table>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
            <create-item :visible="showCreateItem" @close="showCreateItem = false" @update="updateList"></create-item>  
            <update-item :visible="showUpdateItem" @close="showUpdateItem = false" @update="updateList" :item="currentItem"></update-item>
        </v-card>
    </div>
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
                    { text: 'Price', value: 'price' },
                    { text: '', value: 'actions'}
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

                                    icon: 'info_outline',
                                }
                            );
                        }
                    )
                    .catch(error => {
                        this.$toasted.error(error,
                            {
                                icon: 'error_outline',
                            }
                        );
                    });
            },
            updateList(item) {
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
            updateItem(index, item) {
                //this.currentItem = Object.assign({}, item);
                //this.currentItemIndex = index;

                //console.log('Entered update method\nindex: ' + index + '\nitem name: ' + this.currentItem.name)
                this.showUpdateItem = true;
            },
            saveItem(item) {

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

            this.currentItem.name = '';
            this.currentItem.type = '';
            this.currentItem.description = '';
            this.currentItem.photo_url = '';
            this.currentItem.price = '';
        },
        components: {
            'create-item': CreateItem,
            'update-item': UpdateItem
        }
    }
</script>

<style scoped>
    .isExpanded {
        background-color: #C8E6C9;
    }
</style>