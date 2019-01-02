<template>
    <div>
        <v-toolbar class="primary lighten-1">
            <v-toolbar-title>Restaurantte</v-toolbar-title>

            <v-btn headline color="white" flat round exact :to="{name: 'home'}">
                <v-icon>home</v-icon>
                &nbsp;Home
            </v-btn>
            <v-btn color="white" flat round to="/menu">Menu</v-btn>
            <v-btn color="white" flat round v-if="checkDisplay('users')" to="/users" exact>Users</v-btn>
            <v-btn color="white" flat round v-if="checkDisplay('orders')" to="/orders">Orders</v-btn>
            <v-btn color="white" flat round v-if="checkDisplay('tables')" to="/management/tables">Tables</v-btn>
            <v-btn color="white" flat round v-if="checkDisplay('invoices')" to="/invoices/">Invoices</v-btn>

            <v-spacer></v-spacer>
            <v-btn  v-if="this.$store.state.token && working" round color="success">WORKING</v-btn>
            <v-btn  v-if="this.$store.state.token && !working" round color="error">NOT WORKING</v-btn>
            <v-chip outline color="white" v-if="this.$store.state.user != null">
                <v-icon v-if="this.$store.state.user.blocked" color="red">block</v-icon>&nbsp;
                {{ this.$store.state.user.name }}&nbsp;<strong>({{this.$store.state.user.type}})</strong>
            </v-chip>
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

                switch (menu) {
                    case "tables":
                        return (this.$store.state.user.type === "manager" && !this.$store.state.user.blocked);
                    case "users":
                        return (this.$store.state.user.type === "manager" && !this.$store.state.user.blocked);
                    case "orders":
                        return ((this.$store.state.user.type === "manager" || this.$store.state.user.type === "cook") && !this.$store.state.user.blocked);
                    case "invoices":
                        return ((this.$store.state.user.type === "manager" || this.$store.state.user.type === "cashier") && !this.$store.state.user.blocked);
                }
            }
        },
        computed: {
            working() {
                return this.$store.state.user.shift_active;
            },
        },
    }
</script>

<style scoped>

</style>
