// first create the canvas by <canvas>
window.onload = function mygamearea(){var canvas = document.getElementById("mycan")
var ctx = canvas.getContext("2d"); // get the canvas with the help of getContext

// here we will define our score variable which will be increasing on hitting every brick
var score = 0 
var lives = 2

// now we will draw lifes
function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}


// here we will write a function which will draw our score
function drawscore(){
ctx.font = " 20px Arial"
  ctx.fillText("score = " + score, 10, 23);
  
}

/* now we will create x and y in variable so that we can set a loop type thing to move it 
we can change the value it is only to position it in the form of x and y 
 */

var x = canvas.width/2
var y = canvas.height-30

/* now we will be declaring two more varible so that each time set interval works x and y increase with this value
we will define it small value so that it does not look it is jumping and look like it is moving
*/
var dx =  4;
var dy = -4;

var ballradius = 10; // we will define radius as ballradius for furthur use
    // this is the draw function which will make a ball 

var paddleHeight = 10 ;// this is the height variable that we will use. it can be anything
var paddleWidth = 75; // this is the width variable that we will use. it can be anything
var paddleX = (canvas.width - paddleWidth)/2 // this is to set x position of the paddle it is this so that it remain at the centre 

// these two will store whether left or right button pressed
var rightpress = false; 
var leftpress = false;
// we will keep the default value false because at starting the paddle is not moving

// now we will make the bricks with some math logic first we will define some variables for it
var column = 5; // this will define the number of columns. We can increase it to increase the bricks 
var row = 3 ; // this will define the number of rows. We can increase it to increase the bricks
var brickheight = 23;// this will define the height of each brick
var brickwidth = 50; // this will define the width of each brick
var brickpadding = 6;// this will define the padding of the bricks so that they do not touch each other 
var topoffset = 30;// this will define the offset so that the bricks does not start making from top right 
var leftoffset = 30; // this is also same.

// after defining the brick variables we will write a code which will be using loop 
var bricks = [] //this is the empty array which will contain some loop value which are changing furthur. note ("[][]") this is known ad 2d array
for (var c = 0; c < column;c++ ){ // this will change the value of c till it reaches 5 each time so 5 column creates
  bricks[c] = [] // array with c will be equal to empty arraywhich contains the x and y variable furthur
  
  for(var r = 0;r < row;r++){// this will change value of r till it reaches 3 so that 3 rows are created. NOTE - first column will be made then with respect to every column row will be made each time as row is inside the column loop  
  
    bricks[c][r] = {x: (c*(brickwidth+leftoffset))+leftoffset, // here the first brick can be accessed by bricks[0][0] second below it will be bricks[0][1] similarly every will be like this
     // we have defined x as some operator with variable which we set before, the position of each brick set a paatern according to which we have done it
     /* in first brick will be leftoffset(20) px from left and in second leftoffset(20) + width of brick(50) + leftoffset(20) third will be the position of first rick + position of second brick + width of second brick(50) + leftoffset(20) so we can write it like 
     first brick - 0*(20 + 50)+ 20  second brick - 1*(20+50) + 20 third brick - 2*(20 + 50)+ 20  if we replace them with variable st above then c*(brickwidth+leftoffset))+leftoffset where c is the index of each brick like for first brick - 0 second brick - 1 third brick - 2 */
    y:r*(brickheight+topoffset)+topoffset,
// we will be adding one more thing which tells what is the status 1 or false if 1 can be seen if false can't be  seen
  status:1
  }
 // same is here in y position only now height and topoffset and now rows are formed 

  }/* now we have made an object bricks[c][r] which will contain the x and y position, note -  bricks[c][r] are two dimensinal array  */
} //after this we will be defining bricks with canvas 

