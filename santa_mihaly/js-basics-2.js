//1.
function ellenorizEletkor(eletkor) {
	if (eletkor < 18){
		return "Kiskorú";
	} else {
		return "Felnőtt";
	}
}

//2.
function napNev(num) {
	switch(num) {
		case 1:
			return "Hétfő";
		case 2:
			return "Kedd";
		case 3:
			return "Szerda";
		case 4:
			return "Csütörtök";
		case 5:
			return "Péntek";
		case 6:
			return "Szombat";
		case 7:
			return "Vasárnap";
	default:
		return "Érvénytelen nap";
	}
}

//3.
function parosSzamok() {
	for(var i=1; i<51; i++) {
		if (i % 2 == 0) {
			console.log(i);
		}
	}
}

//4.
function jatekDobas() {
	num = Math.floor(Math.random() * (7 - 1) ) + 1;
	if (num == 6) {
		return "Szerencsés dobás";
	} else if(num > 2) {
		return "Átlagos dobás";
	} else {
		return "Gyenge dobás";
	}
}

//5.
function osszeadVagyKivon(num1, num2, operator) {
	return eval(num1 + operator + num2);
}

//6.
let sum_final = (arr) => {
	let sum = 0;
	for (let i = 0; i < arr.length; i++) {
		sum += arr[i];
	}
	return sum;
};

//7.
function biztonsagosOsszeadas(num1, num2) {
	try {
		if(typeof(num1) !== 'number') throw "is not a number";
		if(typeof(num2) !== 'number') throw "is not a number";
		return num1 + num2;
	}
	catch(err) {
		return "Hibás bemenet!";
	}
}

//8.
function veletlenSorsolas() {
	//generate 5 random numbers between 10 and 100
	arr = []
	for(let i = 0; i < 5; i++) {
		arr[i] = Math.floor(Math.random() * (101 - 10) ) + 10;
	}
	
	for (a in arr) {
		console.log(arr[a]);
	}
	//max
	let max = arr[0];
	for(let i = 1; i < arr.length; i++) {
		if(arr[i] > max) {
			max = arr[i];
		}
	}
	console.log("A legnagyobb szám a tömbben: " + max);
	even_arr = []
	
	//even numbers
	let j = 0;
	for(let i = 0; i < arr.length; i++) {
		if(arr[i] % 2 === 0) {
			even_arr[j] = arr[i];
			j++;
		}
	}
	for (ea in even_arr) {
		console.log(even_arr[ea]);
	}
}