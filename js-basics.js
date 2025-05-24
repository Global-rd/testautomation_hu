//2. Házi feladat – JavaScript alapgyakorlatok 1.
//1. Típusok és változók
// Hozz létre 3 változót különböző primitív típusokkal: string, number, boolean.
let szam = 5;
let szoveg = "Hello";
let logikai = true;
//Írj ki a konzolra minden változót, és mellékeld a typeof eredményét is.",
console.log(
  `${szam} - ${typeof szam}, ${szoveg} - ${typeof szoveg}, ${logikai} - ${typeof logikai}`,
);

// 2. Aritmetikai és logikai operátorok"
// Számold ki két tetszőleges szám összegét, különbségét, szorzatát és osztását.
let szam1 = 4;
let szam2 = 5;
console.log(`szám 1 = ${szam1}; szám 2 = ${szam2}`);
let osszeg = szam1 + szam2;
console.log(`összeg: ${osszeg}`);
let kulonbseg = szam1 - szam2;
console.log(`Különbség: ${kulonbseg}`);
let szorzat = szam1 * szam2;
console.log(`Szorzat: ${szorzat}`);
let hanyados = szam1 / szam2;
console.log(`Hányados: ${hanyados}`);
// Hozz létre két logikai értéket és végezz rajtuk &&, ||, ! műveleteket.
let logikai1 = true;
let logikai2 = false;
console.log(`logikai1 = ${logikai1}, logikai2 = ${logikai2}`);
let and = logikai1 && logikai2;
console.log(`logikai1(true) && logikai2(false): ${and}`);
let or = logikai1 || logikai2;
console.log(`logikai1(true) || logikai2(false): ${or}`);
let nottrue = !logikai1;
console.log(`!logikai1(true): ${nottrue}`);

// 3. String műveletek
// Hozz létre egy teljes név változót (pl. 'Kiss Anna'), és válaszd szét vezetéknévre és keresztnévre.
let teljesNev = "Kiss Anna";
let [vezetekNev, keresztNev] = teljesNev.split(" ");
console.log(`Vezetéknév: ${vezetekNev}, Kreresztnév: ${keresztNev}`);
// Ellenőrizd reguláris kifejezéssel, hogy a név tartalmaz-e szóközt (/ /).
let vanszokoz = / /.test(teljesNev);
//vanszokoz = /\s/.test(teljesNev);
console.log(`Van szóköz a ${teljesNev} névben: ${vanszokoz}`);

// 4. Tömbkezelés"
// Hozz létre egy tömböt, ami néhány számból áll (pl. [3, 5, 8, 2, 10])
let tomb = new Array(3, 5, 8, 2, 10);
// Írj egy ciklust, ami kiírja a tömb elemeit.
console.log(`A tömb elemei:`);
for (let i = 0; i < tomb.length; i++) {
  console.log(tomb[i]);
}
//console.log(`A tömb elemei: ${tomb.join(", ")}`);

// 5. Objektumkezelés
// Hozz létre egy objektumot, amely egy felhasználót reprezentál (név, életkor, email")
let user = {
  name: "John Doe",
  age: 30,
  email: "john.doe@example.com",
};

// Írj függvényt, amely paraméterként egy ilyen objektumot vár, és a konzolra kiírja a következő formátumban: "A(z) ‘Név’ nevű felhasználó ‘25’ éves és az email címe: ‘valami@email.com’
function userinfo(user) {
  console.log(
    `A(z) ${user.name} nevű felhasználó ${user.age} éves és az email címe: ${user.email}`,
  );
}
userinfo(user); //meghívom a függvényt a user objektummal

