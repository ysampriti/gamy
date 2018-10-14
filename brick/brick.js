 let scoreBoard = document.getElementById('score');
 let canvas = document.getElementById('myCanvas');
 let ctx  = canvas.getContext("2d");

let score = 0;

 let dx = 5;
 let dy = -5;

let x = canvas.width/2;
let y = canvas.height-30;
let ballRadius = 10;

let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth)/2;
let paddledX = 7;

let brickRows = 3;
let brickCols = 9;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 30;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

let bricks = [];

for (c=0; c<brickCols; c++){
	for(r=0; r<brickRows; r++){
		bricks.push({
			x : (c*(brickWidth+brickPadding)) + brickOffsetLeft,
			y : (r*(brickHeight+brickPadding)) + brickOffsetTop,
			status : 1
		});
	}
}


let rightPressed=false;
let leftPressed=false;

let keyDownHandler = (event) => {
	if(event.keyCode === 39){
		rightPressed = true;
	}
	else if(event.keyCode === 37){
		leftPressed = true;
	}
}

let keyUpHandler = (event) => {
	if(event.keyCode === 39){
		rightPressed = false;
	}
	else if(event.keyCode === 37){
		leftPressed = false;
	}
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);


let drawBall = () => {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "blue";
	ctx.fill();
	ctx.closePath();
}

let drawPaddle = () => {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = 'red';
	ctx.fill();
	ctx.closePath();
}

let drawBricks = () => {
	bricks.forEach(function(brick) {
		if(!brick.status) return;
		ctx.beginPath();
		ctx.rect(brick.x, brick.y, brickWidth, brickHeight);
		ctx.fillStyle = "#1B5E20";
		ctx.fill();
		ctx.closePath();
	});
}

let collisionDetection = () => {
	bricks.forEach(function(b) {
		if(!b.status) return;

		let inBricksColumn = x > b.x && x < b.x + brickWidth,
			inBricksRows = y > b.y && y < b.y + brickHeight;

			if(inBricksColumn && inBricksRows){
				dy = -dy;
				b.status = 0;
				score++;
			}
	});
}

let draw = () => {
	scoreBoard.innerHTML = `SCORE : ${score}`;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();
	collisionDetection();

	if(x+dx > canvas.width - ballRadius || x+dx < ballRadius){
		dx = -dx;
 	}
	if(y + dy < ballRadius || (
			y + dy > canvas.height - paddleHeight - ballRadius &&
			x + dx > paddleX &&
			x + dx < paddleX + paddleWidth
		)){
		dy = -dy;
	}
 	else if(y+dy > canvas.height){
 		location.replace("lose.html");
		location.reload();
	}

 	if(rightPressed && !(paddleX+paddleWidth >canvas.width)){
 		paddleX += paddledX;
 	}
 	else if(leftPressed && !(paddleX<0)){
 		paddleX -= paddledX
 	}

 	x += dx;
 	y += dy;

 	requestAnimationFrame(draw);
 }

 requestAnimationFrame(draw);
