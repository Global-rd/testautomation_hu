// 1. Típusok és változók
let nev = "Molnar Alpar"; // string típus
let kor = 30; // number típus (pl.)
let aktiv = true; // boolean típus

console.log(nev, typeof nev);
console.log(kor, typeof kor);
console.log(aktiv, typeof aktiv);

// 2. Aritmetikai és logikai operátorok
let a = 12;
let b = 4;

console.log("Összeg:", a + b);
console.log("Különbség:", a - b);
console.log("Szorzat:", a * b);
console.log("Osztás:", a / b);

let logikai1 = true;
let logikai2 = false;

console.log("ÉS (&&):", logikai1 && logikai2);
console.log("VAGY (||):", logikai1 || logikai2);
console.log("NEGÁCIÓ (!):", !logikai1);

// 3. String műveletek
let teljesNev = "Molnar Alpar";
let nevDarabok = teljesNev.split(" ");
let vezeteknev = nevDarabok[0];
let keresztnev = nevDarabok[1];

console.log("Vezetéknév:", vezeteknev);
console.log("Keresztnév:", keresztnev);

let vanSzokoz = / /.test(teljesNev);
console.log("Tartalmaz szóközt?", vanSzokoz);

// 4. Tömbkezelés
let szamok = [3, 5, 8, 2, 10];

console.log("Összes elem:");
for (let i = 0; i < szamok.length; i++) {
  console.log(szamok[i]);
}

console.log("Páros számok:");
for (let i = 0; i < szamok.length; i++) {
  if (szamok[i] % 2 === 0) {
    console.log(szamok[i]);
  }
}

// 5. Objektumkezelés
let felhasznalo = {
  nev: "Molnar Alpar",
  eletkor: 30,
  email: "m.alpar.ferenc@gmail.com"
};

function felhasznaloKiir(felhasznalo) {
  console.log(
    `A(z) '${felhasznalo.nev}' nevű felhasználó '${felhasznalo.eletkor}' éves és az email címe: '${felhasznalo.email}'`
  );
}

felhasznaloKiir(felhasznalo);

// Bónusz 1 – átlag számítása
function atlag(tomb) {
  let osszeg = 0;
  for (let i = 0; i < tomb.length; i++) {
    osszeg += tomb[i];
  }
  return osszeg / tomb.length;
}

console.log("Átlag:", atlag(szamok));

// Bónusz 2 – email validálása
function emailEllenorzes(email) {
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

console.log("Email helyes formátumú?", emailEllenorzes(felhasznalo.email));
