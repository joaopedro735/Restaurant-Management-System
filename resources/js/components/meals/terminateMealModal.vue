<template>
    <v-dialog persistent v-model="show" @click.stop="show = false" max-width="600px">
        <v-card>
            <v-card-title class="headline">Meal has orders not delivered</v-card-title>
            <v-card-text>This meal still has
                <span class="font-weight-bold">{{ numberOfOrders }} orders</span> that were not delivered.
                <p>Are you sure you want to terminate this meal?</p>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click="show = false">Cancel</v-btn>
                <v-btn color="error" flat @click="accept">Continue</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "terminate-meal-modal",
        props: {
            visible: Boolean,
            numberOfOrders: Number
        },
        methods: {
            accept() {
                this.$emit("continue");
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
            }
        }
    };
</script>

