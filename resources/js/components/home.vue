<template>
    <div>
        <section>
            <v-layout
                    column
                    align-center
                    v-if="isLogged === true"
            >

                <shift-options v-on:shift-start='working = true'
                               v-on:shift-end='working = false'
                               v-if="isLogged === true && worker === true" :user="user"
                               :working="working"></shift-options>

            </v-layout>

            <v-layout
                    column
                    align-center
                    v-if="isLogged === false || worker === false"
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
                working: false,
            }
        },
        methods: {
            getInformationFromLoggedUser() {
                this.user = this.$store.state.user;
            }, addNotification() {
                console.log("parent")
            }
        },
        created() {
            this.getInformationFromLoggedUser();
        },
        mounted(){
            this.getInformationFromLoggedUser();
        },
        computed: {
            isLogged() {
                return this.$store.state.user !== null && this.$store.state.user !== undefined;
            },
            worker() {
                if (this.$store.state.user.type === "cashier" || this.$store.state.user.type === "waiter" || this.$store.state.user.type === "cook") {
                    console.log("worker= true")
                    this.working = this.$store.state.user.shift_active === 1;
                    return true;
                }
                console.log("worker=false")
                return false;
            }
        }
    }
</script>

<style scoped>
</style>