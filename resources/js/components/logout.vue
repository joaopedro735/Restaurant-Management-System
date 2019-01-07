<template>
    <div></div>
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

            this.$socket.emit('user_exit', this.$store.state.user);

            axios.post('/api/logout')
            .then(response => {
                this.$store.commit('clearUserAndToken');
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
