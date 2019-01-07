<template>
    <v-layout>
        <v-flex xs12 sm6 offset-sm3>
            <v-card>
                <v-img
                        height="200px"
                        :src="getPhoto(user.photo_url)"
                >
                </v-img>
                <v-card-title>
                    <div>
                        <span class="grey--text">{{user.email}}</span><br>
                        <span v-model="user.name">{{user.name}}</span><br>
                        <span v-model="user.type">{{user.type | capitalize}}</span>
                    </div>
                </v-card-title>
                <v-card-actions>
                    <v-btn flat color="blue" @click="showEdit = true">Edit</v-btn>
                </v-card-actions>
                <edit-user v-show="showEdit" v-bind:user="user" v-on:user-cancel="showEdit=false" v-on:user-saved="userSaved"></edit-user>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        data: () => {
            return {
                showEdit: false,
            };
        },
        methods: {
            getPhoto(photo_url){
                return "/" + photo_url;
            },
            userSaved(){
                this.showEdit=false;
            },

        },
        computed: {
            user(){
                return this.$store.state.user;
            }
        }
    };

</script>

<style scoped>

</style>
