function atlag(tomb) {
    let osszeg = 0;
    for (let i = 0; i < tomb.length; i++) {
        osszeg += tomb[i];
    }
    return osszeg / tomb.length;
}       
// Tömb átlagának kiírása
console.log("Tömb átlag:", atlag([3, 5, 8, 2, 10]));



//Email cim ellenörzése regularis kifejezéssel
let email = "valamiQvalami.hu";
let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// Email ellenőrzés
if (emailRegex.test(email)) {
    console.log("Érvényes email cím:", email);
}else {
    console.log("Érvénytelen email cím:", email);
}   
//Email elleörzese regularis kifejezéssel
let email2 = "valami@valami.hu";
let emailRegex2 = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;   
// Email ellenőrzés
if (emailRegex2.test(email2)) {
    console.log("Érvényes email cím:", email2);
}else {
    console.log("Érvénytelen email cím:", email2);
}