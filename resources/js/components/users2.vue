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
                <td>{{ props.item.type }}</td>
                <td>{{ props.item.email }}</td>
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
                    {text: 'Nome', value: 'name', width: '500px'},
                    {text: 'Tipo', value: 'type', width: '80px'},
                    {text: 'Email', value: 'email', width: '200px'},
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
                if (user.type === 'manager') {
                    this.showManagerOptions = true;
                } 
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
