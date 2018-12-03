@extends('master')

@section('title', 'Restaurantte')

@section('content')


<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <a class="navbar-brand" href="/">Restaurantte</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
                <li class="active">
                    <a>
                        <router-link to="/menu">Home</router-link>
                    </a>
                </li>
                <li class="nav-item">
                    <a>
                        <router-link to="/menu">Menu</router-link>
                    </a>
                </li>

                {{-- SEM STORED TOKENS --}}

                {{-- USERS --}}
                {{-- <li v-if="isUserAuthenticated" class="nav-item">
                    <a>
                        <router-link to="/users">Users</router-link>
                    </a>
                </li> --}}

                {{-- LOGIN LINK --}}
                {{-- <li v-if="!isUserAuthenticated" class="nav-item">
                    <a>
                        <router-link to="/login">Entrar</router-link>
                    </a>
                </li> --}}

                {{-- LOGOUT LINK --}}
                {{-- <li v-if="isUserAuthenticated" class="nav-item">
                    <a>
                        <router-link to="/logout">Logout</router-link>
                    </a>
                </li> --}}

                {{-- COM STORED TOKENS --}}
                {{-- USERS --}}
                <li v-show="this.$store.state.token" class="nav-item">
                    <a>
                        <router-link to="/users">Users</router-link>
                    </a>
                </li>

                {{-- ACCOUNT PAGE LINK --}}
                <li v-show="this.$store.state.token" class="nav-item">
                    <a>
                        <router-link to="/account">Conta</router-link>
                    </a>
                </li>

                {{-- LOGIN LINK --}}
                <li v-show="!this.$store.state.token" class="nav-item">
                    <a>
                        <router-link to="/login">Entrar</router-link>
                    </a>
                </li>

                {{-- LOGOUT LINK --}}
                <li v-if="this.$store.state.token" class="nav-item">
                    <a>
                        <router-link to="/logout">Logout</router-link>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>

<router-view></router-view>

@endsection
@section('pagescript')
<script src="js/vue.js"></script>
@stop
