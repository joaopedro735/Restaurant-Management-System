<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-label>
            <input type="file" id="file" ref="file" accept="image/*" v-on:change="onFileSelected"/>
        </v-label>
        <v-text-field
                v-model="editingUser.name"
                :rules="nameRules"
                label="Name"
        ></v-text-field>
        <v-text-field
                v-model="editingUser.username"
                :rules="usernameRules"
                label="Username"
        ></v-text-field>
        <v-btn small round color="primary"
            :loading="loading"
            :disabled="!valid"
            @click.prevent="submit">
                Save
        </v-btn>
        <v-btn small round
            :disabled="loading"
            @click.prevent="clear">Cancel</v-btn>
    </v-form>
</template>

<script>
    module.exports = {
        props: ['user'],
        data: function () {
            return {
                valid: true,
                loading: false,
                editingUser: this.user,
                file: '',
                nameRules: [
                    v => (v.length <= 255) || 'Name must be less than 255 characters'
                ],
                usernameRules: [
                    v => (v.length <= 255) || 'Username must be less than 255 characters'
                ],

            };
        },
        methods: {
            submit() {
                this.loading = true;

                if (this.$refs.form.validate()) {
                    // Native form submission is not yet supported
                    let formData = new FormData();
                    formData.append('file', this.file);

                    //editing user aqui  tem a photo atual
                    axios.post('/api/users/me/photo', formData).then(response => {
                        this.editingUser.photo_url = response.data;

                        axios.put('/api/users/me', this.editingUser).then(response => {
                            this.$toasted.success("Update was successful",
                                {
                                    icon: 'info'
                                });
                            this.$store.commit('setUser', response.data.data);
                            this.$emit('user-saved');
                        }).catch(error => {
                            this.$toasted.error("Something went wrong",
                                {
                                    icon: 'error'
                                }
                            );
                        })
                    })
                    .finally(() => {
                        this.loading = false;
                    });
                }
            },
            clear() {
                this.$emit('user-cancel');
            },
            onFileSelected(event) {
                this.file = this.$refs.file.files[0];
            }

        },
        created() {
        }
    }

</script>

<style scoped>

</style>
