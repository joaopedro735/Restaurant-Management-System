<template>
        <v-menu open-on-hover bottom offset-y>
            <v-chip slot="activator" icon>
                <v-avatar class="red" v-if="notifications.length > 0">
                    <strong>{{ notifications.length }}</strong>
                </v-avatar>
                <v-icon>notifications_active</v-icon>
            </v-chip>

            <v-list v-if="notifications.length !== 0" two-line subheader>
                <v-list-tile
                        v-for="(notification, i) in notifications"
                        :key="i"
                        @click="goto(notification.where)">
                    <v-list-tile-content>
                        <v-list-tile-title>
                            <strong>{{ notification.name }}</strong> {{": " + notification.msg }}
                            <v-icon @click="deleteNotification(i)" class="text-xs-center">clear</v-icon>
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="deleteAllNotifications()">
                    <v-list-tile-content>
                        <v-list-tile-title class="text-xs-center">
                                <v-icon>clear</v-icon>
                                &nbsp; Clear all
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
            <v-list v-else>
                <v-list-tile>
                    <v-list-tile-content>
                        <v-list-tile-title>
                            <strong>Nothing to see here</strong>
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
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
        },
        methods: {
            goto(where){
                console.log(where);
                this.$router.push({path: where});
            },
            deleteAllNotifications() {
                //this.$root.notifcations = [];
                this.$root.notifications.splice(0, this.$root.notifications.length);
            },
            deleteNotification(i) {
                //this.$root.notifcations.splice(i, 1);
                this.$delete(this.notifications, i)
            }
        }
    }
</script>

<style scoped>

</style>
