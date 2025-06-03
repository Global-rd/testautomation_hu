// 1. Feladat
function ellenorizEletkor(kor) {
  if (kor < 18) {
    console.log("Kiskorú");
  } else {
    console.log("Felnőtt");
  }
}

// 2. Feladat
function napNev(szam) {
  const napok = ["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat", "Vasárnap"];
  if (szam >= 1 && szam <= 7) {
    return napok[szam - 1];
  } else {
    return "Érvénytelen nap";
  }
}

// stb... (ide jöhet a 3. feladat és a többi)
