const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const unitSize = 20;
let snake = [{ x: 100, y: 100 }];
let direction = { x: 0, y: 0 };
let food = { x: 200, y: 200 };
let score = 0;
let speed = 220;  
let levelUpFactor = 0.95;  

document.addEventListener("keydown", changeDirection);
setInterval(updateGame, speed);

function updateGame() {
    
    const head = { x: snake[0].x + direction.x * unitSize, y: snake[0].y + direction.y * unitSize };
    snake.unshift(head);

    
    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById('score').innerText = score;
        placeFood();
        speed *= levelUpFactor;
        clearInterval(gameInterval);
        gameInterval = setInterval(updateGame, speed);
    } else {
        snake.pop();
    }



    
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || collisionWithSelf()) {

        document.getElementById("final-score").innerText = score;  
        document.getElementById("game-over").style.display = "block";  
    

        clearInterval(gameInterval);
        return;
    }
    

    renderGame();
}


function collisionWithSelf() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    return false;
}


function renderGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "lime";

    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, unitSize, unitSize);
    });


    ctx.fillStyle = "red";  
    ctx.beginPath(); 
    ctx.arc(food.x + unitSize / 2, food.y + unitSize / 2, unitSize / 2, 0, Math.PI * 2);  
    ctx.fill();
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / unitSize)) * unitSize,
        y: Math.floor(Math.random() * (canvas.height / unitSize)) * unitSize
    };
}

function changeDirection(event) {
    const key = event.keyCode;

    if (key === 37 && direction.x === 0) {
        direction = { x: -1, y: 0 };
    } else if (key === 38 && direction.y === 0) {
        direction = { x: 0, y: -1 };
    } else if (key === 39 && direction.x === 0) {
        direction = { x: 1, y: 0 };
    } else if (key === 40 && direction.y === 0) {
        direction = { x: 0, y: 1 };
    }
}


function setDirection(directionKey) {
    if (directionKey === 'up' && direction.y === 0) {
        direction = { x: 0, y: -1 };
    } else if (directionKey === 'down' && direction.y === 0) {
        direction = { x: 0, y: 1 };
    } else if (directionKey === 'left' && direction.x === 0) {
        direction = { x: -1, y: 0 };
    } else if (directionKey === 'right' && direction.x === 0) {
        direction = { x: 1, y: 0 };
    }
}



function resetGame() {
    document.getElementById("game-over").style.display = "none"; 
    snake = [{ x: 100, y: 100 }];
    direction = { x: 0, y: 0 };
    score = 0;
    speed = 200;
    clearInterval(gameInterval);
    gameInterval = setInterval(updateGame, speed); 
    document.getElementById('score').innerText = score;  
    placeFood();
}


let gameInterval = setInterval(updateGame, speed);

