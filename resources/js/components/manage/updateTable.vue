<template>
    <div class="text-xs-center">
        <v-dialog width="500" v-model="show" @click.stop="show = false">
            <v-card>
                <v-card-title class="headline blue darken-4 white--text" primary-title color="purple">
                    Update Table {{tableNumber}}
                </v-card-title>

                <v-divider light></v-divider>

                <v-alert :value="alert.show" type="error" transition="scale-transition" dismissible outline> {{ alert.error }} </v-alert>

                <v-card-text>
                    <v-form ref="form" v-model="form.valid" lazy-validation>
                        <v-text-field
                            v-model="table.table_number"
                            :rules="form.tableNumberRules"
                            label="Table number"
                            prepend-icon="fa-hashtag"
                            autofocus
                            required>
                        </v-text-field>
                    </v-form>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn small round color="primary"
                        :disabled="!form.valid"
                        :loading="form.loading"
                        @click="submit">
                            Update
                    </v-btn>
                    <v-btn small round
                        @click="close()">
                            Cancel
                    </v-btn>
                </v-card-actions>
                <v-spacer></v-spacer>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    function initialState() {
        return {
            title: 'Update table',
            alert: {
                show: false,
                error: ''
            },
            currentTable: {
                table_number: ''
            },
            form: {
                valid: true,
                loading: false,
                p_show: false,
                tableNumberRules: [
                    v => !!v || 'Required',
                    v => (v && v.length >= 1) || 'Must have at least 1 character',
                    v => (v && v.length <= 11) || 'Must be shorter than 12 characters',
                    value => {
                        const pattern = /^\d{1,11}?$/;
                        return pattern.test(value) || "Invalid table number";
                    }
                ]
            }
        };
    }

    export default {
        name: "updateTable",
        props: {
            visible: Boolean,
            table: Object,
            tableNumber: Number
        },
        data: () => {
            return initialState();
        },
        methods: {
            submit() {
                this.form.loading = true;

                if (this.$refs.form.validate()) {
                    this.updateTable();
                }
            },
            clear() {
                this.$refs.form.reset();
            },
            close() {
                this.clear();
                this.$emit('close');
            },
            updateTable() {
                this.form.loading = true;

                console.log(this.table);
                
                axios.patch('/api/tables/' + this.tableNumber, { table_number : this.table.table_number })
                    .then(response => {
                        this.$emit('update');
                        this.$emit('close');

                        this.$toasted.success(response.data.message,
                            {
                                icon: 'info',
                            }
                        );
                    })
                    .catch(error => {
                        this.$toasted.error(error.message,
                            {
                                icon: 'error',
                            });
                    })
                    .finally(() => {
                        this.form.loading = false;
                    });
            },
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
        },
        beforeUpdate() {
            this.currentTable = _.cloneDeep(this.table);
        }
    }
</script>

<style scoped>

</style>
