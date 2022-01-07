/* 
Final project: brick breaker
Main features - collision, enemy array (gamePlan), hitpoints
*/

// global variables
let canvas;
let ctx;

let TILESIZE = 32
let WIDTH = TILESIZE*32
let HEIGHT = TILESIZE*16
let allSprites = [];
let blocks = [];
let balls = [];
let blockImage = new Image();
blockImage.src = "../LiamMason22_FinalProject/finalProject_Images/Charles.jpg"

/* Edited from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
Instead of flooring or raising numbers, I just let min = min and max = max and removed the floor function from the math.random function */
function getRandomNumber(min, max) {
    min = min;
    max = max;
    // The maximum is exclusive and the minimum is inclusive - (max,min]
    return (Math.random() * (max - min) + min);
  }

// Creates game plan for usage in constructing grid and adding sprites
let gamePlan = `
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@..............................@
@..##########################..@
@..##########################..@
@..##########################..@
@..##########################..@
@..##########################..@
@..##########################..@
@..##########################..@
@..##########################..@
@..............................@
@..............................@
@..............................@
@..............................@
@..............................@`;
// "Block" sprite must be created before '#' can be defined

// Gets user input from keyboard
let keysDown = {};
let keysUp = {};

// Waits for user input in a key ("keydown" = pressing computer key)
addEventListener("keydown", function (event) {
    // Adds pressed key to keysDown variable for recognition in separate functions
    keysDown[event.key] = true;
}, false);
// Waits for end of user input in a key ("keyup" = letting go of computer key)
addEventListener("keyup", function (event) {
    // Removes unpressed key from keysDown variable to prevent recognition in separate functions
    delete keysDown[event.key];
}, false);

// Function called in html document in "body onload = "
function init() {
    // Creates canvas
    canvas = document.createElement("canvas");
    // Sets width and height of canvas
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    // Sets up context
    ctx = canvas.getContext('2d');
    console.log("game initialized");
    document.body.appendChild(canvas);
    // Initializes gameloop
    gameLoop();
}

class Sprite {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.spliced = false;
        allSprites.push(this);
    }
    // Calculates a variable for the x-center
    get cx() {
        return this.x + this.w * 0.5;
    }
    // Calculates a variable for the y-center
    get cy() {
        return this.y + this.h * 0.5;
    }
    // Calculates a variable for the left side
    get left() {
        return this.x
    }
    // Calculates a variable for the right side
    get right() {
        return this.x + this.w
    }
    // Calculates a variable for the top
    get top() {
        return this.y
    }
    // Calculates a variable for the center of the top edge
    get midtop() {
        return this.y + this.w * 0.5;
    }
    // Calculates a variable for the bottom
    get bottom() {
        return this.y + this.h
    }
    // Calculates a variable for the center of the bottom edge
    get midbottom() {
        return (this.y + this.h) + this.w * 0.5
    }
    // Getter function
    get type() {
        return "sprite";
    }
    // Object creates itself
    create(x, y, w, h, color) {
        return new Sprite(x, y, w, h, color);
    }
    // Creates perameters to determine whether collision has occured
    collideWith(obj) {
        if (this.x + this.w >= obj.x &&
            this.x <= obj.x + obj.w &&
            this.y + this.h >= obj.y &&
            this.y <= obj.y + obj.h
        ) {
            return true;
        }
    }
    // Object draws itself
    // modified from https://github.com/pothonprogramming/pothonprogramming.github.io/blob/master/content/rectangle-collision/rectangle-collision.html
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    };
}

// Extends Sprite class with Player class
class Player extends Sprite {
    constructor(x, y, speed, w, h, color,) {
        super(x, y, w, h, color);
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.dx = 0;
        this.dy = 0;
        this.speed = speed;
        this.w = w;
        this.h = h;
        this.color = color;
    }
    input() {
        // checks for user input
        if ("a" in keysDown) { 
            // Player holding left
            this.vx = -this.speed;
        } 
        else if ("d" in keysDown) { 
            // Player holding right
            this.vx = this.speed;
        }
        else {
            // When no keys are pressed, motion stops
            this.vx = 0
        }
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    };
    get type(){
        return "player"
    }
    update() {
        this.input();
        this.x += this.vx;
        for (i of allSprites) {
            // If right side of  Player runs into left side of canvas
            if (this.x + this.w > WIDTH) {
                // Right side of player remains at edge of right of canvas
                this.x = WIDTH - this.w;
            }
            // If left side of Player runs into right side of canvas
            if (this.x <= 0) {
                // Left side of player remains at edge of canvas
                this.x = 0;
            }
        }
        for (i of allSprites) {
            if (i.type == "ball") {
                // Ball changes direction when it hits player
                if (i.collideWith(this)) {
                    if (i.cy > this.cy) /*(ball above object)*/ {
                        i.vy = -1;
                        // Uses getRandomNumber() function to have the ball bounce in a random x-velocity off the paddle
                        i.vx = getRandomNumber(-1,1);
                        // console.log("Ball hits from above");
                        // console.log("Ball y-velicity is " + i.vy)
                    }
                    // if (this.cx > i.cx) /*(ball left of object)*/ {
                    //     i.vx = -1;
                    //     // console.log("Ball hits from left");
                    //     // console.log("Ball x-velicity is " + i.vx);
                    // }
                    // else if (i.cx > this.cx) /*(ball right of object)*/ {
                    //     i.vx = 1;
                    //     // console.log("Ball hits from right");
                    //     // console.log("Ball x-velicity is " + i.vx);
                    // }
                }
            }
        }
    };
}

