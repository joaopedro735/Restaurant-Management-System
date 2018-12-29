<template>
    <v-dialog persistent v-model="show" @click.stop="show = false" max-width="600px">
        <v-card>
            <v-card-title class="headline grey lighten-2">
                Close Invoice
            </v-card-title>

            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field model="name" label="Name" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field model="nif" label="NIF" required></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.stop="show = false">Close</v-btn>
                <v-btn color="blue darken-1" flat @click.stop="saveInvoice">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "close-invoice",
        props: {
            visible: Boolean,
            invoiceID: Number,
        },
        data() {
            return {
                name: "",
                nif: 0,
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
        }
    }
</script>

<style scoped>

</style>
