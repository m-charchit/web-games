// first create the canvas by <canvas>
window.onload = function mygamearea() {
    var canvas = document.getElementById("mycan")
    var ctx = canvas.getContext("2d");
    // defining all variables here only 
    var bx = 10
    var by = canvas.height / 2
    var radius = 10
    var downbarheight = 500
    var upbarheight = 100
    var barX = canvas.width / 2
    var dx = -2
    var gravity = 1
    var barwidth = 70
    var gap = 54
    var score = 0


    function drawball() {
        ctx.beginPath();
        ctx.arc(bx, by, radius, 0, Math.PI * 2)
        ctx.fillStyle = "red"
        ctx.fill()
        ctx.closePath();
    }




    var pipe = []
    pipe[0] = {
        x: canvas.width,
        y: 0
    }


    // mouse control 
    // key press
    document.addEventListener("keydown", keydown, false)
    document.addEventListener("mousedown", mousedownbtn, false)

    function mousedownbtn() {
        by -= 25

    }




    function keydown(e) {
        if (e.key == "ArrowUp" || e.key == "Up") {
            by -= 25
        }
    }

    function scoretell() {
        ctx.beginPath()
        ctx.fillStyle = "black"
        ctx.fill()
        ctx.font = " 20px Arial"
        ctx.fillText("score = " + score, 20, canvas.height - 20);
        ctx.closePath()
    }

    function road() {
        ctx.beginPath()
        ctx.rect(0, canvas.height - 40, canvas.width, 40);
        ctx.fillStyle = "yellow"
        ctx.fill()
        ctx.closePath()
    }



    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawball();
        for (var i = 0; i < pipe.length; i++) {
            ctx.beginPath()
            ctx.rect(pipe[i].x, pipe[i].y, barwidth, upbarheight);
            ctx.fillStyle = "red"
            ctx.fill()
            ctx.closePath()
            ctx.beginPath()
            ctx.rect(pipe[i].x, pipe[i].y + canvas.height + 400 - downbarheight, barwidth, downbarheight);
            ctx.fillStyle = "green"
            ctx.fill()
            ctx.closePath()


            pipe[i].x -= 2

            if (pipe[i].x == 70) {
                pipe.push({
                    x: canvas.width,
                    y: Math.floor(Math.random() * upbarheight) - upbarheight
                })
            }
            if (pipe[i].x == -barwidth) {
                score++
            }
        }

        road()
        scoretell()
        by += gravity + 0.5
        for (var i = 0; i < pipe.length; i++) {
            if (bx + radius >= pipe[i].x && bx <= pipe[i].x + barwidth && (by <= pipe[i].y + upbarheight || by + radius >= pipe[i].y + upbarheight + gap) || by + radius >= canvas.height - 40 || by <= 0) {
                window.location.reload()
                alert("GAME OVER ")
                    // collision detection




            }
        }
        requestAnimationFrame(draw)
    }

    draw()
}