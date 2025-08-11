
console.log('1. Feladat');
function ellenorizEletkor(number) {
    number >= 18 ? console.log(`A szemely ${number} eves, tehat felnott`) : console.log(`A szemely ${number} eves, tehat kiskoru`);
}


ellenorizEletkor(20);
ellenorizEletkor(16)

  
console.log('\n2. Feladat');
function napNev(number) {
    switch (number) {
        case 1:
            console.log('Hétfő');
            break;
        case 2:
            console.log('Kedd');
            break;
        case 3:
            console.log('Szerda');
            break;
        case 4:
            console.log('Csütörtök');
            break;
        case 5:
            console.log('Péntek');
            break;
        case 6:
            console.log('Szombat');
            break;
        case 7:
            console.log('Vasárnap');
            break;
        default:
            console.log('Érvénytelen nap');
    }
}
napNev(3); // Példa hívás


console.log('\n3. Feladat');
function parosSzamok() {
    let arrayOfNumbers = []; // Letrehoztam egy tombot es elmentettem abba a szamokat, hogy ne toltse ki az egesz console-t a szamokkal
    for (let number = 0; number <= 50; number ++) {
        if (number % 2 === 0) {
            arrayOfNumbers.push(number);
        }
    }
    console.log(arrayOfNumbers);
}
parosSzamok(); // Példa hívás


// 4. Feladat
console.log('\n4. Feladat');
function jatekDobas() {
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    console.log(`A dobott szám: ${randomNumber}`);
    randomNumber === 6 
        ? console.log('=> Szerencsés dobás') 
        : randomNumber > 3 
            ? console.log('=> Átlagos dobás') 
            : console.log('=> Szerencsétlen dobás');
}

jatekDobas() 


// 5. Feladat
console.log('\n5. Feladat');
function osszeadVagyKivon(number1, number2, operator) {
    operator === '+' ? console.log(`Eredmény: ${number1 + number2}`) : operator === '-' ? console.log(`Eredmény: ${number1 - number2}`) : console.log('Érvénytelen művelet');
}

osszeadVagyKivon(10, 5, '+'); // Példa hívás


// 6. Feladat
console.log('\n6. Feladat');
let osszeg = (arrayOfNumbers) => {
    let sum = 0;
    for (let i = 0; i < arrayOfNumbers.length; i++) {
        sum += arrayOfNumbers[i];
        return sum
    }
}
console.log(osszeg([10, 20, 33, 44, 55])); 


console.log('\n7. Feladat')
function biztonsagosOsszeadas(number1, number2) {
    try {
        if (typeof number1 !== 'number' || typeof number2 !== 'number') {
            throw new Error('Hibás bemenet!')
        }
        return sum = number1 + number2

    } catch (error) {
        console.log(error.message)
    }
}

console.log(`A két szám összege: ${biztonsagosOsszeadas(10, 40)}`);




console.log('\n8. Feladat');
function veletlenSorsolas() {
    let numbers = []
    for (let i = 0; i < 5; i++) {
    numbers.push(Math.floor(Math.random() * (101 - 10) ) + 10);
}
  console.log(`Az osszes szam a tombben: ${numbers}`);
  console.log(`A legnagyobb szam a tombben: ${Math.max(...numbers)}`);
  console.log("A paros szamok listaja:" + numbers.filter(num => num % 2 === 0));
}
veletlenSorsolas()
