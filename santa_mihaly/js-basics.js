//1.
var str = "Hello World"
var num = 11
var bool = true

console.log(str)
console.log(typeof(str))
console.log(num)
console.log(typeof(num))
console.log(bool)
console.log(typeof(bool))

//2.
var num1 = 4
var num2 = 2
console.log(num1 + num2)
console.log(num1 - num2)
console.log(num1 * num2)
console.log(num1 / num2)

var b1 = true
var b2 = false
console.log(b1 && b2)
console.log(b1 || b2)
console.log(!b2)

//3.
var name = "Kiss Anna"
console.log("First name: " + name.split(' ')[1])
console.log("Surname: " + name.split(' ')[0])
console.log(name.search(/ /i) >= 0)

//4.
var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
arr.map(x => console.log(x))
arr.map(x => {(x % 2 === 0) && console.log(x)});

//5.
let user = {
	name: "John",
	age: "30",
	email: "example@example.com"
}

function getData(user) {
	console.log("A(z) " + user.name +
	" nevű felhasználó " + user.age +
	" éves és az email címe: " + user.email)
}

console.log(getData(user))

//Extra
var arr2 = [2, 4, 6, 8, 10]
function getAverage(arr){
	let sum = 0
	for (let i = 0; i < arr.length; i++) {
		sum += arr[i]
	}
	return sum / arr.length
}
console.log(getAverage(arr2))


