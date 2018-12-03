<template>
    <div class="container">

        <div class="row">
            <h1 class="text-center">Conta de utilizador</h1>
        </div>

        <div class="row">
            <div class="col-md-3 ">
                <div class="list-group ">
                    <a @click="dadosPessoais = true; turnos = false; seguranca = false; definicoes = false" class="list-group-item list-group-item-action " v-bind:class="{'active': dadosPessoais}">Dados pessoais</a>
                    <a @click="dadosPessoais = false; turnos = true; seguranca = false; definicoes = false" class="list-group-item list-group-item-action " v-bind:class="{'active': turnos}">Turnos</a>
                    <a @click="dadosPessoais = false; turnos = false; seguranca = true; definicoes = false" class="list-group-item list-group-item-action " v-bind:class="{'active': seguranca}">Segurança</a>
                    <a @click="dadosPessoais = false; turnos = false; seguranca = false; definicoes = true" class="list-group-item list-group-item-action " v-bind:class="{'active': definicoes}">Definições</a>
                </div>
            </div>
            <!-- TEMPLATES HERE -->
            <edit-user :user="currentUser" :dados-pessoais="dadosPessoais" @save-user="saveUser"></edit-user>
            <change-password :user="user" :seguranca="seguranca" @change-password="changeUserPassword"></change-password>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function() {
            return {
                title: 'Conta de utilizador',
                user: {
                    name: 'First Manager',
                    email: 'm0@mail.com',
                    username: 'm0'
                },
                currentUser: {},
                dadosPessoais: true,
                turnos: false,
                seguranca: false,
                definicoes: false
            };
        },
        methods: {
            saveUser: function() {
                // TODO: Guardar utilizador
            },
            changeUserPassword: function() {

            }
        },
        mounted() {
            this.currentUser = Object.assign({}, this.user);
        }
    }

</script>

<style scoped>

</style>
