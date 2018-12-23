<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-label>
            <input type="file" id="file" ref="file" accept="image/*" v-on:change="onFileSelected"/>
        </v-label>
        <v-text-field
                v-model="this.editingUser.name"
                :rules="nameRules"
                :counter="10"
                label="Name"
        ></v-text-field>
        <v-text-field
                v-model="this.editingUser.username"
                :rules="usernameRules"
                label="Username"
        ></v-text-field>
        <v-btn
                :disabled="!valid"
                @click.prevent="submit"
        >
            submit
        </v-btn>
        <v-btn @click="clear">Cancel</v-btn>
    </v-form>
</template>

<script>
    module.exports = {
        props: ['user'],
        data: function () {
            return {
                valid: true,
                editingUser: this.user,
                file: '',
                nameRules: [
                    v => (v.length <= 10) || 'Name must be less than 10 characters'
                ],
                usernameRules: [
                    v => (v.length <= 10) || 'Username must be less than 10 characters'
                ],

            };
        },
        methods: {
            submit() {
                if (this.$refs.form.validate()) {
                    // Native form submission is not yet supported
                    let config = {
                        headers: {
                            'Authorization': 'Bearer ' + this.$store.state.token,
                            'Accept': 'application/json'
                        }
                    };
                    this.onUpload();
                    console.log("SHIT IWNAT:" + this.editingUser.photo_url);
                    axios.put('/api/users/me', this.editingUser, config).then(response => {
                        this.$toasted.success("Update was successful",
                            {
                                position: "top-center",
                                duration: 3000,
                            });
                        this.editingUser.photo_url = 'storage/profiles/' + this.editingUser.photo_url;
                        this.$store.commit('setUser', this.editingUser);
                        this.$emit('user-saved');
                    }).catch(error => {
                        this.$toasted.error("Something went wrong",
                            {
                                position: "top-center",
                                duration: 3000,
                            });
                    })
                }
            },
            clear() {
                this.$emit('user-cancel');
            },
            onFileSelected(event) {
                this.file = this.$refs.file.files[0];
            },
            onUpload() {
                let formData = new FormData();
                formData.append('file', this.file);
                let config = {
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.state.token,
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data'
                    }
                };
                axios.post('/api/users/me/photo',
                    formData, config
                ).then(response => {
                    console.log('SUCCESS!!');
                    console.log(response.data);
                    this.editingUser.photo_url = response.data;

                }).catch(function () {
                    console.log('FAILURE!!');
                });
            }

        },
        created() {
        }
    }

</script>

<style scoped>

</style>
