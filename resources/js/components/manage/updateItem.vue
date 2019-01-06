<template>
    <div class="text-xs-center">
        <v-dialog width="500" v-model="show" @click.stop="show = false">
            <v-card>
                <v-card-title class="headline blue darken-4 white--text" primary-title color="purple">
                    Update Item
                </v-card-title>

                <v-divider light></v-divider>

                <v-alert :value="alert.show" type="error" transition="scale-transition" dismissible outline> {{ alert.error }} </v-alert>

                <v-card-text>
                    <v-form ref="form" v-model="form.valid" lazy-validation>
                        <v-text-field
                            v-model="item.name"
                            :rules="form.nameDescriptionRules"
                            label="Item name"
                            prepend-icon="local_dining"
                            autofocus
                            required>
                        </v-text-field>
                        <v-select
                            v-model="item.type"
                            :items="types"
                            :rules="form.typeRules"
                            item-text="text"
                            item-value="value"
                            label="Item type"
                            prepend-icon="category"
                            required>
                        </v-select>
                        <v-text-field
                            v-model="item.description"
                            :rules="form.nameDescriptionRules"
                            label="Item description"
                            prepend-icon="description"
                            required>
                        </v-text-field>
                        
                        <v-text-field
                            label="Item Photo"
                            @click='pickFile'
                            v-model="item.photo_url"
                            prepend-icon='attach_file'>
                            readonly
                        </v-text-field>
                        <input
                            type="file"
                            style="display: none"
                            ref="image"
                            accept="image/*"
                            @change="onFilePicked">

                        <v-text-field
                            v-model="item.price"
                            :rules="form.priceRules"
                            label="Item price"
                            prepend-icon="euro_symbol"
                            required></v-text-field>
                    </v-form>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn small round color="primary" :disabled="!form.valid" :loading="form.loading" @click="submit">
                        Update
                    </v-btn>
                    <v-btn small round @click="close()">Cancel</v-btn>
                </v-card-actions>
                <v-spacer></v-spacer>
                <v-card class="text-xs-center">
                    <v-spacer></v-spacer>
                    <img :src="imageUrl" height="100" v-if="imageUrl"/>
                </v-card>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    function initialState() {
        return {
            title: 'Update item',
            alert: {
                show: false,
                error: ''
            },
            imageUrl: '',
            imageFile: '',
            form: {
                valid: true,
                loading: false,
                p_show: false,
                nameDescriptionRules: [
                    v => !!v || 'Required',
                    v => (v && v.length >= 3) || 'Must be at least than 3 characters',
                    v => (v && v.length <= 255) || 'Must be shorter than 255 characters' 
                ],
                typeRules: [
                    v => !!v || 'Required',
                    v => {
                        const type = ['drink', 'dish'];
                        return type.includes(v) || "Invalid type";
                    }
                ],
                priceRules: [
                    v => !!v || 'Required',
                    value => {
                        const pattern = /^\d{0,6}(\.\d{1,2})?$/;
                        return pattern.test(value) || "Invalid price";
                    }
                ]
                /* rules: {
                    required: v => !!v || "Required.",
                    min: v => v.length >= 3 || "Min 3 characters",
                    max: v => v.length <= 255 || "Max 255 characters",
                } */
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
            item: Object
        },
        data: () => {
            return initialState();
        },
        methods: {
            submit() {
                this.form.loading = true;

                if (this.$refs.form.validate()) {
                    if (this.imageFile) {
                        this.uploadImageAndUpdateItem();
                    }
                    else {
                        this.updateItem();
                    }
                }
            },
            close() {
                this.imageUrl = '';
                this.imageFile = '';

                this.$emit('close');
            },
            updateItem() {
                axios.put('/api/menu/' + this.item.id, this.item)
                    .then(response => {
                        var item = response.data.data;

                        if (item.id == 0) {
                            item.id = this.item.item;
                        }

                        this.$emit('update', item);
                        this.$emit('close');

                        this.$toasted.success('Item updated',
                            {
                                icon: 'info',
                            }
                        );
                    })
                    .catch(error => {
                        this.$toasted.error(error,
                            {
                                icon: 'error',
                            });
                    })
                    .finally(() => {
                        this.form.loading = false;
                    });
            },
            uploadImageAndUpdateItem() {
                const formData = new FormData();
                
                formData.append('file', this.imageFile);

                axios.post('/api/menu/image', formData)
                    .then(response => {
                        if (!Number.isInteger(this.item.price)) {
                            this.item.price = this.item.price + '.00';
                        }
                        
                        this.item.photo_url = response.data.hashName;

                        axios.put('/api/menu/' + this.item.id, this.item)
                            .then(response => {
                                var item = response.data.data;

                                this.imageFile = '';
                                this.imageUrl = '';

                                this.$emit('update', item);
                                this.$emit('close');

                                this.$toasted.success('Item updated',
                                    {
                                        icon: 'info',
                                    }
                                );
                            })
                            .catch(error => {
                                this.$toasted.error(error,
                                    {
                                        icon: 'error',
                                    });
                            });
                    })
                    .catch(error => {
                        this.$toasted.error('Error uploading image',
                            {
                                icon: 'error',
                            });
                            
                        this.item.photo_url ='placeholder.png';
                    })
                    .finally(() => {
                        this.form.loading = false;
                    });
            },
            pickFile () {
                this.$refs.image.click();
            },
            onFilePicked (e) {
                const files = e.target.files;

                if(files[0] !== undefined) {
                    this.item.photo_url = files[0].name;

                    if(this.item.photo_url.lastIndexOf('.') <= 0) {
                        return;
                    }
                    const fr = new FileReader ();

                    fr.readAsDataURL(files[0])
                    fr.addEventListener('load', () => {
                        this.imageUrl = fr.result;
                        this.imageFile = files[0]; // this is an image file that can be sent to server...
                    })
                }
                else {
                    this.imageFile = '';
                    this.imageUrl = '';
                }
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

</style>