<template>
    <v-card>
        <v-card-title class="headline info white--text" primary-title>
            Users
            <v-spacer></v-spacer>
            <v-btn fab dark v-if="showManagerOptions" slot="activator" @click="showCreateAccount = true">
                <v-icon>add</v-icon>
            </v-btn>
        </v-card-title>

        <v-data-table
                :headers="headers"
                :items="users"
                :pagination.sync="pagination"
                :total-items="totalUsers"
                :rows-per-page-items="rowsPerPageItems"
                :loading="loading"
                class="elevation-1">
            <template slot="items" slot-scope="props">
                <td>
                    <v-avatar size="56px">
                        <img v-bind:src=props.item.photo_url alt="avatar">
                    </v-avatar>
                </td>
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.username }}</td>
                <td>{{ props.item.type }}</td>
                <td>{{ props.item.email }}</td>
                <td class="text-xs-right">
                    <span>
                        <v-btn small round color="warning"
                               v-if="showManagerOptions & user.email != props.item.email & !props.item.blocked"
                               @click="blockUser(props.index, props.item)">
                            <v-icon>lock</v-icon>
                            &nbsp; Block
                        </v-btn>
                        <v-btn small round color="info"
                               v-if="showManagerOptions & user.email != props.item.email & props.item.blocked"
                               @click="unblockUser(props.index, props.item)">
                            <v-icon>lock_open</v-icon>
                            &nbsp; Unblock
                        </v-btn>
                    </span>
                    <span>
                        <v-btn small round color="error" v-if="showManagerOptions & user.email != props.item.email"
                               @click="deleteUser(props.index, props.item)">
                            <v-icon>delete</v-icon>
                            &nbsp; Delete
                        </v-btn>
                    </span>
                </td>
            </template>
        </v-data-table>

        <!-- <div class="fab-container text-xs-center">
            <v-btn @click="showCreateAccount = true" fab dark >
                <v-icon>add</v-icon>
            </v-btn>
        </div> -->

        <create-account :visible="showCreateAccount" @close="showCreateAccount = false"></create-account>
    </v-card>
</template>

<script>
    import CreateAccount from './createUser'

    export default {
        data() {
            return {
                totalUsers: 0,
                user: {},
                users: [],
                loading: true,
                pagination: {},
                rowsPerPageItems: [15, 25, 50, 100],
                headers: [
                    {text: '', value: 'photo_url', align: 'left', sortable: false, width: '60px'},
                    {text: 'Nome', value: 'name', width: '400px'},
                    {text: 'Username', value: 'username', width: '200px'},
                    {text: 'Tipo', value: 'type', width: '150px'},
                    {text: 'Email', value: 'email', width: '400px'},
                    {text: '', value: 'actions'},
                ],
                showCreateAccount: false,
                showManagerOptions: false
            }
        },
        watch: {
            pagination: {
                handler() {
                    this.getDataFromApi()
                        .then(data => {
                            this.users = data.data.users;
                            this.totalUsers = data.data.totalUsers;
                        })
                },
                deep: true
            }
        },
        methods: {
            getDataFromApi() {
                this.loading = true;
                return axios.get('/api/users', {
                    params: {
                        page: this.pagination.page,
                        rowsPerPage: this.pagination.rowsPerPage
                    }
                }).then((usersRes) => {
                    console.log(usersRes.data.meta);
                    return {
                        data: {
                            users: usersRes.data.data,
                            totalUsers: usersRes.data.meta.total
                        }
                    }
                }).catch((error) => {
                    console.log(error);
                }).finally(() => {
                    this.loading = false;
                });
            },
            showCreateAccount1() {
                this.showCreateAccount = !this.showCreateAccount;
            },
            getInformationFromLoggedUser() {
                this.user = this.$store.state.user;
            },
            isUserAWorker(user) {
                if (user.type === 'manager' && !user.blocked) {
                    this.showManagerOptions = true;
                }
            },
            blockUser(index, user) {
                this.loading = true;

                axios.put('/api/users/block/' + user.id)
                    .then((response) => {
                        Vue.set(this.users, index, response.data.data);

                        let message = 'Your account has been blocked. You cannot access the application';

                        // Emit block user event
                        this.$socket.emit('user_blocked', message, user);

                        this.$toasted.info('User blocked',
                            {
                                icon: 'info',
                            }
                        );
                    }).catch((error) => {
                    this.$toasted.error(error,
                        {
                            icon: 'error',
                        }
                    );
                }).finally(() => {
                    this.loading = false;
                });
            },
            unblockUser(index, user) {
                this.loading = true;

                axios.put('/api/users/unblock/' + user.id)
                    .then((response) => {
                        Vue.set(this.users, index, response.data.data);

                        let message = 'Your account has been unblocked. You can now access the application';

                        // Emit block user event
                        this.$socket.emit('user_unblocked', message, user);

                        this.$toasted.info('User unblocked',
                            {
                                icon: 'info',
                            }
                        );
                    }).catch((error) => {
                    this.$toasted.error(error,
                        {
                            icon: 'error',
                        }
                    );
                }).finally(() => {
                    this.loading = false;
                });
            },
            deleteUser(index, user) {
                this.loading = true;

                axios.delete('/api/users/' + user.id)
                    .then((response) => {
                        this.totalUsers--;

                        this.$toasted.success('User deleted',
                            {
                                icon: 'info',
                            }
                        );

                        this.users.splice(index, 1);
                    }).catch((error) => {
                    console.log(error);

                    this.$toasted.error(error,
                        {
                            icon: 'error',
                        }
                    );
                }).finally(() => {
                    this.loading = false;
                });
            }
        },
        mounted() {
            this.getInformationFromLoggedUser();
            this.isUserAWorker(this.user);
        },
        components: {
            'create-account': CreateAccount
        }
    }
</script>

<style scoped>
    .fab-container {
        position: fixed;
        bottom: 13%;
        right: 1%;
    }
</style>
