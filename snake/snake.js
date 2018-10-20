window.onload = function() {
	let cvs = document.getElementById('canvas');
	let ctx= cvs.getContext('2d');
	let scoreBoard = document.getElementById('score');

	let cvsW = cvs.width;
	let cvsH = cvs.height;

	let snakeW = 10;
	let snakeH = 10;

	let cursorXpos ;
	let cursorYpos ;
	let downXpos,downYpos,upXpos,upYpos;
	//to get cursor position
	function init() {
		if (window.Event) {
			document.captureEvents(Event.MOUSEMOVE);
		}
		document.onmousemove = getCursorXY;
	}

	function getCursorXY(e) {
		cursorXpos = (window.Event) ? e.pageX  : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
		cursorYpos = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);

	}

	function drawSnake(x,y){
		ctx.fillStyle = "#FFF";
		ctx.fillRect(x* snakeW, y* snakeH, snakeW, snakeH);

		ctx.fillStyle = "#000";
		ctx.strokeRect(x* snakeW, y* snakeH, snakeW, snakeH);
	}

	// create our snake object,  it will contain 4 cells in default;

	let len = 4;
	let snake = [];
	//score 
	let score = 4;
	//default direction
	let direction = "right";

	//read users directions
		let getDirection = (e) => {
			if(e.keyCode == 37 && direction!= "right") {
				direction = "left";			
			}else if(e.keyCode == 38 && direction!= "down") {
				direction = "up";			
			}else if(e.keyCode == 39 && direction!= "left") {
				direction = "right";			
			}else if(e.keyCode == 40 && direction!= "up") {
				direction = "down";
			}
		}

	let mousedown = (e) => {
		downXpos = cursorXpos;
		downYpos = cursorYpos;
		
	}

	let mouseup = (e) => {
		upXpos = cursorXpos;
		upYpos = cursorYpos;
		swipeHor = upXpos - downXpos;
		swipeVer = upYpos - downYpos;
		if(Math.abs(swipeVer)>Math.abs(swipeHor)){
			if(swipeVer>0 && direction!="up"){
				direction="down";
			}
			else if(swipeVer<0 && direction!="down"){
				direction = "up";
			}
		}else{
			if(swipeHor>0 && direction!="left"){
				direction="right";
			}
			else if(swipeHor<0 && direction!="right"){
				direction = "left";
			}

		}
	


	}
		

	document.addEventListener("keydown",getDirection);
	document.addEventListener("mousedown", mousedown);
	document.addEventListener("mouseup" , mouseup);
	

	for(let i=len-1;i>=0;i--){
		snake.push(
			{x : i,
			 y : 0
			}
		);
	}

	//create some food
	food = {
		x : Math.round(Math.random()*(cvsW/snakeW-1)),
		y : Math.round(Math.random()*(cvsH/snakeH-1))
	};

	//draw food
	let drawFood = (x,y) => {
		ctx.fillStyle = "#F00";
		ctx.fillRect(x* snakeW, y* snakeH, snakeW, snakeH);

		ctx.fillStyle = "#F00";
		ctx.strokeRect(x* snakeW, y* snakeH, snakeW, snakeH);
	}

	//check collision of snake with itself
	let checkCollision = (x,y,array) => {
		for(let i = 1; i < array.length; i++){
			if( x==array[i].x && y==array[i].y ){
				return true;
			}
		}
		
		return false;
	}

	let drawScore = (score) => {
		ctx.fillStyle = "green";
		ctx.font = "15px Verdana";
		ctx.fillText("score: "+score,5,cvsH-5);

	}

	function draw(){
		ctx.clearRect(0,0,cvsW,cvsH);
		
		for(let i=snake.length-1;i>=0;i--){
			let x = snake[i].x;
			let y = snake[i].y;
			drawSnake(x,y);
		}

		drawFood(food.x,food.y);
		//snake head;
		let snakeX = snake[0].x;
		let snakeY = snake[0].y;

		//snake hits the wall or itself then end the game
		if(snakeX<0 || snakeY < 0  || snakeX>=cvsW/snakeW || snakeY>=cvsH/snakeH || checkCollision(snakeX,snakeY,snake)){
			location.reload();
		}

		//if snake eats food;
		if(snakeX === food.x && snakeY=== food.y){
			food = {
				x : Math.round(Math.random()*(cvsW/snakeW-1)),
				y : Math.round(Math.random()*(cvsH/snakeH-1))
			};
			score++;
		}else{			
			//removing tail;
			snake.pop();
		}



		//creating new HEAD of the snake, based on previous head and direction
		if(direction==="left") snakeX--;
		else if(direction==="up") snakeY--;
		else if(direction==="right") snakeX++;
		else if(direction==="down") snakeY++;
		
		let newHead = {
			x : snakeX,
			y : snakeY
		};

		snake.unshift(newHead);
		scoreBoard.innerHTML = `Score: ${score}`


	}

	setInterval(init,1);
	setInterval(draw,60);
}

