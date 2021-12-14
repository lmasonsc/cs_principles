// Global variables
let canvas;
let ctx;
let TILESIZE = 32;
let WIDTH = TILESIZE * 22;
let HEIGHT = TILESIZE * 9;
let allSprites = [];
let walls = [];

// Gets user input from keyboard
let keysDown = {};
let keysUp = {};

// Creates game plan for usage in constructing grid and adding sprites
let gamePlan = `
......................
..#................#..
..#................#..
..#................#..
..#........#####...#..
..#####............#..
......#............#..
......##############..
......................`;
// "Wall" sprite must be created before '#' can be defined

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

// Creates class
class Sprite {
    // Constructor function creates array that defines class
    constructor(x, y, w, h, color) {
        // Attaches constructor array to variables
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        allSprites.push(this);
    }
    get type() {
        return "sprite";
    }
    // Object methods
    // Object creates itself
    create(x, y, w, h, color) {
        return new Sprite(x, y, w, h, color);
    }
    // Object draws itself
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    };
}

// Extends Sprite class with Player class
class Player extends Sprite {
    // New constructor function extends Sprite array
    constructor(x, y, speed, w, h, color) {
        // Attaches constructor array to variables
        super(x, y, w, h, color);
        this.x = x;
        this.y = y;
        this.dx = 0
        this.dy = 0
        this.vx = 0
        this.vy = 0
        this.speed = speed;
        this.w = w;
        this.h = h;
        this.color = color;
    }
    // Object methods
    // Creates perameters for the Player to know if it has collided with another object
    collideWith(obj) {
        if (this.x + this.w > obj.x &&
            this.x < obj.x + obj.w &&
            this.y + this.h > obj.y &&
            this.y < obj.y + obj.h) {
            console.log(this.type + ' collides with ' + obj.type);
            return true;
        }
    }
    
    get type() {
        return "player";
    }
    // Searches for specific key in keysDown array
    input() {
        if ('w' in keysDown) {
            this.vx = 0
            // Direction is up (negative)
            this.dy = -1;
            this.dx = 0;
            // Velocity is negative
            this.vy = this.speed * this.dy;
        }
        if ('a' in keysDown) {
            this.vy = 0
            // Direction is left (negative)
            this.dx = -1;
            this.dy = 0;
            // Velocity is negative
            this.vx = this.speed * this.dx;
        }
        if ('s' in keysDown) {
            this.vx = 0
            // Direction is down (positive)
            this.dy = 1
            this.dx = 0;
            // Velocity is positive
            this.vy = this.speed * this.dy;

        }
        if ('d' in keysDown) {
            this.vy = 0
            // Direction is right (positive)
            this.dx = 1;
            this.dy = 0;
            // Velocity is positive
            this.vx = this.speed * this.dx;
        }
        else{
            this.dx = 0
            this.dy = 0
        }

    }
    // Runs update function summoned through gameLoop
    update() {
        this.input();
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
        // If bottom of Player collides with bottom of canvas
        if (this.y + this.h > HEIGHT) {
            // Bottom of player remains at bottom of canvas
            this.y = HEIGHT - this.h;
        }
        // If top of Player collides with top of canvas
        if (this.y <= 0) {
            // Top of player remains at top of canvas
            this.y = 0;
        }
        this.x += this.vx;
        this.y += this.vy;
    };
}

// Extends Sprite class with Wall class
class Wall extends Sprite {
    // New constructor function extends Sprite array (except it doesn't in this case)
    constructor(x, y, w, h, color) {
        // Attaches constructor array to variables
        super(x, y, w, h, color);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
    }
    // Object methods
    // Object creates itself
    create(x, y, w, h, color) {
        return new Wall(x, y, w, h, color);
    }
    get type() {
        return "wall";
    }
}

// Now that Wall object has been created, '#' is defined as Wall
// Creates a key for strings in grid
const levelChars = {
    ".": "empty",
    "#": Wall,
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
            // Push the row into newGrid array
            newGrid.push(newRow);
            // Reset newRow array for next function
            newRow = [];
        }
    }
    // Return the newGrid array
    return newGrid;
}

console.log("here's the grid...\n" + makeGrid(gamePlan, 22));

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
                } else {
                    // Creates new object, as "type" is now a class, and assigns the new object to t
                    let t = new type;
                    // Use x and y values from reading the grid, adjusted based on the tilesize
                    startActors.push(t.create(x * TILESIZE, y * TILESIZE, TILESIZE, TILESIZE, 'red'))
                }
            }
        }
    }
    return startActors;
}


let currentLevel = readLevel(makeGrid(gamePlan, 22))
console.log('current level');
console.log(currentLevel);

// instantiations...
let player1 = new Player(WIDTH / 2, HEIGHT / 1.6, 10, TILESIZE/2, TILESIZE/2, 'rgb(100, 100, 100)', 100);


console.log(allSprites);
console.log(walls);

function update() {
    for (i of allSprites) {
        if (i.type == "wall") {
            // console.log(i)
            if (player1.collideWith(i)) {
                if (player1.dx == 1) {
                    player1.x = i.x - player1.w;
                }
                else if (player1.dx == -1) {
                    player1.x = i.x + i.w;
                }
                else if (player1.dy == 1) {
                    player1.y = i.y - player1.h;
                }
                else if (player1.dy == -1) {
                    player1.y = i.y + i.h;
                }
                // console.log("player collided with walls")
                console.log("player1 dx is:" + player1.dx);
            }
        }
    }
    player1.update();
}
// we now have just the drawing commands in the function draw
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