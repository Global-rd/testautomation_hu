//bonusz feladat
function szures(tomb, feltetel) {
    let eredmeny = [];
    for (let i = 0; i < tomb.length; i++) {
        if (feltetel(tomb[i])) {
            eredmeny.push(tomb[i]);
        }
    }
    return eredmeny;
}

// Példa használat: csak páros számok szűrése
let szamok = [1, 2, 3, 4, 5, 6];
let parosok = szures(szamok, szam => szam % 2 === 0);
console.log(parosok); // [2, 4, 6]