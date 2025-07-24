//elsofeladat

function ellenorizEletkor(eletkor) {
    let message = (eletkor >= 18) ? "Felnőtt" : "Kiskorú";
    console.log(message);
}
//ellenorizEletkor(19);

//másodikfeladat

function napNev(szam) {
    switch(szam) {
        case 1: return console.log("Hétfő");
        case 2: return console.log("Kedd");
        case 3: return console.log("Szerda");
        case 4: return console.log("Csütörtök");
        case 5: return console.log("Péntek");
        case 6: return console.log("Szombat");
        case 7: return console.log("Vasárnap");
        default: return console.log("Érvénytelen nap");
    }
}
//napNev(1)

//harmadikfeladat

function parosSzamok() {
    for (let i = 1; i < 50; i++) {
        if (i % 2 === 0) {
            console.log(i);
        }
    }
}
//parosSzamok()

//negyedikfeladat
function jatekDobas() {
    const dobas = Math.floor(Math.random() * 6) + 1; 
    console.log("Dobás eredménye:", dobas);
    if (dobas == 6) {
        console.log("Szerencsés dobás");
    } else if (dobas >= 3 && dobas <= 5) {
        console.log("Átlagos dobás");
    } else {
        console.log("Gyenge dobás");
    }
}
//jatekDobas()

//otodikfeladat
function osszeadVagyKivon(szam1, szam2, muvelet) {
    if (muvelet === "+") {
        return console.log(szam1 + szam2);
    } else if (muvelet === "-") {
        return console.log(szam1 - szam2);
    } else {
        return console.log("Érvénytelen művelet");
    }
}
//osszeadVagyKivon(10,5,"+")

//hatodikfeladat

//??

//hetedikfeladat
function hetedikfeladat() {
    const biztonsagosOsszeadas = (a, b) => {
    try {
        if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error("Hibás bemenet");
        }
        return a + b;
    } catch (error) {
        console.error(error.message);
    }
    };
        console.log(biztonsagosOsszeadas(20, 100));
        console.log(biztonsagosOsszeadas(1, "hiba"));
}

//nyolcadikfeladat

const veletlenSorsolas = () => {
  const szamok = [];

  for (let i = 0; i < 5; i++) {
    const veletlenSzam = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
    szamok.push(veletlenSzam);
  }

  const legnagyobb = Math.max(...szamok);
  const parosSzamok = szamok.filter(szam => szam % 2 === 0);

  console.log("Összes szám:", szamok);
  console.log("Legnagyobb szám:", legnagyobb);
  console.log("Páros számok:", parosSzamok);
};

veletlenSorsolas();