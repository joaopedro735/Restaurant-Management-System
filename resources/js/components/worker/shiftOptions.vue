<template>
    <v-container>
        <v-toolbar>
            <v-toolbar-items class="sm-and-down">
                <v-dialog
                        v-model="dialog"
                        width="500"
                >
                    <v-toolbar-title v-if="worker.type !== 'manager' && this.working === true"
                                     slot="activator">
                        <v-chip color="red" text-color="white">
                            <v-icon left>info</v-icon>
                            Report a problem
                        </v-chip>
                    </v-toolbar-title>
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
            </v-toolbar-items>
            <v-spacer></v-spacer>
            <v-toolbar-items class="sm-and-down">
                <v-btn flat v-show="this.working === false" color="success" @click="beginShift">Begin shift</v-btn>
                <v-btn flat v-show="this.working === true" color="error" @click="endShift">End shift</v-btn>
            </v-toolbar-items>
        </v-toolbar>
    </v-container>
</template>

<script>
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

                        this.$socket.emit('user_enter', this.$store.state.user);
                        //setInterval(this.updateTime,1000);
                    })
                    .catch(error => {

                    });
            },
            endShift() {
                axios.put('api/users/me/end')
                    .then(response => {
                        this.$store.commit('setUser', response.data.data);
                        this.$socket.emit('shift-end', this.worker);
                        this.working = false;

                        this.$socket.emit('user_exit', this.$store.state.user);
                    })
                    .catch(error => {

                    });
            },
            notifyManagers(userProblem) {
                this.dialog = false;
                this.$socket.emit('problems_Management', userProblem, this.worker, 'home');
            },
            resetTime() {
                this.duration = 0;
                //clearInterval();
            },
            updateTime() {
                //TODO: TODO DURATION
                this.$store.commit('setDuration', this.duration);
            },
            something() {
                /*axios.get('api/meals/' + this.worker.id + '/average')
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.log(error.data);
                    })*/
            }
        }
    }
</script>

<style scoped>

</style>
