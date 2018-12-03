<template>
    <div class="container">
        <div class="row">
        <h1 class="text-center">Entrar</h1>
        </div>

        <hr>

        <form>
            <div class="form-group">
                <label for="inputEmail">Endereço de email</label>
                <input
                type="email" class="form-control" id="inputEmail" v-model.trim="user.email" placeholder="Email">
            </div>
            <div class="form-group">
                <label for="inputPassword">Palavra passe</label>
                <input type="password" class="form-control" id="inputPassword" v-model="user.password" placeholder="Palavra passe">
            </div>
            <button @click.prevent="login()" class="btn btn-primary">Entrar</button>
        </form>
    </div>
</template>

<script>
    module.exports = {
        data: function() {
            return {
                title: 'Login',
                user: {
                    email: '',
                    password: ''
                }
            };
        },
        methods: {
            login() {
            axios.post('/api/login', this.user)
                .then(response => {
                    // TODO: Use Vuex stores
                    this.$store.commit('setToken',response.data.access_token);

                    this.$root.userToken = response.data.access_token;
                    this.$root.isUserAuthenticated = true;
                    this.$router.push('/menu');
                })
                .catch(error => {
                    console.dir(error);
                });
            }
        }
    };
</script>

<style scoped>

</style>