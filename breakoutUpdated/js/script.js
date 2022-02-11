// NOTE - REMEMBER ALL THE NAMES OF oBJECTS AND METHODS AS IT IS OR THEY WILLCREATE PROBLEM IF WRITTEN SOMETHING ELSE

var game = new Phaser.Game(480,320,Phaser.AUTO,null,{preload:preload,create:create,update:update})// note - phase P should be capital
// 480 - width, 320 - height , phaser.auto - webgl or 2d , null is any id of the canvas we set to null , names of unction which are main
var ball;
var paddle;
var bricks;
var newbricks;
var brickinfo;
var scoretext
var score = 0;
var lives = 3
var livesText;
var lifelosttext
var playing = false
var startbutton
var sizeincrease
var sizedecrease
var belowwall;
var hit = 0
var laser
var superball
var stickball
var test = true
var test2 = true
var hardbrick

function preload() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;// SHOW_ALL is used which resize the sze according to the screen size
    game.scale.pageAlignHorizontally = true;// note - scale is an object
    game.scale.pageAlignVertically = true;
    game.stage.backgroundColor = "#eee"; 
    game.load.image("ball","img/ball.png")// load.image is method
    game.load.image("paddle","img/paddle.png")
    game.load.image("brick","img/brick.png")
    game.load.image("sizeincrease","img/sizeincrease.png")
    game.load.image("sizedecrease","img/sizedecrease.png")
    game.load.image("belowwall","img/belowwall.png")
    game.load.image("laser","img/laser.png")
    game.load.image("superball","img/superball.png")
    game.load.image("stickball","img/stickball.png")
    game.load.image("hardbrick","img/hardbrick.png")
   game.load.spritesheet("ball","img/wobble.png",20,20)
    game.load.spritesheet("button","img/button.png",120,40)

}
function create() { // introducing physics engine ,check for more on the site
game.physics.startSystem(Phaser.Physics.ARCADE)// startSystem is mandatory at first
game.physics.arcade.checkCollision.down = false // this will make down wall a simple wall where ball can pass
ball = game.add.sprite(game.world.width*0.5,game.world.height-45,"ball")// add.sprite is method
ball.animations.add("wobble",[0,1,2,2,0,1,0,2,0],28)// here wobble is name of sprite sheet and 0,1,0 are arraysfirst image is stored as 0 second as 1 and so on and the way we write it is implemented in the same way and 24 is fbs rate of changinh animation
ball.anchor.set(0.5)
game.physics.enable(ball,Phaser.Physics.ARCADE)// enable will enable hte ball for physics
ball.body.collideWorldBounds = true
ball.body.bounce.set(1)// this will bounce the ball
ball.checkWorldBounds =  // this will check the bounds of game object
ball.events.onOutOfBounds.add(ballkill,this) // now lives will be used so function updated





paddle = game.add.sprite(game.world.width*0.5,game.world.height-25,"paddle")
paddle.anchor.set(0.5,1)
game.physics.enable(paddle,Phaser.Physics.ARCADE)
paddle.body.immovable = true
initbrick()
var style = {font:"18px Arial",fill : "red"}
scoretext = game.add.text(5,5,"points : 0",style)
livesText= game.add.text(game.world.width - 5,5,"lives = "+lives,style)
livesText.anchor.set(1,0)
lifelosttext = game.add.text(game.world.width/2,game.world.height/2,"LIFE LOST. TAP TO CONTINUE",style)
lifelosttext.anchor.set(0.5,0.5)
lifelosttext.visible = false  // here we will not see life lost messaghe as it is false by defalut
startbutton = game.add.button(game.world.width/2,game.world.height/2,"button",startgame,this,1,0,2)
startbutton.anchor.set(0.5,0.5)
//testing things
hardbrick= game.add.sprite(game.world.width - 88,187,"hardbrick")
hardbrick.scale.setTo(0.13,0.16)
game.physics.enable(hardbrick,Phaser.Physics.ARCADE)
hardbrick.body.immovable = true

}
function update() {
    if(test2 == true){
        game.physics.arcade.collide(ball,paddle,ballhitpaddle)
    }
    game.physics.arcade.collide(ball,hardbrick,ballhithard)
        if(test == true)
      {  game.physics.arcade.collide(ball,bricks,ballhitbrick)}
    
    if(playing){
        paddle.x = game.input.x || game.world.width*0.5

    }
    game.physics.arcade.collide(sizeincrease,paddle,powerhitpaddle)
    game.physics.arcade.collide(sizedecrease,paddle,powerhitupaddle)
    game.physics.arcade.collide(belowwall,paddle,belowlinepower)
    game.physics.arcade.collide(ball,laser)
    game.physics.arcade.collide(superball,paddle,ballsuper)
    game.physics.arcade.collide(stickball,paddle,ballstick)
 if(test == false) {  
     game.physics.arcade.overlap(ball,bricks,ballhit)
    }
    if(test2 == false){
        game.physics.arcade.collide(ball,paddle,stick)
     if(ball.y == game.world.height-45) {
           ball.x = paddle.x
         }

    }}
