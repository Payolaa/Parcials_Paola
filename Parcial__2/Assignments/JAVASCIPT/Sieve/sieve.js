
function sieve(n) {
  "use strict";

  var array = new Array(n + 1).fill(false); 
  var primes = [];

  array[0] = true;
  array[1] = true;

  var limite = Math.ceil(Math.sqrt(n));

 
  for (let p = 2; p <= limite; p++) {
      if (!array[p]) { 
          for (let i = p * p; i <= n; i += p) {
              array[i] = true;
          }
      }
  }

  for (let j = 2; j <= n; j++) {
      if (!array[j]) {
          primes.push(j);
      }
  }

  return primes;
}

// Para el boton
document.getElementById("btn").addEventListener("click", function () {
  const num = document.getElementById("num").value;

  if (num && num > 1) {
      const primes = sieve(parseInt(num));
      document.getElementById("primes").textContent = primes.join(", "); 
  } else {
      document.getElementById("primes").textContent = "Write a number greater than 1, please.";
  }
});
