<template>
    <v-chip>
        <v-menu open-on-hover bottom offset-y>
            <v-btn slot="activator" icon>
                <v-icon>notifications_active</v-icon>
            </v-btn>

            <v-list v-if="notifications.length !== 0" two-line subheader>
                <v-list-tile
                        v-for="(notification, i) in notifications"
                        :key="i"
                        @click="goto(notification.where)">
                    <v-list-tile-content>
                        <v-list-tile-title><strong>{{ notification.name }}</strong> {{": " + notification.msg }}
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
    </v-chip>
</template>

<script>
    export default {
        name: "notificationList",
        props: ['notifications'],
        data() {
            return {
                fab: false,
            }
        },methods: {
            goto(where){
                console.log(where);
                this.$router.push({path: where});
            }
        }
    }
</script>

<style scoped>

</style>