// Only javascript goes here - NO HTML

// Send message to the console
console.log("this is coming from a separate file...")
// Variable = 5
let myVar = 5;
// Send message to the console
console.log("my first console message");
// Send variable (5) to the console
console.log(myVar); 

// Bool function
let playing = true;
var player1 = "Tim";
const player2 = "Ralph";

// for loops in js
for (i=0; i<10; i++)
{
    console.log(i);
}

// Declare multiple variables to be used in draw() function
let width = 200;
let height = 450;
let x = 50;
let y = 50;

// Function summoned by index.html program to draw squares
function draw() 
{
  // Variable that allows tbe code to look for an element of the html docyment with an ID of 'canvas'
  var canvas = document.getElementById('canvas');
  // If context can be summoned...
  if (canvas.getContext)
  {
    // Canvas is in 2-dimensions
    var ctx = canvas.getContext('2d');
    // Color of first rectangle
    ctx.fillStyle = 'rgb(200, 0, 0)';
    // Dimensions of first rectangle
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    // Color of second rectangle
    ctx.fillRect(x+50, y+10, width+30, height);
    // Dimensions of second rectangle
  }
}
// Calling on the function
draw();