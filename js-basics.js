// 1. Típusok és változók //
console.log("// 1. Típusok és változók //");
let a = 30;
console.log(a);
console.log(typeof a); // number

let b = "5";
console.log(b);
console.log(typeof b); // string

let c = true;
console.log(c);
console.log(typeof c); // boolean

// 2. Aritmetikai és logikai operátorok //
console.log("// 2. Aritmetikai és logikai operátorok //");
function aritmetika(x, y) {
  const osszeg = x + y; // összeadás
  const kulonbseg = x - y; // kivonás
  const szorzat = x * y; // szorzás
  const osztas = x / y; // osztás
  console.log(osszeg);
  console.log(kulonbseg);
  console.log(szorzat);
  console.log(osztas);
}
aritmetika(22, 11); // meghívjuk az aritmerika functiont aminek paramétereket adtunk

// két logikai változó //
console.log("// két logikai változó //");
const d = true;
const e = false;

// && (ÉS) – mindkettőnek true-nak kell lennie
console.log("// && (ÉS) – mindkettőnek true-nak kell lennie");
console.log(d && e); // false

// || (VAGY) – elég, ha az egyik true
console.log("// || (VAGY) – elég, ha az egyik true");
console.log(d || e); // true

//! (NEM) – megfordítja az értéket
console.log("//! (NEM) – megfordítja az értéket");
console.log(!d); // false
console.log(!e); // true

// 3. String műveletek //
console.log("// 3. String műveletek //");
// a split metódussal a szóközöknél szétdaraboljuk a teljes nevet és egy tömböt kapunk eredményként
console.log(
  "// a split metódussal a szóközöknél szétdaraboljuk a teljes nevet és egy tömböt kapunk eredményként"
);
const teljesNev = "Kiss Anna";
const darab = teljesNev.split(" ");
const vezeteknev = darab[0];
const keresztnev = darab[1];
console.log("Vezetéknév:", vezeteknev);
console.log("Keresztnév:", keresztnev);

// a regex segítségével megkeressük a szóköz pozícióját a string-ben
console.log(
  "// a regex segítségével megkeressük a szóköz pozícióját a string-ben"
);
const text = "Kiss Anna";
const regex = /\s/;
console.log(text.match(regex));

// 4. Tömbkezelés //
console.log("// 4. Tömbkezelés //");

// tömb elemei
console.log("// tömb elemei");
let numbers = [3, 5, 8, 2, 10];
for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}

// páros számok
console.log("// páros számok");
for (let i = 0; i < numbers.length; i++) {
  const num = numbers[i];
  if (num % 2 === 0) {
    console.log(numbers[i]);
  }
}

// 5. Objektumkezelés //
// objektum létrehozás
console.log("// objektum létrehozás");
let user = {
  name: "David",
  age: 25,
  email: "teszt@teszt.hu",
};
console.log(user);

// függvény, amely paraméterként egy ilyen objektumot vár
console.log("// függvény, amely paraméterként egy ilyen objektumot vár");
function valami(user) {
  console.log(
    `A ${user.name} nevű felhasználó ${user.age} éves és az email címe: ${user.email}`
  );
}
valami(user);

// Bónusz feladat 1. //
console.log("// Bónusz feladat 1.//");
// definiáljuk az average function-t inputs paraméterrel
function average(inputs) {
  // változót definiálunk az eredménynek
  let result = 0;
  // for ciklussal 0-ás kiindulási értékkel végig iteráljuk a beadott számokat
  for (let i = 0; i < inputs.length; i++) {
    // változót definiálunk és megjelenítjük, ami a tömb jelenlegi elemét tartalmazza
    const input = inputs[i];
    console.log(inputs[i]);
    // az eredményhez hozzáadjuk a jelenlegi számot minden iterációban
    result = result + input;
  }
  // az eredményt elosztjuk a tömbben található számok darabszámával és az eredményt visszaadjuk
  result = result / inputs.length;
  return result;
}
// definiálunk egy változót, ami az average function-t meghívva n darab szám átlagát tartalmazza
let myAverage = average([4, 12, 5, 7, 1, 20]);
console.log("// az átlag eredménye");
console.log(myAverage);

// Bónusz feladat 2. //
console.log("// Bónusz feladat 2.//");
const email1 = "valami@valami.hu";
const email2 = "teszt@valami";

function validateEmail(email) {
  const regexp = /^[\w-\.]+@[\w-]+\.+[\w-]{2,4}$/;
  return email.match(regexp) ? "valid" : "invalid";
}
console.log(validateEmail(email1));
console.log(validateEmail(email2));
