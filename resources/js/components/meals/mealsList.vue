<template>
    <div>
        <v-card>
            <v-card-title class="headline info white--text" primary-title>
                Meals
                <v-spacer></v-spacer>
                <v-btn big flat color="info"
                    :loading="loadingMealInfo"
                    :disabled="loadingMealInfo">
                </v-btn>
                <v-btn fab dark @click="showAddMeal = true" slot="activator" class="mb-2">
                    <v-icon>add</v-icon>
                </v-btn>
            </v-card-title>

            <v-data-table
                    :headers="table.headers"
                    :items="meals"
                    :pagination.sync="table.pagination"
                    :total-items="totalMeals"
                    :loading="table.loading"
                    :rows-per-page-items="table.rowsPerPageItems"
                    class="elevation-1">
                <template slot="items" slot-scope="props">
                    <tr>
                        <td>{{ props.item.id}}</td>
                        <td>{{ props.item.table_number }}</td>
                        <td>{{ props.item.responsible_waiter }}</td>
                        <td>{{ props.item.total_price_preview }}€</td>
                        <td>{{ props.item.start }}</td>
                        <td>{{ props.item.state }}</td>
                        <td class="text-xs-right">
                            <span v-if="props.item.state === 'Active' && props.item.responsible_waiter === $store.state.user.name">
                                <v-btn small round color="success" @click.stop="addOrder(props.item.id)">
                                    <v-icon>add</v-icon>
                                    &nbsp;Add order
                                </v-btn>
                                <v-btn small round color="primary"
                                    @click.stop="mealInfo(props.item.id)">
                                        <v-icon>info</v-icon>
                                        &nbsp;Meal Info
                                </v-btn>
                                <v-btn small round color="error"
                                    @click.stop="checkBeforeTerminateMeal(props.item.id)">
                                        <v-icon>check</v-icon>
                                        &nbsp;Terminate meal
                                </v-btn>
                            </span>
                            <!-- <span v-if="props.item.state === 'Active' && props.item.responsible_waiter === $store.state.user.name">
                                <v-btn small round color="primary"
                                    :loading="loadingMealInfo"
                                    :disabled="loadingMealInfo"
                                    @click.stop="mealInfo(props.item.id)">
                                        <v-icon>info</v-icon>
                                        &nbsp;Meal Info
                                </v-btn>
                            </span>
                            <span v-if="props.item.state === 'Active' && props.item.responsible_waiter === $store.state.user.name">
                                <v-btn small round color="error" @click.stop="checkBeforeTerminateMeal(props.item.id)">
                                    <v-icon>check</v-icon>
                                    &nbsp;Terminate meal
                                </v-btn>
                            </span> -->
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card>

        <add-meal
            :visible="showAddMeal"
            @update="updateLists"
            @close="showAddMeal = false">
        </add-meal>
        <add-order
            :visible="showAddOrder"
            :selectedMeal="selectedMeal"
            @close="showAddOrder = false"
            @update="updateLists">
        </add-order>
        <meal-info
            :visible="showMealInfo"
            :mealInfo="selectedMealInfo"
            @close="showMealInfo = false">
        </meal-info>
        <terminate-meal-modal
            :visible="showTerminateMealConfirmation"
            :numberOfOrders="numberOfOrdersPending"
            @close="showTerminateMealConfirmation = false"
            @continue="terminateMeal(selectedMeal)">
        </terminate-meal-modal>
    </div>
</template>

<script>
    import AddMeal from './addMeal';
    import AddOrder from './addOrder';
    import MealInfo from './mealInfo';
    import TerminateMealModal from './terminateMealModal';

    export default {
        name: 'meal-list',
        data() {
            return {
                totalMeals: 0,
                meals: [],
                showAddMeal: false,
                showAddOrder: false,
                showMealInfo: false,
                showTerminateMealConfirmation: false,
                selectedMeal: null,
                selectedMealInfo: {},
                numberOfOrdersPending: null,
                loadingMealInfo: false,
                table: {
                    rowsPerPageItems: [5, 10, 15, 25, 50],
                    loading: true,
                    pagination: {},
                    headers: [
                        {text: 'Meal ID', value: 'id', align: 'left', sortable: false, width: '60px'},
                        {text: 'Table Number', value: 'table_number', width: '60px'},
                        {text: 'Responsible Waiter', value: 'waiter'},
                        {text: 'Total Price', value: 'price', width: '200px'},
                        {text: 'Start date', value: 'date'},
                        {text: 'State', value: 'state'},
                        {text: '', sortable: false},
                    ],
                },
            }
        },
        watch: {
            'table.pagination': {
                handler() {
                    this.getDataFromApi();
                },
                deep: true
            }
        },
        methods: {
            getDataFromApi() {
                this.table.loading = true;
                axios.get('/api/meals/my/active', {
                    params: {
                        page: this.table.pagination.page,
                        rowsPerPage: this.table.pagination.rowsPerPage
                    }
                }).then((response) => {
                    {
                        this.meals = response.data.data;
                        this.totalMeals = response.data.meta.total;
                    }
                }).catch((error) => {
                    console.log(error);
                    this.$toasted.error('An error occurred, please try again later!');
                }).finally(() => {
                    this.table.loading = false;
                });
            },
            addOrder($mealID) {
                this.selectedMeal = $mealID;
                this.showAddOrder = true;
            },
            mealInfo($mealID) {
                this.loadingMealInfo = true;
                axios.get('/api/meals/' + $mealID)
                    .then((response) => {
                        this.selectedMealInfo = response.data.data;
                        /*let occ = this.selectedMealInfo.orders.reduce(function(occ, item) {
                            occ[item.item] = (occ[item.item] || 0) + 1;
                            return occ;
                        }, {});*/
                        this.showMealInfo = true;
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                    .finally(() => {
                        this.loadingMealInfo = false;
                    })
            },
            checkBeforeTerminateMeal($mealID) {
                axios.get('/api/meals/checkTerminate/' + $mealID)
                    .then((response) => {
                        if (response.data.pendingCount !== 0) {
                            this.numberOfOrdersPending = response.data.pendingCount;
                            this.selectedMeal = $mealID;
                            this.showTerminateMealConfirmation = true;
                        } else {
                            this.terminateMeal($mealID);
                        }
                    });
            },
            terminateMeal($mealID) {
                axios.patch('/api/meals/terminate/' + $mealID)
                    .then((response) => {
                        this.$toasted.show(response.data.message);
                        this.$socket.emit("meal_terminated");
                        this.getDataFromApi();
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            },
            updateLists() {
                this.getDataFromApi();
            }
        },
        components: {
            TerminateMealModal,
            AddMeal,
            AddOrder,
            MealInfo
        }
    };
</script>


