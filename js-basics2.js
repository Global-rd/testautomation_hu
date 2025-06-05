//1. feladat
function ellenorizEletkor(eletkor) {
  //egyszeruseg kedveert ternary operatort hasznalok
  console.log(eletkor < 18 ? "Kiskoru" : "Felnott");
}

ellenorizEletkor(15); // Kiskoru
ellenorizEletkor(20); // Felnott

//2. feladat
function napNev(napSzam) {
  const napok = [
    "Hetfo",
    "Kedd",
    "Szerda",
    "Csutortok",
    "Pentek",
    "Szombat",
    "Vasarnap",
  ];

  if (napSzam >= 1 && napSzam <= 7) {
    return napok[napSzam - 1];
  } else {
    return "Ervenytelen nap";
  }
}

//fuggveny meghivasa kulonbozo ertekekre
console.log(napNev(1));
console.log(napNev(7));
console.log(napNev(8));

//3. feladat
function parosSzamok() {
  for (let i = 2; i <= 50; i += 2) {
    console.log(i);
  }
}

parosSzamok();

//4. feladat
function jatekDobas() {
  //a floor segitsegevel kerekitjuk a szamot, majd mivel 0 es 1 kozotti erteket terit vissza, felszorozzuk 6-al es hozzaadunk egyet, hogy 1-tol kezdodjon
  let dobas = Math.floor(Math.random() * 6) + 1;
  console.log(`Dobott szam: ${dobas}`);

  if (dobas === 6) {
    console.log("Szerencses dobas");
  } else if (dobas >= 3) {
    console.log("Atlagos dobas");
  } else {
    console.log("Gyenge dobas");
  }
}
//fuggveny meghivasa
jatekDobas();

//5. feladat
function osszeadVagyKivon(szam1, szam2, muvelet) {
  if (muvelet === "+") {
    return szam1 + szam2;
  } else if (muvelet === "-") {
    return szam1 - szam2;
  } else {
    return "Hibas muvelet! Ez a fuggveny csak osszeadas es kivonas muveletet ismer.";
  }
}
console.log(osszeadVagyKivon(5, 10, "+"));
console.log(osszeadVagyKivon(20, 10, "-"));
console.log(osszeadVagyKivon(5, 10, "/"));

//6. feladat
//reduce fuggveny vegigmegy a tomb osszes elemen es osszeadja azokat egy sum-ban, ami 0 ertekrol indul
const osszeg = (tomb) => tomb.reduce((sum, num) => sum + num, 0);
const szamok = [2, 4, 16, 25];
const uresTomb = [];
console.log("A tomb osszege", osszeg(szamok));
console.log("A tomb osszege", osszeg(uresTomb));

//7. feladat
function biztonsagosOsszeadas(szam1, szam2) {
    try {
        if (typeof szam1 !== "number" || typeof szam2 !== "number") {
            throw new Error("Hibas bemenet");
        }
        return szam1 + szam2;
    } catch (error) {
        console.error(error.message);
    }
}

console.log(biztonsagosOsszeadas(5,10.5));
console.log(biztonsagosOsszeadas(1,"korte"));

//8. feladat
function veletlenSorsolas() {
    const szamok = [];
  
    // 5 veletlen szam generalasa 10 es 100 kozott
    for (let i = 0; i < 5; i++) {
      const veletlenSzam = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
      szamok.push(veletlenSzam);
    }
  
    //legnagyobb szam
    const legnagyobb = Math.max(...szamok);
  
    // paros szamok megtalalasa
    const parosSzamok = szamok.filter(szam => szam % 2 === 0);
  
    // Eredmények kiírása
    console.log("Osszes szam:", szamok);
    console.log("Legnagyobb szam:", legnagyobb);
    console.log("Paros szam(ok):", parosSzamok);
  }
  
  //fuggveny meghivasa
  veletlenSorsolas();
  