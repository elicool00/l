<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{{env('APP_NAME')}}</title>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
        <link rel="shortcut icon" type="image/x-icon" href="{{asset('assets/icon.png')}}"/>
        <style>
            body {font-family: 'Nunito', sans-serif;width: 100%;height: 100%;background: #9fafca;}
            .absolute-center{position: absolute;width: fit-content;top: 50%;left: 50%;transform: translate(-50%, -50%);}
            .flex{display: flex;}.justify-center{justify-content: center;}
        </style>
    </head>
    <body>
        <div class="absolute-center">
            <div class="" style="margin: auto; width: fit-content;">
                <img src="{{asset('assets/logo.png')}}" alt="" class="flex justify-center" style="margin: auto;">
                <p style="color: #051571c6; font-size: xx-large; font-weight: bold;">{{env('APP_NAME')}} API is running...</p>
                <div style="display: flex; justify-content: center;">
                    <a href="{{route('dashboard')}}" style="color: #0e387a;">Go to dashboard</a>
                </div>
            </div>
        </div>
    </body>
</html>
