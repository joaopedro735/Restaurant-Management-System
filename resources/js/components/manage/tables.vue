<template>
    <div>
        <v-card>
            <v-card-title class="headline info" primary-title>
                Tables
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
                        <td display-2><h3>{{ props.item.table_number }}</h3></td>
                        <td>{{ props.item.created_at }}</td>
                        <td>{{ props.item.updated_at }}</td>
                        <td>{{ props.item.deleted_at }}</td>
                        <td class="text-xs-right">
                                <span>
                                    <v-btn small round color="error" @click.native="deleteTable(items.index), props.expanded=!props.expanded">Delete</v-btn>
                                </span>
                            </td>
                    </tr>
                </template>
                <template slot="no-data">
                    <v-alert :value="true" color="info" icon="info">
                        No tables available
                    </v-alert>
                </template>
            </v-data-table>

            <create-table :visible="showCreateTable" @close="showCreateTable = false"></create-table>

        </v-card>
    </div>
</template>

<script>
    import CreateTable from './createTable'
    export default {
        data () {
            return {
                user: {},
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
                    { text: 'Table Number', value: 'table_number', align: 'left'},
                    { text: 'Created', value: 'created_at'},
                    { text: 'Updated at', value: 'updated_at'},
                    { text: 'Deleted at', value: 'deleted_at'},
                    { text: '' , value : 'actions' }
                ],
                showCreateTable: false
            }
        },
        watch: {
            pagination: {
                handler () {
                    this.getDataFromApi()
                        .then(data => {
                            this.tables = data.data.tables;
                            this.totalTables = data.data.totalTables;
                            console.log('Got here');
                            console.table(this.tables);
                        });
                },
                deep: true
            }
        },
        methods: {
            getDataFromApi () {
                this.loading = true;

                return axios.all([
                    axios.get('/api/tables', {
                        params: {
                            page: this.pagination.page, rowsPerPage: this.pagination.rowsPerPage
                        }
                    })
                ]).then(axios.spread((tablesRes) => {
                    this.loading = false;
                    return {
                        data: {
                            tables: tablesRes.data.data,
                            totalTables: tablesRes.data.meta.total
                        }
                    }
                }));
            },
            deleteTable(index) {
                // TODO: delete tables
            },
            getInformationFromLoggedUser() {
                this.user = this.$store.state.user;
            },
            isUserAWorker(user){
                if(user.type == "manager")
                {
                    this.showPage = true;
                    this.managerID = user.id;
                }
                else
                {
                    console.log('Not authorized to see this page! Managers only.');
                    this.$toasted.error('You are not authorized to see this page! Managers only.',
                    {
                        duration: 3000,
                        position: 'top-center',
                        className: 'toasted-css',
                        theme: 'toasted-primary',
                        icon: 'error_outline',
                        text : 'OK',
                        type: 'error',
                        onClick : (e, toastObject) => {
                            toastObject.goAway(0);
                        }
                    });

                    this.$router.push('/');
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
    }
</script>

<style scoped>
    .toasted-css {
        font-family: Arial, Helvetica, sans-serif;
    }
</style>