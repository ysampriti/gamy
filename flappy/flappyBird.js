let cvs = document.getElementById('myCvs');
let ctx = cvs.getContext('2d');


let bird = new Image();
let bg = new Image();
//let fg = new Image();
let pipeNorth = new Image();
let pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
//fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";




function draw() {
    ctx.drawImage(bg,100,0);
    

    window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);


