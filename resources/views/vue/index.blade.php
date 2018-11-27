@extends('master')

@section('title', 'Restaurantte')

@section('content')



<!-- -->
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
                <li v-if="isUserAuthenticated" class="nav-item">
                    <a>
                        <router-link to="/users">Users</router-link>
                    </a>
                </li>
                <li class="nav-item">
                    <a>
                        <router-link to="/login">Entrar</router-link>
                    </a>
                </li>
            </ul>
        </div><!--/.nav-collapse -->
    </div>
</nav>

<router-view></router-view>

@endsection
@section('pagescript')
<script src="js/vue.js"></script>
@stop
