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
let num1 = Math.floor(Math.random() * 100);
let num2 = Math.floor(Math.random() * 100);

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

/*
3. String műveletek
○ Hozz létre egy teljes név változót (pl. "Kiss Anna"), és válaszd szét
vezetéknévre és keresztnévre.
○ Ellenőrizd reguláris kifejezéssel, hogy a név tartalmaz-e szóközt (/ /).

4. Tömbkezelés
○ Hozz létre egy tömböt, ami néhány számból áll (pl. [3, 5, 8, 2, 10]).
○ Írj egy ciklust, ami kiírja a tömb elemeit.
○ Írj egy másik ciklust, ami csak a páros számokat írja ki.

5. Objektumkezelés
○ Hozz létre egy objektumot, amely egy felhasználót reprezentál (név, életkor,
email).
○ Írj függvényt, amely paraméterként egy ilyen objektumot vár, és a konzolra
kiírja a következő formátumban:

"A(z) ‘Név’ nevű felhasználó ‘25’ éves és az email címe:
‘valami@email.com’"

Technikai elvárások
● A kódot js-basics.js néven mentsd el.
● Kommenteld a kódot röviden, magyarázatként.
● A fájlt töltsd fel egy új branchre a GitHub testautomation_hu repoba - branch nav
konvencio: “keresztnev_vezeteknev_oraszam”
● A megoldást linkeld be a Google Classroom felületen, a branch-re mutató GitHub
linkkel.

Bónusz feladat (opcionális)
● Írj egy egyszerű függvényt, ami bemenetként kap egy tömböt, és visszaadja az
átlagát.
● Ellenőrizd egy reguláris kifejezéssel, hogy egy email cím helyes formátumú-e (pl.
valami@valami.hu).

*/