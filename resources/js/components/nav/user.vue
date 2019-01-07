<template>
    <v-hover class="margin">
        <v-menu
                slot-scope="{ hover }"
                offset-y
        >
            <v-avatar
                    slot="activator"
                    size="48"
            >
                <img v-show="showImg" :class="`elevation-${hover ? 12 : 2}`" :src="img" alt="Avatar" v-on:load="onLoad">
                <v-icon v-show="!showImg" :class="`elevation-${hover ? 2 : 0}`">account_circle</v-icon>
                <v-icon>arrow_drop_down</v-icon>
            </v-avatar>

            <v-list>
                <v-list-tile
                        v-for="(item, index) in items"
                        :key="index"
                        @click=""
                        :to="item.value"
                >
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-menu>
    </v-hover>
</template>

<script>

    export default {
        data: () => ({
            showMenu: false,
            items: [
                {title: 'My Profile', value: "/users/me"},
                {title: "Change Password", value: "/account/changePassword"},
                {title: 'Logout', value: "/logout"},
            ],
            showImg: false

        }),
        methods: {
            getPhoto() {
                this.img = this.$store.state.user.photo_url;
            },
            onLoad() {
                this.showImg = true;
                //this.$forceUpdate();
            }
        },
        computed: {
            img() {
                return this.$store.state.user.photo_url;
            }
        },
        mounted() {
        },
    }
</script>

<style scoped>
    .margin {
        margin-left: 2%;
    }
</style>
