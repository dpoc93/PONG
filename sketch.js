let ball;
let paddleWidth = 20;
let leftPaddle;
let rightPaddle;
const PADDLE_SPEED = 5;

let score = {
  player1: 0,
  player2: 0,
};

let score1;
let score2;

function setup() {
  createCanvas(800, 400);
  ball = new Ball();
  leftPaddle = new Paddle(0, paddleWidth);
  rightPaddle = new Paddle(width - paddleWidth, paddleWidth);
  score1 = createP('Player1: ' + score.player1);
  score2 = createP('Player2: ' + score.player2);
  score1.style('color', 'black');
  score1.style('font-size', '24px');
  score2.style('color', 'black');
  score2.style('font-size', '24px');
}

function draw() {
  background(0);
  drawMiddleLine();
  ball.show();
  ball.move();
  ball.checkEdges();
  leftPaddle.show();
  rightPaddle.show();
  if (ball.hits(leftPaddle)) {
    ball.changeDirection(leftPaddle);
  } else if (ball.hits(rightPaddle)) {
    ball.changeDirection(rightPaddle);
  }

  if (ball.x <= 0 || ball.x >= width) {
    if (ball.x <= 0 && ball.x > ball.xSpeed) {
      score2.html('Player2: ' + ++score.player2);
    } else if (ball.x >= width && ball.x < ball.xSpeed + width) {
      score1.html('Player1: ' + ++score.player1);
    }

    if (frameCount % 120 == 0) {
      ball = new Ball();
    }
  }

  if (keyIsDown(UP_ARROW)) {
    if (
      ball.x >= rightPaddle.x &&
      ball.x <= rightPaddle.x + rightPaddle.w &&
      rightPaddle.y <= 2 * ball.r
    ) {
      rightPaddle.y = 2 * ball.r;
    } else if (rightPaddle.y <= 0) {
      rightPaddle.y = 0;
    } else {
      rightPaddle.y -= PADDLE_SPEED;
    }
  }

  if (keyIsDown(DOWN_ARROW)) {
    if (
      ball.x >= rightPaddle.x &&
      ball.x <= rightPaddle.x + rightPaddle.w &&
      rightPaddle.y >= height - rightPaddle.h - 2 * ball.r
    ) {
      rightPaddle.y = height - rightPaddle.h - 2 * ball.r;
    } else if (rightPaddle.y >= height - rightPaddle.h) {
      rightPaddle.y = height - rightPaddle.h;
    } else {
      rightPaddle.y += PADDLE_SPEED;
    }
  }

  if (keyIsDown(87)) {
    if (
      ball.x >= leftPaddle.x &&
      ball.x <= leftPaddle.x + leftPaddle.w &&
      leftPaddle.y <= 2 * ball.r
    ) {
      leftPaddle.y = 2 * ball.r;
    } else if (leftPaddle.y <= 0) {
      leftPaddle.y = 0;
    } else {
      leftPaddle.y -= PADDLE_SPEED;
    }
  }

  if (keyIsDown(83)) {
    if (
      ball.x >= leftPaddle.x &&
      ball.x <= leftPaddle.x + leftPaddle.w &&
      leftPaddle.y >= height - leftPaddle.h - 2 * ball.r
    ) {
      leftPaddle.y = height - leftPaddle.h - 2 * ball.r;
    } else if (leftPaddle.y >= height - leftPaddle.h) {
      leftPaddle.y = height - leftPaddle.h;
    } else {
      leftPaddle.y += PADDLE_SPEED;
    }
  }
}

function drawMiddleLine() {
  stroke(255);
  strokeWeight(5);
  line(width / 2, 0, width / 2, height);
}
