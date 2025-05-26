// Valtozok es muveletek
let nev = "Janos";
let kor = 30;
let magassag = 1.75;

console.log("Nev:", nev);
console.log("Kor:", kor);
console.log("Magassag:", magassag);



// Szam müveletek
let szam1 =12
let szam2 = 4

console.log("Osszeg:", szam1 + szam2);
console.log("Kulonbseg:", szam1 - szam2);   
console.log("Szorzat:", szam1 * szam2);
console.log("Hanyados:", szam1 / szam2);

// Logikai muveletek
let logikai1 = true;
let logikai2 = false;
console.log("Logikai AND:", logikai1 && logikai2);
console.log("Logikai OR:", logikai1 || logikai2);   
console.log("Logikai NOT:", !logikai1);


// Teljes nev feldolgozasa
let teljesNev = "Kovacs Istvan";
let nevReszek = teljesNev.split(" ");
let vezetekNev = nevReszek[0];
let keresztNev = nevReszek[1];

console.log("Vezeteknev", vezetekNev);
console.log("Keresztnev", keresztNev);

// Regularis kifejezes a szoköz ellenörzesere
let szokoztTartalmaz = /\s/.test(teljesNev);
console.log("Szokoz tartalmaz:", szokoztTartalmaz);


// Szamokat tartalmazo tömb
let szamok = [3, 5, 8, 2, 10];

// Tömb elemek kiirasa
for (let i = 0; i < szamok.length; i++) {
    console.log("Szam:", szamok[i]);
}   

// Ciklus: csak paros szamok kiirasa
for (let i = 0; i < szamok.length; i++) {
    if (szamok[i] % 2 === 0) {
        console.log("Paros szam:", szamok[i]);  
    }
}


//Felhasznalo objektum letrehozasa
let felhasznalo = {
    nev: "Kis Anna",
    kor: 25,
    email: "valami@email.com"
};
// Felhasznalo adatok kiirasa
console.log("Felhasznalo nev:", felhasznalo.nev);
console.log("Felhasznalo kor:", felhasznalo.kor);
console.log("Felhasznalo email:", felhasznalo.email);


