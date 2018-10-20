class vect {
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

class ball extends Rect{
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

class Brick{
	constructor(canvas){
		this.scoreBoard = document.getElementById('score');
		this._canvas   = canvas;
		this._ctx = canvas.getContext('2d');
		this.ball = new Ball;
		this.player = new Player;

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
			player.top <= ball.bottom && player.bottom > ball.top){
				ball.vel.y = -ball.vel.y;
		}
	}
	
	start(){
		if(this.ball.vel.x === 0 && this.ball.vel.y === 0){
			this.ball.vel.x = 300 * (Math.random() > 0.5 ? 1 : -1);
			this.ball.vel.y = 300 * (Math.random()*2 - 1);
		}
	}
	
	reset(){
		this.ball.pos.x = this._canvas.width/2;
		this.ball.pos.y = this._canvas.height - 30;
		this.ball.vel.x = 0;
		this.ball.vel.y = 0;
		this.player.pos.x = this._canvas.width - 50;
		this.player.pos.y = this._canvas.height - 30;
	}
}


