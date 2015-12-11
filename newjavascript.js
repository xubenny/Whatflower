/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global FLOWER_COUNT, flowerNames */

var lifeCount = 3;  //最多可以出错多少次

$(document).ready(function(){
    newFlower();

    $(".answers").on("click", onSelect);
    //正式上线whatflower.sinaapp.com版本没有彩蛋
    //$("#star").on("click", onStar);
    
});

function newFlower(){
    //随机选择一个图像显示出来
    var imgIndex = Math.floor(Math.random() * FLOWER_COUNT);
    var fileName = "img/" + imgIndex.toString() + ".jpg";
    $("#flower").attr("src", fileName);
    $("#flower").show("slow");

    //把正确答案随机显示在四个按钮中的某一个上
    var btnIndex = Math.floor(Math.random() * 4);
    setBtnText(btnIndex, flowerNames[imgIndex], "true");
    
    //复制一个花名数组，随机打乱顺序，选前三个作为陪衬答案
    var randomFlowerNames = new Array();
    //不能直接数组复制，因为原始数组比FLOWER_COUNT要长
    for(var i=0,j=0; j< FLOWER_COUNT-1; i++,j++) {
        if(i === imgIndex)   //不把正确答案复制过来
            i++;
        randomFlowerNames[j] = flowerNames[i];
    }
    //排序参考的参数是正数和负数的几率均等，所以两个元素的顺序是随机的，达到打乱顺序的效果
    randomFlowerNames.sort(function(){ return 0.5 - Math.random();});
    
    //把陪衬的答案依次写到3个按钮上
    var fakeBtnIndex = 0;
    if(fakeBtnIndex === btnIndex)
        fakeBtnIndex++;
    setBtnText(fakeBtnIndex, randomFlowerNames[0], "false");
    
    fakeBtnIndex++;
    if(fakeBtnIndex === btnIndex)
        fakeBtnIndex++;
    setBtnText(fakeBtnIndex, randomFlowerNames[1], "false");
    
    fakeBtnIndex++;
    if(fakeBtnIndex === btnIndex)
        fakeBtnIndex++;
    setBtnText(fakeBtnIndex, randomFlowerNames[2], "false");
}

//设置按钮的文字，并把该答案是否正确答案记录在data域
function setBtnText(btnIndex, name, data) {
    var $button = $(".answers").eq(btnIndex);
    //调整按钮文字大小
    if(name.length <= 3)
        $button.css({fontSize: '28px'});
    else if(name.length === 4)
        $button.css({fontSize: '23px'});
    else if(name.length === 5)
        $button.css({fontSize: '20px'});
    else
        $button.css({fontSize: '17px'});
    
    $button.html(name);
    $button.data("answer", data);
}


function onSelect() {
    var $button = $(this);
    //如果选择正确
    if($button.data("answer") === "true") {
        $button.css({background:'green'});  //正确则闪烁绿色
        var x, y;
        x = $button.position().left+50;
        y = $button.position().top+20;
        flyStarFrom(x, y);                  //星星从正确按钮飞向右上角的分数位置
        setTimeout(function (){
            addScore();                     //增加分数
            $("#flower").hide("slow");
        }, 600);
        //恢复原来的按钮颜色
        setTimeout(function (){
            $button.css({background:'-webkit-linear-gradient(top,#fece34,#d8a605)'});
            $button.css({background:'-moz-linear-gradient(top,#fece34,#d8a605)'});
            $button.css({background:'-ms-linear-gradient(top,#fece34,#d8a605)'});
            $button.css({background:'linear-gradient(top,#fece34,#d8a605)'});
            newFlower();
        }, 1000);
    }
    //如果选择错误
    else
    {
        //把按钮变红半秒
        $button.css({background:'red'});
        //恢复原来的按钮颜色
        setTimeout(function (){
            $button.css({background:'-webkit-linear-gradient(top,#fece34,#d8a605)'});
            $button.css({background:'-moz-linear-gradient(top,#fece34,#d8a605)'});
            $button.css({background:'-ms-linear-gradient(top,#fece34,#d8a605)'});
            $button.css({background:'linear-gradient(top,#fece34,#d8a605)'});
        }, 400);

        lifeCount--;
        if(lifeCount <= 0) {
            setTimeout(function (){
                gameOver();
            }, 800);
        }
    }
}

function flyStarFrom(x, y) {
    $star = $("<img width=30 height=30 src='img/star.png'/>");
    $("#mainWrapper").append($star);
    
    $star.css({position: "absolute", left:x, top:y});
    $star.animate({left:$("#flower").position().left+10, top: 20, width: 300, height:300}, 600);    //飞向屏幕中间，同时变大
    $star.animate({left:$("#star").position().left-2, top:$("#star").position().top+10, width: "30px", height:"30px"}, 300);    //飞向右上角分数位置，同时变小
    setTimeout(function (){
        $star.remove();
    }, 880);
}

function addScore()
{
    var $score = $("#score");
    var score = $score.text().valueOf();
    score++;
    $score.text(score);
    $score.animate({fontSize:"+=10px", marginTop: "-=10px"});
    //有些浏览器对动画支持不好，可以尝试加上延时
    //setTimeout(function (){
        $score.animate({fontSize:"-=10px", marginTop: "+=10px"});
    //}, 1000);
}

function gameOver()
{
    var $score = $("#score");
    //把这次的分数以GET的方式传递给gameOver.php页面
    location.href = "gameOver.php"+"?score="+$score.text();
}


//点击右上角的星星显示彩蛋
var lastTime = 0;
function onStar() {

    //两次点击间隔少于1秒钟则显示，在iPhone上过快的点击被认为是双击屏蔽掉，所以不能点击过快
    var d = new Date();
    var currentTime = d.getTime();
    
    if(currentTime - lastTime > 1000) {
        lastTime = currentTime;
        return;
    }
    
    lastTime = 0;
    imgIndex = FLOWER_COUNT;
    //随机选取10张相片中的一张
    var fileName = "img/" + (imgIndex+Math.floor(Math.random() * 10)).toString() + ".jpg";
    $("#flower").attr("src", fileName);
    $("#flower").show("slow");

    // 显示正确答案
    var btnIndex = Math.floor(Math.random() * 4);
    setBtnText(btnIndex, flowerNames[imgIndex], "true");
    
    //复制一个花名数组，随机打乱顺序，选前三个作为陪衬答案
    var randomFlowerNames = new Array();
    //不能直接数组复制，因为原始数组比FLOWER_COUNT要长
    for(var i=0; i < 13; i++) {
        randomFlowerNames[i] = flowerNames[FLOWER_COUNT + 1 + i];
    }
    //排序参考的参数是正数和负数的几率均等，所以两个元素的顺序是随机的，达到打乱顺序的效果
    randomFlowerNames.sort(function(){ return 0.5 - Math.random();});
    
    // 后面3个为陪衬答案
    var fakeBtnIndex = 0;
    if(fakeBtnIndex === btnIndex)
        fakeBtnIndex++;
    setBtnText(fakeBtnIndex, randomFlowerNames[0], "false");

    fakeBtnIndex++;
    if(fakeBtnIndex === btnIndex)
        fakeBtnIndex++;
    setBtnText(fakeBtnIndex, randomFlowerNames[1], "false");

    fakeBtnIndex++;
    if(fakeBtnIndex === btnIndex)
        fakeBtnIndex++;
    setBtnText(fakeBtnIndex, randomFlowerNames[2], "false");
}
