// Create a memoization object to store already calculated Fibonacci numbers
var memo = {};

function fibonacci() {
    "use strict";
    // Get the value entered by the user
    var n = parseInt(document.getElementById("num").value);
    
    // Validate the input to ensure it's a positive integer
    if (isNaN(n) || n <= 0) {
        document.getElementById('fibonacciLbl').innerHTML = "Please enter a valid positive integer.";
        return;
    }

    // Call the Fibonacci calculation function
    var val = f(n);
    
    // Display the result on the webpage
    document.getElementById('fibonacciLbl').innerHTML = `Fibonacci number at position ${n}: ${val}`;
}

// Function to calculate Fibonacci using memoization
function f(n) {
    var value;
    
    // Check if the value is already in the memo object
    if (memo.hasOwnProperty(n)) {
        value = memo[n];
    } else {
        // Base cases: F1 = 1, F2 = 1
        if (n === 1 || n === 2) {
            value = 1;
        } else {
            // Recursive case: Fn = F(n-1) + F(n-2)
            value = f(n - 1) + f(n - 2);
        }
        // Store the calculated value in the memo object
        memo[n] = value;
    }
    
    return value;
}

// Add an event listener to the button to trigger the Fibonacci calculation
document.getElementById('btn').addEventListener('click', fibonacci);
