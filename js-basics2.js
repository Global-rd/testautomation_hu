//1. feladat
 function ellenorizEletkor(eletkor) {
    //egyszeruseg kedveert ternary operatort hasznalok
    console.log(eletkor < 18 ? "Kiskoru" : "Felnott");
  }

  ellenorizEletkor(15); // Kiskoru
  ellenorizEletkor(20); // Felnott
  
//2. feladat
  function napNev(napSzam) {
    const napok = ["Hetfo", "Kedd", "Szerda", "Csutortok", "Pentek", "Szombat", "Vasarnap"];
  
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
//fuggveny meghivasa
parosSzamok();