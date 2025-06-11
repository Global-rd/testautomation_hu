/*1 . Készíts egy függvényt ellenorizEletkor néven, amely egy számot kap paraméterként, és
kiírja:
● “Kiskorú”, ha 18 év alatti,
● “Felnőtt”, ha 18 év vagy több.*/ //mivel ez egy két ágú elágazás, ezért használhatunk if-else if szerkezetet.

//megoldás1 if-else if szerkezet
function ellenorizEletkor(age1){ // függvény definiálása, amely egy age1 nevű paramétert vár
 if (age1 < 18){ // Ha age1 kisebb, mint 18
    console.log("Kiskorú"); // akkor kiírja, hogy "Kiskorú"
 } else if (age1 >= 18){ // Ha age1 nagyobb vagy egyenlő, mint 18
    console.log("Felnőtt"); // akkor kiírja, hogy "Felnőtt"
 }
};
//tesztelés     
age1 = 16;  // változó létrehozása és értékadás
ellenorizEletkor(age1); // függvény meghívása a változóval

//megoldás2 //feltételes operátor használata
let age2 = 18; // változó létrehozása és értékadás
let dontes = (age2 < 18) ? "Kiskorú" : "Felnőtt"; // feltételes operátor használata, amely kiértékeli az age2 változó értékét
console.log(dontes); // kiírja a döntést a konzolra


/*
2. Készíts egy napNev nevű függvényt, amely egy számot vár (1–7) és visszaadja a hét
napjának nevét (pl. 1 = “Hétfő”). Ha a szám nem 1–7 között van, adjon vissza: "Érvénytelen
nap". */

function napNev(day) { // függvény definiálása, amely egy day nevű paramétert vár. Mivel az eredmény függ a bemeneti értéktől, ezért switch szerkezet itt jobban megéri
    switch(day) {
        case 1:
            return "Hétfő";
        case 2:
            return "Kedd";
        case 3:
            return "Szerda";
        case 4:
            return "Csütörtök";
        case 5:
            return "Péntek";
        case 6:
            return "Szombat";
        case 7:
            return "Vasárnap";
        default:
            return "Érvénytelen nap";
    }

}

//használat
day = 8;
console.log(napNev(day)); //függvény meghívása

/*3. Írj egy parosSzamok függvényt, amely 1-től 50-ig kiírja az összes páros számot a
konzolra.*/

function parosSzamok(){ // függvény definiálása, amely nem vár paramétert
    
    for (var i = 1; i < 51; i++) { 
        if (i % 2 === 0) { // maradékos osztással biztosítva hogy páros számokat írunk ki
            console.log(i);
        }
    }
}

parosSzamok(); //függvény meghívása

/*
4. Írj egy jatekDobas függvényt, amely egy véletlen számot generál 1 és 6 között (mint egy
dobókocka), és írja ki:
● “Szerencsés dobás”, ha 6-ost dobtál
● “Átlagos dobás”, ha 3–5 között
● “Gyenge dobás”, ha 1–2 volt */

let jatekDobas = () =>
    Math.floor(Math.random() * 6) + 1; // függvény definiálása, amely egy véletlen számot generál 0 és 6 között, majd hozzáadunk 1-et, hogy 1 és 6 között legyen az eredmény
const dobottSzam = jatekDobas(); // létrehozunk egy változót, amely tárolja a dobott számot

// mivel itt tartományokról van szó, ezért használhatunk if-else if szerkezetet. 
// Ha a tartományokat elmentjük változókba, akkor lehetne switch szerkezetet is használni. 
 if (dobottSzam === 6) {
    console.log("Szerencsés dobás");}
    else if (dobottSzam  >= 3 && dobottSzam  <= 5) {  
    console.log("Átlagos dobás");
} else if ( dobottSzam  >= 1 && dobottSzam  <= 2) {
    console.log("Gyenge dobás");
} else {
    console.log("Érvénytelen dobás");
}

jatekDobas(); // függvény meghívása, de mivel a függvény már kiírja az eredményt, ezért nem szükséges kiíratni újra

/*
5. Készíts egy osszeadVagyKivon nevű függvényt, amely 3 paramétert kap: két számot és
egy művelet típust ("+" vagy "-"). Térjen vissza az eredménnyel.*/

