<template>
    <div>
        <v-card>
            <v-card-title class="headline light-blue lighten-3" primary-title>Orders</v-card-title>
            <v-data-table
                    :headers="headers"
                    :items="orders"
                    :pagination.sync="pagination"
                    :total-items="totalOrders"
                    :loading="loading"
                    item-key="created_at"
                    class="elevation-1">
                <template slot="items" slot-scope="props">
                    <tr @click="props.expanded = !props.expanded">
                        <td>{{ props.item.state }}</td>
                        <td>{{ props.item.responsable_cook }}</td>
                        <td>{{ props.item.created_at }}</td>
                        <td>{{ props.item.start }}</td>
                        <td>{{ props.item.end }}</td>
                    </tr>
                </template>
                <template slot="no-data">
                    <v-alert :value="true" color="error" icon="warning">
                        No orders available
                    </v-alert>
                </template>
                <template slot="expand" slot-scope="props">
                    <v-card flat>
                        <v-card-text>Last update: {{ props.item.updated_at }}</v-card-text>
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
                totalOrders: 0,
                orders: [],
                loading: true,
                pagination: {
                    sortBy: 'responsable_cook'
                },
                headers: [
                    { text: 'Status', value: 'state'},
                    { text: 'Cook', value: 'responsable_cook'},
                    { text: 'Ordered at', value: 'created_at'},
                    { text: 'Begin', value: 'start'},
                    { text: 'End', value: 'end'},
                    //{ text: 'Atualizado', value: 'updated_at'}
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
                return axios.all([
                    axios.get('/api/orders', {
                        params: {
                            page: this.pagination.page, rowsPerPage: this.pagination.rowsPerPage, cook_id: 38
                        }
                    }),
                    axios.get('/api/orders', {
                        params: {
                            nmr: 0
                        }
                    })
                ]).then(axios.spread((ordersRes, nmrRes) => {
                    this.loading = false;
                    return {
                        data: {
                            orders: ordersRes.data.data,
                            totalOrders: nmrRes.data
                        }
                    }
                }));
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
            }
        }
    }
</script>

<style scoped>

</style>