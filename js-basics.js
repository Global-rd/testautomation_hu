// 1. Típusok és változók
let myString = "QA hazi";
let myNumber = 7;
let myBoolean = true;

console.log(myString, "-", typeof myString);
console.log(myNumber, "-", typeof myNumber);
console.log(myBoolean, "-", typeof myBoolean);

// 2. Aritmetikai és logikai operátorok
let a = 10;
let b = 3;

console.log("Összeg:", a + b);
console.log("Különbség:", a - b);
console.log("Szorzat:", a * b);
console.log("Osztás:", a / b);

let firstBool = true;
let secondBool = false;

console.log("AND (&&):", firstBool && secondBool); // false lesz kiirva
console.log("OR (||):", firstBool || secondBool); // true lesz kiirva
console.log("NOT (!):", !firstBool); //false lesz kiirva

// 3. String műveletek
let teljesNev = "Kiss Anna";
let parts = teljesNev.split(" ");
let vezeteknev = parts[0];
let keresztnev = parts[1];

console.log("Vezetéknév:", vezeteknev);
console.log("Keresztnév:", keresztnev);

// Reguláris kifejezés a szóköz ellenőrzésére
let hasSpace = / /.test(teljesNev);
console.log("Tartalmaz szóközt:", hasSpace); //true

// 4. Tömbkezelés
let numbers = [3, 5, 8, 2, 10];

console.log("Összes elem:");
for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}

console.log("Páros számok:");
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) {
    console.log(numbers[i]);
  }
}

// 5. Objektumkezelés
let user = {
  name: "Racz Gabor",
  age: 25,
  email: "gabor@racz.hu",
};

function printUserInfo(userObj) {
  console.log(
    `A(z) '${userObj.name}' nevű felhasználó '${userObj.age}' éves és az email címe: '${userObj.email}'`
  );
}

printUserInfo(user);

// Bónusz 1: Átlag számítása tömbből
function atlag(tomb) {
  if (tomb.length === 0) return 0;
  let osszeg = tomb.reduce((a, b) => a + b, 0);
  return osszeg / tomb.length;
}

console.log("Átlag:", atlag([3, 5, 8, 2, 10]));

// Bónusz 2: Email cím validálása reguláris kifejezéssel
function isValidEmail(email) {
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

console.log("Helyes email:", isValidEmail("valami@valami.hu")); // true
console.log("Hibás email:", isValidEmail("valami@.hu")); // false
