// 1 FELADAT: Tipusok és változók
// Létrehoztam a változókat különböző típusokkal
let string = "Hello";
let number = 42;
let boolean = true;

// Kiírtam a változók értékét és típusát
console.log(string, number, boolean);
console.log(typeof string, typeof number, typeof boolean);

// 2 FELADAT: Műveletek
// Létrehoztam két számot és végeztem rajtuk alapvető műveleteket
let a = 30;
let b = 5;
console.log("Összeadás:", a + b);
console.log("Kivonás:", a - b);
console.log("Szorzás:", a * b);
console.log("Osztás:", a / b);

// Logikai műveletek
// Létrehoztam két logikai változót és végeztem rajtuk logikai műveleteket
let bool1 = true;
let bool2 = false;
console.log("Logikai ÉS:", bool1 && bool2);
console.log("Logikai VAGY:", bool1 || bool2);
console.log("Logikai NEM:", !bool1);

// 3 FELADAT: String műveletek
// Létrehoztam egy változót, amely egy teljes nevet tartalmaz
let fullName = "Kiss Anna";
// Létrehoztam egy függvényt, amely a változót várja el paraméterként, majd azt a nevet elfelezi a szóköz mentén és visszaadja a keresztnevet és vezetéknevet indexelés alapján
function splitName(fullName) {
  if (fullName.includes(" ")) {
    let firstName = fullName.split(" ")[1];
    let lastName = fullName.split(" ")[0];
    return { Keresztnév: firstName, Vezetéknév: lastName };
  }
  // Ha nincs szóköz, akkor hibát jelez a névformátumra
  else {
    return { "Helytelen vagy hiányos névformátum": fullName };
  }
}
// Kiírtam a függvény által visszaadott értéket
console.log(splitName(fullName));

// 4 FELADAT: Tömbkezelés
// Létrehoztam egy tömböt számokkal, 1től 10ig
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// Egy "for" ciklussal kiírtam a tömb elemeit
for (let i = 0; i < numbers.length; i++) {
  console.log("Szám:", numbers[i]);
}
// Egy másik "for...in" megkülönböztetve kiírtam a páros és páratlan számokat
for (let number in numbers) {
  number % 2 === 0
    ? console.log("Páros szám:", number)
    : console.log("Páratlan szám:", number);
}

// 5 FELADAT: Objektumkezelés
// Létrehoztam egy objektumot, amely egy személy adatait tartalmazza (name - név, age - életkor, email - email cím)
let person = {
  name: "Kiss Anna",
  age: 30,
  email: "kiss.anna@test.test",
};
// Kiírtam az objektum értékeit egy függvény segítségével, ami az objektumot várja el paraméterként
function getPersonInfo(person) {
  console.log(
    `A(z) ${person.name} nevű személy ${person.age} éves és az email címe: ${person.email}`
  );
}
getPersonInfo(person);

// Bónusz feladat 0.1: Tömb átlaga
// Létrehoztam egy tömböt számokkal
let array = [10, 20, 30, 40, 50];
// Létrehoztam egy függvényt, amely paraméterként várja a tömböt, majd kiszámolja az átlagát
function calculateAverage(arr) {
  // Letrehoztam egy változót az összeg tárolására
  let sum = 0;
  // Végigiterálok a tömb elemein és összeadom őket, hozzáadva a sum változóhoz
  for (let number of arr) {
    sum += number;
  }
  // Elosztom az összeget a tömb hosszával, hogy megkapjam az átlagot
  return sum / arr.length;
}

console.log("A tömb átlaga:", calculateAverage(array));

// Bónusz feladat 0.2: Email validáció
let email = "simodavidd99@gmail.com";
function validateEmail(email) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) ? "Az email cím érvényes." : "Az email cím érvénytelen.";
}
console.log(validateEmail(email));
