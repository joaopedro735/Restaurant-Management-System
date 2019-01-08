<template>
    <div>
        <section>
            <v-layout
                column
                align-center
                v-if="isLogged === true">

                <shift-options v-if="isLogged === true && worker === true && !$store.state.user.blocked"></shift-options>
            </v-layout>

            <v-layout
                column
                align-center
                v-if="isLogged === false || worker === false">
                    <h1>Sup y'all</h1>
            </v-layout>
        </section>
    </div>
</template>

<script>
    export default {
        methods: {
            addNotification() {
                console.log("parent")
            }
        },
        computed: {
            isLogged() {
                return this.$store.state.user !== null && this.$store.state.user !== undefined;
            },
            worker() {
                if (this.$store.state.user.type === "manager" || this.$store.state.user.type === "cashier" || this.$store.state.user.type === "waiter" || this.$store.state.user.type === "cook") {
                    console.log("worker= true");
                    return true;
                }
                console.log("worker=false");
                return false;
            }
        }
    }
</script>

<style scoped>
</style>
