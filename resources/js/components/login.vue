<template>
    <div class="text-xs-center">
        <v-dialog width="500">
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

                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field
                                v-model="user.email"
                                :rules="[rules.required, rules.email]"
                                label="E-mail"
                                autofocus
                                required
                        ></v-text-field>
                        <v-text-field
                            v-model="user.password"
                            :append-icon="show ? 'visibility_off' : 'visibility'"
                            :rules="[rules.required, rules.min]"
                            :type="show ? 'text' : 'password'"
                            name="input-10-1"
                            label="Password"
                            hint="At least 8 characters"
                            counter
                            @click:append="show = !show">
                        </v-text-field>
                    </v-form>

                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            :disabled="!valid"
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
export default {
  data: () => {
    return {
        title: 'Login',
        user: {
            email: '',
            password: ''
        },
        valid: "true",
        rules: {
            required: v => !!v || 'Required.',
            min: v => v.length >= 3 || 'Min 3 characters',
            email: v => /.+@.+/.test(v) || 'E-mail must be valid'
        },
        show: false
    };
  },
  methods: {
      login() {
        axios.post("/api/login", this.user)
            .then(response => {
                this.$store.commit('setToken',response.data.access_token);
            })
            .catch(error => {
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
      }
  }
};
</script>

<style scoped>
</style>