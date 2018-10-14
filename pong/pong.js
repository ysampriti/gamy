//vector class for storing location of the things(top left corner's co-ordinates)
class Vec{ 
	constructor(x = 0, y = 0){
		this.x = x;
		this.y = y;
	}
	get len() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	set len(value){
		const fact = value / this.len;
		this.x *= fact;
		this.y *= fact;
	}
}

// class for a Rectangular object (the Fattas and the ball)
class Rect{
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

///class of a ball object which is a subclass of rectangle class
class Ball extends Rect{
	constructor(){
		super(10,10);
		this.vel = new Vec;
	}
}

class Player extends Rect{
	constructor(){
		super(20,100);
		this.score = 0;

	}

}

class Pong{

	constructor(canvas){
		this.scoreBoard = document.getElementById('score');
		this._canvas = canvas;
		this._context = canvas.getContext('2d');
		this.ball = new Ball;
		this.players = [
			new Player,
			new Player
		];
		//console.log(this.ball.left)
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

	collide(player, ball){
		if(player.right  > ball.left && player.left < ball.right &&
			player.top < ball.bottom && player.bottom > ball.top){
			if(ball.vel.x > 0){
				ball.vel.x += 10;
			}
			else{
				ball.vel.x -= 10;
			}
			ball.vel.x = -ball.vel.x;
		}
	}

	start(){
		if(this.ball.vel.x === 0 && this.ball.vel.y === 0){
			this.ball.vel.x = 300 * (Math.random() > 0.5 ? 1 : -1);
			this.ball.vel.y = 300 * (Math.random()*2 - 1);
		}
	}

	draw(){
		this._context.fillStyle = '#000';
		this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
		this.drawRect(this.ball);
		this.players.forEach(player => this.drawRect(player));

	}

	drawRect(rect){
		this._context.fillStyle = '#fff';
		this._context.fillRect(rect.pos.x, rect.pos.y, rect.size.x, rect.size.y);
	}
	
	reset(){
		this.ball.pos.x = this._canvas.width/2;
		this.ball.pos.y = this._canvas.height/2;
		this.ball.vel.x = 0;
		this.ball.vel.y = 0;
		this.players[0].pos.x = 5;
		this.players[1].pos.x = canvas.width - 25;
		this.players[0].pos.y = canvas.height/2 - this.players[0].size.y/2;
		this.players[1].pos.y = canvas.height/2 - this.players[1].size.y/2;
	}

	update (dt) {
		this.ball.pos.x += this.ball.vel.x * dt;
		this.ball.pos.y += this.ball.vel.y * dt;
		this.scoreBoard.innerHTML = `${this.players[0].score} : ${this.players[1].score}`
		if(this.ball.left < 0 || this.ball.right > this._canvas.width){
			let playerId;
			if(this.ball.vel.x < 0){
				playerId = 1;
			}
			else{
				playerId = 0;
			}
			this.players[playerId].score++;
			this.reset();
		}
		if(this.ball.top < 0 || this.ball.bottom > this._canvas.height){
			this.ball.vel.y = -this.ball.vel.y;
		}
	
		document.addEventListener('keydown', e => {
			if(e.which == 38 && this.players[1].pos.y>0){
				pong.players[1].pos.y -= 0.1;
			}
			else if(e.which == 40 && this.players[1].pos.y + 100 < this._canvas.height){
				pong.players[1].pos.y += 0.1;	
			}
		});

		// this.players[1].pos.y = this.ball.pos.y
		this.players.forEach(player => this.collide(player, this.ball))

		this.draw();
	}
}

const canvas = document.getElementById('pong');
const pong = new Pong(canvas);

canvas.addEventListener('mousemove' , event => {
	pong.players[0].pos.y = event.offsetY;
});



canvas.addEventListener('click', event => {
	pong.start();
});