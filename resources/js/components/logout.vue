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
            if (!this.$root.isUserAuthenticated) {
                this.$router.push('/menu');
                return;
            }

            var config = {
                headers: {
                    'Authorization': 'Bearer ' + this.$root.userToken,
                    'Accept': 'application/json'
                }
            };

            axios.post('/api/logout', {}, config)
            .then(response => {
                // TODO: Use Vuex stores
                this.$root.userToken = undefined;
                this.$root.isUserAuthenticated = false;

                this.$store.commit('clearToken');

                this.$router.push('/menu');
            })
            .catch(error => {
                console.dir(error);
            });
        }
    }
</script>

<style scoped>

</style>
