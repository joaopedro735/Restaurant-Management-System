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
                                        <h4>{{ props.item.price }}€</h4>
                                    </td>
                                    <td class="text-xs-right">
                                        <span>
                                            <v-btn small round color="primary" v-if="showManagerOptions" @click="updateItem(props.index, props.item), props.expanded=!props.expanded">
                                                <v-icon>edit</v-icon>
                                                Update
                                            </v-btn>
                                        </span>
                                        <span>
                                            <v-btn small round color="error" v-if="showManagerOptions" @click="deleteItem(props.index, props.item), props.expanded=!props.expanded">
                                                <v-icon>delete</v-icon>
                                                Delete
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
                                        <h4>{{ props.item.price }}€</h4>
                                    </td>
                                    <td class="text-xs-right">
                                        <span>
                                            <v-btn small round color="primary" slot="activator" v-if="showManagerOptions" @click="updateItem(props.index, props.item), props.expanded=!props.expanded">
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
        <create-item :visible="showCreateItem" @close="showCreateItem = false" @update="update"></create-item>
        <update-item :visible="showUpdateItem" @close="showUpdateItem = false" @update="update" :item="currentItem"></update-item>
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
                deletingItem: false,
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
                    this.getDrinkDataFromApi();
                },
                deep: true
            },
            paginationDishes: {
                handler() {
                    this.getDishDataFromApi();
                },
                deep: true
            }
        },
        methods: {
            getDrinkDataFromApi() {
                this.loadingDrinks = true;

                axios.get('/api/menu/drinks',
                    {
                        params: {
                            page: this.paginationDrinks.page, rowsPerPage: this.paginationDrinks.rowsPerPage
                        }
                    }
                )
                .then(response => {
                    this.loadingDrinks = false;

                    this.drinks = response.data.data;
                    this.totalDrinks = response.data.meta.total;
                });
            },
            getDishDataFromApi() {
                this.loadingDishes = true;

               axios.get('/api/menu/dishes',
                    {
                        params: {
                            page: this.paginationDishes.page, rowsPerPage: this.paginationDishes.rowsPerPage
                        }
                    }
                )
                .then(response => {
                    this.loadingDishes = false;

                    this.dishes = response.data.data;
                    this.totalDishes = response.data.meta.total;
                });
            },
            deleteItem(index, item) {
                this.deletingItem = true;

                this.item.id = item.id;

                axios.delete('/api/menu/' + this.item.id)
                    .then(response => {
                            if (item.type === 'drink') {
                                this.getDrinkDataFromApi();
                            }

                            if (item.type === 'dish') {
                                this.getDishDataFromApi();
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
                    })
                    .finally(() => {
                        this.deletingItem = false;
                    });
            },
            getImagePath(filename) {
                return '/storage/items/' + filename;
            },
            update() {
                this.getDrinkDataFromApi();
                this.getDishDataFromApi();
            },
            updateItem(index, item) {
                this.currentItem = Object.assign({}, item);

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
