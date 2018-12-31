<template>
    <div class="text-xs-center">
        <v-dialog width="500" v-model="show" @click.stop="show = false">
            <v-card>
                <v-card-title class="headline blue darken-4" primary-title color="purple">
                    Create table
                </v-card-title>

                <v-divider light></v-divider>

                <v-alert :value="alert.show" type="error" transition="scale-transition" dismissible outline> {{ alert.error }} </v-alert>

                <v-card-text>
                    <v-form ref="form" v-model="form.valid" lazy-validation>
                        <v-text-field v-model="item.name" :rules="[form.rules.required, form.rules.min, form.rules.max]" label="Item name" autofocus required></v-text-field>
                        <v-select v-model="item.type" :items="types" item-text="text" item-value="value" label="Item type"></v-select>
                        <v-text-field v-model="item.description" :rules="[form.rules.required, form.rules.min, form.rules.max]" label="Item description" required></v-text-field>
                        <v-text-field v-model="item.photo_url" :rules="[form.rules.required, form.rules.min, form.rules.max]" label="Item photo" required></v-text-field>
                        <v-text-field v-model="item.price" :rules="[form.rules.required, form.rules.min, form.rules.max]" label="Item price" required></v-text-field>
                    </v-form>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn small round :disabled="!form.valid" :loading="form.loading" @click="submit">
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
            title: 'Update item',
            item: {
                name: '',
                type: '',
                description: '',
                photo_url: '',
                price: ''
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
                    required: v => !!v || "Required.",
                    min: v => v.length >= 3 || "Min 3 characters",
                    max: v => v.length <= 255 || "Max 255 characters",
                }
            },
            types: [
                {text: "Drink", value: "drink"},
                {text: "Dish", value: "dish"}
            ]
        };
    }

    export default {
        name: "updateItem",
        props: {
            visible: Boolean,
            currentItem: Object
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
            close() {
                this.$emit('close');
            },
            create() {
                console.log(this.item);

                let config = {
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.state.token,
                        'Accept': 'application/json'
                    }
                };

                axios.put('/api/menu/', this.item, config)
                    .then(response => {
                        var item = response.data.data;

                        if (item.id == 0) {
                            item.id = this.item.item;
                        }

                        this.$emit('update', item);
                        this.$emit('close');

                        this.$toasted.success('Item updated',
                            {
                                icon: 'info_outline',
                            }
                        );
                    })
                    .catch(error => {
                        console.log(error);

                        this.$toasted.error(error,
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
            },
            item: {
                get() {
                    return this.currentItem;
                }
            }
        },
    }
</script>

<style scoped>
    .toasted-css {
        font-family: Arial, Helvetica, sans-serif;
    }
</style>