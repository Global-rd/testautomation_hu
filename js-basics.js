const name = 'Kiss Anna';
const count = 2;
const isThisJs = true;
const numbers = [3, 5, 8, 2, 10];

const person = {
    name: 'Kiss Anna',
    age: 25,
    email: 'kiss.anna@ex.hu'
}

/**
 * Regex pattern to match email adress format
 * @type {RegExp}
 */
const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


/**
 * Regex pattern to match the expected user input from the calculator.
 * Makes sure we have 2 numbers and an operator separated by space.
 * @type {RegExp}
 */
const calculatorInputRegexPattern = /^\d+\s[+\-*/]\s\d+$/;


/**
 * Simple string regex pattern
 * @type {RegExp}
 */
const stringRegexPattern = /\s/;

const readline = require('readline');

/**
 * Creates an input/output interface to read user input.
 * @type {Interface}
 */
const lineReader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Asks a question to the user and returns their answer.
 * @param {string} question - The question to ask the user.
 * @returns {Promise<string>} A promise that resolves with the user's answer.
 */
const askQuestion = (question) => {
    return new Promise((resolve) => {
        lineReader.question(question, (answer) => {
            resolve(answer);
        });
    });
};

/**
 * Prints the value and type of the global variables `name`, `count`, and `isThisJs`.
 */
function printAll() {
    console.log(`${name} - type ${typeof name}`);
    console.log(`${count} - type ${typeof count}`);
    console.log(`${isThisJs} - type ${typeof isThisJs}`);
}

/**
 * Splits the `name` global variable into given name and family name if it contains a space,
 * then prints them to the console.
 */
function splitName() {
    if(stringRegexPattern.test(name)){
        const userName = name.split(" ");
        const givenName = userName[1];
        const familyName = userName[0];
        console.log(`Keresztnév: ${givenName}`);
        console.log(`Vezetéknév: ${familyName}`);
    }
}

/**
 * Prints each number from the global `numbers` array to the console.
 */
function printNumbers() {
    numbers.forEach(number => console.log(number));
}

/**
 * Filters the global `numbers` array for even numbers and prints them to the console.
 */
function printEvenNumbers() {
    numbers.filter(n => n % 2 === 0).forEach(n => console.log(n));
}

/**
 * Calculates and prints the average of a given array of numbers.
 * @param {number[]} numbers - An array of numbers.
 */
function printAverage(numbers) {
    console.log((numbers.reduce((a, b) => a + b, 0)) / numbers.length);
}

/**
 * Prints information about a person, including their name, age, and email address,
 * and validates the format of their email address.
 * @param {object} person - An object containing person's details.
 * @param {string} person.name - The name of the person.
 * @param {number} person.age - The age of the person.
 * @param {string} person.email - The email address of the person.
 */
function printPerson(person) {
    console.log(`Email cím formátuma ${emailRegexPattern.test(person.email) ? 'helyes' : 'helytelen'}!`);
    console.log(`A(z) ${person.name} nevű felhasználó ${person.age} éves és az email címe: ${person.email}"`);
}

/**
 * Initiates the calculator by prompting the user for a calculation input.
 * It then calls `parseAndCount` to process the input.
 */
function startCalculator() {
    askQuestion("Please type your calculation using +, -, * and / operators and spaces between numbers and operations. Ex.: 22 * 33!")
        .then(input => parseAndCount(input));
}

/**
 * Parses a calculator input string, performs the calculation, and prints the result.
 * If the input format is incorrect or division by zero occurs, it prompts the user to try again.
 * @param {string} input - The input string containing the calculation (e.g., "22 * 33").
 */
function parseAndCount(input) {
    input = input.trim();
    if(!calculatorInputRegexPattern.test(input)) {
        console.log("Your request contains no spaces or no operators, please try again!");
        return startCalculator();
    }

    const userInput = input.split(" ");
    const number1 = parseInt(userInput[0].trim());
    const operator = userInput[1].trim();
    const number2 = parseInt(userInput[2].trim());

    switch (operator){
        case "+":
            console.log(number1 + number2);
            lineReader.close();
            break;
        case "-":
            console.log(number1 - number2);
            lineReader.close();
            break;
        case "*":
            console.log(number1 * number2);
            lineReader.close();
            break;
        case "/":
            if(number2 === 0) {
                console.log("Cannot divide by zero, please try again!");
                lineReader.close();
                return startCalculator();
            }
            console.log(number1 / number2);
            lineReader.close();
            break;
        default:
            console.log("Unknown operator, please try again!");
            lineReader.close();
            return startCalculator();
    }
}


printAll();
splitName();
printNumbers();
printEvenNumbers();
printPerson(person);
printAverage(numbers);
startCalculator();

