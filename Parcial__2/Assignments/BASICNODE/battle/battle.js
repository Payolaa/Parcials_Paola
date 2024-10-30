import superheroes from 'superheroes';
import supervillains from 'supervillains';
import uniqueRandomArray from 'unique-random-array';

const Hero = uniqueRandomArray(superheroes);
const Villain = uniqueRandomArray(supervillains);


const message = `And so... a battle starts with "${Hero()}" on a corner, and "${Villain()}" on the other.`
console.log(message);