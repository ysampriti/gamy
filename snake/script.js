class Vec{
	constructor(x = 0, y = 0){
		this.x = x;
		this.y = y;
	}
}

class Rect{
	constructor(w = 0, h = 0){
		this.pos = new Vec;
		this.size = new Vec;
		this.size.x = w;
		this.size.y = h;
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

class Food extends Rect{
	constructor(){
		super(10, 10);
	}
}

class Snake{
	constructor(){
		this.size = 4;
		this.direction = 'right';
		this.self = [];
	}
	get head(){
		return this.self[0];
	}
}

class SnakeGame{
	constructor(canvas){
		this._canvas = canvas;
		this._ctx = canvas.getContext('2d');
		this.food = new Food;
		this.food.pos.x = Math.round(Math.random()*(this._canvas.width/10-1));
		this.food.pos.y = Math.round(Math.random()*(this._canvas.height/10-1));
		this.snake = new Snake;

		for(let i = this.snake.size - 1; i >= 0; i--){
			// console.log(i);
			let block = new Rect(10, 10);
			block.pos.x = i;
			block.pos.y = 0;
			this.snake.self.push(block);
		}
		// console.log(this.snake);

		this._ctx.clearRect(0, 0, canvas.width, canvas.height);

	}

	checkCollisionWithSelf(snake){
		for(let i = 1; i < snake.self.length; i++){
			if( snake.head.pos.x == snake.self[i].x  &&  
				snake.head.pos.y == snake.self[i].y ){
				return true;
			}
		}
		return false;
	}

	drawFood(){
		this._ctx.fillStyle = 'red';
		this._ctx.fillRect(this.food.pos.x * 10, this.food.pos.y * 10, this.food.size.x, this.food.size.y);
	}

	drawSnake(){
		this.snake.self.forEach((s) => {
			this._ctx.fillStyle = 'white';
			this._ctx.fillRect(s.pos.x * 10, s.pos.y * 10, s.size.x, s.size.y);
		});
	}

	draw(){
		this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
		this._ctx.fillStyle = '#000';
		this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
		this.drawFood();
		this.drawSnake();
	}

	reset(){
		while(this.snake.self[0]){
			this.snake.self.pop();
		}
		for(let i = this.snake.size - 1; i >= 0; i--){
			let block = new Rect(10, 10);
			block.pos.x = i;
			block.pos.y = 0;
			this.snake.self.push(block);
		}
		this.snake.size = 4;
		this.snake.direction = 'right';
	}

	eatFood(){
		if(this.snake.head.pos.x === this.food.pos.x &&
			this.snake.head.pos.y === this.food.pos.y){
			return true;
		}
		return false;
	}

	update(dt){
		this._ctx.clearRect(0, 0, canvas.width, canvas.height);
		let scoreBoard = document.getElementById('score');
		scoreBoard.innerHTML = `SCORE: ${this.snake.size}`
		// console.log(this.snake);
		if(this.snake.direction==="left") this.snake.head.pos.x--;
		else if(this.snake.direction==="up") this.snake.head.pos.y--;
		else if(this.snake.direction==="right") this.snake.self[0].pos.x++;
		else if(this.snake.direction==="down") this.snake.head.pos.y++;

		if(this.eatFood()){
			this.snake.size++;
			this.food.pos.x = Math.round(Math.random()*(this._canvas.width/this.snake.head.size.x-1));
			this.food.pos.y = Math.round(Math.random()*(this._canvas.height/this.snake.head.size.y-1));
		}

		// else{
		// 	this.snake.self.pop();
		// 	let newNode = Rect(10, 10);
		// 	newNode.pos.x =  
		// }
		//this.snake.head.pos.x < 0 || this.snake.head.pos.x > this._canvas.width || this.snake.head.pos.y < 0 || this.snake.head.pos.y > this._canvas.height
		if(this.snake.self[0].pos.x < 0 || this.snake.self[0].pos.x > this._canvas.width || this.snake.self[0].pos.y < 0 || this.snake.self[0].pos.y > this._canvas.height || this.checkCollisionWithSelf(this.snake)){
			console.log("monil");
			this.reset();
		}	

		this.draw();
	}
	setInterval(update,60);
}


const canvas = document.getElementById('canvas');
const snakeGame = new SnakeGame(canvas);