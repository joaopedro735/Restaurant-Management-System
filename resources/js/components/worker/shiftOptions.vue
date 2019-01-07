<template>
    <v-container>
        <v-toolbar>
            <v-dialog
                    v-model="dialog"
                    width="500"
            >
                <v-toolbar-title v-show ="userNotManagerWorking"
                                 slot="activator">
                    <v-chip color="red" text-color="white">
                        <v-icon left>info</v-icon>
                        Report a problem
                    </v-chip>
                </v-toolbar-title>
                <v-card>
                    <v-card-title
                            class="headline grey lighten-2"
                            primary-title>
                        Describe your problem
                    </v-card-title>

                    <v-card-text>
                        <v-text-field
                                label="Your problem"
                                v-model='problem'
                        ></v-text-field>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                                color="error"
                                flat
                                @click="notifyManagers(problem)">
                            Notify management
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-spacer></v-spacer>

            <v-toolbar-items class="sm-and-down">
                <v-btn flat v-show="!userWorking" color="success" @click="beginShift">Begin shift</v-btn>
                <v-btn flat v-show="userWorking" color="error" @click="endShift">End shift</v-btn>
            </v-toolbar-items>
        </v-toolbar>
    </v-container>
</template>

<script>
    export default {
        data: function () {
            return {
                duration: 0,
                dialog: false,
                problem: "",
            };
        },
        methods: {
            beginShift() {
                axios.put('api/users/me/start')
                    .then(response => {
                        this.$store.commit('setUser', response.data.data);
                        this.$socket.emit('user_enter', this.$store.state.user);
                        this.$socket.emit('begin_shift');

                        //setInterval(this.updateTime,1000);
                    })
                    .catch(error => {

                    });
            },
            endShift() {
                axios.put('api/users/me/end')
                    .then(response => {
                        this.$store.commit('setUser', response.data.data);
                        this.$socket.emit('shift_end', this.worker);
                        this.$socket.emit('user_exit', this.$store.state.user);
                    })
                    .catch(error => {

                    });
            },
            notifyManagers(userProblem) {
                this.dialog = false;
                this.problem = "";
                this.$socket.emit('problems_Management', userProblem, '/');
            },
            resetTime() {
                this.duration = 0;
                //clearInterval();
            },
            updateTime() {
                //TODO: TODO DURATION
                this.$store.commit('setDuration', this.duration);
            },
        },
        computed: {
            userNotManagerWorking() {
                return this.$store.state.user.type !== 'manager' && this.$store.state.user.shift_active === 1;
            },
            userWorking() {
                return this.$store.state.user.shift_active === 1;
            }
        }
    }
</script>

<style scoped>

</style>
