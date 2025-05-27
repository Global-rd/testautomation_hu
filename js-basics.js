console.log('Task 1');
//Változók létrehozása
let string = "string";
let number = 1234;
let boolean = true;

//A változók értékének és tipusának kiiratása 
console.log(`The value of the "string" variable is '${string}' and it's type is '${typeof(string)}'`);
console.log(`The value of the "number" variable is '${number}' and it's type is '${typeof(number)}'`);
console.log(`The value of the "boolean" variable is '${boolean}' and it's type is '${typeof(boolean)}'`);


console.log('\nTask 2');
//Random szám változók létrehozása
let num1 = Math.floor((Math.random() * 100) + 1);
let num2 = Math.floor((Math.random() * 100) + 1);

//Aritmetikai műveletek a szám változókkal
console.log(`The two random numbers are ${num1} and ${num2}`);
console.log(`Addition = ${num1 + num2}`);
console.log(`Subtraction = ${num1 - num2}`);
console.log(`Multiplication = ${num1 * num2}`);
console.log(`Division = ${num1 / num2}`);

//Logikai változók létrehozása
let bool1 = true;
let bool2 = false;

//Aritmetikai műveletek a szám változókkal
console.log('\n');
console.log(`Should be false: ${bool1 && bool2}`);
console.log(`Should be true: ${bool1 || bool2}`);
console.log(`Should be false: ${!bool1}`);


console.log('\nTask 3');
let fullName = "Timár Viktor"; //Változó létrehozás
let splittedName = fullName.split(' '); //Teljes név feldarabolása

console.log(`The two parts of the name are "${splittedName[0]}" and "${splittedName[1]}"`); //Feldarabolt részletek kiiratása

let regex = /\s/; //Szóköz regexp
console.log(`There is a space in the name "${fullName}": ${regex.test(fullName)}`);


console.log('\nTask 4');
let numbers = [3, 5, 8, 2, 10]; //Tömb létrehozása

for (let i = 0; i < numbers.length; i++) { //Egy ciklus ami végig iterál a tömbbön
    //console.log(numbers[i]); //Kiirja a tömb ciklusban aktuális elemét
}
console.log(`The numbers array has the following numbers: ${numbers.join(", ")}`); // De igy szebb és rövidebb

let evenNumbers = [];
for (let i = 0; i < numbers.length; i++) { //Mégegy ciklus ami végig iterál a tömbbön
    if (numbers[i] % 2 === 0) { //Vizsgáljuk a számokat maradékos osztással, szűrve a páros számokra
        //console.log(numbers[i]); //Ha a vizsgálat true akkor kiirja a tömb ciklusban aktuális elemét
        evenNumbers.push(numbers[i])
    }
}
console.log(`The evenNumbers array has the following numbers: ${evenNumbers.join(", ")}`); // Szintén szebb és rövidebb


console.log('\nTask 5');
let me = {
    name: "Viktor",
    age: 27,
    email: "test@email.com"
}; //Objektum létrehozása

function showObject(object = Object) { //Függvény létrehozása
    console.log(`A(z) ‘${object.name}’ nevű felhasználó ‘${object.age}’ éves és az email címe:\n‘${object.email}’`); //Kiirjuk az objektum elemeit
}
showObject(me); //Függvény hivása


console.log('\nBonus Task');
function average(array = Array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum = sum + array[i]; //Egy változóba összeadjuk a tömb elemeit
    }
    return sum / array.length; //Visszaadjuk az átlagot, elosztjuk az elemszámmal az összeget
}

let randomNumbers = [];
for (let i = 0; i < 5; i++) {
  let randomNum = Math.floor(Math.random() * 100) + 1; //Random szám
  randomNumbers.push(randomNum); //Feltöltjük tesztadatokkal a tömböt
}
let averageNum = average(randomNumbers); //Tároljuk a hivott függvény értékét
console.log(`The numbers in the array: ${randomNumbers.join(", ")}`); //Kiirjuk a tesztadatokat
console.log(`The average of the given array is: ${averageNum}`); //Kiirjuk az átlagukat


console.log('\nBonus Task 2');
let validEmail = "valami@valami.hu";
let invalidEmail = "valami.hu";
let emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm; //email regex

function isValidEmail(email) { //Vizsgáló függvény
    if (emailRegex.test(email)) {
        console.log(`"${email}" is a valid email`);
    }else{
        console.log(`"${email}" is NOT a valid email`);
    }
}

isValidEmail(validEmail);
isValidEmail(invalidEmail);
