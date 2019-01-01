<template>
    <div class="text-xs-center">
        <v-dialog width="500" v-model="show" @click.stop="show = false">
            <v-card>
                <v-card-title class="headline blue darken-4 white--text" primary-title>
                    Create table
                </v-card-title>

                <v-divider light></v-divider>

                <v-alert :value="alert.show" type="error" transition="scale-transition" dismissible outline> {{ alert.error }} </v-alert>

                <v-card-text>
                    <v-form ref="form" v-model="form.valid" lazy-validation>
                        <v-text-field v-model="table.table_number" :rules="[form.rules.required, form.rules.min, form.rules.max]" label="Table number" autofocus required></v-text-field>
                    </v-form>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn small round color="info" :disabled="!form.valid" :loading="form.loading" @click="submit">
                        Create
                    </v-btn>
                    <v-btn small round @click="close()">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>

    function initialState() {
        return {
            title: 'Create table',
            table: {
                table_number: ''
            },
            alert: {
                show: false,
                error: ''
            },
            form: {
                valid: true,
                loading: false,
                p_show: false,
                rules: {
                    required: v => !!v || 'Required.',
                    min: v => v.length >= 1 || 'Min 1 characters',
                    max: v => v.length < 11 || 'Max 11 characters'
                }
            }
        };
    }

    export default {
        name: "createTable",
        props: {
            visible: Boolean
        },
        data: () => {
            return initialState();
        },
        methods: {
            submit() {
                if (this.$refs.form.validate()) {
                    this.create();
                }
            },
            clear() {
                //this.$refs.form.reset();
                this.table.table_number = '';
            },
            close() {
                this.clear();
                this.$emit('close');
            },
            create() {
                console.log(this.table);

                let config = {
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.state.token,
                        'Accept': 'application/json'
                    }
                };

                axios.post('/api/tables/', this.table, config)
                    .then(response => {
                        var table = response.data.data;
                        
                        if (table.table_number == 0) {
                            table.table_number = this.table.table_number;
                        }


                        this.clear();
                        this.$emit('update', table);
                        this.$emit('close');

                        this.$toasted.success('Table added',
                            {
                                icon: 'info_outline',
                            }
                        );
                    })
                    .catch(error => {
                        console.log(error.response.data.table_number[0]);

                        this.$toasted.error(error.response.data.table_number[0],
                        {
                            icon: 'error_outline',
                        });
                    });
            }
        },
        computed: {
            show: {
                get() {
                    return this.visible;
                },
                set(value) {
                    if (!value) {
                        this.$emit('close');
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .toasted-css {
        font-family: Arial, Helvetica, sans-serif;
    }
</style>