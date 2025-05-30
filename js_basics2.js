
/**
 * Checks a person's age and logs whether they are an adult or a minor.
 *
 * @param {number} age - The age to check.
 * @returns {void} - This function logs directly to the console and does not return a value.
 */
function ellenorizEletkor(age){
    age >= 18 ? console.log('Felnőtt') : console.log('Kiskorú');
}

/**
 * Returns the name of the day of the week based on a numerical index.
 *
 * @param {number} dayIndex - The index of the day (1 for Monday, 7 for Sunday).
 * @returns {string} The name of the day in Hungarian, or "Érvénytelen nap" if the index is out of range.
 */
function napNev(dayIndex) {
    switch (dayIndex){
        case 1:
            return 'Hétfő';
        case 2:
            return 'Kedd';
        case 3:
            return 'Szerda';
        case 4:
            return 'Csütörtök';
        case 5:
            return 'Péntek';
        case 6:
            return 'Szombat';
        case 7:
            return 'Vasárnap';
        default:
            return 'Érvénytelen nap';

    }
}

/**
 * Logs all even numbers from 1 to 50 to the console.
 * This function does not take any parameters and does not return a value.
 *
 * @returns {void}
 */
function parosSzamok(){
    for (let i = 1; i <= 50; i++){
        if(i % 2 === 0) console.log(i);
    }
}

/**
 * Simulates a dice roll (generates a random number between 1 and 6)
 * and logs a message based on the result using a switch statement.
 *
 * @returns {void}
 */
function jatekDobasSwitch() {
    const randomNumber = Math.floor((Math.random() * 6) + 1);
    switch (randomNumber){
        case 6:
            console.log('Szerencsés dobás!');
            break;
        case 5:
        case 4:
        case 3:
            console.log('Átlagos dobás!');
            break;
        case 2:
        case 1:
            console.log('Gyenge dobás!');
            break;
    }
}

/**
 * Simulates a dice roll (generates a random number between 1 and 6)
 * and logs a message based on the result using if-else if statements.
 *
 * @returns {void}
 */
function jatekDobasIfElse() {
    const randomNumber = Math.floor((Math.random() * 6) + 1);

    if(randomNumber === 6){
        console.log('Szerencsés dobás!');
    } else if (randomNumber <= 5 && randomNumber >= 3){
        console.log('Átlagos dobás!');
    } else {
        console.log('Gyenge dobás!');
    }
}

/**
 * Performs either addition or subtraction on two numbers based on the operation type.
 *
 * @param {number} firstNumber - The first number.
 * @param {number} secondNumber - The second number.
 * @param {string} operation - The type of operation, either "+" or "-".
 * @returns {number} The result of the operation.
 * @throws {Error} If an unknown operation type is provided.
 */
function osszeadVagyKivon(firstNumber, secondNumber, operation) {
    if(operation === '+') return firstNumber + secondNumber;
    if(operation === '-') return firstNumber - secondNumber;
    throw Error("Ismeretlen művelet!");
}

/**
 * Calculates the sum of all elements in a given array.
 * This is an arrow function implementation.
 *
 * @param {number[]} arr - The array of numbers to sum.
 * @returns {number} The total sum of the array elements. Returns 0 for an empty array.
 */
const osszeg = (arr) => arr.reduce((total, current) => total + current, 0);

/**
 * Safely adds two numbers by handling potential errors if inputs are not numbers.
 * It calls the `osszeadas` function and catches any thrown errors, logging them to the console.
 *
 * @param {*} number1 - The first value to add.
 * @param {*} number2 - The second value to add.
 * @returns {number|undefined} The sum of the numbers if successful, otherwise `undefined` (as the error is logged).
 */
function biztonsagosOsszeadas(number1, number2) {
    try {
        return osszeadas(number1, number2);
    } catch (e){
        console.log(e);
    }
}

/**
 * Adds two numbers, throwing an error if either input is not a number.
 *
 * @param {*} number1 - The first value to add.
 * @param {*} number2 - The second value to add.
 * @returns {number} The sum of the two numbers.
 * @throws {Error} If either `number1` or `number2` is not a number, with the message "Hibás bemenet".
 */
function osszeadas(number1, number2) {
    if (typeof number1 !== 'number' || typeof number2 !== 'number') {
        throw new Error("Hibás bemenet");
    }

    return number1 + number2;
}

/**
 * Generates five random numbers between 10 and 100,
 * then logs them, the largest among them, and the list of even numbers.
 * This function uses `await` to ensure numbers are generated before processing.
 *
 * @returns {Promise<void>} A Promise that resolves when all logging is complete.
 */
async function veletlenSorsolas() {
    const randomNumbers = await getFiveRandomNumber()

    print(`Generált számok: ${randomNumbers.join(', ')}`);
    print(`Legnagyobb generált szám: ${Math.max(...randomNumbers)}`);
    print(`Páros számok: ${randomNumbers.filter(number => number % 2 === 0).join(', ')}`);
}

/**
 * A helper function to log a message to the console.
 * This function wraps `console.log`.
 *
 * @param {*} message - The message or value to be logged.
 * @returns {void}
 */
function print(message){
    console.log(message);
}

/**
 * Generates an array containing five random integers between 10 and 100 (inclusive).
 * This is a synchronous function.
 *
 * @returns {number[]} An array of five random numbers.
 */
function getFiveRandomNumber(){
    const randomNumbers = [];
    for (let i = 0; i < 5; i++){
        randomNumbers.push(Math.floor(Math.random() * 91) + 10);
    }
    return randomNumbers;
}

/**
 * Filters an array based on a provided predicate function.
 * This function acts as a custom implementation of the Array.prototype.filter() method.
 *
 * @param {Array<*>} array - The array to be filtered.
 * @param {function(*): boolean} predicate - A function that tests each element of the array.
 * It takes an element as an argument and returns true if the element
 * should be included in the new array, and false otherwise.
 * @returns {Array<*>} A new array containing only the elements for which the predicate function returned true.
 */
function szures(array, predicate) {
    return array.filter(item => predicate(item));
}