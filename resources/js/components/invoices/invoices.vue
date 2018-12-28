<template>
    <div>
        <div class="text-xs-center pt-2 ">
            <v-btn color="primary" :disabled="checkType" @click="table.pagination.invoicesType = 'all'">All Invoices
            </v-btn>
            <v-btn color="primary" :disabled="!checkType" @click="table.pagination.invoicesType = 'pending'">Pending
                Invoices
            </v-btn>
        </div>

        <v-dialog v-model="dialog" width="600px">
            <v-card>
                <v-card-title class="headline grey lighten-2">
                    {{ invoiceTitle }}
                    <v-spacer></v-spacer>
                    {{ selectedInvoice.created_at}}
                </v-card-title>


                <v-list two-line>
                    <v-list-tile @click="">
                        <v-list-tile-action>
                            <v-icon color="indigo">person</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ selectedInvoice.waiter }}</v-list-tile-title>
                            <v-list-tile-sub-title>Responsible Waiter</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile>
                        <v-list-tile-action>
                            <v-icon color="indigo">place</v-icon>
                        </v-list-tile-action>

                        <v-list-tile-content>
                            <v-list-tile-title>{{ selectedInvoice.table_number }}</v-list-tile-title>
                            <v-list-tile-sub-title>Table number</v-list-tile-sub-title>
                        </v-list-tile-content>

                    </v-list-tile>

                    <v-list-tile>
                        <v-list-tile-action>
                            <v-icon color="indigo">euro_symbol</v-icon>
                        </v-list-tile-action>

                        <v-list-tile-content>
                            <v-list-tile-title>{{ selectedInvoice.price }}</v-list-tile-title>
                            <v-list-tile-sub-title>Price</v-list-tile-sub-title>
                        </v-list-tile-content>

                    </v-list-tile>

                    <v-divider></v-divider>

                    <v-list-group
                            v-for="(item, i) in selectedInvoice.items"
                            :key="i"
                            no-action
                    >
                        <v-list-tile slot="activator">
                            <v-list-tile-content>
                                <v-list-tile-title>{{i | capitalize}}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>

                        <v-list-tile
                                v-for="subItem in item"
                                :key="subItem.title"
                                @click=""
                        >
                            <v-list-tile-content>
                                <v-list-tile-title>{{ subItem.name }}</v-list-tile-title>
                                <v-list-tile-sub-title>{{subItem.quantity}} x {{subItem.unit_price}}€</v-list-tile-sub-title>
                            </v-list-tile-content>

                            <v-list-tile-action>
                                <v-list-tile-sub-title>{{ subItem.sub_total_price }}€</v-list-tile-sub-title>
                            </v-list-tile-action>

                        </v-list-tile>
                    </v-list-group>
                </v-list>
            </v-card>
        </v-dialog>

        <v-card>
            <v-card-title class="headline light-blue lighten-3"
                          primary-title
            >Invoices
            </v-card-title>

            <v-data-table
                    :headers="table.headers"
                    :items="invoices"
                    :pagination.sync="table.pagination"
                    :total-items="totalInvoices"
                    :loading="table.loading"
                    :rows-per-page-items="table.rowsPerPageItems"
                    class="elevation-1"
            >
                <template slot="items" slot-scope="props">
                    <tr @click="seeInvoice(props.item.id)">
                        <td>{{ props.item.id}}</td>
                        <td>{{ props.item.table_number }}</td>
                        <td>{{ props.item.waiter }}</td>
                        <td>{{ props.item.price }}</td>
                        <td>{{ props.item.created_at }}</td>
                        <td>
                            <v-icon
                                    @click="seeInvoice(props.id)"
                            >
                                info
                            </v-icon>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                totalInvoices: 0,
                invoices: [],
                invoicesUrl: "api/invoices/",
                selectedInvoiceID: "",
                selectedInvoice: "",
                dialog: false,
                table: {
                    rowsPerPageItems: [5, 10, 15, 25, 50],
                    loading: true,
                    pagination: {
                        "sortBy": "created_at",
                        invoicesType: "pending",
                    },
                    headers: [
                        {text: "Invoice ID", value: "id", align: "left", sortable: false, width: "60px"},
                        {text: "Table Number", value: "table_number"},
                        {text: "Responsible Waiter", value: "waiter"},
                        {text: "Price", value: "price", width: "200px"},
                        {text: "Creation date", value: "created_at"},
                        {text: "Actions", sortable: false},
                    ],
                },
            }
        },
        watch: {
            "table.pagination": {
                handler() {
                    if (this.table.pagination.invoicesType === "all") {
                        this.invoicesUrl = "/api/invoices"
                    } else {
                        this.invoicesUrl = "/api/invoices/pending"
                    }
                    this.getDataFromApi()
                        .then(data => {
                            this.invoices = data.data.invoices;
                            this.totalInvoices = data.data.totalInvoices;
                        })
                },
                deep: true
            },
        },
        methods: {
            getDataFromApi() {
                this.table.loading = true;
                return axios.get(this.invoicesUrl, {
                    params: {
                        page: this.table.pagination.page,
                        rowsPerPage: this.table.pagination.rowsPerPage
                    }
                }).then((response) => {
                    return {
                        data: {
                            invoices: response.data.data,
                            totalInvoices: response.data.meta.total
                        }
                    }
                }).catch((error) => {
                    console.log(error);
                    this.$toasted.error("An error occurred, please try again later!");
                }).finally(() => {
                    this.table.loading = false;
                });
            },
            seeInvoice($id) {
                this.selectedInvoiceID = $id;
                axios.get('/api/invoices/' + $id)
                    .then((response) => {
                        this.selectedInvoice = response.data.data;
                        this.dialog = true;
                    });
            },
        },
        computed: {
            checkType: {
                get() {
                    return this.table.pagination.invoicesType === "all";
                },
            },
            invoiceTitle() {
                return "Invoice ID: " + this.selectedInvoiceID;
            },
        }
    };
</script>

<style scoped>

</style>
