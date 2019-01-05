<template>
    <div class="text-xs-center">
        <v-dialog width="500" v-model="show" @click.stop="show = false">
            <v-card>
                <v-card-title class="headline blue darken-4 white--text" primary-title color="purple">
                    Confirm create order
                </v-card-title>

                <v-divider light></v-divider>

                <v-card-text>
                    You have 5 seconds to confirm the order. Otherwise it will be deleted          
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn small round color="info" @click="confirm()">
                        <v-icon>check</v-icon>
                        &nbsp;Confirm
                    </v-btn>
                    <v-btn small round color="error" @click="cancel()">
                        <v-icon>cancel</v-icon>
                        &nbsp;Cancel
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    function initialState() {
        return {
            title: 'Confirm order',
            timer: ''
        };
    }

    export default {
        name: "confirmOrder",
        props: {
            visible: Boolean,
        },
        data: () => {
            return initialState();
        },
        methods: {
            startTimer() {
                console.log('Started timer');
                this.timer = setTimeout(this.cancel(), 5000);
            },
            close() {
                this.$emit('close');
            },
            confirm() {
                console.log('Confirmed. Should stop timer');
                clearTimeout(this.timer);
                this.$emit('save');
                this.close();
            },
            cancel() {
                console.log('Canceled. Should stop timer');
                clearTimeout(this.timer);
                this.$emit('delete')
                this.close();
            }
        },
        beforeUpdate() {
            this.startTimer();
        },
        computed: {
            show: {
                get() {
                    return this.visible;
                },
                set(value) {
                    if (!value) {
                        this.clear();                       
                        
                        this.$emit('close');
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>