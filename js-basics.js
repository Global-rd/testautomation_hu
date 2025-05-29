// A kód a házifeladat részeit blokkokba szervezve vannak megoldva, ahol minden
// blokk egy feladat megoldását tartalmazza.

{
  console.log('1. Típusok és változók');

  // A változók típusai az inicializációból, illetve pillanatyni értékéből nyeri:
  let s = "potato"; // String típusú. Lehet '' között is; később használom is ezt.
  let n = 42;       // Number típusú.
  let b = true;     // Boolean típusú

  // Az értékét és típusát ki is írom, a console.log argumentum listájával biztosítva a tagolást.
  console.log("s:", s, ":", typeof s);
  console.log("n:", n, ":", typeof n);
  console.log("b:", b, ":", typeof b);
}

console.log();

{
  console.log('2. Aritmetikai és logikai operátorok');

  // Definiálok két tetszőleges számot.
  // Ugyan a feladat nem határozta meg, hogy hogyan nyerem ezeket a számokat,
  // illetve hogy azok mindenhol ugyanazoknak kell-e lennie, de ennek ellenére
  // én változókban rögzítettem két tetszőleges számot.
  let a = 8;
  let b = 16;
  console.log('Két szám:', a, b);

  // A számolásnak csak akkor van értelme, ha csinálok valamit az értékükkel,
  // így azt kiírom a konzolra.
  console.log('Összeg:', a + b);
  console.log('Különbség:', a - b);
  console.log('Szorzat:', a * b);
  console.log('Hányados:', a / b);

  console.log('---');

  // Létrehozok két logikai értéket.
  let l1 = true;
  let l2 = false;

  // A két logikai értéken végrehajtom a logikai és, vagy és negáció operátorokat.
  console.log('Logikai és:', l1 && l2);
  console.log('Logikai vagy:', l1 || l2);
  console.log('Logikai negáció:', !l1, !l2);
}

console.log();

{
  console.log('3. String műveletek');

  // Teljes név változó
  let full_name = "Gipsz Jakab";
  console.log('Teljes név:', full_name);

  // Szétválasztom a nevet vezetéknév és keresztnévre,
  // a string, a szóköz mentén való szétdarabolásával.
  console.log('Teljes név, széttagolva:', full_name.split(' '));
  // Reguláris kifejezés segítségével, megkeresem, hogy van-e a teljes névben
  // szóköz karakter.
  console.log('Teljes név tartalmaz szóközt:', / /.test(full_name))
}

console.log();

{
  console.log('4. Tömbkezelés');

  // Egy tömb, néhány számból; némi túlzással.
  let arr = [ 16, 22, 43, 34, 55, 60, 17, 28, 39, 10 ];

  // Ez a ciklus, egy `i` indexelő változó segítségével
  // végig lépked a tömb össtes ekemén.
  // `i` kezdeti értéke 0, és nem léphet túl az utolsó indexen (i < arr.lenght).
  // Az `i` indexelőt egyesével növelem minden iteráció után, a `++i` operátorral.
  for (let i = 0; i < arr.length; ++i)
  {
    console.log((i + 1) + ". elem:", arr[i]);
  }

  console.log('Ezekből páros:');
  // Leszűröm páros számokra az `arr` tömböt,
  // és elmentem az `f_arr` (filtered array) tömbbe.
  let f_arr = arr.filter(item => item % 2 == 0);
  // A ciklus ugyanaz mint fent, csak nem az `arr` tömbbel, hanem az `f_arr` tömbbel.
  for (let i = 0; i < f_arr.length; ++i)
  {
    console.log("\t", f_arr[i]);
  }
}

console.log();

{
  console.log('5. Objektumkezelés');

  // Létrehozom a user objektumot névvel, életkorral és e-maillel.
  let user = {
    name: 'Gipsz Jakab',
    age: 37,
    email: 'gipsz.jakab@example.com'
  };
  // Meghífom az alább definiált függvényt a `user` objektumon.
  log_user(user);

  // A lenti függvény kiírja szövegesen, elmagyarázva az objektum tartalmát:
  function log_user(user) {
    // Lehetne tesztelő feltételeket bevezetni itt, hogy megvizsgálja,
    // hogy a `user` objektum definiál-e `name`, `age` és `email` kulcsokat,
    // egyéb esetben meg kivételt dobjon.
    console.log(`A ‘${user.name}’ nevű felhasználó ‘${user.age}’ éves, és az email címe: ‘${user.email}’.`);
  }
}

console.log();

{
  console.log('Bónusz feladat');

  let arr = [ 16, 22, 43, 34, 55, 60, 17, 28, 39, 10 ];

  console.log('Átlag:', average(arr));

  function average(arr) {
    // Az átlag, az elemeknek az összege, osztva az elemek számával:
    return arr.reduce((p_val, c_val) => p_val + c_val) / arr.length;
  }

  // Reguláris kifejezés az e-mail cím ellenőrzésére.
  // Korábban már néztem a specifikációt az email címre, de pontosan erre
  // nem emlékszem, emiatt biztosan lehet javítani ezen a reguláris kifejezésen.
  //  
  // Arra viszont emlékszem, hogy a TLD (.com, .net, stb) feltétele az, hogy
  // - csak ASCII betűkből állhat,
  // - és legalb 2 betűből kell álnia, amiből a 2 betűs kódok országkódok. (igen, az .io is)
  let email_check = /^[-_.a-zA-Z0-9]+@[-_.a-zA-Z0-9]+\.[a-zA-Z]{2,}$/
  // Adok két tesztet erre, a feladatban megadott példa mellett:
  console.log('A ‘valami@valami.hu’ egy helyes e-mail:', email_check.test('valami@valami.hu'));
  console.log('A ‘post@example.com’ egy helyes e-mail:', email_check.test('post@example.com'));
  console.log('A ‘banános nudli@kerekesszék.1’ egy helyes e-mail:', email_check.test('banános nudli@kerekesszék.1'));
}