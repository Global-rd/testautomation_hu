// Függveny eletkor neven
function ellenorizEletkor(age) {
  if (age < 18) {
    console.log("Kiskorú");
  } else {
    console.log("Felnőtt");
  }
}

// Példák:
 ellenorizEletkor(15); // Kiskorú
 ellenorizEletkor(20); // Felnőtt

 // függveny Nap neven ami egy szamot var (1-7) es visszateri a nap nevet
 function napNev(napSzam) {
  switch (napSzam) {
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

// Példák:
console.log(napNev(1)); // Hétfő
console.log(napNev(4)); // Csütörtök
console.log(napNev(8)); // Érvénytelen nap

// Függvény, ami ellenőrzi, hogy egy szám páros-e 1-50
function parosSzamok() {
  for (let i = 1; i <= 50; i++) {
    if (i % 2 === 0) {
      console.log(i);
    }
  }
}

// A függvény meghívása:
parosSzamok();

// jatekDobas függvény, amely egy véletlen számot generál 1 és 6 között
function jatekDobas() {
  const dobas = Math.floor(Math.random() * 6) + 1; // Véletlen szám generálása 1-6 között

  if (dobas === 6) {
    console.log("Szerencsés dobás");
  } else if (dobas >= 3 && dobas <= 5) {
    console.log("Átlagos dobás");
  } else {
    console.log("Gyenge dobás"); // 1 vagy 2
  }
}

// Példák a függvény meghívására (többször):
jatekDobas();
jatekDobas();
jatekDobas();

//osszeadVagyKivon nevű függvény 
function osszeadVagyKivon(szam1, szam2, muvelet) {
  if (muvelet === "+") {
    return szam1 + szam2;
  } else if (muvelet === "-") {
    return szam1 - szam2;
  } else {
    return "Érvénytelen művelet"; // Ha a művelet nem "+" vagy "-"
  }
}

// Példák:
console.log(osszeadVagyKivon(5, 3, "+")); // 8
console.log(osszeadVagyKivon(10, 4, "-")); // 6
console.log(osszeadVagyKivon(7, 2, "*")); // Érvénytelen művelet

// Nyílfüggvény: tömb elemeinek összege
const osszeg = tomb => tomb.reduce((acc, elem) => acc + elem, 0);

// Példa használat:
console.log(osszeg([1, 2, 3])); // 6


// Biztonságos összeadás függvény, amely ellenőrzi a bemeneteket
function biztonsagosOsszeadas(a, b) {
  try {
    if (typeof a !== "number" || typeof b !== "number" || isNaN(a) || isNaN(b)) {
      throw new Error("Hibás bemenet");
    }
    return a + b;
  } catch (error) {
    console.log(error.message);
  }
}

// Példa használat:
console.log(biztonsagosOsszeadas(5, 7));      // 12
console.log(biztonsagosOsszeadas(5, "alma")); // Hibás bemenet

//veletlenSorsolas nevű függvény,amely 5 darab véletlen számot generál 10 és 100 között
function veletlenSorsolas() {
  let tomb = [];
  for (let i = 0; i < 5; i++) {
    // Véletlen szám generálása 10 és 100 között (mindkettő benne van)
    let szam = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
    tomb.push(szam);
  }

  // Összes szám kiírása
  console.log("Összes szám:", tomb);

  // Legnagyobb szám
  let legnagyobb = Math.max(...tomb);
  console.log("Legnagyobb szám:", legnagyobb);

  // Páros számok listája
  let parosok = tomb.filter(szam => szam % 2 === 0);
  console.log("Páros számok:", parosok);
}

// Példa használat:
veletlenSorsolas();