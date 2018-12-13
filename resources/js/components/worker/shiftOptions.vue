<template>
    <v-toolbar>
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat v-show="isWorking" color="success" @click="">Begin shift</v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat></v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
    export default {
        props:['user'],
        data: function(){
            return {
                name: "shiftOptions",
                isWorking: true,
            };
        },
        methods:{

        },

    }
</script>

<style scoped>

</style>