const osszeadVagyKivon = (szam1, szam2, muvelet) => {  // egy függvény amely három paramétert vár: két számot és egy művelet típust
    switch (muvelet) {          //switch szerekezetet használunk, mert a művelet típusa alapján kell a visszatérési értéket meghatározni
        case "+":
            return szam1 + szam2;
        case "-":
            return szam1 - szam2;
        default:
            throw new Error("Érvénytelen művelet");
    }
};

// Generálunk két véletlen számot 1 és 100 között, és egy véletlen műveletet, amely vagy "+" vagy "-"
let szam1 = Math.floor(Math.random() * 100)+1;
let szam2 = Math.floor(Math.random() * 100)+1;
let muvelet = Math.random() < 0.5 ? "+" : "-"; // generálunk egy véletlen számot, amely 0 és 1 között van, és ha kisebb, mint 0.5, akkor "+" lesz a művelet, különben "-
console.log(`Számok: ${szam1}, ${szam2}, Művelet: ${muvelet}`);
console.log(`Eredmény: ${osszeadVagyKivon(szam1, szam2, muvelet)}`);

/*6. Nyílfüggvénnyel (=>) készíts egy osszeg függvényt, amely egy tömböt kap, és visszaadja
az elemek összegét.
Pl. [1, 2, 3] → 6 */

const osszeg =(tomb) => tomb.reduce((osszegzo, aktualisElem) => osszegzo + aktualisElem, 0);

const tombMeret = 3;
const veletlenTomb = [];

for (let i = 0; i < tombMeret; i++) {
     veletlenTomb.push(Math.floor(Math.random() * 100) + 1);
}

console.log(veletlenTomb);

console.log(`A tömb elemeinek összege: ${osszeg(veletlenTomb)}`);

/*
7.Készíts egy biztonsagosOsszeadas függvényt, amely két paramétert vár.
Ha valamelyik nem szám, dobjon hibát "Hibás bemenet", különben térjen vissza az
összeggel.
Használj try-catch-et a hiba lekezelésére.*/


function biztonsagosOsszeadas(a, b) {
try {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error("Hibás bemenet");
    } 
    return a + b;
   } catch (error) {
return error.message; 
}
}

console.log(biztonsagosOsszeadas(5, 10)); // 15
console.log(biztonsagosOsszeadas(5, "10")); // Hibás bemenet


/*
8.Írj egy veletlenSorsolas nevű függvényt, amely 5 darab véletlen számot generál 10 és 100
között.
Tömbbe menti őket, majd külön kiírja:
● az összes számot
● a legnagyobbat
● a páros számok listáját*/

const veletlenSorsolas = () => {
    const szamok = [];
    for (let i = 0; i < 5; i++) {
        szamok.push(Math.floor(Math.random() * (100 - 10 + 1)) + 10);
    }
    const legnagyobb = Math.max(...szamok);
    const parosSzamok = szamok.filter(szam => szam % 2 === 0);

    console.log("Összes szám:", szamok);
    console.log("Legnagyobb szám:", legnagyobb);
    console.log("Páros számok:", parosSzamok);


    return {
    "Összes szám:" : szamok ,
   "Legnagyobb szám:": legnagyobb,
    "Páros számok:" : parosSzamok,
    }
};

veletlenSorsolas();

    /*
+1 Bonusz – Moduláris, újrafelhasználható megoldás
Készíts egy szures nevű függvényt, amely két paramétert vár:
1. Egy tömböt (amit szűrni szeretnél),
2. Egy függvényt (ez a feltétel, ami alapján szűrünk).

A szures függvény csak azokat az elemeket adja vissza, amelyekre a feltétel (predicate
function) igaz.
Ez a függvény gyakorlatilag egy saját filter() metódus implementálása.*/

function szures(tomb, feltetel) {
    const szurtTomb = [];
    for (let i = 0; i < tomb.length; i++) {
        if (feltetel(tomb[i])) {
            szurtTomb.push(tomb[i]); // ha a feltétel igaz, akkor hozzáadjuk az elemet a szűrt tömbhöz
        }
    }
    console.log("Szűrt tömb:", szurtTomb);
    console.log("Eredeti tömb:", tomb);

    return szurtTomb;
}   

// Példa feltétel függvény
function parosSzamFeltetel(szam) {
    return szam % 2 === 0;
} 

// Példa tömb
const szamok = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// Szűrés a feltétel függvény segítségével
const szurtSzamok = szures(szamok, parosSzamFeltetel);
// Eredmény kiírása   

szures(szamok, parosSzamFeltetel);