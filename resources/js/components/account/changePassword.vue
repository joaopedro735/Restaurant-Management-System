<template>
    <!-- <div class="container">
              <div class="row">
              <h1 class="text-center">Alterar palavra passe</h1>
              </div>

              <hr>

              <form>
                  <div class="form-group">
                      <label for="inputPassword">Palavra passe antiga</label>
                      <input type="password" class="form-control" id="inputPasswordOld" v-model="password.passwordOld" placeholder="Palavra passe antiga">
                  </div>
                  <div class="form-group">
                      <label for="inputPassword">Nova palavra passe</label>
                      <input type="password" class="form-control" id="inputPasswordOne" v-model="password.passwordOne" placeholder="Nova palavra passe">
                  </div>
                  <div class="form-group">
                      <label for="inputPassword">Repita a palavra passe</label>
                      <input type="password" class="form-control" id="inputPasswordTwo" v-model="password.passwordTwo" placeholder="Repita a nova palavra passe">
                  </div>
                  <button @click.prevent="changePassword()" class="btn btn-primary">Continuar</button>
              </form>

              <br v-if="hasErrors">
              <div v-if="hasErrors" class="alert alert-danger">
                  <strong>Erro!</strong> {{ errorMessage }}
                  <button type="button" class="close-btn" @click="hasErrors = false;">&times;</button>
              </div>

              <br>
              <br>
              <br>
              <div class="panel-group">
                  <div class="panel panel-primary">
                      <div class="panel-heading">US 4</div>
                      <div class="panel-body">
                          As a worker of the restaurant, after confirming the account, I want to <strong>be able to change my password</strong> at any time.
                      </div>
                  </div>
              </div>
    </div>-->
    <div v-if="seguranca" class="col-md-9">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-12">
                        <form>
                            <!-- PALAVRA PASSE ANTIGA -->
                            <div class="form-group row">
                                <label for="inputPassword" class="col-4 col-form-label">Palavra passe antiga</label>
                                <div class="col-8">
                                    <input
                                            type="password"
                                            class="form-control here"
                                            id="inputPasswordOld"
                                            v-model="password.passwordOld"
                                            placeholder="Palavra passe antiga"
                                    >
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="inputPassword" class="col-4 col-form-label">Nova palavra passe</label>
                                <div class="col-8">
                                    <input
                                            type="password"
                                            class="form-control here"
                                            id="inputPasswordOne"
                                            v-model="password.passwordOne"
                                            placeholder="Nova palavra passe"
                                    >
                                </div>
                            </div>

                            <!-- PALAVRA PASSE NOVA -->
                            <div class="form-group row">
                                <label for="inputPassword" class="col-4 col-form-label">Repita a palavra passe</label>
                                <div class="col-8">
                                    <input
                                            type="password"
                                            class="form-control here"
                                            id="inputPasswordTwo"
                                            v-model="password.passwordTwo"
                                            placeholder="Repita a nova palavra passe"
                                    >
                                </div>
                            </div>

                            <!-- PALAVRA PASSE NOVA REP -->
                            <div class="form-group row">
                                <div class="offset-4 col-8">
                                    <button @click.prevent="changePassword()" class="btn btn-primary">Continuar</button>
                                </div>
                            </div>
                        </form>

                        <br v-if="hasErrors">
                        <div v-if="hasErrors" class="alert alert-danger">
                            <strong>Erro!</strong>
                            {{ errorMessage }}
                            <button
                                    type="button"
                                    class="close-btn"
                                    @click="hasErrors = false"
                            >&times;
                            </button>
                        </div>

                        <br>
                        <br>
                        <br>
                        <div class="panel-group">
                            <div class="panel panel-primary">
                                <div class="panel-heading">US 4</div>
                                <div
                                        class="panel-body"
                                >As a worker of the restaurant, after confirming the account, I want to
                                    <strong>be able to change my password</strong> at any time.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /** US 4. As a worker of the restaurant, after confirming the account, I want to be able to change my password at any time. */
    module.exports = {
        props: ["user", "seguranca"],
        data: function () {
            return {
                title: "Alterar palavra passe",
                password: {
                    passwordOld: "",
                    passwordOne: "",
                    passwordTwo: ""
                },
                hasErrors: false,
                passwordCheckBool: true,
                errorMessage: ""
            };
        },
        methods: {
            changePassword: function () {
                this.hasErrors = false;

                if (this.password.passwordOne !== this.password.passwordTwo) {
                    this.hasErrors = true;
                    this.errorMessage = "As palavras passe não coincidem.";


                }

                // TODO: Criar endpoint para alterar a palavra passe do user
            }
        },
        mounted() {
        }
    };
</script>

