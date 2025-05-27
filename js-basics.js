//1. tipusok es valtozok
//konstans valtozokat hasznalok, mivel ezek nem valtoznak majd a kodomban
const nev = "Zoltani Istvan";
console.log(`Ez az en nevem: ${nev} aminek a tipusa: ${typeof nev}`);
const szuletesi_ev = 1995;
console.log(
  `Ebben az evben szulettem ${szuletesi_ev}, amelyik szamnak a tipusa: ${typeof szuletesi_ev}`
);
const oreg = true;
console.log(`Oreg vagyok-e? ${oreg} - aminek a tipusa: ${typeof oreg}`);

//2. aritmetikai es logikai operatorok

//konstans valtozozot hasznalok a szamokhoz, mivel ezek nem fognak valtozni a futas soran
const num1 = 15;
const num2 = 3;
//minden muvelet vegeredmenyet kulon valtozoban mentettem, igy egyszerubb a kiiratasuk es konnyebb lesz a kesobbiekben felhasznalni ezeket az ertekeket esetleg.
let sum = num1 + num2;
let sub = num1 - num2;
let mul = num1 * num2;
let div = num1 / num2;
console.log(`A ket szam amit hasznalok a(z) ${num1} es ${num2}`);
console.log(
  `A ket szam osszege ${sum}, kulonbsege ${sub}, szorzata ${mul} es hanyadosa ${div}`
);
//logikai operatorok
let igaz = true;
let hamis = false;
//ES muvelet
console.log(`igaz && hamis = `, igaz && hamis);
//VAGY muvelet
console.log(`igaz || hamis = `, igaz || hamis);
//NEGALO muvelet
console.log(`!igaz es !hamis = ${!igaz} es ${!hamis}`);

//3. string muveletek

const teljesNev = "Kiss Anna";
//string felbontasa a space keresesevel
let nevek = teljesNev.split(" ");
console.log(`A keresztnev ${nevek[1]}, a vezeteknev ${nevek[0]}`);
//ellenorzes regularis kifejezessel
let tartalmazSzokozt = / /.test(teljesNev);
console.log(`Tartalmaz szokozt?`, tartalmazSzokozt);

//4. Tombkezeles
let szamSor = [3, 5, 8, 2, 10];
console.log(`A szamsorunk osszes eleme:`);
for (let i = 0; i < szamSor.length; i++) {
  //kiiratjuk a tomb osszes elemet
  console.log(szamSor[i]);
}
console.log(`A szamsorunk paros elemei:`);
for (let i = 0; i < szamSor.length; i++) {
  //kiiratjuk a paros szamokat
  if (szamSor[i] % 2 === 0) {
    console.log(szamSor[i]);
  }
}

//5. Objektumkezeles
const szemely = {
  nev: "Isti",
  eletkor: "30",
  email: "teszt@teszt.com",
};
//fuggveny parameterezett az objektumunkkal es kiirja az objektumunk ertekeit
function szemelyleiras(szemely) {
  return console.log(
    `A(z) ${szemely.nev} nevu felhasznalo ${szemely.eletkor} eves es az email cime ${szemely.email}.`
  );
}
//meghivjuk a fuggvenyt az objektumunkra amit parameterkent adunk at
szemelyleiras(szemely);

//olvastam az object destructuring metodusrol is, szoval azzal is megprobaltam
const szemely2 = {
  nev: "Adam",
  eletkor: "25",
  email: "adam@teszt.eu",
};
//a fuggvenynek csak az objektum elemeit adjuk at parameterkent
function szemelyleiras2({ nev, eletkor, email }) {
  return console.log(
    `A(z) ${nev} nevu felhasznalo ${eletkor} eves es az email cime ${email}.`
  );
}
//meghivjuk a fuggvenyt az objektumunkra amit parameterkent adunk at
szemelyleiras2(szemely2);

//bonusz feladat 1.
const szamok = [0, 3, 5, 8, 14, 20, 50, 100];
function atlag(szamok) {
//functionon belul nullas ertekkel letrehozok egy valtozot, amit majd tudok a return reszen hasznalni
  let szamokAtlaga = 0;
//vegig iteralunk a tomb osszes elemen es osszeadjuk oket. A valtozo elnevezese nem a legidealisabb, mivel csak a for ciklus vegen derul ki a tenyleges atlag, elotte egy szamok osszege van benne
//viszont nem akartam meg tobb valtozot hasznalni
  for (let i = 0; i < szamok.length; i++) {
    szamokAtlaga = szamokAtlaga + szamok[i];
  }
  szamokAtlaga = szamokAtlaga / szamok.length;
  return szamokAtlaga;
}

console.log(`A szamsorunk atlaga`, atlag(szamok));

//bonusz feladat 2. 
//szeretnek 2 tesztadatot, egy helyes emailt es egy helytelen emailt, hogy mindketto variansra tudjuk a fuggvenyt lefuttatni
const helyesEmail = "teszt@teszt.com";
const helytelenEmail = "321fsadf[gasga].13214214@gadsgad";

function emailCheck(testEmail){
    //ez a komplexebb regex email validalas, ami megnezi, hogy a @ elott kis es nagybetuk, vagy pont, alulvonas, szazalek, plusz es minusz
    //megkeresi a kotelezo @ szimbolumot
    //domain nev az betuk, szamok, kotojel es pont lehet
    //kotelezo pont szimbolum a domain vegen
    //legalabb 2 karakter hosszu domain
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(testEmail);
}

console.log(`Ez az email helyes? ${helyesEmail}`,emailCheck(helyesEmail));
console.log(`Ez az email helyes? ${helytelenEmail}`,emailCheck(helytelenEmail));
