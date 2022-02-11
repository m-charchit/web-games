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
var usercomppaddleY  = 0
var userpaddleY = canvas.height/2-30
var userpaddlewidth = 10
var compcomppaddleY = 460
var compuserpaddlewidth = 10
var comppaddleheight = 60
var rightpress = false
var leftpress = false
var userrightpress = false
var userleftpress = false


document.addEventListener("keydown", keydownhandle,false);
document.addEventListener("keyup", keyuphandle,false);


function keydownhandle(e){
        
    if( e.key == "ArrowUp"){
      rightpress = true   /* NOTE- key,ArrowRight,Right  are keyword and we use usually ArrowRight but we use Right with IE  */
      //in this if the right arrow key is pressed than rightpress variable will store 1 and paddle start moving
    }
    else if( e.key == "ArrowDown"){
      leftpress = true  // same as above only it tells that left key is pressed
    }
   else if( e.key == "w"){
      userrightpress = true   /* NOTE- key,ArrowRight,Right  are keyword and we use usually ArrowRight but we use Right with IE  */
      //in this if the right arrow key is pressed than rightpress variable will store 1 and paddle start moving
    }
    else if( e.key == "s"){
      userleftpress = true  // same as above only it tells that left key is pressed
    }
  }

  // now we will define the keyuphandle function
  
  function keyuphandle(e){
    if( e.key == "ArrowUp"){
      rightpress = false // if the right key is released then the rightpress becomes false and the paddle stops
    }
    else if( e.key == "ArrowDown"){
      leftpress = false} //if the left key is released then the rightpress becomes false and the paddle stops
   else if( e.key == "w"){
      userrightpress = false // if the right key is released then the rightpress becomes false and the paddle stops
    }
    else if( e.key == "s"){
      userleftpress = false} //if the left key is released then the rightpress becomes false and the paddle stops
      
      // we have defined it so that one key pressed it will keep on moving so if key released it will stop moving
    }

// we will be making four functions which will be making our paddle computers paddle and ball and dash lines and draw score

function userpaddle(){
    ctx.beginPath();
  ctx.rect(usercomppaddleY,userpaddleY,userpaddlewidth,paddleheight);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}
function comppaddle(){
    ctx.beginPath();
    ctx.rect(compcomppaddleY,comppaddleY,compuserpaddlewidth,comppaddleheight);
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
    bx = -bx +  (Math.random())
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
    document.location.reload()

}
  }

  if(rightpress){ // NOTE - simply rightpress means true and we can use rightpress = true also
    // in ths if the rightpress is true then the position of the paddle will change horizontal by 7 px 
    comppaddleY -= 7
}
      else if(leftpress){
      comppaddleY += 7  // same in this also as above only if left key presses paddle will move left by 7 px
    }
  if(userrightpress){ // NOTE - simply rightpress means true and we can use rightpress = true also
    // in ths if the rightpress is true then the position of the paddle will change horizontal by 7 px 
    userpaddleY -= 7
}
      else if(userleftpress){
      userpaddleY += 7  // same in this also as above only if left key presses paddle will move left by 7 px
    }

  
  
  // but the paddle goes out when key pressed too long to avoid this we will set the folowing
  
  if (comppaddleY + userpaddlewidth > canvas.width){
    // here if the position paddle x plus width of paddle increase the canvas width  (why width added - because position stats from top left and if we writeposition = width of canvas then it will take that paddle goes inside then code executed)
    comppaddleY = canvas.width - userpaddlewidth // then comppaddleY =  canvaswidth minus paddle width so that the width don't go inside because position x starts from top left corner
  } 
  else if(comppaddleY  < 0){
    // here it is simple if comppaddleY smaller than 0 (why 0 this time because now the position is same as 0 of comppaddleY because with is now right side it is not included )
    comppaddleY = 0   // then comppaddleY = 0 so that it stops at x coordinate 0
  }
ballX += bx
ballY += by



requestAnimationFrame(draw)
}

draw()
}
