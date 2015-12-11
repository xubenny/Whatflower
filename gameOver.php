<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <title>花千估</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" type="text/css" href="newcss.css"/>
    </head>
    <body>
        <div id="gameOverWrapper" class="wrapper">
            <div id="gameOver">Game Over</div>
            <?php
                define("DBHOST", "w.rdc.sae.sina.com.cn");
                define("DBPORT", "3307");
                define("DBNAME", "app_whatflower");
                define("DBUSER", "2nk0wj2jzy");
                define("DBPASS", "lmyz4lhk1yh1i1i5l0yz41mwx2mkl4xz5lkyy41m");

                //初始化数据库连接
                try {
                    //$pdo = new PDO("mysql:host=localhost; dbname=WhatFlower","root", "root");
                    $pdo = new PDO("mysql:host=".DBHOST."; port=".DBPORT."; dbname=".DBNAME, DBUSER, DBPASS);
                } catch (Exception $ex) {
                    echo 'ERROR: '. $ex->getMessage();
                }
                
                //玩家提交了自己的名字
                if(filter_has_var(INPUT_POST, "playerName")) {
                    insertToTop5();
                    print "<div id='hiScore'>恭喜您进入了前五名！</div>";
                }
                //刚刚从主界面转过来
                else {
                    $score = filter_input(INPUT_GET, "score");

                    if(scoreInTop5($score)) {
                        print "<div id='hiScore'>恭喜您进入了前五名！</div>";
                        inputPlayerName();
                    }
                    else if ($score == 0) {
                        print "<div id='hiScore'>一个都没猜对，加油哟！</div>";
                    }
                    else if ($score <= 19) {
                        print "<div id='hiScore'>猜对了 $score 种花，不错哟</div>";
                    }
                    else if ($score <= 49) {
                        print "<div id='hiScore'>太牛了，猜对了 $score 种花</div>";
                    }
                    else {
                        print "<div id='hiScore'>你简直是花王，猜对了 $score 种花</div>";
                    }
                }
                showTop5();
                
                function insertToTop5() {
                    global $pdo;
                    $name = filter_input(INPUT_POST, "playerName");
                    $score = filter_input(INPUT_POST, "score");
                    try {
                        $smt = $pdo->prepare("INSERT INTO top_players VALUES (null, ?, ?)");
                        if(!$smt->execute(array($name, $score)))
                        {    print_r($smt->errorInfo());
                        }
                    } catch (Exception $ex) {
                        echo 'ERROR: '. $ex->getMessage();
                    }
                }
                
                function scoreInTop5($score) {
                try {
                    global $pdo;
                    $smt = $pdo->prepare("SELECT * FROM top_players ORDER by score DESC");
                    if(!$smt->execute())
                    {    print_r($smt->errorInfo());
                    }

                    //有匹配记录
                    if($result = $smt->fetchAll()) {
                        if($score > $result[4]['score']) {
                            $inTop5 = true;
                        }
                        else {
                            $inTop5 = false;
                        }
                    }
                } catch (Exception $ex) {
                    echo 'ERROR: '. $ex->getMessage();
                }
                    return $inTop5;
                }

                function inputPlayerName() {
                    global $score;
                    $output =<<<HERE
                        <form action="" method="post">
                            <label>您的名字</label>
                            <input type="text" name="playerName" id="playerName"/>
                            <input type="hidden" name="score" value=$score/>
                            <button type = "submit" id="inputNameGo">Go</button>
                        </form>
HERE;
                    print $output;
                }
                
                function showTop5() {
                    try {
                        global $pdo;
                        $smt = $pdo->prepare("SELECT * FROM top_players ORDER by score DESC");
                        if(!$smt->execute())
                        {    print_r($smt->errorInfo());
                        }
                        $result = $smt->fetchAll();
                    } catch (Exception $ex) {
                        echo 'ERROR: '. $ex->getMessage();
                    }
                    $output = "<div id='topPlayers'> \n";
                    $output .= "<div id='topPlayersName'> \n";
                    for($i=0; $i<5; $i++)
                        $output .= "<p>".$result[$i]['name']."</p> \n";
                    $output .= "</div>\n";

                    $output .= "<div id='topPlayersScore'> \n";
                    for($i=0; $i<5; $i++)
                        $output .= "<p>".$result[$i]['score']."</p> \n";
                    $output .= "</div>\n";
                    $output .= "</div>\n";
                    
                    print $output;
                }
            ?>            
            <button id="playAgain" onClick="javascript:window.location.href='index.php';">Play Again</button>
        </div>
    </body>
</html>
