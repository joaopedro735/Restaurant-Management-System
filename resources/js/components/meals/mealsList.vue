<template>
    <div>
        <v-card>
            <v-card-title class="headline info white--text"
                          primary-title
            >
                Meals
                <v-spacer></v-spacer>
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
                    class="elevation-1"
            >
                <template slot="items" slot-scope="props">
                    <tr>
                        <td>{{ props.item.id}}</td>
                        <td>{{ props.item.table_number }}</td>
                        <td>{{ props.item.responsible_waiter }}</td>
                        <td>€{{ props.item.total_price_preview }}</td>
                        <td>{{ props.item.start }}</td>
                        <td>{{ props.item.state }}</td>
                        <td class="text-xs-right">
                            <span v-if="props.item.state === 'Active' && props.item.responsible_waiter === $store.state.user.name">
                                <v-btn small round color="success" @click.stop="addOrder(props.item.id)">Add order</v-btn>
                            </span>
                            <span v-if="props.item.state === 'Active' && props.item.responsible_waiter === $store.state.user.name">
                                <v-btn small round color="primary" @click.stop="mealInfo(props.item.id)">Meal Info</v-btn>
                            </span>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card>
        <add-meal :visible="showAddMeal" @close="showAddMeal = false"></add-meal>
        <add-order :visible="showAddOrder" :selectedMeal="selectedMeal" @close="showAddOrder = false"></add-order>
        <meal-info :visible="showMealInfo" :mealInfo="selectedMealInfo" @close="showMealInfo = false"></meal-info>
    </div>
</template>

<script>
    import AddMeal from './addMeal';
    import AddOrder from './addOrder';
    import MealInfo from './mealInfo';

    export default {
        name: "meal-list",
        data() {
            return {
                totalMeals: 0,
                meals: [],
                showAddMeal: false,
                showAddOrder: false,
                showMealInfo: false,
                selectedMeal: null,
                selectedMealInfo: {},
                table: {
                    rowsPerPageItems: [5, 10, 15, 25, 50],
                    loading: true,
                    pagination: {},
                    headers: [
                        {text: "Meal ID", value: "id", align: "left", sortable: false, width: "60px"},
                        {text: "Table Number", value: "table_number"},
                        {text: "Responsible Waiter", value: "waiter"},
                        {text: "Total Price", value: "price", width: "200px"},
                        {text: "Start date", value: "date"},
                        {text: "State", value: "state"},
                        {text: "", sortable: false},
                    ],
                },
            }
        },
        watch: {
            "table.pagination": {
                handler() {
                    this.getDataFromApi()
                        .then(data => {
                            console.log(data);
                            this.meals = data.data.meals;
                            this.totalMeals = data.data.totalMeals;
                        })
                },
                deep: true
            },
        },
        methods: {
            getDataFromApi() {
                this.table.loading = true;
                return axios.get('/api/meals/my/active', {
                    params: {
                        page: this.table.pagination.page,
                        rowsPerPage: this.table.pagination.rowsPerPage
                    }
                }).then((response) => {
                    return {
                        data: {
                            meals: response.data.data,
                            totalMeals: response.data.meta.total
                        }
                    }
                }).catch((error) => {
                    console.log(error);
                    this.$toasted.error("An error occurred, please try again later!");
                }).finally(() => {
                    this.table.loading = false;
                });
            },
            addOrder($mealID) {
                this.selectedMeal = $mealID;
                this.showAddOrder = true;
            },
            mealInfo($mealID) {
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
            }
        },
        components: {
            AddMeal,
            AddOrder,
            MealInfo
        },
    };
</script>

<style scoped>

</style>
