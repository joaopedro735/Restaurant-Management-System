<template>
    <v-container>
        <v-dialog
                v-model="dialog"
                width="500"
        >
            <v-btn v-show="this.working === true"
                   slot="activator"
                   color="error"
                   right
                    >Report a problem
                <v-icon right>info</v-icon>
            </v-btn>

            <v-card>
                <v-card-title
                        class="headline grey lighten-2"
                        primary-title
                >
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
                            @click="notifyManagers(problem)"
                    >
                        Notify management
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-toolbar>
            <v-toolbar-items class="sm-and-down">
            </v-toolbar-items>
            <v-spacer></v-spacer>
            <v-toolbar-items class="sm-and-down">
                <v-btn flat v-show="this.working === true">{{this.$store.state.duration}}</v-btn>
                <v-btn flat v-show="this.working === false" color="success" @click="beginShift">Begin shift</v-btn>
                <v-btn flat v-show="this.working === true" color="error" @click="endShift">End shift</v-btn>
            </v-toolbar-items>
        </v-toolbar>
    </v-container>
</template>

<script>
    import moment from 'vue-moment';

    Vue.use(moment);

    export default {
        props: ['user', 'working'],
        data: function () {
            return {
                worker: this.user,
                duration: 0,
                dialog: false,
                problem: "",
            };
        },
        methods: {
            beginShift() {
                let config = {
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.state.token,
                        'Accept': 'application/json'
                    }
                };
                axios.put('api/users/me/start', config)
                    .then(response => {
                        this.$store.commit('setUser', response.data.data);
                        this.$socket.emit('begin_shift', this.worker);
                        this.working = true;
                        setInterval(this.updateTime,1000);
                    })
                    .catch(error => {

                    });
            }, endShift() {
                let config = {
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.state.token,
                        'Accept': 'application/json'
                    }
                };
                axios.put('api/users/me/end', config)
                    .then(response => {
                        this.$store.commit('setUser', response.data.data);
                        this.$socket.emit('shift-end', this.worker);
                        this.working = false;
                    })
                    .catch(error => {

                    });
            }, notifyManagers(userProblem) {
                this.dialog = false;
                this.$socket.emit('problems_Management', userProblem, this.worker);
            }, resetTime() {
                this.duration = 0;
                //clearInterval();
            }, updateTime() {
                //TODO: TODO DURATION
                this.duration = moment(this.worker.last_shift_start).toNow(true);
                this.$store.commit('setDuration', this.duration);
            }
        }, created() {
            this.$store.commit('loadTokenAndUserFromSession');
        }
    }
</script>

<style scoped>

</style>