// Extends Sprite class with Ball class
class Ball extends Sprite {
    // New constructor functions extends Sprite array
    constructor(x, y, speed, w, h, r, color) {
        // Attaches constructor array to variables
        super(x, y, w, h, color)
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.r = r;
        this.speed = speed;
        // Ball will move right first
        this.vx = 1;
        // Ball will move upscreen first
        this.vy = -1;
        this.color = color;
        balls.push(this);
        console.log(balls)
    }
    create() {
        return new Ball(WIDTH/2, HEIGHT-2*TILESIZE, 6, 0, 0, 12, 'black')
    }
    draw() {
        ctx.beginPath();
        // Draws a circle instead of a square
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.stroke();;
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    // Getter function
    get type() {
        return "ball";
    }
    // Calculates the location of the outer circumference of the ball
    get edge() {
        return this.cx + this.r;
    }

    update() {
        this.x += this.vx * this.speed;
        this.y += this.vy * this.speed;
        /* I moved the collision functions to the objects the ball would collide with
        I couldn't get the ball to rebound off objects properly in the ball's update function */
    }
}

// Extends Sprite class with Block class
class Block extends Sprite {
    // New constructor function extends Sprite array
    constructor(x, y, w, h) {
        // Attaches constructor array to variables
        super(x, y, w, h);
        this.x = x;
        this.y = y;
        this.w = TILESIZE/1.2;
        this.h = TILESIZE/1.2;
        this.hitpoints = 2
        this.color = 'blue';
        blocks.push(this);
        // console.log(blocks);
    }
    // Object methods
    // Object creates itself
    create(x, y, w, h, hitpoints, color) {
        return new Block(x, y, w, h, hitpoints, color);
    }
    draw(){
        ctx.drawImage(blockImage, 0, 0, 3024, 3024, this.x, this.y, TILESIZE/1.2, TILESIZE/1.2);
    }
    // Getter function
    get type() {
        return "block";
    }
    update() {
        for (i of allSprites) {
            if (i.type == "ball") {
                /* My if collide loop is pretty buggy.
                I couldn't figure out a way for the function to prioritize specific collisions,
                so the ball will sometimes bounce the wrong way off of a wall or block.  */  
                if (i.collideWith(this)) {
                        // console.log("Ball hits block");
                        this.hitpoints = this.hitpoints - 1;
                        // console.log("Block " + this.x + ", " + this.y + " hitpoints is " + this.hitpoints);
                    // Ball changes direction when it hits a block
                    if (this.cy < i.cy) /*(ball below object)*/ {
                        i.vy = 1;
                        // console.log("Ball hits from below");
                        // console.log("Ball y-velicity is " + i.vy);
                    }
                    else if (this.cx > i.cx) /*(ball left of object)*/ {
                        i.vx = -1;
                        // console.log("Ball hits from left");
                        // console.log("Ball x-velicity is " + i.vx);
                    }
                    else if (i.cy > this.cy) /*(ball above object)*/ {
                        i.vy = -1;
                        // console.log("Ball hits from above");
                        // console.log("Ball y-velicity is " + i.vy)
                    }
                    else if (i.cx > this.cx) /*(ball right of object)*/ {
                        i.vx = 1;
                        // console.log("Ball hits from right");
                        // console.log("Ball x-velicity is " + i.vx);
                    }
                }
            }
        }
    }
}
class Wall extends Sprite {
    // New constructor function extends Sprite array (except it doesn't in this case)
    constructor(x, y, w, h, color) {
        // Attaches constructor array to variables
        super(x, y, w, h, color);
        this.x = x;
        this.y = y;
        this.w = TILESIZE;
        this.h = TILESIZE;
        this.color = 'blue';
    }
    // Object methods
    // Object creates itself
    create(x, y, w, h, color) {
        return new Wall(x, y, w, h, color);
    }
    // Getter function
    get type() {
        return "wall";
    }
    update() {
        for (i of allSprites) {
            if (i.type == "ball") {
                /* My if collide loop is pretty buggy.
                I couldn't figure out a way for the function to prioritize specific collisions,
                so the ball will sometimes bounce the wrong way off of a wall or block.  */ 
                if (i.collideWith(this)) {
                    // Ball changes direction when it hits a wall
                    if (this.cy < i.cy) /*(ball below object)*/ {
                        i.vy = 1;
                        // console.log("Ball hits from below");
                        // console.log("Ball y-velicity is " + i.vy);
                    }
                    else if (this.cx > i.cx) /*(ball left of object)*/ {
                        i.vx = -1;
                        // console.log("Ball hits from left");
                        // console.log("Ball x-velicity is " + i.vx);
                    }
                    // else if (i.cy > this.cy) /*(ball above object)*/ {
                    //     i.vy = -1;
                    //     // console.log("Ball hits from above");
                    //     // console.log("Ball y-velicity is " + i.vy)
                    // }
                    else if (i.cx > this.cx) /*(ball right of object)*/ {
                        i.vx = 1;
                        // console.log("Ball hits from right");
                        // console.log("Ball x-velicity is " + i.vx);
                    }
                }
            }
        }
    }
}

// Now that Block and Wall objects have been created, '#' is defined as Block and '@' is defined as Wall
// Creates a key for strings in grid
const levelChars = {
    ".": "empty",
    "#": Block,
    "@": Wall,
};

// Creates single array based on gamePlan - essentially makes it readable for computer
function makeGrid(plan, width) {
    // Sets two arrays for function
    let newGrid = [];
    let newRow = [];
    // For every index in string
    for (i of plan) {
        // If i is a character and not the end of the line
        if (i != "\n") {
            // Push the character (either '.' or '#') into newRow array
            newRow.push(i);
        }
        // If the function reaches the end of the row (that has characters in it)
        if (newRow.length % width == 0 && newRow.length != 0) {
            // console.log("This row is" + newRow)
            // Push the row into newGrid array
            newGrid.push(newRow);
            // Reset newRow array for next function
            newRow = [];
        }
    }
    // Return the newGrid array
    return newGrid;
}

// console.log("here's the grid...\n" + makeGrid(gamePlan, 32));

function readLevel(grid) {
    let startActors = [];
    // For every row (y is an array)
    for (y in grid) {
        // For every x in the current y array
        for (x in grid[y]) {
            // Two-dimensional array (x array inside y array)
            let ch = grid[y][x];
            /* 
            In the case of "#", the key is "#" and the value is the Square class.
            */
            // If the variable is not a new line character
            if (ch != "\n") {
                // Creates a variable ("type") from the value attached to the levelChars key
                let type = levelChars[ch];
                // If "type" is a string - in this case, "empty"
                if (typeof type == "string") {
                    // Push the "empty" string to startActors array
                    startActors.push(type);
                }
                else {
                    // Creates new object, as "type" is now a class, and assigns the new object to t
                // let t = new type;
                    // Use x and y values from reading the grid, adjusted based on the tilesize
                    startActors.push(new type(x * TILESIZE, y * TILESIZE))
                }
            }
        }
    }
    return startActors;
}

// Sets current grid in usage
let currentLevel = readLevel(makeGrid(gamePlan, 32))
// console.log('current level');
// console.log(currentLevel);

// instantiations...
// Player(x, y, speed, w, h, color)
let player1 = new Player(WIDTH/2, HEIGHT-TILESIZE, 6, 4*TILESIZE, TILESIZE/2, 'rgb(100, 100, 100)', 100);
// Ball(x, y, speed, w[0], h[0], r, color)
let ball1 = new Ball(WIDTH/2, HEIGHT-2*TILESIZE, 6, 0, 0, 12, 'black')

function update() {
    player1.update();
    for (i of allSprites) {
        i.update();
    }
    for (b of blocks) {
        if (b.hitpoints <= 0) {
            // console.log("Block has lost all hitpoints");
            b.spliced = true;
        }
        b.update();
    }

    /* I realized I need to splice an object from all the arrays containing it to completely get rid of it.
    If a block is spliced from just the block array, it will still be drawn.
    If a block is spliced from just the allSprites array, it will still exist, just not be drawn.
    Thus, I created a for loop to splice a block from all of the arrays. */
    // Splices object from the blocks array
    for (b in blocks) {
        if (blocks[b].spliced) {
            // splice(index, #deleted)
            blocks.splice(b,1);
            console.log("Block has been spliced");
            console.log(blocks.length);
        }
    }
    // Splices objects from the allSprites array
    for (i in allSprites) {
        if (allSprites[i].spliced) {
            // splice(index, #deleted)
            allSprites.splice(i,1);
            // console.log("Object has been spliced");
            // console.log(allSprites.length);
        }
    }
}

// Just the drawing commands in the function draw
function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    for (i of allSprites) {
        i.draw();
    }
}

/* We are using the window.requestAnimationFrame() in our game loop
.requestAnimationFrame() is a method (like a function attached to an object)
It tells the browser that you wish to animate
It asks the browser to call a specific function, in our case gameLoop
It uses this function to 'repaint'
In JS this called a callback, where a function passes an argument to another function
MDN reference https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame */
let gameLoop = function () {
    update();
    draw();
    window.requestAnimationFrame(gameLoop);
}