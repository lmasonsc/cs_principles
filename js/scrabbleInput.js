
// global variables go at the top
let POINTS = [1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10];
let LETTERS = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let player1score = 0;
let player2score = 0;

// utility functions
// checks is character is uppercase
function isupper(str) 
{
  return str === str.toUpperCase();
}

// checks if character is lowercase.
function islower(str) 
{
  return str === str.toLowerCase();
}

// Associates index in LETTERS array with index in POINTS array
function get_points(letter)
{
  let index = LETTERS.indexOf(letter);
  return POINTS[index];
}

//compute the score of the word
function compute_score(word)
{
    let score = 0;
    // complete process for every character in word
    for (i = 0, n = word.length; i < n; i++)
    {
        // state letter
        console.log("letter is " + (word[i]));
        // state letter value
        console.log("letter score is " + get_points(word[i].toLowerCase()));
        // add character points to total score
        score += get_points(word[i].toLowerCase());
        console.log("final score here " + score);
    }
    return score;
}

function getInputValue() 
{
    // Selecting the input element and get its value 
    return document.getElementById("inputId").value;
}

// Display total score when prompted by button
function button_click()
{
    let score = compute_score(getInputValue());
    alert("You scored " + score );
    output("you scored " + score + " points.");
}

function output(content)
{
    document.getElementById("display").innerHTML = content;
}
