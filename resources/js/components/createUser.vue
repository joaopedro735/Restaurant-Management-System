<template>
    <div class="text-xs-center">
        <v-dialog width="500" v-model="show" @click.stop="show = false">
            <v-card>
                <v-card-title
                        class="headline light-blue lighten-3"
                        primary-title
                        color="purple"
                >
                    Create worker account
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
                                v-model="user.name"
                                :rules="[form.rules.required]"
                                label="Name"
                                autofocus
                                required
                        ></v-text-field>
                        <v-text-field
                                v-model="user.email"
                                :rules="[form.rules.required, form.rules.email]"
                                label="E-mail"
                                required
                        ></v-text-field>
                        <v-text-field
                                v-model="user.username"
                                :rules="[form.rules.required]"
                                label="Username"
                                required
                        ></v-text-field>
                        <v-select
                                v-model="user.type"
                                :items="types"
                                item-text="text"
                                item-value="value"
                                label="Type"
                        ></v-select>
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

  function initialState () {
    return {
      title: "Login",
      user: {
        name: "",
        email: "",
        username: "",
        type: ""
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
      },
      types: [
        { text: "Manager", value: "manager" },
        { text: "Cook", value: "cook" },
        { text: "Waiter", value: "waiter" },
        { text: "Cashier", value: "cashier" }
      ]
    };
  }

  export default {
    name: "createUser",
    props: {
      visible: Boolean
    },
    data: () => {
      return initialState();
    },
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          this.register();
        }
      },
      clear () {
        this.$refs.form.reset();
      },
      register () {
        const config = {
          headers: {
            "Authorization": "Bearer " + this.$store.state.token,
            "Accept": "application/json"
          }
        };
        axios.post("/api/account/create", this.user, config)
          .then(response => {
            this.$toasted.success("User created successfully");
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    computed: {
      show: {
        get () {
          return this.visible;
        },
        set (value) {
          if (!value) {
            this.$emit("close");
          }
        }
      }
    }
  };
</script>

<style scoped>

</style>
