//1 . Készíts egy függvényt ellenorizEletkor néven, amely egy számot kap paraméterként, és
//kiírja:
//● “Kiskorú”, ha 18 év alatti,
//● “Felnőtt”, ha 18 év vagy több.

//arrow function ami számot kap paraméterként
const ellenorizEletkor = (kor) => {
  if (kor < 18) {
    console.log("Kiskorú"); //18 alatti szám esetén consolre írja, hogy Kiskorú
  } else {
    console.log("Felnőtt"); //18 vagy nagyobb szám esetén consolre írja, hogy Felnőtt
  }
};

ellenorizEletkor(16); //függvény meghívása 16-tal (Kiskorú)
ellenorizEletkor(17); //függvény meghívása 17-tel (Kiskorú)
ellenorizEletkor(18); //függvény meghívása 18-al (Felnőtt)
ellenorizEletkor(22); //függvény meghívása 22-vel (Felnőtt)


//2. Készíts egy napNev nevű függvényt, amely egy számot vár (1–7) és visszaadja a hét
//napjának nevét (pl. 1 = “Hétfő”). Ha a szám nem 1–7 között van, adjon vissza: "Érvénytelen
//nap".

//function ami számot kap paraméterként
function napNev(napSzam) {
  switch (napSzam) {
    case 1:
      return "Hétfő"; //1 esetén visszaadja, hogy Hétfő
    case 2:
      return "Kedd"; //2 esetén visszaadja, hogy Kedd
    case 3:
      return "Szerda"; //3 esetén visszaadja, hogy Szerda
    case 4:
      return "Csütörtök"; //4 esetén visszaadja, hogy Csütörtök
    case 5:
      return "Péntek"; //5 esetén visszaadja, hogy Péntek
    case 6:
      return "Szombat"; //6 esetén visszaadja, hogy Szombat
    case 7:
      return "Vasárnap"; //7 esetén visszaadja, hogy Vasárnap
    default:
      return "Érvénytelen nap"; //egyéb szám esetén visszaadja, hogy Érvénytelen nap
  }
}

console.log(napNev(-2)); //függvény meghívása -2-vel (Érvénytelen nap)
console.log(napNev(0)); //függvény meghívása 0-val (Érvénytelen nap)
console.log(napNev(1)); //függvény meghívása 1-el (Hétfő)
console.log(napNev(5)); //függvény meghívása 5-tel (Péntek)
console.log(napNev(7)); //függvény meghívása 7-tel (Vasárnap)
console.log(napNev(8)); //függvény meghívása 8-al (Érvénytelen nap)
console.log(napNev(50)); //függvény meghívása 50-nel (Érvénytelen nap)
console.log(napNev("alma")); //függvény meghívása nem számmal (Érvénytelen nap)


//3. Írj egy parosSzamok függvényt, amely 1-től 50-ig kiírja az összes páros számot a
//konzolra.

const parosSzamok = () => {
  for (let i = 1; i <= 50; i++) {
    if (i % 2 === 0) { //páros számok ellenőrzése
      console.log(i); //páros számok kiírása a konzolra
    }
  }
}
parosSzamok(); //függvény meghívása, kiírja az 1-től 50-ig terjedő páros számokat



//4. Írj egy jatekDobas függvényt, amely egy véletlen számot generál 1 és 6 között (mint egy
//dobókocka), és írja ki:
//● “Szerencsés dobás”, ha 6-ost dobtál
//● “Átlagos dobás”, ha 3–5 között
//● “Gyenge dobás”, ha 1–2 volt

function jatekDobas() {
  const dobottSzam = Math.floor(Math.random() * 6) + 1; //véletlen szám generálása 1 és 6 között
  if (dobottSzam === 6) {
    console.log("Szerencsés dobás"); //ha 6-ost dobtunk, kiírja, hogy Szerencsés dobás
  } else if (dobottSzam >= 3 && dobottSzam <= 5) {
    console.log("Átlagos dobás"); //ha 3-5 között dobtunk, kiírja, hogy Átlagos dobás
  } else {
    console.log("Gyenge dobás"); //ha 1-2-t dobtunk, kiírja, hogy Gyenge dobás
  }
}

jatekDobas(); //függvény meghívása, kiírja a dobás eredményét


//5. Készíts egy osszeadVagyKivon nevű függvényt, amely 3 paramétert kap: két számot és
//egy művelet típust ("+" vagy "-"). Térjen vissza az eredménnyel.

const osszeadVagyKivon = (szam1, szam2, muvelet) => {
  if (muvelet === "+") {
    return szam1 + szam2; //ha a művelet "+" akkor összeadja a két számot
  } else if (muvelet === "-") {
    return szam1 - szam2; //ha a művelet "-" akkor kivonja a második számot az elsőből
  }
};

console.log(osszeadVagyKivon(5, 3, "+")); //függvény meghívása 5 és 3 összeadásával (8)
console.log(osszeadVagyKivon(-20, 100, "-")); //függvény meghívása -20 és 100 kivonásával (-120)
console.log(osszeadVagyKivon(7, 2, "*")); //függvény meghívása érvénytelen művelettel (undefined)


//6. Nyílfüggvénnyel (=>) készíts egy osszeg függvényt, amely egy tömböt kap, és visszaadja
//az elemek összegét.
//Pl. [1, 2, 3] → 6

const osszeg = (tomb) => {
  let osszeg = 0; //összeg változó inicializálása
  for (let i = 0; i < tomb.length; i++) {
    osszeg = osszeg + tomb[i]; //hozzáadja az aktuális elem értékét az összeghez
  }
  return osszeg; //visszaadja az összeg változó értékét
}
console.log(osszeg([1, 2, 3])); //függvény meghívása [1, 2, 3] tömbbel (6)

let tomb = new Array(1, 2, 3, 4, 5, 6); // új tömb
console.log(osszeg(tomb)); //függvény meghívása a tömbbel (21)


//7.Készíts egy biztonsagosOsszeadas függvényt, amely két paramétert vár.
//Ha valamelyik nem szám, dobjon hibát "Hibás bemenet", különben térjen vissza az
//összeggel.
//Használj try-catch-et a hiba lekezelésére.


