// global variables
let canvas;
let ctx;
let WIDTH = 600;
let HEIGHT = 400;

// here we use init (short for initialize) to setup the canvas and context
// this function will be called in the HTML document in body onload = ""
// we also append the body with a new canvas element
function init() {
    canvas = document.createElement("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    ctx = canvas.getContext('2d');
    console.log("game initialized");
    document.body.appendChild(canvas);
    gameLoop();
}

class Square {
    constructor(id, x, y, w, h, color, speed) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.speed = 3
    }
    update() {
        if (this.x >= WIDTH-this.w || this.x < 0) {
            console.log("AHHH! I fell off the side!");
            this.speed = -this.speed;
        }
        this.x += Math.floor(Math.random()*1*this.speed);
    };
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    };
}

// instantiations...
let oneSquare = new Square("Bob", 10, 10, 50, 50, 'rgb(200, 100, 200)');
let twoSquare = new Square("Chuck", 60, 60, 100, 100, 'rgb(200, 200, 0)');

let someArray = [oneSquare, twoSquare];
for (i in someArray) {
    console.log(someArray[i]);
}
for (i of someArray) {
    console.log(i);
}


function update() {
    oneSquare.update();
}
// we now have just the drawing commands in the function draw
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    oneSquare.draw();
    twoSquare.draw();
}

// here we have a big leap!
// We are using the window.requestAnimationFrame() 
// .requestAnimationFrame() is a method (likg a function attached to an object)
// It tells the browser that you wish to animate
// It asks the browser to call a specific function, in our case gameLoop
// It uses this function to 'repaint'
// In JS this called a callback, where a function passes an argument to another function
// MDN reference https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
let gameLoop = function () {
    // console.log('the game loop is alive! now comment this out before it eats up memory...')
    update();
    draw();
    window.requestAnimationFrame(gameLoop);
}