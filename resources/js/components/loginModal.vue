<template>
    <div>
        <v-dialog max-width="600" v-model="dialog">
            <v-btn color="white" round flat slot="activator">Login</v-btn>
            <login @close="dialog = false"></login>
        </v-dialog>
    </div>
</template>

<script>
    import Login from "./login";

    export default {
        name: "loginModal",
        data: () => ({
            dialog: false
        }),
        methods: {},
        components: {
            login: Login
        }
    };
</script>

