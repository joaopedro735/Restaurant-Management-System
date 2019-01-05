@extends('master')

@section('title', 'Restaurantte')

@section('content')
    <v-app>
        <main-nav :notifications='notifications'></main-nav>

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
