// Egyszeru JavaScript program, amely bemutatja a valtozokat, muveleteket, ciklusokat es objektumokat

// Tipusok es Valtozok es muveletek
let nev = "Janos";
let kor = 30;
let ferfi = true;

console.log("Nev:", nev, "|Tipus:", typeof nev);
console.log("Kor:", kor, "|Tipus:", typeof kor);
console.log("Ferfi:",ferfi , "|Tipus:", typeof ferfi);


// Hozz létre egy függvényt, ami két számot összead, és írd ki az eredményt a konzolra.

function osszead(szam1, szam2) {
    return szam1 + szam2;
}

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

// Hozz létre egy tömböt, ami különböző típusú elemeket tartalmaz (szám, string, boolean).
// Tömb különböző típusú elemekkel
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


// Hozz létre egy tömböt, ami számokat tartalmaz, és írd ki a tömb elemeit.

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

// Hozz létre egy objektumot, ami egy felhasználó adatait tartalmazza (pl. név, kor, email).
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


