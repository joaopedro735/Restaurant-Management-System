<template>
    <div class="container">
        <div class="row">
            <h1 class="text-center">Definir palavra passe</h1>
        </div>

        <hr>

        <form>
            <div class="form-group">
                <label for="inputPassword">Palavra passe</label>
                <input
                        type="password"
                        class="form-control"
                        id="inputPasswordOne"
                        v-model="password.passwordOne"
                        placeholder="Palavra passe"
                >
            </div>
            <div class="form-group">
                <label for="inputPassword">Repita a palavra passe</label>
                <input
                        type="password"
                        class="form-control"
                        id="inputPasswordTwo"
                        v-model="password.passwordTwo"
                        placeholder="Palavra passe"
                >
            </div>
            <button @click.prevent="setPassword()" class="btn btn-primary">Continuar</button>
        </form>

        <!-- <div>
                    <input type="text" v-model="password.passwordOne">
                    <input type="text" v-model="password.passwordTwo">
        </div>-->
        <br v-if="hasErrors">
        <div v-if="hasErrors" class="alert alert-danger">
            <strong>Erro!</strong> As palavras passe inseridas nÃ£o coincidem.
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
                <div class="panel-heading">US 2</div>
                <div class="panel-body">
                    As a worker of the restaurant, I want to receive a confirmation e-mail when a manager registers my
                    account on the system.
                    The e-mail should include a hyperlink, that opens
                    <strong>
                        a web page where I can define my account password. At the end of that process,
                        the account is considered a confirmed account.
                    </strong>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /** US 2. As a worker of the restaurant, I want to receive a confirmation e-mail when a manager registers my account on the system.
     * The e-mail should include a hyperlink, that opens a web page where I can define my account password. At the end of that process,
     * the account is considered a confirmed account. */
    module.exports = {
        data: function () {
            return {
                title: "Definir palavra passe",
                password: {
                    passwordOne: "",
                    passwordTwo: ""
                },
                hasErrors: false,
                passwordCheckBool: true
            };
        },
        methods: {
            setPassword: function () {
                this.hasErrors = false;

                if (this.password.passwordOne !== this.password.passwordTwo) {
                    this.hasErrors = true;


                }

                // TODO: Criar endpoint para definir a palavra passe do user
            }
        },
        mounted() {
        }
    };
</script>

