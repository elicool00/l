<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
.container{
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: medium;
    margin: 0; 
    background-color: #9fafca;
    width: auto;
    padding: 30px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.header img{
    width: 300px;
    height: 70px;
}
.content{
    background-color: whitesmoke;
    padding: 10px 20px;
    width: 70%;
    margin: 0 auto;
    border-radius: 10px;
}
.content-img{
    margin: 0 auto;
    width: fit-content;
}
h1, .center{
    text-align: center;
}
.center-content{
    width: 100%;
    display: flex;
    justify-content: center;
}
@media only screen and (max-width:600px) {
    .container{
        padding: 20px 10px;
    }
    .content{
        width: auto;
    }
}
</style>
</head>
<body>
    <div class="container">
        <div class="content">
            <div class="center-content">
                <img src="{{$message->embed(public_path('assets/logo.png'))}}" class="content-img"  alt="LOGO">
            </div>
            <h1 style="text-align: center;">{{$data['title']}}</h1>
            <div class="center-content">
                <img class="content-img" src="{{$message->embed(public_path('assets/img2.png'))}}" alt="IMAGE">
            </div>
            <p style="text-align: center;">{{$data['text_1']}}<br>{{$data['text_2']}}</p>
            
            <p style="text-align: center;">{{$data['text_3']}}</p>
            <p>Regards,<br>Laramailer</p>
            <hr>
            <p style="font-size: small">
                Check out <br>
                <a href="{{env("FRONT_URL")}}">Laramailer</a>
            </p>
        </div>
    </div>
</body>
</html>
