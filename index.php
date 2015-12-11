<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
由于后面gameOver中药用到PHP特性，因此必须在xampp\htdocs环境下调试，因此本文档也采用php后缀
-->
<html>
    <head>
        <title>花千估</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
        
        <!--告诉iOS的浏览器Safari用全屏模式显示，即不显示上面的URL和下面的操作栏-->
	<!--<meta name="apple-mobile-web-app-capable" content="yes" />-->
        <!--告诉iOS的浏览器可以用这个图标作为桌面快捷方式的图标-->
        <link rel="apple-touch-icon" href="img\icon.png" />
        
        <link rel="stylesheet" type="text/css" href="newcss.css"/>
        <script src="js\libs\jquery\jquery.js"></script>
    </head>
    <body>

        <div id="mainWrapper" class="wrapper">  <!--整个显示区域-->
            <p id="title">这是什么花？</p>
            <a id="score">0</a>
            <img id="star" alt="star" width=40 height=40 src="img\star.png"/>
            <div id="frame">
                <img id="flower" alt="flower"/>
            </div>

            <div id="functionarea">
                <button class="answers"></button>
                <button class="answers"></button>
                <button class="answers"></button>
                <button class="answers"></button>
            </div>
        </div>
        <!--引入花名称配置文件，可以通过修改该文件增加花名和图片，js文件本身没有引用外部文件的语法，所以在这里引入-->
        <script src="flowerNames.js"></script>
        <script src="newjavascript.js"></script>
    </body>
</html>
