//var generateName = require('sillyname');

//import generateName from "sillyname";
//var sillyName = generateName();
//console.log('I am ' + superheroes +'!');
import superheroes from 'superheroes';

const allHeroes = superheroes.all; // الحصول على جميع الأسماء
const randomHero = allHeroes[Math.floor(Math.random() * allHeroes.length)]; // اختيار اسم عشوائي
console.log('I am ' + randomHero + '!');