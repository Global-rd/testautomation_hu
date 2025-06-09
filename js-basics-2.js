//1. feladat
function ellenorizEletkor(age){
    console.log(age >= 18 ? "Felnőtt" : "Kiskorú")
}

ellenorizEletkor(10);
ellenorizEletkor(18);
ellenorizEletkor(20);

//2. feladat
function napNev(dayNumbers) {
    const days = ["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat", "Vasárnap"];
    if (typeof dayNumbers === "number" && dayNumbers >= 1 && dayNumbers <= 7) {
        return days[dayNumbers - 1];
    } else {
        return "Érvénytelen nap";
    }
}

console.log(napNev(0));
console.log(napNev(1));
console.log(napNev(2));
console.log(napNev(3));
console.log(napNev(4));
console.log(napNev(5));
console.log(napNev(6));
console.log(napNev(7));
console.log(napNev(8));

//3. feladat
function parosSzamok(){
    for (let i = 1; i <= 50; i++) {
        if (i % 2 === 0) {
            console.log(i);
        }
    }
}

parosSzamok();

//4. feladat
function jatekDobas() {
    const roll = Math.floor(Math.random() * 6) + 1;
    console.log(`Dobás: ${roll}`);

    switch (roll) {
        case 6:
            console.log("Szerencsés dobás");
            break;
        case 5:
        case 4:
        case 3:
            console.log("Átlagos dobás");
            break;
        case 2:
        case 1:
            console.log("Gyenge dobás");
            break;
        default:
            console.log("Hibás dobás");
    }
}

jatekDobas();

//5. feladat
function osszeadVagyKivon(number1, number2, operation) {
    if (operation === "+") {
        return number1 + number2;
    } else if (operation === "-") {
        return number1 - number2;
    } else {
        return "Hibás művelet";
    }
}

console.log(osszeadVagyKivon(5, 3, "+"));
console.log(osszeadVagyKivon(10, 4, "-"));
console.log(osszeadVagyKivon(2, 2, "*"));

//6. feladat
let numbers = [1, 2, 3];

const osszeg = numbers => numbers.reduce((sum, element) => sum + element, 0);

console.log(`${osszeg(numbers)}`);

//7. feladat
function biztonsagosOsszeadas(a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
        throw new Error("Hibás bemenet");
    }
    return a + b;
}

try {
    const eredmeny = biztonsagosOsszeadas(5, 6);
    console.log("Összeg:", eredmeny);
} catch (error) {
    console.log("Hiba történt:", error.message);
}

try {
    const eredmeny = biztonsagosOsszeadas(5, "nem szám");
    console.log("Összeg:", eredmeny);
} catch (error) {
    console.log("Hiba történt:", error.message);
}

//8. feladat
function veletlenSorsolas() {
    const numbers = [];

    for (let i = 0; i < 5; i++) {
        const randomNumbers = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
        numbers.push(randomNumbers);
    }

    const max = Math.max(...numbers);

    const evenNumbers = numbers.filter(number => number % 2 === 0);

    console.log("Összes szám:", numbers);
    console.log("Legnagyobb szám:", max);
    console.log("Páros számok:", evenNumbers);
}

veletlenSorsolas();

//Bónusz
function szures(block, conditionFunction) {
    const result = [];

    for (let i = 0; i < block.length; i++) {
        if (conditionFunction(block[i], i, block)) {
            result.push(block[i]);
        }
    }

    return result;
}

const words = ["alma", "körte", "banán", "eper", "szilva", "cseresznye"];

const longWords = szures(words, word => word.length >= 5);

console.log(longWords);