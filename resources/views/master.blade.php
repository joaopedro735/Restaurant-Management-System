<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>@yield('title')</title>
        @yield('extrastyles') 
        <!-- Latest compiled and minified CSS & JS -->
        <!-- <link rel="stylesheet" href="{{ URL::asset('css/app.css') }}"> -->
        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
        <link href="https://getbootstrap.com/docs/3.3/dist/css/bootstrap.min.css" rel="stylesheet">
        

        <style>
            body {
                padding-top: 51px;
            }
            .footer {
                /** Whole lenght
                    position: sticky;
                    right: 0;
                    bottom: 0;
                    left: 0;
                **/
                position:fixed;
                bottom:0;
                right:0;
                padding: 1rem;
                background-color: #F8F8F8;
                text-align: center;
                border-style: solid;
                border-width: 1px 0px 0px 1px;
                border-color: #E7E7E7;
            }         
            .social:hover {
                -webkit-transform: scale(1.1);
                -moz-transform: scale(1.1);
                -o-transform: scale(1.1);
            }
            .social {
                -webkit-transform: scale(0.8);
                /* Browser Variations: */
                
                -moz-transform: scale(0.8);
                -o-transform: scale(0.8);
                -webkit-transition-duration: 0.5s;
                -moz-transition-duration: 0.5s;
                -o-transition-duration: 0.5s;
            }
            
            #social-fb:hover {
                color: #3B5998;
            }
            #social-tw:hover {
                color: #4099FF;
            }
            #social-gp:hover {
                color: #d34836;
            }
            #social-em:hover {
                color: #f39c12;
            }
            .header-banner {
                background-image: url('storage/site_images/banner_cut.jpg');
            }
        </style>

    </head> 
    <body>
        <!--<div class="banner">
            <img src="storage/site_images/banner_cut.jpg">
        </div>-->
        <header class="py-5 bg-image-full header-banner" >
            <img class="img-fluid d-block mx-auto" src="storage/site_images/ipl_white.png" alt="">
        </header>
        
        <div class="container-fluid" id="app">
            @yield('content')
        </div>
        
        @yield('pagescript') 
        
        <hr>
        
        <footer class="footer">
            <div class="text-center center-block">
                <a href="https://www.facebook.com/"><i id="social-fb" class="fa fa-facebook-square fa-3x social"></i></a>
                <a href="https://twitter.com/"><i id="social-tw" class="fa fa-twitter-square fa-3x social"></i></a>
                <a href="mailto:rest@urantte.tk"><i id="social-em" class="fa fa-envelope-square fa-3x social"></i></a>
            </div>
        </footer>
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="https://getbootstrap.com/docs/3.3/dist/js/bootstrap.min.js"><\/script>')</script>
        <script src="https://getbootstrap.com/docs/3.3/dist/js/bootstrap.min.js"></script>
    </body>
</html>
