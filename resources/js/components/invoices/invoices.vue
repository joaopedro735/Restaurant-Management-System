<template>
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
                <td>{{ props.item.id}}</td>
                <td>{{ props.item.table_number }}</td>
                <td>{{ props.item.waiter }}</td>
                <td>{{ props.item.price }}</td>
                <td>{{ props.item.created_at }}</td>
            </template>
        </v-data-table>

    </v-card>
</template>

<script>
    export default {
        data() {
            return {
                totalInvoices: 0,
                invoices: [],
                table: {
                    rowsPerPageItems: [5, 10, 15, 25, 50],
                    loading: true,
                    pagination: {
                        "sortBy": "created_at"
                    },
                    headers: [
                        {text: "Invoice ID", value: "id", align: "left", sortable: false, width: "60px"},
                        {text: "Table Number", value: "table_number"},
                        {text: "Responsible Waiter", value: "waiter"},
                        {text: "Price", value: "price", width: "200px"},
                        {text: "Creation date", value: "created_at"},
                    ],
                },
            }
        },
        watch: {
            "table.pagination": {
                handler() {
                    this.getDataFromApi()
                        .then(data => {
                            this.invoices = data.data.invoices;
                            this.totalInvoices = data.data.totalInvoices;
                        })
                },
                deep: true
            }
        },
        methods: {
            getDataFromApi() {
                this.table.loading = true;
                return axios.get("/api/invoices", {
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
        },
    };
</script>

<style scoped>

</style>
