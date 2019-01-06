<template>
    <div>

    </div>
</template>

<script>
    module.exports = {
        data: function() {
            return {
            title: 'Logout',
            };
        },
        methods: {

        },
        mounted () {
            if (!this.$store.state.token) {
                this.$router.push('/home');
                return;
            }

            var config = {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.token,
                    'Accept': 'application/json'
                }
            };

            axios.post('/api/logout', {}, config)
            .then(response => {
                // TODO: Use Vuex stores
                this.$store.commit('clearUserAndToken');
                this.$socket.emit('user_exit', this.$store.state.user);

                this.$router.push({name: 'home'});
                this.$toasted.success("Logged out",
                    {
                        icon: "exit_to_app",
                    });
            })
            .catch(error => {
                console.dir(error);
            });
        }
    }
</script>

<style scoped>

</style>