function createbricks(){
  for (var c = 0; c < column;c++ ){ // again we are looping the values c and r 
    for(var r = 0;r < row;r++){
        if(bricks[c][r].status == 1){ // here we have added it because our set intterval will make the brick again after dissapearing so we added that brick only be made if status = 1 which means bricks are visible, once the bricks are invisible there status becomes 0 and bricks are not made again
        // now the code of canvas begins which is some what same as drawing paddle only now we will write variables define above
        ctx.beginPath()
        ctx.rect(bricks[c][r].x,bricks[c][r].y,brickwidth,brickheight) // here we are accesing value or we can say property of the object by bricks[c][r].x for x coordinate and .y for y coordinate  NOTE - bricks[c][r] here are  like this in loop like 1 loop - [c][r] == [0][0] which defines the row and the column array 
        ctx.fillstyle="green"
        ctx.fill()
        ctx.closePath}
      } } } 

      
      
      
      
      
      // now we will add two eventlistener which will call respective function when any key pressed or released and also we will add mous controls fdor phone user 
      document.addEventListener("keydown", keydownhandle,false);// when any key pressed then keydownhandle function will be done
      document.addEventListener("keyup", keyuphandle,false);// same only when the key is keyuphandle function will be called
      document.addEventListener("mousemove",mousemovement,false ) // when the mouse moves it get input that mouse is moving
      // NOTE - Keydown Keyup and mousemove are names of event which is the basic of gaming 

      // our mouse control function
      function mousemovement(e){
        var relativeX = e.clientX - canvas.offsetLeft // relativex is the distance between mouse and left edge of the canvas 
        // NOTE - clientX IS USED FOR CHECKING THE MOVEMENT OF MOUSE AND OFFSETLEFT IS THE PROPERTY WHICH DEFINES THE LEFT EDGE and clientX defines the width and clientY defines the height movement
        if(relativeX > 0 && relativeX < canvas.width){
          paddleX = relativeX - paddleWidth/2
        } 
      }

      
      // now we will define keydownhandle function
      function keydownhandle(e){
        
        if(e.key == "Right" || e.key == "ArrowRight"){
          rightpress = 1   /* NOTE- key,ArrowRight,Right  are keyword and we use usually ArrowRight but we use Right with IE  */
          //in this if the right arrow key is pressed than rightpress variable will store 1 and paddle start moving
        }
        else if(e.key =="Left" || e.key == "ArrowLeft"){
          leftpress = 1  // same as above only it tells that left key is pressed
        }
      }
      // now we will define the keyuphandle function
      
      function keyuphandle(e){
        if(e.key == "Right" || e.key == "ArrowRight"){
          rightpress = false // if the right key is released then the rightpress becomes false and the paddle stops
        }
        else if(e.key =="Left" || e.key == "ArrowLeft"){
          leftpress = false} //if the left key is released then the rightpress becomes false and the paddle stops
          
          // we have defined it so that one key pressed it will keep on moving so if key released it will stop moving
        }
         // now are brick is ready and we will be detecting collision between the brick and the ball and then make it dissapear from there
        function collisiondetection(){
          for (var c = 0; c < column;c++ ){ // we are again taking the loop to check collision on each brick
            for(var r = 0;r < row;r++){
              var b = bricks[c][r]   // defining a variable to amke writting easy
        if(b.status == 1){   // if status of ball = 1 means bricks have not hit by ball and are not invisible . after that one more condition is there 
            if(x > b.x && x < b.x + brickwidth && y > b.y && y < b.y + brickheight ){ // here if the ball touches any of the side of brick it then the following happen 
              // here if ball goes inside the brick all 4 statement need to be true if like for width up and down we have done same as we checked paddle ball collision and for the y position we set it should be grater than y position but smaller than y + height of the brick which is actually the breadth of rectanlge both the sides
              dy = -dy  // it will change direction 
                b.status = 0 // bricks will hide as status becomes 0
                score++;
                if(row * column == score){
                  alert("you won the game");
                  document.location.reload();
                }
              } 
          }
        }
    }
  }

        function drawball(){
          ctx.beginPath();
ctx.arc(x,y,ballradius,0,Math.PI*2)
ctx.fillstyle= "blue"
ctx.fill()
ctx.closePath();}

//now we will be creating paddle with rect first define some variable like height width and x position
// function to draw the paddle we can draw it anywhere but this is good

function drawpaddle() {
  ctx.beginPath();
  ctx.rect(paddleX,canvas.height - paddleHeight,paddleWidth,paddleHeight);
  ctx.fillStyle = "blue";
  ctx.strokeStyle='red';
  ctx.fill();
  ctx.closePath();
}


