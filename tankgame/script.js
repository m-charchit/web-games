window.onload = function aswwss() {
    // alert("the game can be played only with keybord\nUpdate will be coming soon where you can play on android without keyboard also.")
    // alert("RULES OF GAME\n1. two players can play the game\n2.If the ball hit the your tank the game overs and the opposite wins\n. There are some powers which can be used only once\n3. Some rectangles are also there where you can hide")
    // alert("Player 1 controls\nw for moving upwards\ns for moving downwards\na for moving left and for moving right\nq for firing\n\n\nPlayer 2 controls\narrow keys for movement and space bar for firing")

    // Variables


    var canvas = document.getElementById("r")
    var ctx = canvas.getContext('2d');
    var rightpress = false
    var leftpress = false
    var downpress = false
    var uppress = false
    var drightpress = false
    var aleftpress = false
    var sdownpress = false
    var wuppress = false
    var spacepress = false
    var qpress = false
    var redX = canvas.width / 2
    var redY = canvas.height - 60
    var redwidth = 20
    var redheight = 20
    var blueY = 40
    var blueX = canvas.width / 2
    var bluewidth = 20
    var blueheight = 20
    var bluebulletY = 40
    var bluebulletX = canvas.width / 2 + 10
    var bluebulletradius = 3
    var redbulletX = canvas.width / 2 + 10
    var redbulletY = canvas.height - 40
    var redbulletradius = 3
    var accY = 4
    var column = 5;
    var column = 5;
    var row = 3;
    var brickheight = Math.random() * 50;
    var brickwidth = Math.random() * 90;
    var count = 0
    var belowcount = 0
        // our var ends

    // our canvas work start
    function bullet() {
        ctx.beginPath();
        ctx.arc(redbulletX, redbulletY, redbulletradius, 0, Math.PI * 2)
        ctx.fillStyle = "green"
        ctx.fill()
        ctx.closePath();
    }

    function bullet1() {
        ctx.beginPath();
        ctx.arc(bluebulletX, bluebulletY, bluebulletradius, 0, Math.PI * 2)
        ctx.fillStyle = "purple"
        ctx.fill()
        ctx.closePath();
    }


    function square1() {
        ctx.beginPath()
        ctx.rect(redX, redY, redwidth, redheight);
        ctx.fillStyle = "red"
        ctx.fill()
        ctx.closePath()

    }

    function square2() {
        ctx.beginPath()
        ctx.rect(blueX, blueY, bluewidth, blueheight);
        ctx.fillStyle = "blue"
        ctx.fill()
        ctx.closePath()


        // our canvas works ends
    }
    /// here see it...............
    var bricks = []
    for (var c = 0; c < column; c++) {
        bricks[c] = []

        for (var r = 0; r < row; r++) {

            bricks[c][r] = {
                x: c * (Math.random() * 300),
                y: r * (Math.random() * 300),

                status: 1
            }
        }
    }

    function createbricks() {
        for (var c = 0; c < column; c++) {
            for (var r = 0; r < row; r++) {
                if (bricks[c][r].status == 1) {

                    ctx.beginPath()
                    ctx.rect(bricks[c][r].x, bricks[c][r].y, brickwidth, brickheight)
                    ctx.fillstyle = "green"
                    ctx.fill()
                    ctx.closePath
                }
            }
        }
    }
    // here see it...................


    // all the keys function
    document.addEventListener("keydown", keydownS, true);
    document.addEventListener("keyup", keyuphandle, false);

    function keydownS(e) {
        if (e.key == "ArrowRight") {
            rightpress = true

        } else if (e.key == "ArrowLeft") {
            leftpress = true
        } else if (e.key == "ArrowDown") {
            downpress = true
        } else if (e.key == "ArrowUp") {
            uppress = true
        } else if (e.keyCode == 32) {
            spacepress = true
        } else if (e.key == "w" || e.key == "W") {
            wuppress = true
        } else if (e.key == "s" || e.key == "s") {
            sdownpress = true
        } else if (e.key == "a" || e.key == "a") {
            aleftpress = true
        } else if (e.key == "d" || e.key == "D") {
            drightpress = true
        } else if (e.key == "q" || e.key == "Q") {
            qpress = true
        }
        if (e.key == "r" || e.key == "R") {
            count++
        }
        if (e.keyCode == 17) {
            belowcount++
        }
    }


    function keyuphandle(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            rightpress = false
        } else if (e.key == "Left" || e.key == "ArrowLeft") {
            leftpress = false
        } else if (e.key == "ArrowDown") {
            downpress = false
        } else if (e.key == "ArrowUp") {
            uppress = false
        } else if (e.keyCode == 32) {
            spacepress = false
        } else if (e.key == "w") {
            wuppress = false
        } else if (e.key == "s") {
            sdownpress = false
        } else if (e.key == "a") {
            aleftpress = false
        } else if (e.key == "d") {
            drightpress = false
        } else if (e.key == "q") {
            qpress = false
        }
        console.log(e.keyCode)
    }
    // all the key function ends



    function update() {
        redbulletY -= accY
        bluebulletY += accY

    }



    function collisiondetect() {
        if (redbulletY + accY <= blueY + bluewidth + bluebulletradius && redbulletY + accY >= blueY + bluewidth + bluebulletradius - 3) {
            if (redbulletX + redbulletradius > blueX && redbulletX < blueX + bluewidth) {
                alert("red wins")
                document.location.reload()
            }
        }
        if (bluebulletY + accY >= redY + bluebulletradius && bluebulletY + accY <= (redY + bluebulletradius) + 7) {
            if (bluebulletX + bluebulletradius > redX && bluebulletX + bluebulletradius < redX + redwidth) {
                alert("blue wins")
                document.location.reload()
            }
        }
    }

    function wallcollision() {
        if (redX < 0) {
            redX = 0
        }
        if (blueX < 0) {
            blueX = 0

        }
        if (redX + redwidth > canvas.width) {
            redX = canvas.width - redwidth
        }
        if (blueX + bluewidth > canvas.width) {
            blueX = canvas.width - bluewidth
        }
        if (blueY < 0) {
            blueY = 0
        }
        if (redY < 0) {
            redY = 0

        }
        if (redY + redwidth > canvas.height) {
            redY = canvas.height - redheight
        }
        if (blueY + blueheight > canvas.height) {
            blueY = canvas.height - blueheight
        }

    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        update()
        square1()
        square2()
        bullet()
        bullet1()
        collisiondetect()
        wallcollision()
        createbricks()

        /* if (count == 1) {
            bluebulletY += accY + 2

            if (bluebulletY >= 490) {
                count = 2
            } else if (count == 2) {
                bluebulletY += accY - accY

            }
        }
        if (belowcount == 1) {
            redbulletY -= accY + 2

            if (redbulletY <= -40) {
                belowcount = 2
            } else if (belowcount == 2) {
                redbulletY += accY - accY

            }
        }
 */



        if (rightpress) {
            redX++
        } else if (leftpress) {
            redX--

        } else if (downpress) {
            redY++
        } else if (uppress) {
            redY--
        }
        if (drightpress) {
            blueX++
        } else if (aleftpress) {
            blueX--

        } else if (sdownpress) {
            blueY++
        } else if (wuppress) {
            blueY--
        }
        if (spacepress && redbulletY <= -20) {
            redbulletX = redX + 10
            redbulletY = redY + 10
        }
        if (qpress && bluebulletY >= canvas.height + 20) {
            bluebulletY = blueY + 10
            bluebulletX = blueX + 10
        }
        requestAnimationFrame(draw)
    }



    draw()

}