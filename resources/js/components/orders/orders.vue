<template>
    <div>
        <v-card>
            <v-card-title class="headline info" primary-title>
                Orders
                <v-spacer></v-spacer>
                <v-text-field @keypress.enter="filterOrders()" v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
            </v-card-title>
            <v-data-table
                    :headers="headers"
                    :items="orders"
                    :pagination.sync="pagination"
                    :rows-per-page-items="rowsPerPageItems"
                    :total-items="totalOrders"
                    :loading="loading"
                    item-key="created_at"
                    class="elevation-1">
                <template slot="items" slot-scope="props">
                    <tr :key="props.item.created_at"
                        :class="{
                                'in-prep': (props.item.responsible_cook_id == user.id & props.item.state == 'In preparation'),
                                'this-cook-conf': (props.item.responsible_cook_id == user.id & props.item.state == 'Confirmed'),
                                'no-cook': (props.item.responsible_cook_id === 0 & user.type == 'cook')
                            }"
                            @click="props.expanded = !props.expanded">
                        <td>
                            <!-- IN PREPARATION BY LOGGED COOK-->
                            <v-chip v-if="(props.item.responsible_cook_id == user.id && props.item.state == 'In preparation')" outline color="blue darken-1">
                                <v-avatar>
                                    <v-icon>timer</v-icon>
                                </v-avatar>
                                <strong>{{ props.item.state }}</strong>
                            </v-chip>

                            <!-- LOGGED COOK CONFIRMED -->
                            <v-chip v-if="(props.item.responsible_cook_id == user.id && props.item.state == 'Confirmed')" outline color="green darken-1">
                                <v-avatar>
                                    <v-icon>check_circle</v-icon>
                                </v-avatar>
                                <strong>{{ props.item.state }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>
                            </v-chip>

                            <!-- CONFIRMED WITH NO COOK -->
                            <v-chip v-if="(user.type === 'cook' & props.item.responsible_cook_id === 0)" outline color="black">
                                <v-avatar>
                                    <v-icon>check_circle</v-icon>
                                </v-avatar>
                                <strong>{{ props.item.state }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>
                            </v-chip>
                            <v-chip v-if="(user.type === 'manager' & props.item.responsible_cook_id === 0)" outline color="red darken-1">
                                <v-avatar>
                                    <v-icon>check_circle</v-icon>
                                </v-avatar>
                                <strong>{{ props.item.state }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>
                            </v-chip>

                            <!-- OTHER COOKS CONFIRMED -->
                            <v-chip v-if="(props.item.responsible_cook_id != user.id && props.item.responsible_cook_id != 0)" outline color="red darken-1">
                                <v-avatar>
                                    <v-icon>check_circle</v-icon>
                                </v-avatar>
                                <strong>{{ props.item.state }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>
                            </v-chip>
                        </td>
                        <td><strong>{{ props.item.responsible_cook != '' ?  props.item.responsible_cook : ''}}</strong></td>
                        <td>{{ props.item.created_at }}</td>
                        <td>{{ props.item.start }}</td>
                        <td>{{ props.item.updated_at }}</td>
                        <td>{{ props.item.id }}</td>
                        <td class="text-xs-right">
                            <span v-if="props.item.state == 'In preparation' & props.item.responsible_cook_id == user.id & user.type == 'cook'">
                                <v-btn small round color="success" @click.native="changeOrderState(props.index, props.item, 'prepared'), props.expanded=!props.expanded">Mark as prepared</v-btn>
                            </span>
                            <span v-if="props.item.responsible_cook_id == user.id & props.item.state == 'Confirmed' & user.type == 'cook'">
                                <v-btn small round color="info" @click.native="changeOrderState(props.index, props.item, 'in preparation'), props.expanded=!props.expanded">Prepare</v-btn>
                                <v-btn small round color="success" @click.native="changeOrderState(props.index, props.item, 'prepared'), props.expanded=!props.expanded">Mark as Prepared</v-btn>
                            </span>
                            <span v-if="props.item.responsible_cook_id == 0 & user.type == 'cook'">
                                <v-btn small round color="info" @click.native="changeOrderState(props.index, props.item, 'in preparation'), props.expanded=!props.expanded">Prepare</v-btn>
                                <v-btn small round color="success" @click.native="changeOrderState(props.index, props.item, 'prepared'), props.expanded=!props.expanded">Mark as prepared</v-btn>
                            </span>
                        </td>
                    </tr>
                </template>
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                    Your search for "{{ search }}" found no results.
                </v-alert>
                <template slot="footer">
                    <td :colspan="headers.length">
                        <strong>Click order for details</strong>
                    </td>
                </template>
                <template slot="no-data">
                    <v-alert :value="true" color="info" icon="info">
                        No orders available
                    </v-alert>
                </template>
                <template slot="expand" slot-scope="props">
                    <v-card flat>
                        <v-card-text>
                            Order details: <strong>{{ props.item.item}}</strong>
                        </v-card-text>
                    </v-card>
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script>
    export default  {
        data () {
            return {
                user: {},
                cookID: '',
                showPage: false,
                totalOrders: 0,
                orders: [],
                currentOrder: {},
                loading: true,
                pagination: {},
                search: '',
                rowsPerPageItems: [15, 25, 50, 100],
                headers: [
                    { text: 'Status', value: 'state', align: 'left', sortable: false},
                    { text: 'Cook', value: 'responsible_cook'},
                    { text: 'Ordered at', value: 'created_at'},
                    { text: 'Begin', value: 'start'},
                    { text: 'Last update', value: 'updated_at'},
                    { text: 'Order ID', value: 'id'},
                    { text: '' , value : 'actions' }
                ]
            }
        },
        watch: {
            pagination: {
                handler () {
                    this.getDataFromApi()
                        .then(data => {
                            this.orders = data.data.orders;
                            this.totalOrders = data.data.totalOrders;
                        })
                },
                deep: true
            }
        },
        methods: {
            getDataFromApi () {
                this.loading = true;

                var config = {
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.state.token,
                        'Accept': 'application/json'
                    }
                };

                return axios.get('/api/orders', {
                    params: {
                        page: this.pagination.page, rowsPerPage: this.pagination.rowsPerPage, cookID: this.cookID
                    }
                })
                    .then((ordersRes) => {
                    this.loading = false;
                    return {
                        data: {
                            orders: ordersRes.data.data,
                            totalOrders: ordersRes.data.meta.total
                        }
                    }
                });
            },
            filterOrders() {
                /* let search = this.search.trim().toLowerCase();

                if (search) {
                    this.orders = this.orders.filter(order => {
                        return Object.values(order)
                            .join(",")
                            .toLowerCase()
                            .includes(search);
                    });
                } */
                this.$toasted.success('TODO: Filter orders',
                    {
                        icon: "info_outline"
                    }
                );
            },
            changeOrderState: function (index, order, state) {
                console.clear();

                this.currentOrder = Object.assign({}, order);

                const orderToUpdate = this.currentOrder;

                console.log('[Checkpoint 1] Order ID: ' + orderToUpdate.id);
                console.log('               Responsible cook ID: ' + this.cookID);
                console.log('               Current state: ' + orderToUpdate.state);
                console.log('               New state: ' + state);

                // Order already has a cook
                if (order.responsible_cook_id != 0) {
                    /** Server needs : {
                     * order.id
                     * order
                     * new state
                     * } */

                    console.log('Order already had this cook');

                    axios.put('/api/orders/' + orderToUpdate.id + '?state=' + state)
                    .then(response => {
                        Vue.set(this.orders, index, response.data.data);

                        if (state == 'prepared') {
                            this.orders.splice(index, 1);
                            this.totalOrders--;
                        }

                        if (state == 'in preparation') {
                            var totalInPreparation = 0;

                            this.orders.forEach(order => {
                                if (order.state == 'In preparation') {
                                    totalInPreparation++;
                                }
                            });

                            if (totalInPreparation > 0 && totalInPreparation <= 15) {
                                totalInPreparation--;
                            }

                            console.log('Based on the for, new index should be: ' + totalInPreparation);

                            this.orders.splice(totalInPreparation, 0, response.data.data);
                            this.orders.splice((index + 1), 1);
                        }

                        this.$toasted.success('Order updated',
                            {
                                icon: 'info_outline',
                            }
                        );
                    })
                    .catch((error) => {
                        console.dir(error);
                    })
                }
                else { // Order doesn't have a cook
                    axios.put('/api/orders/' + orderToUpdate.id + '?state=' + state + '&responsible_cook_id=' + this.cookID)
                    .then(response => {
                        Vue.set(this.orders, index, response.data.data);

                        if (state == 'prepared') {
                            this.orders.splice(index, 1);
                        }

                        if (state == 'in preparation') {
                            console.log('Must sort in preparation orders');
                            console.log('Total size of array: ' + this.orders.length);

                            var totalInPreparation = 0;

                            this.orders.forEach(order => {
                                if (order.state == 'In preparation') {
                                    totalInPreparation++;
                                }
                            });

                            if (totalInPreparation > 0 && totalInPreparation <= 15) {
                                totalInPreparation--;
                            }

                            console.log('Based on the for, new index should be: ' + totalInPreparation);

                            this.orders.splice(totalInPreparation, 0, response.data.data);
                            this.orders.splice((index + 1), 1);
                        }

                        this.$toasted.success('Order updated',
                            {
                                icon: 'info_outline',
                            }
                        );
                    })
                    .catch((error) => {
                        console.dir(error);
                    })
                }
            },
            changeSort (column) {
                if (this.pagination.sortBy === column)
                {
                    this.pagination.descending = !this.pagination.descending
                }
                else
                {
                    this.pagination.sortBy = column
                    this.pagination.descending = false
                }
            },
            getInformationFromLoggedUser() {
                this.user = this.$store.state.user;
            },
            isUserAWorker(user){
                if(user.type == 'cook' || user.type == 'manager')
                {
                    this.showPage = true;
                    this.cookID = user.id;
                    console.log('Cook ID: ' + this.cookID);
                }
                else
                {
                    console.log('Not authorized to see this page!');
                    this.$toasted.error('You are not authorized to see this page',
                        {
                            icon: "error_outline",
                        }
                    );
                    this.$router.push('/');
                }
            }
        },
        mounted() {
            this.getInformationFromLoggedUser();
            this.isUserAWorker(this.user);
        }
    }
</script>

<style scoped>
    .in-prep {
        background-color: #BBDEFB;
    }
    .this-cook-conf {
        background-color: #C8E6C9;
    }
    .other-cook-conf {
        background-color: #FFCDD2;
    }
    .no-cook {
        background-color: #FFECB3;
    }
    .toasted-css {
        font-family: Arial, Helvetica, sans-serif;
    }
</style>