function draw(){

  /* there is problem the ball is looking like a line  so avoid this we will use clearRect
it will clear everything and start the new design each 10 ms after set interval calls the function
it wil be added on the topso that it clear before the graphics is made
it takes four parameter x and y of top left corner and againwidth and height of the rect do it same as width and height of canvas
the area covered by this rectangle will be cleared. always do it full
*/
ctx.clearRect(0,0,canvas.width,canvas.height);
createbricks(); // calling the createbricks function to make it after clear rect method
drawball() // we will call drawball function again so that ball is created again
drawpaddle()// we will call drawpaddle function again so that ball is created again
drawscore();// we will call the draw score function so that it is changed after every 10ms if we hit any brick
collisiondetection()// we will be calling the collisiondetection function so that it is updated after every 10 context.measureText(text);
drawLives()



/* now the ball get out of canvas so we will bounse it on detection if it collide with the walls  
 if (y + dy < 0)    

in this if y which is position plus the dy variable means we will check each time if detection there
we have first set the that every 10s dy wll be added to y so if once y + dy goes below the function below will happen. this will check detection    {

in this if collision detected dy will become -dy this means the vlue above of dy will become 2 rather than -2 
 this will take the ball down rather than up 

    dy = -dy  
}
now we will do for bottom wall same will happen we will detect collision and change the direction 

if (y + dy > canvas.height) in this if the ball go down than canvas height then it will go up we can use 320 also in its place but this one is good {
  in this if the ball going down then dy = 2 so change it to -2 if collided  
    dy = -dy
}
if (x + dx > canvas.width)  now here also same thing  only now width is calculated  {

    dx = -dx

}
if (x + dx < 0){

  dx = -dx
here also same thing is done only now width is calculated 

} */

//we can do this in few line with help of OR operator (||) 
/* but the ball goes in the walls then bounce, because we are calculating center of circle but we should do for circumfrance of circle */

// now we will implement game overe sate if touch the below wall game over we will remove the 2 condition in 1st if the second condition was (y + dy == canvas.height-ballradius) we will remove the OR GATE (||)


if (y + dy < ballradius  ){
/* now see here when ball radius equals to distance between center of circle and canvas edge then it will change direction*/ 

dy = -dy
}

//and in side walls we will
if (x + dx > canvas.width-ballradius  || x + dx < ballradius ) {
/* same in this one when  ball radius equals to distance between center of circle and canvas edge then it change direction */
  dx = -dx

} 

// we also have to detect the paddle and ball collision for this we will create a condition else if in which we have one if condition and one else  
else if(y + dy > canvas.height-ballradius ){  // we have else if in which it detects if ball touches wall and in which there is if condition which works like a or in this else if condition
// here we will just check whether ball touches between right and left edge of the paddle
  if(x > paddleX && x < paddleX + paddleWidth){ 
      dy = -dy   // we have taken x because it tells the horizontal position (x coordinate) of ball if it is less than x cordinate of and also if it it is ore than the right cordinate which is width + paddleX    
  // if it is between then ball bounces
  }
  // we will add the lives function to work 
  else { // here we alereted a message and we will load the window again so that game again starts
    lives--; //this is so that whenever it goes down life reduces
    if(lives == 0){
    alert("GAME OVER")
    document.location.reload()}
    else{ // this will bring everything to state which was at the starting when ever we lose live
      x = canvas.width/2
      y = canvas.height - 30
      dx = 5
      dy = -5
      paddleX = (canvas.width-paddleWidth)/2;
    }
  }} 

// IMPORTANT NOTE - IF IS USED IN ELSE IF SO THAT THE IF STATEMENT ONLY APPLY WHEN BALL IS GOING TO TOUCH THE BELOW WALL
// IF WE REMOVE THE ELSE IF THEN IF STATE MENT WILL APPLY WHENEVER THE BALL IS NOT BETWEEN THE PADDLE AND WILL MOVE ALONG THE PADDLE 


// the upper one was just for better understanding you can use this also 

/* here we add dx and dy respectivey to x and y each time setinterval calls function
thevalue is increased by two and in y is decreased by 2 so it move in particular direction
 */


if(rightpress){ // NOTE - simply rightpress means true and we can use rightpress = true also
  // in ths if the rightpress is true then the position of the paddle will change horizontal by 7 px 
  paddleX += 7
}
else if(leftpress){
  paddleX -= 7  // same in this also as above only if left key presses paddle will move left by 7 px
}

// but the paddle goes out when key pressed too long to avoid this we will set the folowing

if (paddleX + paddleWidth > canvas.width){
  // here if the position paddle x plus width of paddle increase the canvas width  (why width added - because position stats from top left and if we writeposition = width of canvas then it will take that paddle goes inside then code executed)
  paddleX = canvas.width - paddleWidth // then paddleX =  canvaswidth minus paddle width so that the width don't go inside because position x starts from top left corner
} 
else if(paddleX  < 0){
  // here it is simple if paddleX smaller than 0 (why 0 this time because now the position is same as 0 of paddleX because with is now right side it is not included )
  paddleX = 0   // then paddleX = 0 so that it stops at x coordinate 0
}

x += dx
y+= dy
requestAnimationFrame(draw) // more better way for making animations

}



draw()












}
