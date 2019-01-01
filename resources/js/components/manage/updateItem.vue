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
                        <v-text-field v-model="item.name" :rules="[form.rules.required, form.rules.min, form.rules.max]" label="Item name" autofocus required></v-text-field>
                        <v-select v-model="item.type" :items="types" item-text="text" item-value="value" label="Item type"></v-select>
                        <v-text-field v-model="item.description" :rules="[form.rules.required, form.rules.min, form.rules.max]" label="Item description" required></v-text-field>
                        
                        <v-text-field label="Item Photo" @click='pickFile' v-model="item.photo_url" prepend-icon='attach_file'></v-text-field>
                        <input type="file" style="display: none" ref="image" accept="image/*" @change="onFilePicked">

                        <v-text-field v-model="item.price" :rules="[form.rules.required, form.rules.min, form.rules.max]" label="Item price (€)" required></v-text-field>
                    </v-form>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn small round :disabled="!form.valid" :loading="form.loading" @click="submit">
                        Update
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
            alert: {
                show: false,
                error: ''
            },
            imageName: '',
            imageUrl: '',
            imageFile: '',
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
            item: Object
        },
        data: () => {
            return initialState();
        },
        methods: {
            submit() {
                if (this.$refs.form.validate()) {
                    if (this.imageFile) {
                        this.uploadImageAndUpdate();
                    }
                    else {
                        this.update();
                    }
                }
            },
            close() {
                this.$emit('close');
            },
            update() {
                let config = {
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.state.token,
                        'Accept': 'application/json'
                    }
                };

                axios.put('/api/menu/' + this.item.id, this.item, config)
                    .then(response => {
                        var item = response.data.data;

                        console.log(item);

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
            },
            uploadImageAndUpdate() {
                const formData = new FormData();
                
                formData.append('file', this.imageFile);
                
                let config = {
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.state.token,
                        'Accept': 'application/json'
                    }
                };

                axios.post('/api/menu/image', formData, config)
                    .then(response => {
                        this.item.photo_url = response.data.hashName;

                        axios.put('/api/menu/' + this.item.id, this.item, config)
                            .then(response => {
                                var item = response.data.data;

                                this.imageFile = '';
                                this.imageUrl = '';

                                console.log(item);

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
                    })
                    .catch(error => {
                        this.$toasted.error('Error uploading image',
                            {
                                icon: 'error_outline',
                            });
                        this.item.photo_url ='placeholder.png';
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
        },
        mounted()
        {
            this.imageName = this.item.photo_url;
        }
    }
</script>

<style scoped>

</style>