@extends('master')

@section('title', 'Restaurantte')

@section('content')
    <v-app>
        <v-toolbar class="primary lighten-1">
            <v-toolbar-title>Restaurantte</v-toolbar-title>

            <v-btn headline color="white" flat round exact :to="{name: 'home'}">Home</v-btn>
            <v-btn color="white" flat round v-show="this.$store.state.token" to="/menu">Menu</v-btn>
            <v-btn color="white" flat round v-show="this.$store.state.token" to="/users" exact>Users</v-btn>
            <v-btn color="white" flat round v-show="this.$store.state.token" to="/orders">Orders</v-btn>
            <v-btn color="white" flat round v-show="this.$store.state.token" to="/management/tables">Tables</v-btn> 
            {{-- <v-overflow-btn color="white" flat round :items="['Tables', 'Orders', 'Menu']" label="Overflow Btn"></v-overflow-btn> --}}
      </v-flex>

            <v-spacer></v-spacer>


            {{--<v-btn flat v-show="!this.$store.state.token" to="/login">Login</v-btn>--}}

            {{--<login-component v-show="!this.$store.state.token"></login-component>--}}
            <login-modal v-show="!this.$store.state.token"></login-modal>
            <v-btn flat v-show="this.$store.state.token" to="/users/me">Profile</v-btn>
            <user-nav v-if="this.$store.state.user"></user-nav>
        </v-toolbar>

        <v-content>
            <v-container fluid>
                <router-view>
                </router-view>
            </v-container>
        </v-content>
        <footer-component></footer-component>
    </v-app>
@endsection
@section('pagescript')
<script src="/js/vue.js"></script>
@stop
