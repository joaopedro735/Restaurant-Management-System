<template>
    <v-dialog persistent v-model="show" @click.stop="show = false" max-width="600px">
        <v-card>
            <v-card-title class="headline blue darken-4 white--text">
                New meal
            </v-card-title>

            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-select
                                    :items="tables"
                                    v-model="tableNumber"
                                    label="Table number"
                                    solo
                            ></v-select>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn small round color="primary"
                    :loading="loading"
                    :disabled="loading"
                    @click.stop="addMeal">
                        Save
                </v-btn>
                <v-btn small round @click.stop="show = false">
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "add-meal",
        props: {
            visible: Boolean,
        },
        data() {
            return {
                loading: false,
                tableNumber: null,
                tables: [],
            }
        },
        methods: {
            getTables() {
                axios.get('/api/tables/available')
                    .then((response) => {
                        this.tables = response.data.available.map(function (item) {
                            return item['table_number'];
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            clear() {
                this.tableNumber = "";
            },
            addMeal() {
                this.loading = true;

                axios.post('/api/meals/', {
                        table_number: this.tableNumber
                    })
                    .then(() => {
                        this.$toasted.success("Meal created successfully",
                            {
                                icon: 'info'
                            }
                        );
                        this.$emit('update');
                    })
                    .catch((error) => {
                        console.dir(error);
                        this.$toasted.error(error.response.data.message, {
                            icon: "error_outline"
                        });
                    })
                    .finally(() => {
                        this.loading = false;
                        this.close();
                    })
            },
            close() {
                this.clear();
                this.$emit('close');
            }
        },
        computed: {
            show: {
                get() {
                    if (this.visible) {
                        this.getTables();
                    }
                    return this.visible;
                },
                set(value) {
                    if (!value) {
                        this.$emit("close");
                    }
                }
            },
        },
    }
</script>

<style scoped>

</style>
