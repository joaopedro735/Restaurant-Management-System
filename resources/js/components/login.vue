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
                type="email" class="form-control" id="inputEmail" v-model="email" placeholder="Email">
            </div>
            <div class="form-group">
                <label for="inputPassword">Palavra pass</label>
                <input type="password" class="form-control" id="inputPassword" v-model="password" placeholder="Palavra passe">
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
        email: '',
        password: '',
    };
  },
  methods: {
    login: function() {
      axios
        .post("/api/login", {
            email: this.email,
            password: this.password
        })
        .then(response => {
            this.$root.userToken = response.data.access_token;
            this.$root.isUserAuthenticated = true;
            console.dir(this.$root.userToken);
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