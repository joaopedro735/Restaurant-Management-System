<template>
    <v-dialog persistent v-model="show" @click.stop="show = false" max-width="600px">
        <v-card>
            <v-card-title class="headline blue darken-4 white--text">Close Invoice</v-card-title>

            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field
                                v-model="client.name"
                                label="Name"
                                :error-messages="nameErrors"
                                @input="$v.client.name.$touch()"
                                @blur="$v.client.name.$touch()"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                v-model="client.nif"
                                label="NIF"
                                type="number"
                                :error-messages="nifErrors"
                                @input="$v.client.nif.$touch()"
                                @blur="$v.client.nif.$touch()"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn small round color="primary"
                    :loading="loading"
                    :disabled="loading"
                    @click.stop="saveInvoice">
                        Save
                </v-btn>
                <v-btn small round
                :disabled="loading"
                    @click.stop="show = false">
                        Cancel
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import {helpers, maxLength, minLength, required} from "vuelidate/lib/validators";

    const alpha = helpers.regex("alpha", /^[A-Za-z ]+$/);
    export default {
        name: "close-invoice",
        props: {
            visible: Boolean,
            invoiceID: Number
        },
        validations: {
            client: {
                name: {
                    required,
                    alpha
                },
                nif: {
                    required,
                    minLength: minLength(9),
                    maxLength: maxLength(9)
                }
            }
        },
        data() {
            return {
                client: {
                    name: '',
                    nif: null,
                },
                loading: false
            }
        },
        methods: {
            saveInvoice() {
                this.loading = true;

                this.$v.$touch();
                if (!this.$v.$invalid) {
                    axios.patch('/api/invoices/close/' + this.invoiceID, this.client)
                        .then(() => {
                            this.$emit('update');

                            this.$toasted.success("Invoice closed successfully",
                                {
                                    icon: 'info'
                                }
                            );

                            this.show = false;
                        })
                        .catch(error => {
                            this.$toasted.error(error.response.data.message,
                                {
                                    icon: 'error'
                                }
                            );

                            this.show = false;
                        })
                        .finally(() => {
                            this.loading = false;
                        });
                }
            },
            clear() {
                this.$v.$reset();
                this.client.name = "";
                this.client.nif = null;
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
            nameErrors() {
                const errors = [];
                if (!this.$v.client.name.$dirty) return errors;
                !this.$v.client.name.required && errors.push("Name is required");
                !this.$v.client.name.alpha && errors.push("Name can only contain letters and spaces");
                return errors;
            },
            nifErrors() {
                const errors = [];
                if (!this.$v.client.nif.$dirty) return errors;
                !this.$v.client.nif.required && errors.push("NIF is required");
                !this.$v.client.nif.minLength | !this.$v.client.nif.maxLength && errors.push("NIF must be 9 digits");
                return errors;
            }
        }
    }
</script>

<style scoped>

</style>
