class Vec {
	constructor(x = 0, y = 0){
		this.x = x;
		this.y = y;
	}
}

class Rect {
	constructor(w = 0 ,h = 0){
		this.pos = new Vec;
		this.size = new Vec(w, h);
	}
	get left(){
		return this.pos.x //- this.size.x/2
	} 
	get right(){
		return this.pos.x + this.size.x
	}
	get top(){
		return this.pos.y //- this.size.y/2
	}
	get bottom(){
		return this.pos.y + this.size.y
	}
}

class Ball extends Rect{
	constructor(){
		super(10,10);
		this.vel = new Vec;
	}
}

class Player extends Rect{
	constructor(){
		super(100,20);
		this.score  = 0;
		this.rightPressed = false;
		this.leftPressed = false;
	}
}

class Brick extends Rect{
	constructor(x ,y){
		super();
		this.pos.x = x;
		this.pos.y = y;
		this.size.x = 75;
		this.size.y = 20;
		this.status = 1;
	}
}

class BrickBreaker{
	constructor(canvas){
		this.scoreBoard = document.getElementById('score');
		this._canvas   = canvas;
		this._ctx = this._canvas.getContext('2d');
		this.ball = new Ball;
		this.player = new Player;
		this.bricks = [];
		this._ctx.clearRect(0, 0, canvas.width, canvas.height);

		let brickRows = 3;
		let brickCols = 9;
		let brickPadding = 30;
		let brickOffsetTop = 30;
		let brickOffsetLeft = 30;

		for (let c=0; c<brickCols; c++){
			for(let r=0; r<brickRows; r++){
				let brick = new Brick;
				brick.pos.x = (c*(75+brickPadding)) + brickOffsetLeft;
				brick.pos.y = (r*(20+brickPadding)) + brickOffsetTop;
				this.bricks.push(brick);
				// console.log(brick);
				// this.bricks.push({
				// 	x : (c*(75+brickPadding)) + brickOffsetLeft,
				// 	y : (r*(20+brickPadding)) + brickOffsetTop,
				// 	status : 1
				// });
			};
		};

		// console.log(this.bricks)

		let lastTime = null;
		const callback = (millis) => {
			if(lastTime){
				this.update((millis - lastTime) / 1000);
			}
			lastTime = millis;
			requestAnimationFrame(callback);
		};
		callback();
		this.reset();
	}

	//to check collision with player
	collide(player, ball){
		if(player.right  > ball.left && player.left < ball.right &&
			player.top <= ball.bottom && player.bottom > ball.top){
				ball.vel.y = -ball.vel.y;
		}
	}

	drawRect(rect, color){
		this._ctx.fillStyle = color;
		this._ctx.fillRect(rect.pos.x, rect.pos.y, rect.size.x, rect.size.y);
	}

	drawBricks(){
		this.bricks.forEach((brick) => {
			if(brick.status){
				this._ctx.fillStyle = 'green';
				this._ctx.fillRect(brick.pos.x, brick.pos.y, 75, 20);
			}
		});
	}

	draw(){ 
		this._ctx.fillStyle = '#000';
		this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
		this.drawRect(this.ball, "blue");

		if(this.player.rightPressed){
			this.player.pos.x += 5;
		};
		if(this.player.leftPressed){
			this.player.pos.x -= 5;
		};
		this.drawBricks();
		this.drawRect(this.player, "red");
	}

	reset(){
		this.ball.pos.x = this._canvas.width/2;
		this.ball.pos.y = this._canvas.height - 40;
		this.ball.vel.x = 300 * (Math.random > 0.5 ? 1 : -1);
		let fact = Math.random();
		console.log(fact);
		if (fact > 0.5) {
			fact = 1.7 - fact;
		}
		else{
			fact = 0.5 + fact;
		}
		
		this.ball.vel.y = -300 * fact ;
		this.player.pos.x = this._canvas.width/2 - 40;
		this.player.pos.y = this._canvas.height - 20;
		this.player.score = 0;
		this.bricks.forEach((b) => {
			b.status = 1;
		})
	};

	checkBottomCollision(brick){
		if(this.ball.top <= brick.bottom && 
			this.ball.top >= brick.top && 
			this.ball.right >= brick.left && 
			this.this.ball.left <= brick.right) {
				this.ball.vel.y = -this.ball.vel.y;
		}
	}

	detectBrickCollision(){
		// console.log(true);
		this.bricks.forEach((b) => {
			if(!b.status) return;

		// 	let x = canvas.width/2;
		// 	let y = canvas.height-30;

		// 	let inBricksColumn = x > b.x && x < b.x + 75,
		// 		inBricksRows = y > b.y && y < b.y + 20;
		// 		// console.log(false);
		// 		if(inBricksColumn && inBricksRows){
		// 			this.ball.vel.y = -this.ball.vel.y;
		// 			b.status = 0;
		// 			score++;

		// 		}
		// });
		if(this.ball.top <= b.bottom && 
			this.ball.top >= b.top && 
			this.ball.right >= b.left && 
			this.ball.left <= b.right){
				this.ball.vel.y = -this.ball.vel.y;
				b.status = 0;
				this.player.score++;
			}
		}
	)}

	update (dt) {
		this._ctx.clearRect(0, 0, canvas.width, canvas.height);
		this.ball.pos.x += this.ball.vel.x * dt;
		this.ball.pos.y += this.ball.vel.y * dt;
		this.scoreBoard.innerHTML = `SCORE: ${this.player.score}`
		if(this.ball.bottom > this._canvas.height){
			this.reset();
		}
		if(this.ball.top < 0){
			this.ball.vel.y = -this.ball.vel.y;
		}
		if(this.ball.left < 0 || this.ball.right > this._canvas.width){
			this.ball.vel.x = -this.ball.vel.x;
		}
	
		document.addEventListener('keydown', e => {
			if(e.which == 37 && this.player.left > 0){
				this.player.leftPressed = true;
			}
			else if(e.which == 39 && this.player.right < this._canvas.width){
				this.player.rightPressed = true;	
			}
		});

		document.addEventListener('keyup', e => {
			if(e.which == 37){
				this.player.leftPressed = false;
			}
			else if(e.which == 39){
				this.player.rightPressed = false;	
			}
		});



		// this.players[1].pos.y = this.ball.pos.y
		this.collide(this.player, this.ball);
		this.detectBrickCollision();

		this.draw();
	}
}

const canvas = document.getElementById('myCanvas');
const brickBreaker = new BrickBreaker(canvas);




