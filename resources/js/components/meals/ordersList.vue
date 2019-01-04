<template>
    <div>
        <v-card>
            <v-card-title class="headline info white--text"
                          primary-title
            >
                {{ cardTitle }}
                <v-spacer></v-spacer>
                <v-btn @click="switchType" color="primary" dark class="mb-2">{{ buttonTitle }}</v-btn>
            </v-card-title>

            <v-data-table
                    :headers="table.headers"
                    :items="orders"
                    :pagination.sync="table.pagination"
                    :total-items="totalOrders"
                    :loading="table.loading"
                    :rows-per-page-items="table.rowsPerPageItems"
                    class="elevation-1"
            >
                <template slot="items" slot-scope="props">
                    <tr :key="props.item.id"
                        :class="{
                                'pending': (props.item.state.toLowerCase() === 'pending')
                            }"
                    >
                        <td>{{ props.item.id}}</td>
                        <td>{{ props.item.item}}</td>
                        <td>{{ props.item.table_number }}</td>
                        <td>{{ props.item.responsible_cook || "No cook assigned"}}</td>
                        <td>€{{ props.item.price }}</td>
                        <td>{{ props.item.state }}</td>
                        <td class="text-xs-right">
                            <span v-if="props.item.state.toLowerCase() === 'prepared'">
                                <v-btn small round color="success"
                                       @click.stop="deliverOrder(props.item.id)">
                                    Deliver order
                                </v-btn>
                            </span>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "orders-List",
        data() {
            return {
                totalOrders: 0,
                orders: [],
                ordersType: 'pendingConfirmed',
                ordersURL: '/api/orders/my/active',
                table: {
                    rowsPerPageItems: [5, 10, 15, 25, 50],
                    loading: true,
                    pagination: {
                        'sortBy': 'state'
                    },
                    headers: [
                        {text: "Order ID", value: "id", align: "left", sortable: false, width: "60px"},
                        {text: "Item", value: "item"},
                        {text: "Table Number", value: "table_number"},
                        {text: "Responsible Cook", value: "waiter"},
                        {text: "Price", value: "price"},
                        {text: "State", value: "state"},
                        {text: "Actions", sortable: false},
                    ],
                },
            }
        },
        watch: {
            "table.pagination": {
                handler() {
                    this.updateData();
                },
                deep: true
            },
        },
        methods: {
            getDataFromApi() {
                this.table.loading = true;
                return axios.get(this.ordersURL, {
                    params: {
                        page: this.table.pagination.page,
                        rowsPerPage: this.table.pagination.rowsPerPage
                    }
                }).then((response) => {
                    return {
                        data: {
                            orders: response.data.data,
                            totalOrders: response.data.meta.total
                        }
                    }
                }).catch((error) => {
                    console.log(error);
                    this.$toasted.error("An error occurred, please try again later!");
                }).finally(() => {
                    this.table.loading = false;
                });
            },
            switchType() {
                if (this.ordersType === "pendingConfirmed") {
                    this.ordersType = "prepared";
                    this.ordersURL = '/api/orders/my/prepared';
                    this.updateData();

                } else {
                    this.ordersType = "pendingConfirmed";
                    this.ordersURL = '/api/orders/my/active';
                    this.updateData();
                }
            },
            updateData() {
                this.getDataFromApi()
                    .then(data => {
                        this.orders = data.data.orders;
                        this.totalOrders = data.data.totalOrders;
                    })
            },
            deliverOrder($orderID) {
                axios.patch('/api/orders/deliver/' + $orderID)
                    .then((response) => {
                        this.$toasted.success(response.data.message);
                        this.updateData();
                    })
                    .catch((error) => {
                        console.log(error);
                        this.$toasted.error("An error occurred, please try again later!");
                    });
            }
        },
        computed: {
            cardTitle() {
                return this.ordersType !== "prepared" ? 'Pending/Confirmed orders' : 'Prepared orders';
            },
            buttonTitle() {
                return this.ordersType === "prepared" ? 'Pending/Confirmed orders' : 'Prepared orders';
            }
        }
    }

</script>

<style scoped>
    .pending {
        background-color: #BBDEFB;
    }
</style>
