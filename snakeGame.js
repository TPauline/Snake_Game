document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.querySelector('.gameArea')
    bgcolor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    while (bgcolor === "#9ACD32" || bgcolor === "#FF0000") {
        bgcolor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    }
    gameArea.style.backgroundColor = bgcolor;

    const width = 64;
    const height = 36;
    const gameGrid = []
    const snake = []
    var snakeX = 0,
        snakeY = 4;
    var appleX, appleY;
    direction = 'ArrowRight';
    var timers = [];
    var touched = false;

    function life() {
        if (snakeX > height - 1 || snakeY > width - 1 || snakeX < 0 || snakeY < 0 || touched) {
            if (touched)
                alert("YOU CANT EAT YOURSELF!!\n YOU LOS3E!!!!")
            else
                alert("OUT OF BOUNDS!!\n YOU LOS3E!!!!")
            timers.forEach(element => {
                clearInterval(element)
                document.removeEventListener('touchstart', touchStarted, false);
                document.removeEventListener('touchmove', moveSnake, false);
                document.removeEventListener('keyup', moveSnake)
            });
        }


    }


    function placeApple() {

        appleX = Math.floor(Math.random() * height);
        appleY = Math.floor(Math.random() * width);
        while (gameGrid[appleX][appleY].classList.contains('snake')) {
            appleX = Math.floor(Math.random() * height);
            appleY = Math.floor(Math.random() * width);
        }
        gameGrid[appleX][appleY].classList.add('apple')

    }

    function setup() {
        for (let r = 0; r < height; r++) {
            // var row = document.createElement('div')
            var row = []
            for (let c = 0; c < width; c++) {
                var s = document.createElement('div');
                s.classList.add('squares');
                gameArea.appendChild(s);
                row.push(s);

            }
            gameGrid.push(row);
            //  gameArea.appendChild(row)
        }

        for (let s = 0; s < (gameGrid[0].length / 16) + 1; s++) {
            gameGrid[0][s].classList.add('snake');
            snake.unshift(gameGrid[0][s])
        }

        timers.push(setInterval(moveSnake, 500));
        timers.push(placeApple());
        timers.push(setInterval(life, 50));

    }

    function moveSnake(e) {
        if (e && e.type === 'keyup') {
            console.log(e)
            if (!(direction === "ArrowUp" && e.code === "ArrowDown") && !(direction === "ArrowDown" && e.code === "ArrowUp") &&
                !(direction === "ArrowLeft" && e.code === "ArrowRight") && !(direction === "ArrowRight" && e.code === "ArrowLeft"))
                direction = e.code;
        }
        if ((e && e.type === 'touchmove') && (xTouch || yTouch)) {
            var xUp = e.touches[0].clientX;
            var yUp = e.touches[0].clientY;
            var xDiff = xTouch - xUp;
            var yDiff = yTouch - yUp;
            if (Math.abs(xDiff) > Math.abs(yDiff)) { /*most significant*/
                if (xDiff > 0 && direction != "ArrowRight") /* left swipe */
                    direction = 'ArrowLeft';
                else if (xDiff <= 0 && direction != "ArrowLeft") /* right swipe */
                    direction = 'ArrowRight';
            } else {
                if (yDiff > 0 && direction != "ArrowDown") /* up swipe */
                    direction = 'ArrowUp';
                else if (xDiff <= 0 && direction != "ArrowUp") /* down swipe */
                    direction = 'ArrowDown';
            } /* reset values */
            xTouch = null;
            yTouch = null;
        }

        if (direction === 'ArrowUp') {
            if (gameGrid[snakeX - 1][snakeY].classList.contains('snake')) touched = true;
            snakeX--;
            console.log(snakeX, snakeY);
            gameGrid[snakeX][snakeY].classList.add('snake');
            snake.unshift(gameGrid[snakeX][snakeY]);
            // snake.pop().classList.remove("snake");
            // direction = 'up';
            // }
        } else if (direction === 'ArrowDown') {
            if (gameGrid[snakeX + 1][snakeY].classList.contains('snake')) touched = true;
            snakeX++;
            console.log(snakeX, snakeY);
            gameGrid[snakeX][snakeY].classList.add('snake');
            snake.unshift(gameGrid[snakeX][snakeY]);
            // snake.pop().classList.remove("snake");
            // direction = 'down';
            //}
        } else if (direction === 'ArrowLeft') {
            if (gameGrid[snakeX][snakeY - 1].classList.contains('snake')) touched = true;
            snakeY--;
            console.log(snakeX, snakeY);
            gameGrid[snakeX][snakeY].classList.add('snake');
            snake.unshift(gameGrid[snakeX][snakeY]);
            // snake.pop().classList.remove("snake");
            // direction = 'left';
            //}
        } else if (direction === 'ArrowRight') {
            if (gameGrid[snakeX][snakeY + 1].classList.contains('snake')) touched = true;
            snakeY++;
            console.log(snakeX, snakeY)
            gameGrid[snakeX][snakeY].classList.add('snake');
            snake.unshift(gameGrid[snakeX][snakeY]);
            // snake.pop().classList.remove("snake");
            // direction = 'right';
            //}
        }
        if (appleX === snakeX && appleY === snakeY) {
            gameGrid[snakeX][snakeY].classList.remove('apple');
            placeApple();
        } else {
            console.log(snake)
            snake.pop().classList.remove("snake");
        }

    }

    function touchStarted(e) {
        const initialTouch = (e.touches || e.originalEvent.touches)[0];
        xTouch = initialTouch.clientX;
        yTouch = initialTouch.clientY;
    };

    document.addEventListener('touchstart', touchStarted, false);
    document.addEventListener('touchmove', moveSnake, false);
    document.addEventListener('keyup', moveSnake)

    setup()

})