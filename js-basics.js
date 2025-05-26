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
for (let i = 0; i < szamSor.length; i++){
    //kiiratjuk a tomb osszes elemet
    console.log(szamSor[i]);
}
console.log(`A szamsorunk paros elemei:`);
for (let i = 0; i < szamSor.length; i++){
    //kiiratjuk a paros szamokat
    if (szamSor[i] % 2 === 0){
        console.log(szamSor[i]);
    }
}

//5. Objektumkezeles
const szemely = {
    nev: "Isti",
    eletkor: "30",
    email: "teszt@teszt.com"
}
//fuggveny parameterezett az objektumunkkal es kiirja az objektumunk ertekeit
function szemelyleiras(szemely) {
    return console.log(`A(z) ${szemely.nev} nevu felhasznalo ${szemely.eletkor} eves es az email cime ${szemely.email}.`)
}
//meghivjuk a fuggvenyt az objektumunkra amit parameterkent adunk at
szemelyleiras(szemely);

//olvastam az object destructuring metodusrol is, szoval azzal is megprobaltam
const szemely2 = {
    nev: "Adam",
    eletkor: "25",
    email: "adam@teszt.eu"
}
//a fuggvenynek csak az objektum elemeit adjuk at parameterkent
function szemelyleiras2({nev, eletkor, email}) {
    return console.log(`A(z) ${nev} nevu felhasznalo ${eletkor} eves es az email cime ${email}.`)
}
//meghivjuk a fuggvenyt az objektumunkra amit parameterkent adunk at
szemelyleiras2(szemely2);

//