        var canvas = document.getElementById("can");
        var ctx = canvas.getContext('2d');
        var leftkeypress = false
        var rightkeypress = false
        var bx = canvas.width / 2
        var by = 20
        var radius = 10
        var holewidth = 70
        var score = 0

        function drawball() {
            ctx.beginPath();
            ctx.arc(bx, by, radius, 0, Math.PI * 2)
            ctx.fillStyle = "blue"
            ctx.fill()
            ctx.closePath();
        }
        function drawscore(){
            ctx.beginPath()
            ctx.fillStyle = "black"
            ctx.fill()
            ctx.font = " 20px Arial"
          ctx.fillText("score = " + score, 20, canvas.height-20);
        ctx.closePath()
        }
        var pipe = []
        pipe[0] = {
            x: 0,
            y: canvas.height + 100
        }
        
        function drawpipes() {
            for (var i = 0; i < pipe.length; i++) {
                ctx.beginPath();
                ctx.rect(pipe[i].x, pipe[i].y, canvas.width, 10);
                ctx.fillStyle = "red";
                ctx.fill();
                ctx.closePath();
                pipe[i].y -= 2
        
                if (pipe[i].y == 490) {
                    pipe.push({
                        x: 0,
                        y: canvas.height + 200          
                    })
                    
        
                    
                }
                
            }
        }
        var pipes = []
        pipes[0] = {
            x: canvas.width / 2,
            y: canvas.height + 100
        }
        
        function drawholes() {
            for (var h = 0; h < pipes.length; h++) {
                ctx.beginPath();
                ctx.rect(pipes[h].x, pipes[h].y, holewidth, 10);
                ctx.fillStyle = "#eee";
                ctx.fill();
                ctx.closePath();
        
                pipes[h].y -= 2
                if (pipes[h].y == 490) {
                    pipes.push({
                        x: Math.floor(Math.random() * 300),
                        y: canvas.height + 200          
                    })
                }
              
            }
        }

        document.addEventListener("keydown", downkeyhandle, false)
        document.addEventListener("keyup", upkeyhandle, false)

        function downkeyhandle(e) {
            if (e.keyCode == 37) {
                leftkeypress = true
            } else if (e.keyCode == 39) {
                rightkeypress = true
            }
            console.log(e.keyCode)
        }

        function upkeyhandle(e) {
            if (e.keyCode == 37) {
                leftkeypress = false
            } else if (e.keyCode == 39) {
                rightkeypress = false
            }
        }

        function collisiondetect() {
            for (var h = 0; h < pipes.length; h++) {
                if (by > pipes[h].y && by < pipes[h].y + 10) {
                    if (bx < pipes[h].x || bx + radius > pipes[h].x + holewidth) {
                        by = pipes[h].y
                    }

                }
                if (by > pipes[h].y && by < pipes[h].y + 5) {
                    if(by > pipes[h].y ){
                        score++
                    }
            }
        }}

        function wallcollision() {
            if (bx <= 10) {
                bx = 10
            } else if (bx >= canvas.width - 10) {
                bx = canvas.width - 10
            }
            if(by == 10){
                alert("game over")  
                document.location.reload()          
            }
        }




            function draw() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawpipes();
                drawholes();
                drawball();
                collisiondetect()
                wallcollision()
                drawscore()
by +=2
                if (leftkeypress)[
                    bx -= 2
                ]
                if (rightkeypress) {
                    bx += 2
                }
                

                requestAnimationFrame(draw)
            }
            draw()
        