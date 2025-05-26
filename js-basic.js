/*Hozz létre 3 változót különböző primitív típusokkal: string, number, boolean.
 Írj ki a konzolra minden változót, és mellékeld a typeof eredményét is.*/

//lusta vagyok, ezért létrehozok egy tömböt, kulcs érték párokkal, majd egy for cikklussal kiírom a konzolra
valtozo = {user: "John Doe", age: 30, isActive: true}; 

function consollogtipussal(valtozo){ // hívok egy funkciót, ami for ciklussal végigmegy a valtozo tömbön
    for (let i in valtozo){  
        console.log(`${i} : ${valtozo[i]} typeof : ${typeof valtozo[i]}`); // mivel nem akarok folyamatosan "", ezért template literal-t használok
}
};

consollogtipussal(valtozo); //meghivom a funkciót. 



/*console.log("user: ", user, "typeof: ", typeof user);
console.log("age: ", age, "typeof: ", typeof age);
console.log("isActive: ", isActive, "typeof: ", typeof isActive);*/// itt egyesével logoltam ki a változókat, de úgy gondoltam a fenti egy fokkal stílusosabb

/*2. Aritmetikai és logikai operátorok
○ Számold ki két tetszőleges szám összegét, különbségét, szorzatát és
osztását.
○ Hozz létre két logikai értéket és végezz rajtuk &&, ||, ! műveleteket.*/

let a = 10; //megadom az első számot
let b = 6; //megadom a második számot

function basic_aritmethic (a,b){  //létrehozok egy funkciót, ami két számot vár paraméterül
    return {              // itt egy objektumot adok vissza, amiben kulcs és az elvégzendő matematikai műveletek vannak
        összeg: a + b,
        különbség: a - b,
        szorzat: a * b,
        osztás: a / b, }
};

console.log("a  b aritmetikai értékei", basic_aritmethic(a,b)); //kilogoltatom egyben az objektumot, 
// ha pedig egyesével akkarom akkor pedig létrehozok egy új változót, pl eredmények, és úgy adom meg hogy pl. console.log(eredmények.összeg)

let bool1 = true;
let bool2 = false;

function es_vagy_nem(bool1,bool2){  //itt is egy funkciót hozok létre, aminek a két boolean a paramétere
    return { //itt is egy objektumot adok vissza, amiben a kulcs/érték párok vannak) 
        es: bool1 && bool2,  // ha jól emlékszem itt mivel és van ezért itt csak akkor lesz true ha mind a kettő true
        vagy: bool1 || bool2, //itt meg mivel vagy van, ezért ha az egyik true akkor az egész true
        nem: !bool1, //itt meg a nem operátorral megfordítom a bool1 értékét     
    }
}
console.log("bool1 bool2 logikai műveletek", es_vagy_nem(bool1,bool2)); //kilogoltatom a funkciót

/*3. String műveletek
○ Hozz létre egy teljes név változót (pl. "Kiss Anna"), és válaszd szét
vezetéknévre és keresztnévre.
○ Ellenőrizd reguláris kifejezéssel, hogy a név tartalmaz-e szóközt (/ /).*/

let teljesnev = "Kiss Anna";

function felezo(teljesnev){ //itt létrehozok egy funkciót, aminek a paramétere a teljes név
    let felnev = teljesnev.split(" "); //itt a split metódust használom, amivel a szóközök mentén ketté tudom választani a nevet
    return {vezeteknev: felnev[0], keresztnev: felnev[1]}; //itt visszaadom az objektumot, amiben a vezetéknév és keresztnév kulcsok vannak
}

console.log(`Vezetéknév : ${felezo(teljesnev).vezeteknev}, Keresztnév: ${felezo(teljesnev).keresztnev}`); //itt meghívom a funkciót a fullname változóra, és kiíratom egyesével

function szokozellenorzes(teljesnev){ //itt létrehozok egy funkciót, aminek a paramétere a teljes név
    let regex = /\s/; //itt létrehozok egy reguláris kifejezést, ami a szóközöket keresi
    return regex.test(teljesnev); //itt visszaadom a reguláris kifejezés tesztelését, ami true vagy false értéket ad vissza
}

console.log(`A név tartalmaz szóközt:${szokozellenorzes(teljesnev)}`); //itt meghívom a szokozellenorzofunkciót a fullnamere, és kiíratom a teszt eredményét

/*4. Tömbkezelés
○ Hozz létre egy tömböt, ami néhány számból áll (pl. [3, 5, 8, 2, 10]).
○ Írj egy ciklust, ami kiírja a tömb elemeit.
○ Írj egy másik ciklust, ami csak a páros számokat írja ki.*/

let pl = [3, 5, 8, 2, 10]; // ez itt a vicc helye :D 

for ( let i in pl){ //itt az i változó a pl tömb indexét jelenit
    console.log(`Tömb [${i}] : ${pl[i]}`);}; // itt kiíratom azt hogy tömb indexét és az ahhoz tartozó értéket 

console.log(`paros számok : ${pl.filter(i => i%2 ===0 )}`); //itt létre lehetett volna hozni egy üres tömböt majd for ciklussal 
// végig menni az elemeken és ha k % 2 == 0, , és pushal feltölteni az üres tömbbe, de ez stílusosabb, mivel csak kiratni szükséges

/*5. Objektumkezelés
○ Hozz létre egy objektumot, amely egy felhasználót reprezentál (név, életkor,
email).
○ Írj függvényt, amely paraméterként egy ilyen objektumot vár, és a konzolra
kiírja a következő formátumban:

"A(z) ‘Név’ nevű felhasználó ‘25’ éves és az email címe:
‘valami@email.com’"*/

let user = {
    nev: " Test József",
    eletkor: 30,
    email: "test.jozsef@gmail.com"}

function print(user){
    console.log(`A(z) ${user.nev} nevű felhasználó ${user.eletkor} éves és az email címe: ${user.email}`); //kiíratom a felhasználó adatait
}

print(user); //meghívom a funkciót

/* irj egy függvényt ami  a tömb átlagát számolja ki*/

let szamok = [1,2,3,4,5,6,7,8,9,10];

function atlag(szamok){
var osszeg = 0;  //létrehozok egy változót, amiben az összeget tárolom
    for (let i of szamok){ //itt végigmegyek a tömbön
        osszeg +=i; //hozzáadom az aktuális számot az összeghez
    }
return osszeg / szamok.length
}

console.log(`A tömb átlaga: ${atlag(szamok)}`); //kiíratom az átlagot

let email = "valami@valami.hu"
let regex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
console.log(`Az email cím helyes: ${regex.test(email)}`); //itt létrehozok egy reguláris kifejezést, 
// ami ellenőrzi az email cím formátumát, majd kiíratom a teszt eredményét

