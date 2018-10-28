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
			block.pos.y = 10;
			this.snake.self.push(block);
		}
		// console.log(this.snake);
				// this._ctx.clearRect(0, 0, canvas.width, canvas.height);

	}

	checkCollisionWithSelf(snake){
		
		let ans = false;
		for(let i = 1; i < snake.size; i++){
			if( snake.self[0].pos.x == snake.self[i].pos.x  &&  
				snake.self[0].pos.y == snake.self[i].pos.y ){
				// console.log("bansal");
				ans = true;
				break;
			}
		}
		// console.log(ans);
		return ans;
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
		this.snake.size = 4;
		for(let i = this.snake.size - 1; i >= 0; i--){
			let block = new Rect(10, 10);
			block.pos.x = i;
			block.pos.y = 0;
			this.snake.self.push(block);
		}
		
		this.snake.direction = 'right';
	}

	eatFood(){
		if(this.snake.head.pos.x === this.food.pos.x &&
			this.snake.head.pos.y === this.food.pos.y){
			return true;
		}
		return false;
	}

	update(game){
		// console.log(game);
		game._ctx.clearRect(0, 0, canvas.width, canvas.height);
		let scoreBoard = document.getElementById('score');
		scoreBoard.innerHTML = `SCORE: ${game.snake.size}`
		// console.log(game.snake);
		let newHead = new Rect(10,10);
		if(game.snake.direction==="left"){
			newHead.pos.x = game.snake.head.pos.x - 1;
			newHead.pos.y = game.snake.head.pos.y;
		} 
		else if(game.snake.direction==="up") {
			newHead.pos.x = game.snake.head.pos.x ;
			newHead.pos.y = game.snake.head.pos.y -1;
			// game.snake.head.pos.y--;
		}
		else if(game.snake.direction==="right"){
			newHead.pos.x = game.snake.head.pos.x + 1;
			newHead.pos.y = game.snake.head.pos.y;
		}
		else if(game.snake.direction==="down") {
			newHead.pos.x = game.snake.head.pos.x ;
			newHead.pos.y = game.snake.head.pos.y + 1;
		}
		game.snake.self.unshift(newHead);
		if(game.eatFood()){
			game.snake.size++;
			game.food.pos.x = Math.round(Math.random()*(game._canvas.width/game.snake.head.size.x-1));
			game.food.pos.y = Math.round(Math.random()*(game._canvas.height/game.snake.head.size.y-1));
		}
		else{
			game.snake.self.pop();
		}

		
		if(game.snake.self[0].pos.x < 0 || 
			game.snake.self[0].pos.x*10 > game._canvas.width || 
			game.snake.self[0].pos.y < 0 || 
			game.snake.self[0].pos.y*10 > game._canvas.height || 
			game.checkCollisionWithSelf(game.snake)){
				// console.log("monil");
				game.reset();
		}	

		document.addEventListener('keydown', (e) => {
			if(e.which === 40 && game.snake.direction != 'up'){
				game.snake.direction = 'down';
			}
		})

		document.addEventListener('keydown', (e) => {
			if(e.which === 38 && game.snake.direction != 'down'){
				game.snake.direction = 'up';
			}
		})

		document.addEventListener('keydown', (e) => {
			if(e.which === 39 && game.snake.direction != 'left'){
				game.snake.direction = 'right';
			}
		})

		document.addEventListener('keydown', (e) => {
			if(e.which === 37 && game.snake.direction != 'right'){
				game.snake.direction = 'left';
			}
		})

		game.draw();
	}

}

const canvas = document.getElementById('canvas');
const snakeGame = new SnakeGame(canvas);
const callUpdate = () => {
	snakeGame.update(snakeGame);
}
setInterval(callUpdate,60);