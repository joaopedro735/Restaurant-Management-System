<template>
    <div>
        <section>
            <v-layout
                    column
                    wrap
                    class="my-5"
                    align-center
                    v-show="isLogged"
            >
                <shift-options v-on:shift-start='working = true'
                               v-on:shift-end='working = false'
                               v-show="worker" :user="user"
                               :working="working"></shift-options>
            </v-layout>
            <v-layout
                    column
                    wrap
                    class="my-5"
                    align-center
                    v-show="!isLogged"
            >
                <h1>Sup y'all</h1>
            </v-layout>
        </section>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                user: [],
                worker: false,
                working: false,
                isLogged: false,
            }
        },
        methods: {
            getInformationFromLoggedUser() {
                this.user = this.$store.state.user;
                this.isLogged = !(this.user === null || this.user === undefined);
            },
            isUserAWorker(user){
                if(user.type === "cashier" || user.type === "waiter" || user.type === "cook"){
                    this.worker = true;
                    this.working = user.shift_active === 1;

                }
            }
        },
        created() {
            this.getInformationFromLoggedUser();
        },mounted(){
            if(this.isLogged)
                this.isUserAWorker(this.user);
        }
    }
</script>

<style scoped>
</style>