// 1. feladat - életkor ellenőrzés //
console.log("// 1. feladat - életkor ellenőrzés //");
function ellenorizEletkor(eletkor) {
  if (eletkor < 18) {
    console.log("Kiskorú");
  } else {
    console.log("Felnőtt");
  }
}
ellenorizEletkor(18);

// 2. feladat - a hét napjának neve //
console.log("// 2. feladat - a hét napjának neve //");

function napNev(nap) {
  switch (nap) {
    case 1:
      console.log("Hétfő van");
      break;
    case 2:
      console.log("Kedd van");
      break;
    case 3:
      console.log("Szerda van");
      break;
    case 4:
      console.log("Csütörtök van");
      break;
    case 5:
      console.log("Péntek van");
      break;
    case 6:
      console.log("Szombat van");
      break;
    case 0:
      console.log("Vasárnap van");
      break;
    default:
      console.log(`${nap} egy érvénytelen nap`); // a template literal segítségével kiiratjuk az érvénytelen nap értékét
  }
}
napNev(new Date().getDay()); // meghívjuk a napNev function-t a dátum class-al és a getDay metódussal, hogy megkapjuk az aktuális napot
napNev(8); // érvénytelen nap
napNev(3); // szerda

// 3. feladat - páros számok //
console.log("// 3. feladat - páros számok 1-50-ig //");
function parosSzamok() {
  for (let i = 1; i <= 50; i++) {
    // for ciklussal végig iteráljuk 1-től 50-ig a számokat
    if (i % 2 === 0) {
      // majd egy if feltétellel ellenőrizzük, hogy páros szám- e
      console.log(i); // ha páros, kiiratjuk
    }
  }
}
parosSzamok(); // meghívjuk a parosSzamok function-t

// 4. feladat - dobókocka //
console.log("// 4. feladat - dobókocka //");

function jatekDobas() {
  const dobas = Math.ceil(Math.random() * 6); // definiáljuk a dobas változót, ami egyenlő egy random egész számmal 1 és 6 között
  // egy matematikai random számot meghívunk aminek értéke 0 és 1 között van (math random), ezt megszorozzuk 6-tal, és a kapott értéket felfelé kerekítjük (match ceil)
  console.log(dobas);
  if (dobas === 6) {
    console.log("Szerencsés dobás!");
  } else if (dobas >= 3 && dobas <= 5) {
    console.log("Átlagos dobás");
  } else if (dobas >= 1 && dobas <= 2) {
    console.log("Gyenge dobás");
  }
}
jatekDobas();

// 5. feladat - összead vagy kivon //
console.log("// 5. feladat - összead vagy kivon //");
function osszeadVagyKivon(a, b, muveletTipus) {
  // definiáljuk az osszeadVagyKivon function-t aminek 3 paramétere van: a, b paramétereken hajt végre egy műveletet a muveletTipus paraméter alapján
  if (muveletTipus === "+") {
    return a + b;
  } else if (muveletTipus === "-") {
    return a - b;
  }
}
console.log(osszeadVagyKivon(11, 3, "+"));

// 6. feladat - arrow function //
console.log("// 6. feladat - arrow function //");
// definiálom a nyíl függvényt, aminek a neve osszeg
const osszeg = (bemenet) => {
  let eredmeny = 0;
  // for ciklussal 0-ás kiindulási értékkel végig iteráljuk a beadott számokat
  for (let i = 0; i < bemenet.length; i++) {
    // az eredmenyhez hozzáadjuk a jelenlegi számot minden iterációban
    eredmeny = eredmeny + bemenet[i];
  }
  return eredmeny;
};
console.log(osszeg([5, 7, 9]));

// 7. feladat - biztonságos összeadás //
console.log("// 7. feladat - biztonságos összeadás //");
function biztonsagosOsszeadas(a, b) {
  // definiálom a biztonsagosOsszeadás funkciót, aminek a és b paramétereket adok meg
  try {
    if (typeof a !== "number" && typeof b !== "number") {
      // ha a típusa nem egyenlő számmal ÉS b típusa sem egyenlő számmal
      throw new Error("Hibás bemenet"); // dobjon hibát a Hibás bemenet hibaüzenettel
    }
    const osszeg = a + b; // definiálom az osszeg változót, aminek értéke egyenlő a és b összegével
    console.log(osszeg);
  } catch (error) {
    // ha hibát dob a try ágban lévő bármelyik része, akkor jelenítse meg a hibaüzenetet a konzolban
    console.log(error);
  }
}
biztonsagosOsszeadas(5, 4); // meghívjuk a biztonsagosOsszeadas function-t, aminek két értéket adtam

