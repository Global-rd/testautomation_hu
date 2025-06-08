function elsofeladat(){
    let string = "4";
    console.log(string);
    let number = 13;
    console.log(number);
    let boolean = true;
    console.log(boolean);
}

function masodikfeladat(){
    // ez nem tudom miért néz ki ilyen rondán
    const elsoszam = 6;
    const masodikszam = 8;
    const  osszeg = elsoszam + masodikszam;
    console.log("A két szám összege " + osszeg);
    const kulonbseg = elsoszam - masodikszam;
    console.log("A két szám különbsége " + kulonbseg);
    const szorzat = elsoszam * masodikszam;
    console.log("A két szám szorzata " + szorzat);
    const hanyados = elsoszam / masodikszam;
    console.log("A két szám hányadosa " + hanyados);
    const logikaiertek1 = true;
    const logikaiertek2 = false;
    if (logikaiertek1 && logikaiertek2 == false) {
        console.log("Logikai érték False")
    } else {
        console.log("Logikai érték True")
    }
        
}   

function harmadikfeladat(){
    const nev = "Hauck Polla Metta";
    const kulonnev = nev.split(" ");
    const vezeteknev = kulonnev[0];
    const keresztnev = kulonnev[1];
    const utonev = kulonnev[2];

    console.log("Név: " + nev);
    console.log("Vezetéknév: " + vezeteknev);
    console.log("Keresztnév: " + keresztnev);
    console.log("Utónév: " + utonev)
}

function negyedikfeladat(){
    const szamok = [1,2,4,73,2346,7632,11111];
    for (let i = 0; i < szamok.length; i++) {
    console.log(szamok[i]);
    }
    for (let i = 0; i < szamok.length; i++) {
        if (szamok[i] % 2 === 0) {
            console.log(szamok[i]); 
    }
  }
}

function otodikfeladat(){
    const felhasznalo = {
        nev: "Hauck Polla Metta",
        eletkor: 27,
        emailcim: "pollametta@gmail.com"
    }
    function felhasznaloadatai(felhasznalo){
        console.log(`A(z) '${felhasznalo.nev}' nevű felhasználó '${felhasznalo.eletkor}' éves és az email címe: '${felhasznalo.emailcim}'`)
    }
    felhasznaloadatai(felhasznalo)
}
