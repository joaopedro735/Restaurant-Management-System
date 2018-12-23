<template>
    <div>
        <v-card>
            <v-card-title class="headline light-blue lighten-3" primary-title>Orders</v-card-title>
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
                                'other-cook-conf': props.item.responsible_cook_id != user.id,
                                'no-cook': props.item.responsible_cook == 'No cook assigned'
                            }"
                            @click="props.expanded = !props.expanded">
                        <td>
                            <v-chip v-if="props.item.state == 'Confirmed'" outline color="primary">&nbsp;&nbsp;{{ props.item.state }}&nbsp;&nbsp;&nbsp;</v-chip>
                            <v-chip v-if="props.item.state == 'In preparation'" outline color="primary">{{ props.item.state }}</v-chip>
                        </td>
                        <td><strong>{{ props.item.responsible_cook }}</strong></td>
                        <td>{{ props.item.created_at }}</td>
                        <td>{{ props.item.start }}</td>
                        <td>{{ props.item.updated_at }}</td>
                        <td>{{ props.item.id }}</td>
                        <td class="text-xs-right">
                            <span v-if="props.item.state == 'In preparation' & props.item.responsible_cook_id == user.id">
                                <v-btn small color="success" @click.native="changeOrderState(props.index, props.item, 'prepared'), props.expanded=!props.expanded">Mark as prepared</v-btn>
                            </span>
                            <span v-if="props.item.responsible_cook_id == user.id & props.item.state == 'Confirmed'">
                                <v-btn small color="info" @click.native="changeOrderState(props.index, props.item, 'in preparation'), props.expanded=!props.expanded">Prepare</v-btn>
                                <v-btn small color="success" @click.native="changeOrderState(props.index, props.item, 'prepared'), props.expanded=!props.expanded">Mark as Prepared</v-btn>
                            </span>
                            <span v-if="props.item.responsible_cook == 'No cook assigned'">
                                <v-btn small color="info" @click.native="changeOrderState(props.index, props.item, 'in preparation'), props.expanded=!props.expanded">Prepare</v-btn>
                                <v-btn small color="success" @click.native="changeOrderState(props.index, props.item, 'prepared'), props.expanded=!props.expanded">Mark as prepared</v-btn>
                            </span>
                        </td>
                    </tr>
                </template>
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
                            Order details: {{ props.item.item}}
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
                rowsPerPageItems: [15, 25, 50, 100],
                pagination: {
                    rowsPerPage: 15
                },
                headers: [
                    { text: 'Status', align: 'left', sortable: false, value: 'state'},
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
                            //console.table(this.orders);
                        })
                },
                deep: true
            }
        },
        methods: {
            getDataFromApi () {
                this.loading = true;
                //console.log('Cook ID: ' + this.user.id);
                return axios.all([
                    axios.get('/api/orders', {
                        params: {
                            page: this.pagination.page, rowsPerPage: this.pagination.rowsPerPage, cookID: this.cookID
                        }
                    })/* ,
                    axios.get('/api/orders', {
                        params: {
                            nmr: 0,
                            cookID: this.cookID
                        }
                    }) */
                ]).then(axios.spread((ordersRes, nmrRes) => {
                    this.loading = false;
                    return {
                        data: {
                            orders: ordersRes.data.data,
                            totalOrders: ordersRes.data.meta.total
                        }
                    }
                }));
            },
            /* getOrderDataFromApi (id) {
                this.order[0].name = 'Please wait';
                this.loading = true;
                axios.get('/api/order', {
                    params: {
                        orderID: id
                    }
                }).then(response => {
                    this.loading = false;
                    this.order = response.data
                    
                    console.log(this.order);
                });
            }, */
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
                        console.log(response.data.data);
                        Vue.set(this.orders, index, response.data.data);

                        if (state == 'prepared') {
                            this.orders.splice(index, 1);
                            this.totalOrders--;
                        }

                        this.$toasted.success('Order updated',
                        {
                            position: "top-center",
                            duration: 3000,
                            icon: "error_outline"
                        });                    
                    })
                    .catch((error) => {
                        console.dir(error);
                    })
                }
                else { // Order doesn't have a cook
                    /** Server needs : {
                     * order.id
                     * cook.id
                     * order
                     * order.state
                     * } */ 

                    console.log('Order had no cook');

                    axios.put('/api/orders/' + orderToUpdate.id + '?state=' + state + '&responsible_cook_id=' + this.cookID)
                    .then(response => {
                        Vue.set(this.orders, index, response.data.data);

                        if (state == 'prepared') {
                            this.orders.splice(index, 1);
                        }

                        this.$toasted.success('Order updated',
                        {
                            position: "top-center",
                            duration: 3000,
                            icon: "error_outline"
                        });                    
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
                //console.log(user);
                
                if(user.type == "cook")
                {
                    this.showPage = true;
                    this.cookID = user.id;
                }
                else
                {
                    console.log('Not authorized to see this page!');
                    this.$toasted.error('You are not authorized to see this page',
                        {
                            position: "top-center",
                            duration: 3000,
                            icon: "error_outline"
                        });
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
</style>