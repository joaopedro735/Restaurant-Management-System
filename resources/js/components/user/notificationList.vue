<template>
    <v-menu
            transition="slide-y-transition"
            bottom
    >
        <!--<v-toolbar color="cyan" dark>
            <v-toolbar-side-icon></v-toolbar-side-icon>

            <v-toolbar-title>Inbox</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>search</v-icon>
            </v-btn>
        </v-toolbar>

        <v-list three-line>
            <template v-for="(item, index) in notifications">
                <v-subheader
                        v-if="item.name"
                        :key="item.name"
                >
                    {{ item.name }}
                </v-subheader>

                <v-list-tile
                        v-else
                        :key="item.msg"
                        avatar
                        @click=""
                >
                </v-list-tile>
            </template>
        </v-list>-->
    </v-menu>
</template>

<script>
    export default {
        name: "notificationList",
        props: ['notifications'],
        data() {
            return {
                fab: false,
            }
        }
    }
</script>

<style scoped>

</style>