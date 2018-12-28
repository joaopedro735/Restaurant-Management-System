<template>
    <div>
        <v-card>
            <v-card-title class="headline info" primary-title>Tables
                <v-spacer></v-spacer>
                <v-btn slot="activator" round dark class="mb-2" @click="showCreateTable = true">Add table</v-btn>
            </v-card-title>
            <v-data-table
                :headers="headers"
                :items="tables"
                :pagination.sync="pagination"
                :rows-per-page-items="rowsPerPageItems"
                :total-items="totalTables"
                :loading="loading"
                class="elevation-1">
                <template slot="items" slot-scope="props">
                    <tr :key="props.item.table_number">
                        <td display-2>
                            <h3>{{ props.item.table_number }}</h3>
                        </td>
                        <td>{{ props.item.created_at }}</td>
                        <td>{{ props.item.updated_at }}</td>
                        <td>{{ props.item.deleted_at }}</td>
                        <td>{{ props.item.total_meals }}</td>
                        <td class="text-xs-right">
                            <span>
                                <v-btn small round color="error" @click.native="deleteTable(props.item.table_number, props.index)">
                                    Delete
                                </v-btn>
                            </span>
                        </td>
                    </tr>
                </template>
                    <template slot="no-data">
                        <v-alert :value="true" color="info" icon="info">No tables available</v-alert>
                    </template>
            </v-data-table>

            <create-table
                :visible="showCreateTable"
                @close="showCreateTable = false"
                @update="updateList"
            ></create-table>
        </v-card>
    </div>
</template>

<script>
    import CreateTable from './createTable';

    export default {
        data() {
            return {
                user: {},
                table: {
                    table_number: ''
                },
                managerID: '',
                showPage: false,
                totalTables: 0,
                tables: [],
                loading: true,
                pagination: {},
                rowsPerPageItems: [15, 25, 50, 100],
                pagination: {
                    rowsPerPage: 15
                },
                headers: [
                    { text: 'Table Number', value: 'table_number', align: 'left' },
                    { text: 'Created', value: 'created_at' },
                    { text: 'Updated at', value: 'updated_at' },
                    { text: 'Deleted at', value: 'deleted_at' },
                    { text: 'Total meals', value: 'total_meals' },
                    { text: '', value: 'actions' }
                ],
                showCreateTable: false
            };
        },
        watch: {
            pagination: {
                handler() {
                    if (this.user.type == 'manager') {
                    this.getDataFromApi().then(data => {
                        this.tables = data.data.tables;
                        this.totalTables = data.data.totalTables;
                    });
                    }
                },
                deep: true
            }
        },
        methods: {
            getDataFromApi() {
                if (this.user.type != 'manager') {
                    this.showPage = false;
                    return;
                }

                this.loading = true;

                var config = {
                    headers: {
                    Authorization: 'Bearer ' + this.$store.state.token,
                    Accept: 'application/json'
                    }
                };

                return axios.all([
                    axios.get('/api/tables', {
                        params: {
                            page: this.pagination.page, rowsPerPage: this.pagination.rowsPerPage
                        },
                        config
                    })
                ]).then(axios.spread(tablesRes => {
                        this.loading = false;

                        return {
                            data: {
                                tables: tablesRes.data.data,
                                totalTables: tablesRes.data.meta.total
                            }
                        };
                    })
                );
            },
            deleteTable(table_number, index) {                
                this.table.table_number = table_number;

                console.log('Entered delete function, with table number = ' + this.table.table_number);
                
                let config = {
                    headers: {
                    Authorization: 'Bearer ' + this.$store.state.token,
                    Accept: 'application/json'
                    }
                };

                axios.delete('/api/tables/' + this.table.table_number, config)
                    .then(response => {
                        this.totalTables--;

                        this.$toasted.success('Table deleted',
                            {

                                icon: 'info_outline',
                            }
                        );

                        this.tables.splice(index, 1);
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
            updateList(table) {
                this.totalTables++;

                if (this.tables.length < this.pagination.rowsPerPage) {
                    Vue.set(this.tables, this.tables.length, table);
                    this.tables.sort((a, b) => a.table_number - b.table_number);
                }
            },
            getInformationFromLoggedUser() {
                this.user = this.$store.state.user;
            },
            isUserAWorker(user) {
                if (user.type == 'manager') {
                    this.showPage = true;
                    this.managerID = user.id;
                } else {
                        this.$toasted.error('You are not authorized to see this page! Managers only.',
                        {
                            icon: 'error_outline',
                            onClick: (e, toastObject) => {
                            toastObject.goAway(0);
                            }
                        }
                        );

                        this.$router.go(-1);
                    }
                }
            },
        mounted() {
            this.getInformationFromLoggedUser();
            this.isUserAWorker(this.user);
        },
        components: {
            'create-table': CreateTable
        }
    };
</script>

<style scoped>
    .toasted-css {
        font-family: Arial, Helvetica, sans-serif;
    }
</style>