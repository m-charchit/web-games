window.onload = function mygamearea(){var canvas = document.getElementById("mycan")
var ctx = canvas.getContext("2d");
// some of our variables
var score = 0
var ballX = canvas.width/2
var ballY =  canvas.height/2
var ballradius = 10
var bx = 2
var by = -2
var comppaddleY = canvas.height/2-30
var paddleheight  = 60
var userpaddleX  = 0
var userpaddleY = canvas.height/2-30
var userpaddlewidth = 10
var comppaddleX = 460
var comppaddlewidth = 10
var comppaddleheight = 60

document.addEventListener("mousemove",mousemovement,false) // when the mouse moves it get input that mouse is moving

function mousemovement(e){
    var relativeY = e.clientY - canvas.offsetTop
    if(relativeY > 0 && relativeY < canvas.height){
        userpaddleY = relativeY - paddleheight/2
    }

}

// we will be making four functions which will be making our paddle computers paddle and ball and dash lines and draw score

function userpaddle(){
    ctx.beginPath();
  ctx.rect(userpaddleX,userpaddleY,userpaddlewidth,paddleheight);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}
function comppaddle(){
    ctx.beginPath();
    ctx.rect(comppaddleX,comppaddleY,comppaddlewidth,comppaddleheight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}
function ball(){
    ctx.beginPath();
    ctx.arc(ballX,ballY,ballradius,0,Math.PI*2)
    ctx.fillstyle= "white"
    ctx.fill()
    ctx.closePath()
}
function dashline(){
    ctx.setLineDash([17,3]);
    ctx.beginPath();
    ctx.moveTo(canvas.width/2,0);
    ctx.lineTo(canvas.width/2,canvas.height );
    ctx.strokeStyle='white';
      ctx.stroke()
   
} 

function drawscore(){
    ctx.font = " 20px Arial"
  ctx.fillText("score = " + score, 10, 23);

}
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

userpaddle()
comppaddle()
ball()
dashline()
drawscore()
// detecting the collision between ball and walls and paddles
//bounce on top below wall
if(ballY + by < ballradius || ballY + by > canvas.height - ballradius){
    by = -by
}
// bouce on hitting paddle
if(ballX + bx < ballradius  ){
if( ballY  > userpaddleY && ballY < userpaddleY + paddleheight ){
    bx = -bx
    score++
}
// here we detedt whether the ball hit the left wall and if so then the window reloads
else if(ballX + bx < ballradius){
    document.location.reload()

}
}
  if(ballX + ballradius + bx > canvas.width - (ballradius + 10)){
    if(ballY  > comppaddleY && ballY < comppaddleY + comppaddleheight){
        bx = -bx - (Math.random())
    }
      
 if(ballX  + bx > canvas.width -  ballradius ){
        alert("computer loose")
    

}
  }

comppaddleY += (ballY + by - ballY)// this is are simple AI to control computer paddle
ballX += bx
ballY += by



requestAnimationFrame(draw)
}

draw()
}
