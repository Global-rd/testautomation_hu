
function ellenorizEletkor(kor) {
  console.log(kor < 18 ? 'Kiskorú' : 'Felnőtt');
}

function napNev(nap) {
  switch (nap) {
    // 0 tradicionálisan lehetne a Vasárnap, de nem ez volt a feladat.
    case 1:  return 'Hétfő';
    case 2:  return 'Kedd';
    case 3:  return 'Szerda';
    case 4:  return 'Csütörtök';
    case 5:  return 'Péntek';
    case 6:  return 'Szombat';
    case 7:  return 'Vasárnap';
    default: return 'Érvénytelen nap';
  }
}

function parosSzamok() {
  for (let i = 1; i <= 50; ++i) {
    if (i % 2 === 0) console.log(i);
  }
}

function jatekDobas() {
  let kocka = Math.floor(Math.random() * 6) + 1;
  // A feladat ugyan nem kérte, de kiírom a dobást is, hogy ellenőrizni lehessen, hogy jól működik.
  if (kocka === 6) {
    console.log(kocka, 'Szerencsés dobás');
  } else if (kocka >= 3) { // kocka <= 5
    console.log(kocka, 'Átlagos dobás');
  } else { // kocka >= 1 && kocka <= 2
    console.log(kocka, 'Gyenge dobás');
  }
}

function osszeadVagyKivon(a, b, op) {
  switch (op) {
    case '-': return a - b;
    case '+': return a + b;
    // A feladat nem kérte, de mivel a JavaScript nem-típusos, ezért kezelem a hibás inputot is.
    // Mivel a feladat nem kérte, tesztelni sem fogom a kimenetben.
    default:  throw new Error('Operator can only be "+" or "-".');
  }
}

let osszeg = (arr) => arr.reduce((acc, element) => acc += element);

function biztonsagosOsszeadas(a, b) {
  // typeof csak stringgel térhet vissza.
  if (typeof a != 'number' || typeof b != 'number') {
    throw new Error('Hibás bemenet');
  }
  return a + b;
}

function veletlenSorsolas() {
  let arr = [];
  for (let i = 0; i < 5; ++i) {
    arr.push(Math.floor(Math.random() * 91) + 10);
  }

  let max = Number.MIN_VALUE;
  let evens = [];
  for (let idx in arr) {
    console.log('\t' + idx + ':', arr[idx]);
    if (arr[idx] > max) max = arr[idx];
    if (arr[idx] % 2 === 0) evens.push(arr[idx]);
  }

  console.log('\tmax:', max);
  console.log('\tevens:', evens);
}

function szures(arr, predicate) {
  // A feladat szövege megfogalmazta, hogy „ez gyakorlatilag egy saját `filter()`”
  // amit annak értelmeztem, hogy annak használata nélkül kell ezt megoldani.
  let result = [];
  for (let element in arr) {
    if (predicate(element)) result.push(element);
  }
  return result;
}

console.log('Házi feladat: JavaScript programozási alapok II');
console.log('--------------------------------------------------------------------------------');
console.log('1.: ellenorizEletkor');
console.log('\t17:');
ellenorizEletkor(17)
console.log('\t18:');
ellenorizEletkor(18)
console.log('\t19:');
ellenorizEletkor(19)
console.log('--------------------------------------------------------------------------------');
console.log('2. napNev');
console.log('\t0:', napNev(0));
console.log('\t1:', napNev(1));
console.log('\t2:', napNev(2));
console.log('\t3:', napNev(3));
console.log('\t4:', napNev(4));
console.log('\t5:', napNev(5));
console.log('\t6:', napNev(6));
console.log('\t7:', napNev(7));
console.log('\t8:', napNev(8));
console.log('--------------------------------------------------------------------------------');
console.log('3. parosSzamok');
parosSzamok();
console.log('--------------------------------------------------------------------------------');
console.log('4. jatekDobas');
for (let i = 0; i < 5; ++i) jatekDobas();
console.log('--------------------------------------------------------------------------------');
console.log('5. osszeadVagyKivon');
console.log('\t6,4,+:', osszeadVagyKivon(6, 4, '+'));
console.log('\t6,4,-:', osszeadVagyKivon(6, 4, '-'));
console.log('--------------------------------------------------------------------------------');
console.log('6. osszeg');
console.log('\t[1, 2, 3]:', osszeg([1, 2, 3]));
console.log('\t[2, 4, 8]:', osszeg([2, 4, 8]));
console.log('--------------------------------------------------------------------------------');
console.log('7. biztonsagosOsszeadas');
console.log ('\t2, "alma":', (() => {
  try {
    return biztonsagosOsszeadas(1, 'alma')
  } catch (error) {
    return error;
  }
})());
console.log('\t"körte", 4', (() => {
  try {
    return biztonsagosOsszeadas('körte', 4)
  } catch (error) {
    return error;
  }
})())
console.log('\t2, 4:', biztonsagosOsszeadas(2, 4));
console.log('--------------------------------------------------------------------------------');
console.log('8. veletlenSorsolas')
veletlenSorsolas();
console.log('--------------------------------------------------------------------------------');
console.log('+1. szures');
console.log('\t[2, 3, 5, 6, 8, 9], n => n % 2 === 1:', szures([2, 3, 5, 6, 8, 9], n => n % 2 === 1));
