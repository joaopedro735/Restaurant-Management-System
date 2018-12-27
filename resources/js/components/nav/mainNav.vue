<template>
    <div>
        <v-toolbar class="primary lighten-1">
            <v-toolbar-title>Restaurantte</v-toolbar-title>

            <v-btn headline color="white" flat round exact :to="{name: 'home'}">Home</v-btn>
            <v-btn color="white" flat round to="/menu">Menu</v-btn>
            <v-btn color="white" flat round v-if="checkDisplay('users')" to="/users" exact>Users</v-btn>
            <v-btn color="white" flat round v-if="checkDisplay('orders')" to="/orders">Orders</v-btn>
            <v-btn color="white" flat round v-if="checkDisplay('tables')" to="/management/tables">Tables</v-btn>

            <v-spacer></v-spacer>

            <v-chip outline color="white" v-if="this.$store.state.user != null">{{ this.$store.state.user.name }}&nbsp;<strong>({{this.$store.state.user.type}})</strong></v-chip>
            <login-modal v-if="!this.$store.state.token"></login-modal>
            <user-nav v-if="this.$store.state.user"></user-nav>
        </v-toolbar>
    </div>
</template>

<script>
    export default {
        methods: {
            checkDisplay(menu) {
                if (!this.$store.state.token || _.isEmpty(this.$store.state.user)) {
                    return false;
                }

                if (menu === 'tables') {
                    return (this.$store.state.user.type === 'manager');
                }

                if (menu === 'orders') {
                    return (this.$store.state.user.type === 'manager' || this.$store.state.user.type === 'cook');
                }

                if (menu === 'users') {
                    return (this.$store.state.user.type === 'manager');
                }
            }
        }
    }
</script>

<style scoped>

</style>
