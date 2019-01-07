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
                                    prepend-icon="list"
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
                    @click.stop="addOrder">Save</v-btn>
                <v-btn small round flat @click.stop="close">Close</v-btn>
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
                orders: [],
                loading: false
            }
        },
        methods: {
            addOrder() {
                this.loading = true;

                axios.post('/api/meals/addOrder/' + this.selectedMeal, { items: this.selected })
                    .then((response) => {
                        this.orders = response.data.items;

                        this.$toasted.info('You have 5 seconds to cancel the order',
                        {
                            duration: 5000,
                            action: [
                                {
                                    text : 'Cancel',
                                    onClick : (e, toastObject) => {
                                        toastObject.goAway(0);
                                        this.cancelOrder();
                                    }
                                }
                            ],
                            onComplete: (() => {
                                // Confirm Order in DB
                                this.confirmOrder();
                            })
                        })
                        this.$emit('update');
                        this.$bus.$emit('update-pending');

                        this.close();
                    })
                    .catch((error) => {
                        console.log(error);
                        this.$toasted.error("An error occurred, please try again later!");
                    })
                    .finally(() => {
                            this.loading = false;
                    });
            },
            confirmOrder() {
                // Confirm order(s) in DB
                axios.patch('/api/orders/confirm/', { orders: this.orders })
                    .then((response) => {
                        this.notifyCooks(response.data.message);
                        this.$emit('update');
                        this.$bus.$emit('update-pending');
                    })
                    .catch((error) => {
                        console.log(error);
                        this.$toasted.error("An error occurred, please try again later!");
                    })
            },
            cancelOrder() {
                // Confirm order(s) in DB
                console.log(this.orders);

                let message = '';

                this.orders.forEach(order => {
                    axios.delete('/api/orders/delete/' + order)
                        .then((response) => {
                            message = response.data.message;
                            this.$bus.$emit('update-pending');
                        })
                        .catch((error) => {
                            console.log(error);
                            this.$toasted.error("An error occurred, please try again later!");
                        })
                });

                this.$toasted.info(this.orders.length > 1 ? 'Orders canceled' : 'Order canceled');

                /* axios.delete('/api/orders/delete/', { orders: this.orders })
                    .then((response) => {
                        this.$toasted.info('Order canceled');
                    })
                    .catch((error) => {
                        console.log(error);
                        this.$toasted.error('An error occurred, please try again later!');
                    }) */
            },
            notifyCooks(confirmationMessage) {
                this.$toasted.success(confirmationMessage,
                    {
                        icon: 'info'
                    }
                );

                let message = this.selected.length > 1 ? 'New orders to prepare!' : 'New order to prepare!';
                this.$socket.emit('new_order', message, this.$store.state.user);
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
                this.$emit('close');
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
        }
    }
</script>

<style scoped>

</style>
