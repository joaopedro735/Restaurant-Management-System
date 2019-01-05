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
                <v-btn small round color="info" @click.stop="addMeal">
                    ;Save
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
        validations: {},
        data() {
            return {
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
                this.$v.$reset();
                this.tableNumber = "";
            },
            addMeal() {
                axios.post('/api/meals/', {
                        table_number: this.tableNumber
                    })
                    .then(() => {
                        this.show = false;
                        this.$toasted.success("Meal created successfully",
                            {
                                position: "top-center",
                                duration: 3000,
                            });
                    })
                    .catch((error) => {
                        console.dir(error);
                        this.$toasted.error(error.response.data.message, {
                            icon: "error_outline"
                        });
                    })
            }
        },
        computed: {
            show: {
                get() {
                    return this.visible;
                },
                set(value) {
                    if (!value) {
                        this.$emit("close");
                    }
                }
            },
        },
        mounted() {
            this.getTables();
        },
    }
</script>

<style scoped>

</style>
