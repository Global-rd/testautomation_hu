console.log('Task 1');
function ellenorizEletkor(age) {
    if (age >=0 && age < 18) {
        console.log("Kiskorú");
    } else if (age > 17) {
        console.log("Felnőtt");
    } else {
        console.log("A kor nem értelmezhető");
    }
}

ellenorizEletkor(Math.floor(Math.random() * 50));


console.log('\nTask 2');
function napNev(day) {
    switch (day) {
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
            break;
    }
}

napNev(Math.floor(Math.random() * 7) + 1);


console.log('\nTask 3');
function parosSzamok() {
    let evenNumbers = []
    for (let i = 1; i <= 50; i++) {
        if (i % 2 === 0) {
            evenNumbers.push(i);
        }
    }
    console.log(evenNumbers);
}

parosSzamok();


console.log('\nTask 4');
function jatekDobas() {
    let randomNum = Math.floor(Math.random() * 6) + 1
    if (randomNum === 6) {
        console.log("Szerencsés dobás");
    } else if (randomNum >= 3 && randomNum <= 5) {
        console.log("Átlagos dobás");
    } else if (randomNum === 1 || randomNum === 2) {
        console.log("Gyenge dobás");
    }
}

jatekDobas();


console.log('\nTask 5');
function osszeadVagyKivon(num1, num2, operator) {
    if (operator === '-') {
        return num1 - num2;
    } else if (operator === '+') {
        return num1 + num2;
    } else {
        console.log("Nem kezelt operátor");
    }
}

let randomNum1 = Math.floor(Math.random() * 10000)
let randomNum2 = Math.floor(Math.random() * 10000)
let tempRand = Math.floor(Math.random() * 2)
let randomOperator = ''
switch (tempRand) {
    case 0:
        randomOperator = '+'
        break;
    case 1:
        randomOperator = '-'
        break;
}

let result = osszeadVagyKivon(randomNum1,randomNum2,randomOperator);
if (result !== undefined) {
    console.log(result);
}


console.log('\nTask 6');
let osszeg = (numbers) => {
    let sum = 0
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    return sum;
}

let sum = osszeg([221,53,543,45,121]);
console.log(sum);


console.log('\nTask 7');
function biztonsagosOsszeadas(num1, num2) {
    try {
        if (typeof num1 !== 'number' || typeof num2 !== 'number') {
            throw new Error("Hibás bemenet");
        }
        return num1 + num2;
    } catch (error) {
        console.log(error.message);
    }
}

let randomNum3 = Math.floor(Math.random() * 10000)
let randomNum4 = Math.floor(Math.random() * 10000)
randomNum4 = (randomNum4 > 9000) ? "string" : randomNum4;

let sum7 = biztonsagosOsszeadas(randomNum3,randomNum4);
if (sum7 !== undefined) {
    console.log(sum7);
}


console.log('\nTask 8');
function veletlenSorsolas() {
    let randomNumbers = [];
    for (let i = 0; i < 5; i++) {
        randomNumbers.push(Math.floor(Math.random() * 91) + 10);
    }
    console.log(randomNumbers);
    console.log(Math.max(...randomNumbers));
    console.log(randomNumbers.filter(num => num % 2 === 0));
}

veletlenSorsolas();


console.log('\nBonus');
