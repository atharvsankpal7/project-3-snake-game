//Variables
let inputDir = { x: 0, y: 0 };
const GoodScore = new Audio("25 score.mp3");
const bgmusic = new Audio("background music.mp3");
const OnDeath = new Audio("death.mp3");
const scoreincreament = new Audio("score+.mp3");
let score = 0;

let highscore = document.getElementById("highscore").innerHTML;
let highscoreint = Number.parseInt(highscore);

let speed=prompt('Enter the Speed You wanna play in -->')

let PassedTime = 0;
let speedint = Number.parseInt(speed);
let snakeArr = [{ x: 1, y: 1 }];
let Food = {
    x: Math.floor(Math.random() * 18 + 1),
    y: Math.floor(Math.random() * 18 + 1),
};

let board = document.getElementsByClassName("board")[0];

//Functions

let mainfunction = (CurrentTime) => {
    window.requestAnimationFrame(mainfunction);

    if ((CurrentTime - PassedTime) / 1000 < 1 / speed) {
        return;
    }
    PassedTime = CurrentTime;

    GameEngine();
};

let collision = (arr) => {
    for (let i = 1; i < snakeArr.length; i++) {
        if (arr[i].x === arr[0].x && arr[i].y === arr[0].y) {
            return true;
        }
    }
    if (arr[0].x > 18 || arr[0].x <= 0 || arr[0].y > 18 || arr[0].y <= 0) {
        return true;
    }
};

let GameEngine = () => {
    //Score
    if (highscoreint < score) {
        highscoreint = score;
    }
    localStorage.setItem("highscore", highscoreint);
    document.getElementById("scorecardspan").innerHTML = score;
    document.getElementById("highscore").innerHTML = highscoreint;
    if (collision(snakeArr)) {
        score = 0;
        OnDeath.play();
        inputDir = { x: 0, y: 0 };
        snakeArr = [{ x: 1, y: 1 }];
        setTimeout(() => {
            alert("Game Over");
        }, 100);
    }
    //Clearing The slate every-time the frame updates since new rendering element should not collide with previous ones
    board.innerHTML = "";

    //Rendering the Snake
    snakeArr.forEach((element, index) => {
        let SnakeElement = document.createElement("div");
        SnakeElement.style.gridRowStart = element.y;
        SnakeElement.style.gridColumnStart = element.x;
        if (index == 0) {
            SnakeElement.classList.add("Snakehead");
        } else {
            SnakeElement.classList.add("Snakebody");
        }
        //Displaying the Snake on the board
        board.appendChild(SnakeElement);
    });

    //Rendering the food
    let FoodElement = document.createElement("div");
    FoodElement.style.gridRowStart = Food.y;
    FoodElement.style.gridColumnStart = Food.x;
    FoodElement.classList.add("food");
    //Displaying the food
    board.appendChild(FoodElement);

    //When the food has been eaten and food has to be generated.
    if (Food.x == snakeArr[0].x && Food.y == snakeArr[0].y) {
        scoreincreament.play();
        score++;
        snakeArr.unshift({
            x: snakeArr[0].x + inputDir.x,
            y: snakeArr[0].y + inputDir.y,
        });
        Food.x = Math.floor(Math.random() * 18 + 1);
        Food.y = Math.floor(Math.random() * 18 + 1);
        snakeArr.forEach((element) => {
            if (element.x == Food.x && element.y == Food.y) {
                Food.x = Math.floor(Math.random() * 18 + 1);
                Food.y = Math.floor(Math.random() * 18 + 1);
            }
        });
       
    }

    //Movement of the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
};

//Logic
window.requestAnimationFrame(mainfunction);
window.addEventListener("keydown", (e) => {
    inputDir = { x: 1, y: 1 };
    switch (e.key) {
        case "ArrowUp":
            inputDir.y = -1;
            inputDir.x = 0;

            break;
        case "ArrowDown":
            inputDir.x = 0;

            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.y = 0;
            inputDir.x = -1;
            break;
        case "ArrowRight":
            inputDir.y = 0;
            inputDir.x = 1;
            break;

        default:
            inputDir.y = 0;
            inputDir.x = 0;
            break;
    }
});
