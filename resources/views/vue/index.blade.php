@extends('master')

@section('title', 'Restaurantte')

@section('content')
    <v-app>
        <v-toolbar class="primary lighten-1">
            <v-toolbar-title>Restaurantte</v-toolbar-title>

            <v-btn flat exact :to="{name: 'home'}">Home</v-btn>
            <v-btn flat v-show="this.$store.state.token" to="/menu">Menu</v-btn>
            <v-btn flat v-show="this.$store.state.token" to="/users">Users</v-btn>

            <v-spacer></v-spacer>


            {{--<v-btn flat v-show="!this.$store.state.token" to="/login">Login</v-btn>--}}
            <login-component v-show="!this.$store.state.token"></login-component>
            <v-btn flat v-show="this.$store.state.token" to="/logout">Logout</v-btn>
        </v-toolbar>

        <v-content>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-content>
        <footer-component></footer-component>
    </v-app>
@endsection
@section('pagescript')
<script src="/js/vue.js"></script>
@stop