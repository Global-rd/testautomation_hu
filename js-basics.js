1.) 
  //3 változó különböző primitív típussal és a typeof eredménye
  let num = 12;
  let word = "A cat is in the haus."; 
  let x = true;

  console.log(num, typeof num); // number
  console.log(word, typeof word); // string
  console.log(x, typeof x); // boolean

2.)
  //Matematikai müveletek tetszöleges számokkal
  let x = 4;
  let y = 5;
  let a = x + y;
  let b = x - y;
  let c = x * y;
  let d = x / y;

   //Logikai müveletek
   let f = true,
   let g = false;
   console.log(f && g); // false
   console.log(f || g); // true
   console.log(!f); // false 
   console.log(!(f && g)); // true

3.)
    //Az adott név megvizsgálása reguláris kifejezéssel, hogy  tartalmaz-e szóközt
    let firstName = "Anna";
    let lastName = "Kiss";  
    let fullName =  firstName + " " + lastName;
    console.log(fullName);
    let space= /\s/.test(fullName);
    console.log(space); // true

4.)  
    //Tömb
    let numbers = [3, 5, 8, 2, 10];  
    for (i = 0; i < numbers.length; i++) {
        console.log(numbers[i]);          //A tömb elemeinek kiíratása
    }

    for (i = 0; i < numbers.length; i++) {
        if(numbers [i] % 2 === 0) {
            console.log(numbers[i]);      //A tömb páros elemeinek kiíratása


5.) 
    //Objektum létrehozása egy User reprezentálására
    let user = {
        name: "Anna Kiss",
        age: 25,
        email: "annakiss@example.com",
    }

    function outputUser(user) {
        console.log("A(z) " + user.name + " nevü felhasználó " + user.age + " éves és az email címe: " + user.email + "."); 
    }

6.)
    //Az atlagSzamitas függvény bemenetként kap egy tömböt és visszaadja annak az átlagát.
    function atlagSzamitas(numbers) {
      let summe = 0;
      let atlag = 0;
      for (let i = 0; i < numbers.length; i++) {
          summe = summe + numbers[i];
          atlag = summe / numbers.length;
        
      }
      console.log("Az átlag: " + atlag);
    }
          
    atlagSzamitas([1,2,3]); //Az átlag: 2


7.)
    //Email cím ellenőrzése regex-szel
    function emailEllenorzes(email) {
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let valasz = regex.test(email);
    console.log(valasz); // true, ha érvényes az email cím, false, ha nem
    }
          
