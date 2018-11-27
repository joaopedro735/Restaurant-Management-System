<template>
    <div>
        <div class="container">
            <div class="row">
                <h1 class="text-center">Users</h1>
            </div>

            <hr>

            <div class="container">
                <div class="btn-group btn-group-justified">
                    <div class="btn-group">
                        <button @click="showManagers = true; showCooks = true; showWaiters = true; showCashiers = true; showAll = true" type="button" class="btn " v-bind:class="{'btn-primary': showAll, 'btn-secondary': !showAll}">Todos</button>
                    </div>
                    <div class="btn-group">
                        <button @click="showManagers = true; showCooks = false; showWaiters = false; showCashiers = false; showAll = false" type="button" class="btn " v-bind:class="{'btn-primary': showManagers && !showAll, 'btn-secondary': !showManagers}">Managers</button>
                    </div>
                    <div class="btn-group">
                        <button @click="showManagers = false; showCooks = true; showWaiters = false; showCashiers = false; showAll = false" type="button" class="btn " v-bind:class="{'btn-primary': showCooks && !showAll, 'btn-secondary': !showCooks}">Cozinheiros</button>
                    </div>
                    <div class="btn-group">
                        <button @click="showManagers = false; showCooks = false; showWaiters = true; showCashiers = false; showAll = false" type="button" class="btn " v-bind:class="{'btn-primary': showWaiters && !showAll, 'btn-secondary': !showWaiters}">Empregados de mesa</button>
                    </div>
                    <div class="btn-group">
                        <button @click="showManagers = false; showCooks = false; showWaiters = false; showCashiers = true; showAll = false" type="button" class="btn " v-bind:class="{'btn-primary': showCashiers && !showAll, 'btn-secondary': !showCashiers}">Caixas</button>
                    </div>
                </div>
            </div>

            <div class="container" v-if="showManagers">
                <h2>Managers</h2>
                <list-managers :managers="managers"></list-managers>
            </div>

            <div class="container" v-if="showCooks">
                <h2>Cozinheiros</h2>
                <list-cooks :cooks="cooks"></list-cooks>
            </div>

            <div class="container" v-if="showWaiters">
                <h2>Empregados de mesa</h2>
                <list-waiters :waiters="waiters"></list-waiters>
            </div>

            <div class="container" v-if="showCashiers">
                <h2>Caixas</h2>
                <list-cashiers :cashiers="cashiers"></list-cashiers>
            </div>

        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                title: 'List Users',
                users: [],
                managers: [],
                cooks: [],
                waiters: [],
                cashiers: [],
                showManagers: true,
                showCooks: true,
                showWaiters: true,
                showCashiers: true,
                showAll: true,
            };
        },
        methods: {

        },
        mounted() {
            axios.get('/api/users').then(response => {
                this.users = response.data.data;

                this.managers = this.users.filter(function (elem) {
                    return elem.type == 'manager';
                });

                this.cooks = this.users.filter(function (elem) {
                    return elem.type == 'cook';
                });

                this.waiters = this.users.filter(function (elem) {
                    return elem.type == 'waiter';
                });
                console.table(this.waiters);

                this.cashiers = this.users.filter(function (elem) {
                    return elem.type == 'cashier';
                });
                console.table(this.cashiers);
            })
            .catch((error) => {
                console.dir(error);
            })
        }
    }
</script>

<style scoped>

</style>