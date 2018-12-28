<template>
    <div>
        <div class="text-xs-center pt-2 ">
            <v-btn color="primary" :disabled="isTypeAll" @click="table.pagination.invoicesType = 'all'">All Invoices
            </v-btn>
            <v-btn color="primary" :disabled="!isTypeAll" @click="table.pagination.invoicesType = 'pending'">Pending
                Invoices
            </v-btn>
        </div>

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
                                    @click="seeInvoice(props.item.id)"
                            >
                                info
                            </v-icon>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card>

        <v-dialog
                v-model="dialog"
                hide-overlay
                persistent
                width="300"
        >
            <v-card
                    color="primary"
                    dark
            >
                <v-card-text>
                    Please stand by
                    <v-progress-linear
                            indeterminate
                            color="white"
                            class="mb-0"
                    ></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>

        <invoices-info :visible="showModal" :invoiceInfo="selectedInvoice" @close="showModal = false"></invoices-info>
    </div>
</template>

<script>
    import InvoicesInfo from './invoicesInfo';

    export default {
        data() {
            return {
                totalInvoices: 0,
                invoices: [],
                invoicesUrl: "api/invoices/",
                selectedInvoiceID: "",
                selectedInvoice: {},
                dialog: false,
                showModal: false,
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
                /*this.selectedInvoiceID = $id;*/
                this.dialog = true;
                axios.get('/api/invoices/' + $id)
                    .then((response) => {
                        this.dialog = false;
                        this.selectedInvoice = response.data.data;
                        this.showModal = true;
                    });
            },
        },
        computed: {
            isTypeAll: {
                get() {
                    return this.table.pagination.invoicesType === "all";
                },
            },

        },
        components: {
            'invoices-info': InvoicesInfo
        }
    };
</script>

<style scoped>

</style>
