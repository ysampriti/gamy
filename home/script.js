let gotoLogin = document.getElementById('gotoLogin');
let gotoHome = document.getElementById('gotoHome');
let gotoGames = document.getElementById('gotoLogin');
let gotoOurteam = document.getElementById('gotoOurteam');

const tetris = document.getElementById('tetris');
const tetrisStart = document.getElementById('tetris-start');
const flappy = document.getElementById('flappy');
const flappyStart = document.getElementById('flappy-start');
const brick = document.getElementById('brick');
const brickStart = document.getElementById('brick-start');
const pong = document.getElementById('pong');
const pongStart = document.getElementById('pong-start');
const rps = document.getElementById('rps');
const rpsStart = document.getElementById('rps-start');
const snake = document.getElementById('snake');
const snakeStart = document.getElementById('snake-start');


const clickRotate = (game) => {
	game.classList.toggle('rotated');
};

const openLoaction = (game) => {
    window.location.href =  `file:///D:/tech/oops/gamy/${game}/${game}.html`;
};

tetrisStart.addEventListener('click' , () => {
  openLoaction('tetris');
})
tetris.addEventListener('click', function() {
	clickRotate(tetris);
});

flappyStart.addEventListener('click' , () => {
  openLoaction('flappy');
})
flappy.addEventListener('click', function() {
	clickRotate(flappy);
});

brickStart.addEventListener('click' , () => {
  openLoaction('brick');
})
brick.addEventListener('click', function() {
	clickRotate(brick);
});

pongStart.addEventListener('click' , () => {
  openLoaction('pong');
})
pong.addEventListener('click', function() {
	clickRotate(pong);
});


rpsStart.addEventListener('click' , () => {
  openLoaction('rps');
})
rps.addEventListener('click', function() {
	clickRotate(rps);
});

snakeStart.addEventListener('click' , () => {
  openLoaction('snake');
})
snake.addEventListener('click', function() {
	clickRotate(snake);
});

gotoHome.addEventListener('click', () => {
	window.scroll(0,0);
});

gotoLogin.addEventListener('click', () => {
	window.scrollByPages(2);
});

gotoHome.addEventListener('click', () => {
	window.scroll(0,0);
});

gotoHome.addEventListener('click', () => {
	window.scroll(0,0);
});