function initbrick(){
    brickinfo = { // this is the object which ha furthur objects which has properties for brick
        width:50,
        height: 20, 
        count:{
            row : 8 ,
            col: 8
        },
        offset:{
            top:50,
            left:60
        },
        padding:1
    
        }
        bricks = game.add.group();// this is the empty group which will contain brick
        for (var c = 0; c < brickinfo.count.col;c++ ){
            for(var r = 0;r < brickinfo.count.row;r++){
                var brickX = (c*(brickinfo.width+brickinfo.padding )+brickinfo.offset.left)
                var brickY = (r*(brickinfo.height+brickinfo.padding)+brickinfo.offset.top) 
                newbricks = game.add.sprite(brickX,brickY,"brick") // the brick img we added is now in newbricks
                game.physics.enable(newbricks,Phaser.Physics.ARCADE)
                newbricks.body.immovable = true
                newbricks.anchor.set(0.5)
                bricks.add(newbricks) // here we add newbricks to bricks so that one img is looped 
                
                
            }
    }
}
function ballhithard(){
    ball.animations.play("wobble")
    var killtw = game.add.tween(hardbrick.scale) // this is the tween we use
    killtw.to({x:0,y:0},300,Phaser.Easing.Linear.None)// to is to which size at end 1 means same 0 mean 0 percent, then time in ms and type ofeasing used 
    killtw.onComplete.addOnce(function (){ // this is optional, we will define a function on completing of tween 
        hardbrick.kill()
    },this)
    killtw.start() // this is the main which will start the tween 
    /*all of the above can be in shorthand propety which is ---   game.add.tween(hardbrick.scale).to({x:0,y:0},300,Phaser.Easing.Elastic.Out,true,100). this will double the bricks scale half a second  will start automaticaaly after 100 delay ms*/
    score++
    scoretext.setText("points : " + score)
}

