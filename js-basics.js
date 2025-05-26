//1. Típusok és változók
let a = 3; //number típusú változó deklarálása
let b = "cukorborsó"; //string típusú változó deklarálása
let c = true; //boolean típusú változó deklarálása

//változók és típusok kiírása konzolra
console.log("a:", a,"| type:", typeof a);
console.log("b:", b,"| type:", typeof b);
console.log("c:", c,"| type:", typeof c);

//2. Aritmetikai és logikai operátorok
//aritmetikai műveletek és kiírásuk konzolra
console.log(69+4);
console.log(69-4);
console.log(69*4);
console.log(69/4);

//boolean változók deklarálása -> ÁSZF és Adatvédelmi Tájékoztató elfogadása
let acceptASZF = true;
let acceptAVT = true;

//ha mindkettőt elfogadta, továbbléphet
if (acceptASZF && acceptAVT){
    console.log("Tovább léphet!");
} else {
    //ha valamelyik nem lett elfogadva, figyelmzetetés
    if (!acceptASZF){
    console.log("Általános Szerződési Feltétel elfogadása kötelező!");
    }
    if (!acceptAVT){
    console.log("Adatvédelmi Tájékoztató elfogadása kötelező!");
    }
}

//boolean változók deklarálása -> van-e készpénze/bankkártyája
let haveCash = false;
let haveBankcard = true;

//ha legalább az egyikkel rendelkezik, vásárolhat
if (haveCash || haveBankcard){
    console.log("Vásárolhat!");
} else {
    //amennyiben egyikkel sem rendelkezik, nem vásárolhat
    console.log("Nem vásárolhat!");
}

//3. String műveletek
let fullName = "Kiss Anna"; //teljes név deklarálása

let splitName = fullName.split(" "); //a teljes név szétválasztása szóköz alapján tömbbé
let firstName = splitName[0]; //a szétválasztott teljes név tömbjének első eleme lesz a vezetéknév
let secondName = splitName[1]; //a szétválasztott teljes név tömbjének második eleme lesz a keresztnév
let haveSpace = / /.test(fullName); //reguláris kifejezéssel ellenőrzés, hogy van-e szóköz a teljes névben

console.log(`Teljes név: ${fullName}`); //teljes név kiírása konzolra
console.log(`Vezetéknév: ${firstName}`); //vezetéknév kiírása konzolra
console.log(`Keresztnév: ${secondName}`); //keresztnév kiírása konzolra
console.log(`Tartalmaz szóközt? ${haveSpace ? "Igen" : "Nem"}`); //szóköz ellenőrzés kiírása konzolra

//4. Tömbkezelés
let numbers = [3, 5, 8, 2, 10]; //számokat tartalmazó tömb deklarálása

console.log(numbers); //tömb elemeinek kiírása konzolra

let evenNumbers = numbers.filter(num => num % 2 === 0); //páros számok kiszűrése a tömbből

console.log(evenNumbers); //páros számok kiírása konzolra

//5. Objektumkezelés
//objektum deklarálása
let user = {
    name: "Jedlicska Dániel",
    age: 33,
    email: "daniel.jedlicska@gmail.com"
};

//függvény létrehozása az objektum elemeinek feldolgozására és konzolra írására
function userInformation(obj) {
    console.log(`A(z) '${obj.name}' nevű felhasználó '${obj.age}' éves és az email címe: '${obj.email}'`);
};

userInformation(user); //függvény meghívása

//Bónusz
let bonusNumbers = [1, 24, 26, 42, 69, 111]; //függvényhez bemeneti tömb létrehozása

//az átlagot visszaadó függvény létrehozása
function average(bonusNumbers) {
    let sum = bonusNumbers.reduce((sum, value) => sum + value, 0); //a tömb elemeinek összeadása 0 értékről indulva
    return sum / bonusNumbers.length; //a kapott összeg elosztása a tömb elemszámával az átlag kiszámításához
};

console.log("Átlag:", average(bonusNumbers)); //a függvény által kapott érték kiírása konzolra

//az e-mail formátumot ellenőrző függvény létrehozása
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //RegEx állandó létrehozása e-mail formátumhoz: szöveg elejétől a végéig érvényes, (legalább 1 nem szóköz és nem @ karakter) + @ + (legalább 1 nem szóköz és nem @ karakter) + . + (legalább 1 nem szóköz és nem @ karakter)
    return emailRegex.test(email); //a létrehozott szabály alapján a megadott e-mail cím ellenőrzése 
}

console.log(validateEmail("valami@valami.hu")); //helyes e-mail validálásának kiírása konzolra
console.log(validateEmail("rossz email")); //helytelen e-mail validálásának kiírása konzolra