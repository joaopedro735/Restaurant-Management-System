<template>
    <v-container fluid grid-list-xl text-xs-center>
        <v-layout row wrap>
            <v-flex xs4 offset-xs4>
                <v-card>
                    <v-card-title class="headline light-blue lighten-3"
                                  primary-title
                                  color="purple"
                    >Change Password
                    </v-card-title>

                    <v-divider light></v-divider>

                    <v-alert v-model="alert.show"
                             :value="alert.show"
                             type="error"
                             transition="scale-transition"
                             dismissible
                             outline
                     >{{ alert.error }}
                     </v-alert>

                    <v-card-text>
                        <form ref="form">
                            <v-text-field
                                    v-model="user.old_password"
                                    :error-messages="oldPasswordErrors"
                                    :append-icon="p_old_show ? 'visibility_off' : 'visibility'"
                                    :type="p_old_show ? 'text' : 'password'"
                                    label="Old password"
                                    @click:append="p_old_show = !p_old_show"
                                    @input="$v.user.old_password.$touch()"
                                    @blur="$v.user.old_password.$touch()"
                            ></v-text-field>
                            <v-text-field
                                v-model="user.new_password"
                                :error-messages="newPasswordErrors"
                                :append-icon="p_show ? 'visibility_off' : 'visibility'"
                                :type="p_show ? 'text' : 'password'"
                                label="Password"
                                counter
                                @click:append="p_show = !p_show"
                                @input="$v.user.new_password.$touch()"
                                @blur="$v.user.new_password.$touch()"
                        ></v-text-field>
                            <v-text-field
                                    v-model="user.new_password_confirmation"
                                    :error-messages="newPasswordConfirmationErrors"
                                    :append-icon="p_show ? 'visibility_off' : 'visibility'"
                                    :type="p_show ? 'text' : 'password'"
                                    label="Password Confirmation"
                                    counter
                                    @click:append="p_show = !p_show"
                                    @input="$v.user.new_password_confirmation.$touch()"
                                    @blur="$v.user.new_password_confirmation.$touch()"
                            ></v-text-field>
                        </form>

                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="submit">submit</v-btn>
                        <v-btn @click="clear">clear</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {required, minLength, sameAs} from 'vuelidate/lib/validators'

    export default {
        validations: {
            user: {
                old_password: {
                    required,
                },
                new_password: {
                    required,
                    minLength: minLength(3),
                },
                new_password_confirmation: {
                    required,
                    minLength: minLength(3),
                    sameAsPassword: sameAs('new_password'),
                }
            }
        },
        data: () => ({
            user: {
                old_password: '',
                new_password: '',
                new_password_confirmation: '',
            },
            p_show: false,
            p_old_show: false,
            alert: {
                show: false,
                error: "",
            }
        }),

        computed: {
            newPasswordErrors() {
                const errors = [];
                if (!this.$v.user.new_password.$dirty) return errors;
                !this.$v.user.new_password.required && errors.push("Password is required");
                !this.$v.user.new_password.minLength && errors.push("Min 3 characters");
                return errors;
            },
            newPasswordConfirmationErrors() {
                const errors = [];
                if (!this.$v.user.new_password_confirmation.$dirty) return errors;
                !this.$v.user.new_password_confirmation.required && errors.push("Password confirmation is required");
                !this.$v.user.new_password_confirmation.minLength && errors.push("Min 3 characters");
                !this.$v.user.new_password_confirmation.sameAsPassword && errors.push("Password and password confirmation mismatch");
                return errors;
            },
            oldPasswordErrors() {
                const errors =  [];
                if (!this.$v.user.old_password.$dirty) return errors;
                !this.$v.user.old_password.required && errors.push("Old password is required");
                return errors;
            }
        },

        methods: {
            submit() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    axios.put('/api/account/changePassword', this.user)
                        .then(response => {
                            this.$store.commit('setToken', response.data.token);
                            this.$toasted.success("Password changed successfully",
                                {
                                    position: "top-center",
                                    duration: 3000,
                                    icon: "security"
                                });
                            this.$router.push('/account/myprofile');
                        })
                        .catch(error => {
                            this.alert.error = error.response.data.message;
                            this.alert.show = true;
                            console.dir(error);
                        });
                }
            },
            clear() {
                this.$v.$reset();
                this.user.old_password = "";
                this.user.new_password = "";
                this.user.new_password_confirmation = "";
            }
        },
    }
</script>

<style scoped>

</style>