function ballhitbrick(ball,brick){
    ball.animations.play("wobble")
var killtween = game.add.tween(brick.scale) // this is the tween we use
killtween.to({x:0,y:0},300,Phaser.Easing.Linear.None)// to is to which size at end 1 means same 0 mean 0 percent, then time in ms and type ofeasing used 
killtween.onComplete.addOnce(function (){ // this is optional, we will define a function on completing of tween 
    brick.kill()
},this)
killtween.start() // this is the main which will start the tween 
/*all of the above can be in shorthand propety which is ---   game.add.tween(brick.scale).to({x:0,y:0},300,Phaser.Easing.Elastic.Out,true,100). this will double the bricks scale half a second  will start automaticaaly after 100 delay ms*/
score++
scoretext.setText("points : " + score)



var countalive = 0
for(i = 0;i < bricks.children.length; i++){
    if(bricks.children[i].alive == true){
        countalive++
    }
}
if(countalive == 1){
    alert("congratulation!!!!! you won the game")
    location.reload()
}
}
function ballkill(){
    lives--;
    if(lives){
        livesText.setText("lives : "+lives)
        lifelosttext.visible = true
        ball.reset(game.world.width/2,game.world.height - 45)
        paddle.reset(game.world.width/2,game.world.height-25)
        game.input.onDown.addOnce(function(){  // here input is mouse click on down and add once will add the function only where add will add every time
            lifelosttext.visible = false
            ball.body.velocity.set(150,-150)
        }, this)
    }
    else {
        alert("GAME OVER")
        location.reload()
    }
}
function ballhitpaddle(){
    hit++
    ball.animations.play("wobble")
    ball.body.velocity.x = -1*5*(paddle.x-ball.x) // randomizing with experiments try your self
    if(hit == 8){
        sizeincrease = game.add.sprite(game.rnd.integerInRange(30,400),25,"sizeincrease"); 
        sizeincrease.scale.setTo(0.1,0.1)
        game.physics.enable(sizeincrease,Phaser.Physics.ARCADE)
        sizeincrease.body.velocity.set(0,100)
    }
         if(hit == 14){
            sizedecrease = game.add.sprite(game.rnd.integerInRange(30,400),25,"sizedecrease"); 
            sizedecrease.scale.setTo(0.1,0.1)
            game.physics.enable(sizedecrease,Phaser.Physics.ARCADE)
            sizedecrease.body.velocity.set(0,160)
           
        }
         if(hit == 17){
            belowwall = game.add.sprite(game.rnd.integerInRange(30,400),25,"belowwall"); 
            belowwall.scale.setTo(0.1,0.1)
            game.physics.enable(belowwall,Phaser.Physics.ARCADE)
            belowwall.body.velocity.set(0,160)
           
        }
         if(hit == 4){
            superball = game.add.sprite(game.rnd.integerInRange(30,400),25,"superball"); 
            superball.scale.setTo(0.1,0.1)
            game.physics.enable(superball,Phaser.Physics.ARCADE)
            superball.body.velocity.set(0,160)
           
        }
        if(hit == 11 ){
            stickball = game.add.sprite(game.rnd.integerInRange(30,400),25,"stickball"); 
            stickball.scale.setTo(0.1,0.1)
            game.physics.enable(stickball,Phaser.Physics.ARCADE)
            stickball.body.velocity.set(0,160)

        }
        if(hit == 7){
            test = true
        }
        
    
}
function startgame(){
    startbutton.destroy()
    ball.body.velocity.set(190,-190)// this will set the velocity. velocity and set are keyword. NOTE - CHECK FOR MORE PHYSICS LIKE GRAVITY OR FRICTION and this will happen once we click on the button 
    playing = true
}
function powerhitpaddle(){
    paddle.scale.setTo(1.5,1)
    sizeincrease.kill()
    game.time.events.add(Phaser.Timer.SECOND * 10,(
        function () {
            paddle.scale.setTo(1,1)

        }
    ))

}
function powerhitupaddle(){
    paddle.scale.setTo(0.5,1)
    sizedecrease.kill()
    game.time.events.add(Phaser.Timer.SECOND * 10,(
        function () {
            paddle.scale.setTo(1,1)
        }

    ))

}
function belowlinepower(){
    laser = game.add.sprite(0,game.world.height-19,"laser")
    laser.scale.setTo(5,0.1)
    game.physics.enable(laser,Phaser.Physics.ARCADE)
laser.body.immovable = true    
belowwall.kill()
game.time.events.add(Phaser.Timer.SECOND*15,(
    function (){
        laser.kill()
    }
))
} 
    function ballsuper(){       
         superball.kill()
            test = false 
         
        
    }
        function ballhit(ball,bricks){
                bricks.kill()
            score++
            scoretext.setText("points : " + score)
            
            
            var countalive = 0
            for(i = 0;i < bricks.children.length; i++){
                if(bricks.children[i].alive == true){
                    countalive++
                }
            }
            if(countalive == 1){
                alert("congratulation!!!!! you won the game")
                location.reload()
            }
            }
function ballstick(){
    stickball.kill()
    test2 = false
    game.time.events.add(Phaser.Timer.SECOND*10,(function (){
        test2 = true
        }))

}
function stick(ball,paddle){
    ball.body.velocity.set(0,0)
    game.input.onDown.addOnce(function(){  
        ball.body.velocity.set(-180,-180)
        
        
    }, this)


}