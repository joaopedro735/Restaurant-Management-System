<template>
    <v-dialog persistent v-model="show" @click.stop="close" max-width="600px">
        <v-card>
            <v-card-title class="headline blue darken-4 white--text">
                Add order to meal #{{ this.selectedMeal }}
            </v-card-title>

            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-select
                                    :items="items"
                                    item-text="name"
                                    item-value="id"
                                    v-model="selected"
                                    :menu-props="{ maxHeight: '400' }"
                                    label="Select Items"
                                    multiple
                                    hint="Items to add to this meal"
                                    persistent-hint
                            ></v-select>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.stop="close">Close</v-btn>
                <v-btn color="blue darken-1" flat @click.stop="addOrder">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "add-order",
        props: {
            visible: Boolean,
            selectedMeal: Number,
        },
        data() {
            return {
                items: [],
                selected: [],
            }
        },
        methods: {
            addOrder() {
                axios.post('/api/meals/addOrder/' + this.selectedMeal, { items: this.selected })
                    .then((response) => {
                        console.log(response.data);

                        this.$toasted.success(response.data.message);

                        /**
                         * TODO: Wait 5 seconds if waiter doesn't cancel
                         * If waiter doesn't cancel the order, update to confirmed
                         * If waiter cancels the order, delete order from database
                         */
                        
                        // Emit new order to cooks
                        let message = this.selected.length > 1 ? 'New orders to prepare!' : 'New order to prepare!';

                        this.$socket.emit('new_order', message, this.$store.state.user);

                        this.close();
                    })
                    .catch((error) => {
                        console.log(error);
                        this.$toasted.error("An error occurred, please try again later!");
                    })
            },
            getItems() {
                axios.get('/api/menu/')
                    .then((response) => {
                        console.log(response);
                        this.items = response.data.data;
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            },
            reset() {
                this.selected = [];
            },
            close() {
                this.reset();
                this.show = false;
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
            this.getItems();
        },
    }
</script>

<style scoped>

</style>
