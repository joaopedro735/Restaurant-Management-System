<template>
    <div>
        <div class="text-xs-center pt-2 ">
            <v-btn color="primary" :disabled="isTypeAll" @click="table.pagination.invoicesType = 'all'">
                All Invoices
            </v-btn>
            <v-btn color="primary" :disabled="!isTypeAll" @click="table.pagination.invoicesType = 'pending'">
                Pending Invoices
            </v-btn>
        </div>

        <v-card>
            <v-card-title class="headline info white--text"
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
                        <td>{{ props.item.date }}</td>
                        <td>{{ props.item.state }}</td>
                        <td class="text-xs-right">
                            <!--<v-icon-->
                                    <!--@click="seeInvoice(props.item.id)"-->
                            <!--&gt;-->
                                <!--info-->
                            <!--</v-icon>-->
                            <span v-if="props.item.state === 'pending'">
                                <v-btn small round color="success" @click.stop="closeInvoice(props.item.id)">Close invoice</v-btn>
                            </span>
                            <span v-if="props.item.state === 'paid'">
                                <v-btn small round color="success" @click.stop="downloadInvoice(props.item.id)"><v-icon>cloud_download</v-icon> &nbsp; Download invoice</v-btn>
                            </span>
                        </td>
                    </tr>
                </template>
                <template slot="footer">
                    <td :colspan="table.headers.length">
                        <strong>Click on a invoice for more details</strong>
                    </td>
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

        <invoices-info
            :visible="showInvoiceInfoModal"
            :invoiceInfo="selectedInvoice"
            @close="showInvoiceInfoModal = false">
        </invoices-info>
        <close-invoice
            :visible="showCloseInvoiceModal"
            :invoiceID="selectedInvoiceID"
            @close="showCloseInvoiceModal = false"
            @update="updateList">
        </close-invoice>
    </div>
</template>

<script>
    import InvoicesInfo from './invoicesInfo';
    import CloseInvoice from './closeInvoice';

    export default {
        data() {
            return {
                totalInvoices: 0,
                invoices: [],
                invoicesUrl: "api/invoices/",
                selectedInvoiceID: null,
                selectedInvoice: {},
                dialog: false,
                showInvoiceInfoModal: false,
                showCloseInvoiceModal: false,
                table: {
                    rowsPerPageItems: [5, 10, 15, 25, 50],
                    loading: true,
                    pagination: {
                        "sortBy": "date",
                        invoicesType: "pending",
                    },
                    headers: [
                        {text: "Invoice ID", value: "id", align: "left", sortable: false, width: "60px"},
                        {text: "Table Number", value: "table_number"},
                        {text: "Responsible Waiter", value: "waiter"},
                        {text: "Price", value: "price", width: "200px"},
                        {text: "Date", value: "date"},
                        {text: "State", value: "state"},
                        {text: "", sortable: false},
                    ],
                },
            }
        },
        watch: {
            "table.pagination": {
                handler() {
                    if (this.table.pagination.invoicesType === "all") {
                        this.invoicesUrl = "/api/invoices";
                    } else {
                        this.invoicesUrl = "/api/invoices/pending";
                    }
                    this.getDataFromApi();
                },
                deep: true
            },
        },
        methods: {
            getDataFromApi() {
                this.table.loading = true;

                axios.get(this.invoicesUrl, {
                        params: {
                            page: this.table.pagination.page,
                            rowsPerPage: this.table.pagination.rowsPerPage
                        }
                    })
                    .then(response => {
                        this.invoices = response.data.data;
                        this.totalInvoices = response.data.meta.total;
                    })
                    .catch(error => {
                        console.log(error);
                        this.$toasted.error("An error occurred, please try again later!");
                    })
                    .finally(() => {
                        this.table.loading = false;
                    });
            },
            seeInvoice($id) {
                /*this.selectedInvoiceID = $id;*/
                this.dialog = true;
                axios.get('/api/invoices/' + $id)
                    .then((response) => {
                        this.selectedInvoice = response.data.data;
                        this.showInvoiceInfoModal = true;
                    })
                    .catch((error) => {
                        console.log(error);
                        this.$toasted.error("Some error occurred", {duration: 5000});
                    })
                    .finally(() => {
                        this.dialog = false;
                    });
            },
            closeInvoice($id) {
                this.selectedInvoiceID = $id;
                this.showCloseInvoiceModal = true;
                this.getDataFromApi();
            },
            downloadInvoice($id) {
                axios.get('/api/invoices/download/' + $id, { responseType: 'blob'})
                    .then((response) => {
                        const url = window.URL.createObjectURL(new Blob([response.data]));
                        var tempLink = document.createElement('a');
                        tempLink.style.display = 'none';
                        tempLink.href = url;
                        tempLink.setAttribute('download', "Invoice" + $id + ".pdf");
                        document.body.appendChild(tempLink);
                        tempLink.click();
                        document.body.removeChild(tempLink);
                        window.URL.revokeObjectURL(blobURL);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            },
            updateList() {
                this.getDataFromApi();
            }
        },
        computed: {
            isTypeAll: {
                get() {
                    return this.table.pagination.invoicesType === "all";
                },
            },

        },
        components: {
            CloseInvoice,
            "invoices-info": InvoicesInfo
        },
        sockets: {
            new_invoice() {
                this.getDataFromApi();
            }
        }
    }
</script>

<style scoped>

</style>
