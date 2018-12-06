<template>
    <v-card>
        <v-card-title class="headline light-blue lighten-3"
            primary-title
        >Users
        </v-card-title>
        <v-data-table
                :headers="headers"
                :items="users"
                :pagination.sync="pagination"
                :total-items="totalUsers"
                :loading="loading"
                class="elevation-1"
        >
            <template slot="items" slot-scope="props">
                <td>
                    <v-avatar size="56px">
                        <img v-bind:src=props.item.photo_url
                             alt="miau"
                        >
                    </v-avatar>
                </td>
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.type }}</td>
                <td>{{ props.item.email }}</td>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
    export default {
        data () {
            return {
                totalUsers: 0,
                users: [],
                loading: true,
                pagination: {},
                headers: [
                    { text: '', value: 'photo_url', align: 'left', sortable: false, width: '60px' },
                    { text: 'Nome', value: 'name', width: '500px'},
                    { text: 'Tipo', value: 'type', width: '80px'},
                    { text: 'Email', value: 'email', width: '200px'},
                ]
            }
        },
        watch: {
            pagination: {
                handler () {
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
            getDataFromApi () {
                this.loading = true;
                return axios.all([
                    axios.get('/api/users', {params: {page: this.pagination.page, rowsPerPage: this.pagination.rowsPerPage}}),
                    axios.get('/api/users', {params: {nmr: 0}})
                ]).then(axios.spread((usersRes, nmrRes) => {
                    this.loading = false;
                    return {
                        data: {
                            users: usersRes.data.data,
                            totalUsers: nmrRes.data
                        }
                    }
                }));
            }
        }
    }
</script>