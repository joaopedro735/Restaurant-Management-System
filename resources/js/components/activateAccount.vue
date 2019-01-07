<template>
    <v-container fluid grid-list-xl text-xs-center v-show="show">
        <v-layout row wrap>
            <v-flex xs4 offset-xs4>
                <v-card>
                    <v-card-title class="headline light-blue lighten-3"
                                  primary-title
                                  color="purple"
                    >Activate Account
                    </v-card-title>

                    <v-divider light></v-divider>

                    <v-alert
                            :value="alert.show"
                            type="error"
                            transition="scale-transition"
                            dismissible
                            outline
                    >{{ alert.error }}
                    </v-alert>

                    <v-card-text>
                        <v-form ref="form" v-model="form.valid" lazy-validation>
                            <v-text-field
                                    v-model="user.email"
                                    :rules="[form.rules.required, form.rules.email]"
                                    label="E-mail"
                                    readonly
                                    required
                            ></v-text-field>
                            <v-text-field
                                    v-model="user.password"
                                    :append-icon="form.p_show ? 'visibility_off' : 'visibility'"
                                    :rules="[form.rules.required, form.rules.min]"
                                    :type="form.p_show ? 'text' : 'password'"
                                    autofocus=""
                                    name="input-10-1"
                                    label="Password"
                                    hint="At least 3 characters"
                                    counter
                                    @click:append="form.p_show = !form.p_show"
                                    @keypress.enter="submit">
                            </v-text-field>
                            <v-text-field
                                    v-model="user.password_confirmation"
                                    :rules="[form.rules.required, form.rules.min]"
                                    :type="'password'"
                                    name="input-10-1"
                                    label="Password Confirmation"
                                    hint="At least 3 characters"
                                    counter
                                    @keypress.enter="submit">
                            </v-text-field>
                        </v-form>

                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                                :disabled="!form.valid"
                                :loading="form.loading"
                                @click="submit"
                        >
                            submit
                        </v-btn>
                        <v-btn @click="clear">clear</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data: () => {
            return {
                title: 'activateAccount',
                user: {
                    email: '',
                    password: '',
                    password_confirmation: '',
                    token: ''
                },
                show: false,
                alert: {
                    show: false,
                    error: ""
                },
                form: {
                    valid: true,
                    loading: false,
                    p_show: false,
                    rules: {
                        required: v => !!v || 'Required.',
                        min: v => v.length >= 3 || 'Min 3 characters',
                        email: value => {
                            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            return pattern.test(value) || 'Invalid e-mail.';
                        }
                    }
                }
            }
        },
        methods: {
            submit() {
                if (this.$refs.form.validate) {
                    this.confirm();
                }
            },
            clear() {
                this.$refs.form.reset();
            },
            confirm() {
                axios.post('/api/account/confirm', this.user)
                    .then(response => {
                        this.$router.push({name: 'home'});
                        this.$toasted.success('Account confirmed successfully');
                    });
            }
        },
        mounted() {
            this.user.token = this.$route.query.token;
            if (this.user.token !== undefined) {
                axios.get('/api/password/find/' + this.user.token,)
                    .then(response => {
                        this.user.email = response.data.email;
                        this.show = true;
                    })
                    .catch(error => {
                        if (error.response.status === 404) {
                            this.$toasted.error('Token invalid');
                        }
                    })
            }else {
                this.$toasted.error('No token inserted');
            }
        }
    }
</script>

<style scoped>

</style>