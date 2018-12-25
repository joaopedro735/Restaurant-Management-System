<template>
    <div>

        <v-dialog max-width="600" v-model="dialog">
            <v-btn flat slot="activator">Login</v-btn>
            <login></login>
        </v-dialog>
    </div>
</template>

<script>
    import Login from "./login";

    export default {
        name: "loginModal",
        data: () => ({
            dialog: false,
        }),
        components: {
            "login": Login
        }
    }
</script>

<style scoped>

</style>