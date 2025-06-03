1.)
//Az ellenorizEletkor függvény egy számot kap paraméterül és ellenörzi, hogy kiskorú 
// vagy nagykorú-e személyröl van - e szó a megadott életkor alapján.

function ellenorizEletkor(szam) {
    if (szam > 0 && szam != null ) {
        
        if(szam < 18) {
            console.log("Kiskorú")
         } else {console.log("Nagykorú")
        
         } 
        
         } else {
        console.log("Hibás életkor lett megadva!")
    }
}

2.)
//a napNev nevű függvény a kapott paraméter (1–7) alapján visszaadja a hét
//napjának nevét

function napNev(number) {
    switch (number) {
        case 1:
            console.log("Hétfő");
            break;
        case 2:
            console.log("Kedd");
            break;
        case 3:
            console.log("Szerda");
            break;
        case 4:
            console.log("Csütörtök");
            break;
        case 5:
            console.log("Péntek");
            break;
        case 6:
            console.log("Szombat");
            break;
        case 7:
            console.log("Vasárnap");
            break;
        default:
            console.log("Érvénytelen nap!");
    }    
    
}

3.)
// A parosSzamok függvény kiírja 1-től 50-ig az összes páros számot.

function parosSzamok() {
    let parosSzamok = [];

    for(let i = 1; i <= 50; i++) {
        if(i % 2 == 0) {
            parosSzamok.push(i);

        }
        
    }
    console.log("A páros számok 1-től 50-ig: " + parosSzamok);
}

4.)
//A jatekDobas függvény egy véletlen számot generál 1 és 6 között és kimenetele egy Sring. 

function jatekDobas() {
   let number = Math.floor(Math.random() * 6) + 1; 
   
   if(number === 6) {
        console.log("Szerencsés dobás");
    } else if (number >=3 && number <=5){
        console.log("Átlagos dobás.")
    } else {
        console.log("Gyenge dobás.");
    }

}

5.)
// A osszeadVagyKivon függvény két számot ad össze vagy von ki, attól függően, hogy a harmadik
//  paraméter "+" vagy "-".

function osszeadVagyKivon(x, y, muvelet){

    if (muvelet === "+") {
        console.group("Az eredmény: " + (x + y));
    } else if (muvelet === "-") {
        console.log("Az eredmény: " + (x - y));
    } else {
        return "Hibás paraméterek lettek megadva!";
    }

}

6.)
//Az osszeg függvény egy tömböt kap paraméterül és visszaadja az tömb elemeinek összegét.

let osszeg = (szamok) => {
    let szamokOsszege = 0;
    for (let i = 0; i < szamok.length; i++) {
        szamokOsszege += szamok[i]
    }
    console.log("A számok összege: " + szamokOsszege);
    return szamokOsszege;
}

7.)
//A biztonsagosOsszeadas függvény két paramétert vár.
//Ha valamelyik paraméter nem szám, akkor "Hibás bemenet" hibát dob a függvény, különben visszatér az összeggel.

function biztonsagosOsszeadas(x, y) {

    try {
        let szam_x = parseInt(x);
        let szam_y = parseInt(y);
        if (isNaN(x) || isNaN(y)) {
            throw new Error("Hibás bemenet.");
        }
        let osszeg = szam_x + szam_y;
        console.log("Az összeg: " + osszeg);
    } catch (hiba) {
        console.error(hiba.message);
    }
}

8.)
//A veletlenSorsolas nevű függvényt 5 darab véletlen számot generál 10 és 100
//között és kiírja az összes számot, a legnagyobb számot, valamint a páros számok listáját.

function veletlenSorsolas() {

    let szamok = [];
    let legnagyobbSzam = 0;
    let parosSzamok = [];

    for(let i = 1 ; i <= 5; i++) {
    let veletlenSzam = Math.floor(Math.random() * (100 - 10 + 1)) + 10; 
    szamok.push(veletlenSzam);

    }

    for(let i = 0; i < szamok.length; i++) {
        if(szamok[i] > legnagyobbSzam) {
            legnagyobbSzam = szamok[i];
        }
    }

    for(let i = 0; i < szamok.length; i++) {
        if(szamok[i] % 2 ===0) {
            parosSzamok.push(szamok[i]);
        }
    }

    console.log("A kisorsolt számok: " + szamok);
    console.log("A legnagyobb szám: " + legnagyobbSzam);
    console.log("A páros számok listája: " + parosSzamok);
}

9.) Bonus
//A szures függveny csak azokat a tömb elemeket adja vissza, amelyekre a feltetelFuggveny igaz.

function szures(tomb, feltetelFuggveny) {
    let szurtElemek = [];

    for(let i = 0; i < tomb.length; i++) {
        if(feltetelFuggveny(tomb[i])) {
            szurtElemek.push(tomb[i]);
        }
    }
    console.log("Szűrt elemek: " + szurtElemek);
    return szurtElemek;
}

function feltetelFuggveny(szam){
    return (szam > 0 && szam < 10);
}
