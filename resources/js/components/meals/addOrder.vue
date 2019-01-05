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
                saveOrder: false
            }
        },
        methods: {
            addOrder() {
                axios.post('/api/meals/addOrder/' + this.selectedMeal, { items: this.selected })
                    .then((response) => {
                        console.log(response.data);
                        
                        // TODO: Need order id/object to update it's state
                        
                        //this.$toasted.success(response.data.message);
                        console.log("here");

                        this.$toasted.info('5 seconds to confirm order',
                        {
                            icon: 'info',
                            duration: 5000,
                            action : [
                                {
                                    text : 'Cancel',
                                    onClick : (e, toastObject) => {
                                        toastObject.goAway(0);
                                        console.log('Cancel order(s)');
                                    }
                                }
                            ],
                            onComplete() {
                                console.log('Confirm order(s)');
                            }
                        },
                    );

                    })
                    .catch((error) => {
                        console.log(error);
                        this.$toasted.error("An error occurred, please try again later!");
                    })
            },
            changeOrderStateToConfirmed() {
                this.$toasted.info("Order confirmed");   
                
                // Emit new order to cooks
                let message = this.selected.length > 1 ? 'New orders to prepare!' : 'New order to prepare!';

                this.$socket.emit('new_order', message, this.$store.state.user);

                this.close();
            },
            deleteOrder() {
                this.$toasted.show("Order must be deleted!");
                
                this.close();
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
        }
    }
</script>

<style scoped>

</style>
