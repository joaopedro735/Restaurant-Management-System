<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-toolbar class="primary lighten-1">
                <v-menu :nudge-width="100">
                    <v-toolbar-title slot="activator">
                        <span>Restaurantte</span>
                        <v-icon dark>arrow_drop_down</v-icon>
                    </v-toolbar-title>
                    <v-list>
                        <v-list-tile :to="{name: 'home'}" exact>Home</v-list-tile>
                        <v-list-tile to="/menu" exact>Menu</v-list-tile>
                        <v-list-tile v-if="checkDisplay('users')" to="/users" exact>Users</v-list-tile>
                        <v-list-tile v-if="checkDisplay('orders')" to="/orders" exact>Orders</v-list-tile>
                        <v-list-tile v-if="checkDisplay('meals')" to="/meals" exact>Meals</v-list-tile>
                        <v-list-tile v-if="checkDisplay('tables')" to="/management/tables" exact>Tables</v-list-tile>
                        <v-list-tile v-if="checkDisplay('invoices')" to="/invoices" exact>Invoices</v-list-tile>
                    </v-list>
                </v-menu>
                <v-spacer></v-spacer>
                <v-btn v-if="this.$store.state.token && working" round color="success">{{'WORKING since ' +
                    this.$store.state.user.last_shift_start + ' (' + timePassed + ')'}}
                </v-btn>
                <v-btn v-if="this.$store.state.token && !working" round color="error">{{'NOT WORKING since ' +
                    this.$store.state.user.last_shift_end + ' (' + duration + ')'}}
                </v-btn>
                <v-chip outline color="white" v-if="this.$store.state.user != null">
                    <v-icon v-if="this.$store.state.user.blocked" color="red">block</v-icon>&nbsp;
                    {{ this.$store.state.user.name }}&nbsp;<strong>({{this.$store.state.user.type}})</strong>
                </v-chip>
                <login-modal v-if="!this.$store.state.token"></login-modal>
                <notifications v-if="this.$store.state.token"
                               :notifications="notifications"></notifications>
                <user-nav v-if="this.$store.state.user"></user-nav>
            </v-toolbar>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        props: ['notifications'],
        data() {
            return {
                time: "",
                timePassed: "",
                duration: "",
                panel: [],
            }
        },

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
                    case "meals":
                        return ((this.$store.state.user.type === "manager" || this.$store.state.user.type === "waiter") && !this.$store.state.user.blocked);
                    case "invoices":
                        return ((this.$store.state.user.type === "manager" || this.$store.state.user.type === "cashier") && !this.$store.state.user.blocked);
                }
            },
            calcTime() {
                if (this.$store.state.user) {
                    let date = this.$store.state.user.last_shift_start;
                    this.timePassed = this.$moment(date).fromNow();
                }
            },
            addNotification: function (notification) {
                console.log("added");
                this.notifications.push(notification);
            }
        },
        computed: {
            working: function () {
                if (this.$store.state.user && this.$store.state.user.shift_active === 0) {
                    clearInterval();
                    var x = this.$moment(this.$store.state.user.last_shift_start);
                    var y = this.$moment(this.$store.state.user.last_shift_end);
                    this.duration = this.$moment.duration(x.diff(y)).humanize();
                    return false;
                } else {
                    clearInterval();
                    this.calcTime();
                    setInterval(this.calcTime, 60000);
                    return true;
                }
            },
        }
    }
</script>

<style scoped>

</style>
