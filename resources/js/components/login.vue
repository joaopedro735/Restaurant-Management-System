<template>
    <div class="text-xs-center">
        <v-card max-width="600" class="center">
            <v-card-title class="headline blue darken-4 white--text" primary-title color="purple">Login</v-card-title>

            <v-divider light></v-divider>

            <v-alert
                :value="alert.show"
                type="error"
                transition="scale-transition"
                dismissible
                outline>
                    {{ alert.error }}
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
                            @keypress.enter="submit"
                    ></v-text-field>
                </v-form>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn small round color="primary" :disabled="!form.valid" :loading="form.loading" @click="submit">Login</v-btn>
                <v-btn small round @click="clear">Clear</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>

    function initialState() {
        return {
            title: "Login",
            user: {
                email: "",
                password: ""
            },
            alert: {
                show: false,
                error: ""
            },
            form: {
                valid: true,
                loading: false,
                p_show: false,
                rules: {
                    required: v => !!v || "Required.",
                    min: v => v.length >= 3 || "Min 3 characters",
                    email: value => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        return pattern.test(value) || "Invalid e-mail.";
                    }
                }
            }
        };
    }

    export default {
        props: {
            visible: Boolean
        },
        data: () => {
            return initialState();
        },
        methods: {
            login() {
                this.form.loading = true;
                
                axios
                    .post("/api/login", this.user)
                    .then(response => {
                        this.$store.commit("setToken", response.data.access_token);
                        return axios.get("api/users/me");
                    })
                    .then(response => {
                        this.$store.commit("setUser", response.data.data);
                        this.show = false;
                        this.$toasted.success("Login successful", {
                            icon: "fingerprint"
                        });
                        Object.assign(this.$data, initialState());
                    })
                    .catch(error => {
                        this.alert.error = error.response.data.msg;
                        this.alert.show = true;
                        console.dir(error);
                    })
                    .finally(() => {
                        this.form.loading = false;
                        router.push({ path: 'home' });
                    });
            },
            clear() {
                this.$refs.form.reset();
            },
            submit() {
                if (this.$refs.form.validate()) {
                    this.login();
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
                        this.$emit("close");
                    }
                }
            }
        }
    };
</script>

<style scoped>
    .center {
        margin: auto;
    }
</style>
