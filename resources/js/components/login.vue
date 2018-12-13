<template>
    <div class="text-xs-center">
        <v-dialog width="500" v-model="dialog">
            <v-btn flat slot="activator">Login</v-btn>

            <v-card>
                <v-card-title
                        class="headline light-blue lighten-3"
                        primary-title
                        color="purple"
                >
                    Login
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
                                autofocus
                                required
                        ></v-text-field>
                        <v-text-field
                                v-model="user.password"
                                :append-icon="form.p_show ? 'visibility_off' : 'visibility'"
                                :rules="[form.rules.required, form.rules.min]"
                                :type="form.p_show ? 'text' : 'password'"
                                name="input-10-1"
                                label="Password"
                                hint="At least 3 characters"
                                counter
                                @click:append="form.p_show = !form.p_show"
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
        </v-dialog>
    </div>
</template>

<script>

    function initialState() {
        return {
            title: 'Login',
            user: {
                email: '',
                password: ''
            },
            dialog: false,
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
                    email: v => /.+@.+/.test(v) || 'E-mail must be valid'
                }
            },
        };
    }
    export default {
        data: () => {
            return initialState();
        },
        methods: {
            login() {
                this.form.loading = true;
                axios.post("/api/login", this.user)
                    .then(response => {
                        this.$store.commit('setToken', response.data.access_token);
                        //this.$store.commit('user',response.user);
                        this.form.loading = false;
                        this.dialog = false;
                        this.$toasted.success("Login successful",
                            {
                                position: "top-center",
                                duration: 3000,
                                icon: "fingerprint"
                            });
                        Object.assign(this.$data, initialState());
                        return axios.get('api/users/me');
                    })
                    .then(response => {
                        this.$store.commit('setUser', response.data.data);
                        console.log("wtv");
                        //this.$socket.emit('user_enter', response.data.data);
                    })
                    .catch(error => {
                        this.form.loading = false;
                        this.alert.error = error.response.data.msg;
                        this.alert.show = true;
                        console.dir(error);
                    });
            },
            clear() {
                this.$refs.form.reset();
            },
            submit() {
                if (this.$refs.form.validate()) {
                    this.login();
                }
            },
        }
    };
</script>

<style scoped>
</style>