// 1. ellenorizEletkor függvény
function ellenorizEletkor(eletkor) {
  if (eletkor < 18) {
    console.log("Kiskorú");
  } else {
    console.log("Felnőtt");
  }
}

//2. napNev függvény

function napNev(szam) {
  const napok = [
    "Hétfő",
    "Kedd",
    "Szerda",
    "Csütörtök",
    "Péntek",
    "Szombat",
    "Vasárnap",
  ];
  if (szam >= 1 && szam <= 7) {
    return napok[szam - 1];
  } else {
    return "Érvénytelen nap";
  }
}

//3. parosSzamok függvény

function parosSzamok() {
  for (let i = 1; i <= 50; i++) {
    if (i % 2 === 0) {
      console.log(i);
    }
  }
}

//4. jatekDobas függvény

function jatekDobas() {
  const dobas = Math.floor(Math.random() * 6) + 1;
  if (dobas === 6) {
    console.log("Szerencsés dobás");
  } else if (dobas >= 3 && dobas <= 5) {
    console.log("Átlagos dobás");
  } else {
    console.log("Gyenge dobás");
  }
}

//5. osszeadVagyKivon függvény

function osszeadVagyKivon(a, b, muvelet) {
  if (muvelet === "+") {
    return a + b;
  } else if (muvelet === "-") {
    return a - b;
  } else {
    return "Ismeretlen művelet";
  }
}

//6. osszeg nyílfüggvény
const osszeg = (tomb) => tomb.reduce((osszes, elem) => osszes + elem, 0);

//7. biztonsagosOsszeadas függvény try-catch-csel

function biztonsagosOsszeadas(a, b) {
  try {
    if (typeof a !== "number" || typeof b !== "number") {
      throw new Error("Hibás bemenet");
    }
    return a + b;
  } catch (error) {
    console.log(error.message);
  }
}

//8. veletlenSorsolas függvény

function veletlenSorsolas() {
  const szamok = [];
  for (let i = 0; i < 5; i++) {
    const veletlen = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
    szamok.push(veletlen);
  }
  console.log("Számok:", szamok);
  const legnagyobb = Math.max(...szamok);
  console.log("Legnagyobb:", legnagyobb);
  const parosok = szamok.filter((szam) => szam % 2 === 0);
  console.log("Páros számok:", parosok);
}

//+1. szures függvény (saját filter)

function szures(tomb, feltetel) {
  const eredmeny = [];
  for (let i = 0; i < tomb.length; i++) {
    if (feltetel(tomb[i])) {
      eredmeny.push(tomb[i]);
    }
  }
  return eredmeny;
}