// 8. feladat - véletlen sorsolás //
console.log("// 8. feladat - véletlen sorsolás //");
function veletlenSorsolas() {
  const eredmeny = []; // definiáljuk az eredmeny változót, ami jelenleg egyenlő egy üres tömbbel, mert később, ha már lefutott a for ciklus, ebbe a tömbbe kerülnek be a kapott random számaink
  for (let i = 0; i < 5; i++) {
    const randomSzam = Math.ceil(Math.random() * (100 - 10) + 10); // definiáljuk a randomSzam változót, ami egy random szám lesz 10 és 100 között
    eredmeny.push(randomSzam); // tömbbe mentjük a kapott 5 db random számot
  }
  const max = Math.max(...eredmeny); // definiáljuk a legnagyobb szám változót a Math.max függvény segítségével
  console.log("Legnagyobb szám");
  console.log(max);

  // összes szám növekvő sorrendben
  eredmeny.sort(function (a, b) {
    return a - b;
  });
  console.log("Összes szám");
  for (let i = 0; i < eredmeny.length; i++) {
    console.log(eredmeny[i]); // végig iteráljuk az eredmény tömb elemeit és kiírjuk őket
  }
  const parosSzamok = []; // definiáljuk a parosSzamok változót, ami jelenleg egyenlő egy üres tömbbel, mert később, ha már lefutott a for ciklus, ebbe a tömbbe kerülnek be a kapott random páros számaink
  for (let i = 0; i < eredmeny.length; i++) {
    if (eredmeny[i] % 2 === 0) {
      parosSzamok.push(eredmeny[i]); // ha a feltétel teljesül (ha páros a szám), akkor behelyezzük a parosSzamok tömbbe
    }
  }
  // páros számok növekvő sorrendben
  parosSzamok.sort(function (a, b) {
    return a - b;
  });
  console.log("Páros számok");
  console.log(parosSzamok);
}
veletlenSorsolas(); // meghívjuk a function-t

// Bónusz feladat //
console.log("// Bónusz feladat //");
function szures(array, predicate) {
  // definiáljuk a szures function-t, ami egy tömböt vár (amit szűrni szeretnék), és egy másik function-t, ami eldönti minden egyes elemről, hogy megtartjuk-e vagy sem
  const szurtElemek = []; // definiáljuk a szurtElemek változót ami jelenleg egyenlő egy üres tömmbel, mert később, ha már lefutott a for ciklus, ebbe a tömbbe kerülnek be azok az elemek, amelyek átmennek a szűrőn (a predicate function true-t ad vissza rájuk)

  // végig iteráljuk a tömb elemeit
  for (let i = 0; i < array.length; i++) {
    // meghívjuk a predicate function-t az éppen aktuális tömbbeli elemmel: array[i]
    // ez a function visszaad egy true vagy false értéket, ha true, akkor megtartjuk az elemet
    if (predicate(array[i])) {
      // ha az előző if-re true volt a válasz, akkor az aktuális elemet hozzáadjuk a szurtElemek tömbhöz
      szurtElemek.push(array[i]);
    }
  }
  return szurtElemek; // miután a for ciklus lefutott, visszaadjuk a szurtElemek tömböt -> ez tartalmazza az összes olyan elemet, ami átment a feltételen
}
// meghívjuk a szures function-t, aminek első paraméterként egy tömböt adunk át; második paraméterként egy anonym function-t adunk át, amit predicate-nek hívunk -> ez eldönti minden elemről, hogy megtarthatjuk-e
const eredmeny = szures([5, 6, 7, "hello", "bello"], function (elem) {
  return typeof elem === "number"; // ha az elem típusa number, visszaadja hogy true; ha nem -> false
});
console.log(eredmeny); // kiiratjuk a visszakapott tömböt, amiben csak azok az elemek vannak, amikre typeof elem === "number" -> tehát számok
