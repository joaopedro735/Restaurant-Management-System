<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>@yield('title')</title>
        @yield('extrastyles')
        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
        

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
        
        <!-- <hr>
        
        <footer class="footer">
            <div class="text-center center-block">
                <a href="https://www.facebook.com/"><i id="social-fb" class="fa fa-facebook-square fa-3x social"></i></a>
                <a href="https://twitter.com/"><i id="social-tw" class="fa fa-twitter-square fa-3x social"></i></a>
                <a href="mailto:rest@urantte.tk"><i id="social-em" class="fa fa-envelope-square fa-3x social"></i></a>
            </div>
        </footer>-->

        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
    </body>
</html>
