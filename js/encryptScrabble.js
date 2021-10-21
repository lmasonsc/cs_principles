/*
Objective: take a message from user and encrypt it
Then use the cypher to decrypt it
1. Get input from user
2. Check if is upper or lower while going through string
    a. If lower, convert to upper
    b. If upper, run function to change letter based on ASCII values
    c. For space, change to "&" symbol
    d. For non-letter or space, invalidate function
3. Return decryption
    a. If an encrypted letter, reverse encryption function based on ASCII values to produce correct letter
    b. If "&", change to space
    c. For invalid character, invalidate function
    d. Letters will be returned in all caps
*/

// global variables
// Empty strings; functions add characters to these strings
ENCRYPTION = "";
DECRYPTION = "";

// No utility functions used

// ENCRYPTION FUNCTIONS
// Encrypt the message
function encrypt_message(word)
{
    // Start with empty string; resets variable every time function runs
    ENCRYPTION = "";

    // Convert to upper case (non-letters will return the same value)
    word = word.toUpperCase();
    console.log("word is " + word);

    // Complete process for every character in word
    for (i = 0, n = word.length; i < n; i++)
    {
        console.log("letter is " + word[i]);
        
        // Check if the character is a letter of alphabet
        if (word.charCodeAt(i) >= 65 && word.charCodeAt(i) <= 90)
        {
            console.log("letter is " + word[i] + ", ASCII " + word.charCodeAt(i));
            // Encrypt the letter
            encrypted = String.fromCharCode(word.charCodeAt(i)  - 26);
        }
        // Check if the character is a space
        else if (word.charCodeAt(i) == 32)
        {
            console.log("character is a space");
            // Encrypt the space
            encrypted = "&";
        }
        // If the character is not a letter or a space
        else
        {
            // Alert the user
            alert("Please use letter characters only");
            // Override the ENCRYPTION string
            ENCRYPTION = "[INVALID]";
            // Prematurely exit the function
            return ENCRYPTION;
        }
        // Add encypted letter to the encryption string
        ENCRYPTION = ENCRYPTION + encrypted;
        console.log("The encrypted character is " + encrypted);
    }
    return ENCRYPTION;
}

function get_message() 
{
    // Selecting the input element and get its value 
    return document.getElementById("message").value;
}

// Display encrypted message when prompted by encrypt button
function encrypt_click()
{
    message = encrypt_message(get_message());
    console.log("The encrypted message is " + ENCRYPTION );
    output1("The encrypted message is " + ENCRYPTION );
}

// Change the body text below the encrypt input
function output1(content)
{
    document.getElementById("output1").innerHTML = content;
}


// DECRYPTION FUNCTIONS
// Decrypt the message
function decrypt_message(word)
{
    // Start with empty string; resets variable every time function runs
    DECRYPTION = "";
        
    // Complete process for every character in word
    for (i = 0, n = word.length; i < n; i++)
    {
        console.log("character is " + word[i]);
            
        // Check if the character is a valid encrypted character
        if (word.charCodeAt(i) >= 39 && word.charCodeAt(i) <= 64)
        {
            console.log("character is " + word[i] + ", ASCII " + word.charCodeAt(i));
            // Decrypt the character
            decrypted = String.fromCharCode(word.charCodeAt(i)  + 26);
        }
        // Check if the character is a space
        else if (word[i] == "&")
        {
            console.log("character is an encrypted space");
            // Encrypt the space
            decrypted = " ";
        }
        // If the character is not a valid encrypted character
        else
        {
            // Alert the user
            alert("The encrypted message you have submitted is invalid");
            // Override the DECRYPTION string
            DECRYPTION = "[INVALID]";
            // Prematurely exit the function
            return DECRYPTION;
        }
        // Add encypted letter to the encryption string
        DECRYPTION = DECRYPTION + decrypted;
        console.log("The decrypted character is " + decrypted);
    }
    return DECRYPTION;
}

function return_message() 
{
    // Selecting the input element and get its value 
    return document.getElementById("code").value;
}

// Display the decrypted message whan promped by decrypt button
function decrypt_click()
{
    message = decrypt_message(return_message())
    console.log("The decrypted message is " + DECRYPTION );
    output2("The decrypted message is " + DECRYPTION );
}

// Change the body text below the decrypt input
function output2(content)
{
    document.getElementById("output2").innerHTML = content;
}
