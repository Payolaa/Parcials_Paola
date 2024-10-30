function getPrimeFactors() {

    let num = parseInt(document.getElementById('num').value);
    
    if (isNaN(num) || num <= 1) {
        document.getElementById('pf').innerHTML = "Please enter a valid number greater than 1.";
        return;
    }
    
    let Pfactors = new Set()
    
    while (num % 2 === 0) {
        Pfactors.add(2);
        num = num / 2;
    }
    
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        while (num % i === 0) {
            Pfactors.add(i);
            num = num / i;
        }
    }
    
    if (num > 2) {
        Pfactors.add(num);
    }
    
    //Transforms set to array so we can display it :)
    document.getElementById('pf').innerHTML = "This are the prime factors (listed only once): " + Array.from(Pfactors).join(", ");
}
