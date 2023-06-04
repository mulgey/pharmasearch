// MAP FUNCTION STARTS
// Example One Starts
const pharmacists = ["Mustafa", "Arif", "Serhat"];
// First way
function upperCaseFunction(pharmaName) {
  return pharmaName.toUpperCase();
}

const bigPharmacists01 = pharmacists.map(upperCaseFunction);
// First way ends

// Second way
const bigPharmacists02 = pharmacists.map((arrayItems) =>
  arrayItems.toUpperCase()
);
// Second way ends

// Results of the ways
console.log(bigPharmacists01); // Expected: [ 'MUSTAFA', 'ARIF', 'SERHAT' ]
console.log(bigPharmacists02); // Expected: [ 'MUSTAFA', 'ARIF', 'SERHAT' ]
// Example One Ends

// Example Two Starts
const persons = [
  { firstname: "Şaban", lastname: "DOĞAN" },
  { firstname: "Ali Kemal", lastname: "YENGİNAR" },
  { firstname: "Nebi", lastname: "GEDİK" },
];

function getFullName(item) {
  return [item.firstname, item.lastname].join(" ");
}

console.log(persons.map(getFullName)); // Expected: [ 'Şaban DOĞAN', 'Ali Kemal YENGİNAR', 'Nebi GEDİK' ]
// Example Two Ends
// MAP FUNCTION ENDS

// FILTER FUNCTION STARTS
// Example ONE starts
const points = [25, 30, 35, 40, 45];
const goodResults = points.filter((value) => value > 35);

console.log(goodResults); // Expected: [ 40, 45 ]
// Example ONE ends

// Example TWO starts
const fruits = ["APPLE", "BANANA", "grapes", "mango", "orange"];

function selectFruits(meyveArray, aradigimOzellik) {
  return meyveArray.filter((arrayElement) =>
    arrayElement.toLowerCase().includes(aradigimOzellik.toLowerCase())
  );
}

const filtrelenmisMeyveler = selectFruits(fruits, "an");
console.log(filtrelenmisMeyveler); // Expected: [ 'BANANA', 'mango', 'orange' ]
// Example TWO ends
// FILTER FUNCTION ENDS

// REDUCE FUNCTION STARTS
// Example one starts
const numbersToBeTreated = [30, 50];
const ilkDeger = 20;
const sonDeger = numbersToBeTreated.reduce((a, b) => a + b, ilkDeger);
console.log(sonDeger); // Expected: 100
// Example one ends

// Example two starts
const numbers = [5, 10];
const newNumbers = numbers.reduce((a, b) => a + b);
console.log(newNumbers); // Expected: 15
// Example two ends

// Example three starts
const halfNumbers = [1.3, 3.7];
const newFullNumber = halfNumbers.reduce(
  (a, b) => Math.round(a) + Math.round(b)
);
console.log(newFullNumber); // Expected: 5
// Example three ends

// Example three starts
const halfNumbers02 = [7, 3.7];
const newFullNumber02 = halfNumbers02.reduce((a, b) => Math.round(a + b));
console.log(`It is ${newFullNumber02}`); // Expected: 11
// Example three ends
// REDUCE FUNCTION ENDS

// SORT FUNCTION STARTS
const toBeSorted = [1, 30, 4, 21, 100000];
const toBeSorted02 = [1, 30, 4, 21, 100000];

const nowItIsSorted = toBeSorted.sort((a, b) => a - b);
const nowItIsSorted02 = toBeSorted02.sort((a, b) => b - a);

console.log(`It sorted from the small one = ${nowItIsSorted}`);
console.log(`It sorted from the big one = ${nowItIsSorted02}`);
// SORT FUNCTION ENDS

// INCLUDES FUNCTION STARTS
let statement = "My best friend is KutyBoa";

let mevcutMu = statement.includes("KutyBoa");

let mevcutMu02 = statement.includes("KutyBoa", 22);

console.log(`KutyBoa is there? = ${mevcutMu}`); // expected: TRUE
console.log(`KutyBoa is there? = ${mevcutMu02}`); // expected: FALSE
// INCLUDES FUNCTION ENDS

// PROMISES STARTS
// Example one starts
let seasonFight = new Promise((resolve, reject) => {
  // Season finishes when any driver passes the threshold of 400 points
  let verstappen = 425;
  let hamilton = 300;
  if (verstappen > 400 || hamilton > 400) {
    resolve("Season is over, Verstappen has won the championship");
  } else {
    reject("Season is not over, Verstappen will won soon");
  }
});

seasonFight
  .then((mesaj) => {
    console.log("Şampiyonluk mesajı: " + mesaj); // Expected: Şampiyonluk mesajı: Season is over, Verstappen has won the championship
  })
  .catch((mesaj) => {
    console.log("Sezon devam ediyor mesajı: " + mesaj);
  });
// Example one ends

// Example two starts
const pharmacistsAreAway = false;
const pharmacistsAreJustWarehousing = false;

function pharmaImprovementPath() {
  return new Promise((resolve, reject) => {
    if (pharmacistsAreAway) {
      reject({
        isim: "Bizim tayfa",
        mesaj: "böyleyse olmaz bunlardan",
      });
    } else if (pharmacistsAreJustWarehousing) {
      reject({
        isim: "Şu eczacılar",
        mesaj: "çalışıyorlar ama fazlasına ihtiyacımız var",
      });
    } else {
      resolve({
        isim: "Ekip",
        mesaj: "harika, bu iş olacak sanırım!",
      });
    }
  });
}

pharmaImprovementPath()
  .then((içerik) => {
    console.log("Haberler iyi: " + içerik.isim + " " + içerik.mesaj);
  })
  .catch((içerik) => {
    console.log("Diyeceğim şu ki: " + içerik.isim + " " + içerik.mesaj);
  });
// Expected: Haberler iyi: Ekip harika, bu iş olacak sanırım! (false, false)
// Expected: Diyeceğim şu ki: Şu eczacılar çalışıyorlar ama fazlasına ihtiyacımız var (false, true)
// Expected: Diyeceğim şu ki: Bizim tayfa böyleyse olmaz bunlardan (true, any)

// Example two ends

// Example three starts
const prepareNewMedicine01 = new Promise((resolve, reject) => {
  resolve("Your first medicine was prepared!");
});

const prepareNewMedicine02 = new Promise((resolve, reject) => {
  resolve("Your second medicine was prepared!");
});

const prepareNewMedicine03 = new Promise((resolve, reject) => {
  resolve("Your third medicine was prepared!");
});

Promise.all([
  prepareNewMedicine01,
  prepareNewMedicine02,
  prepareNewMedicine03,
]).then((içerikler) => {
  console.log(içerikler);
  // Expected, result of an array: [ 'Your first medicine was prepared!', 'Your second medicine was prepared!', 'Your third medicine was prepared!']
});

Promise.race([
  prepareNewMedicine01,
  prepareNewMedicine02,
  prepareNewMedicine03,
]).then((içerik) => {
  console.log(içerik);
  // Expected, only the first one: Your first medicine was prepared!
});
// Example three ends
// PROMISES ENDS

// ASYNC AWAIT STARTS
function talepEt(meslek) {
  return new Promise((resolve, reject) => {
    console.log(`${meslek} muhattabı ile görüşme talebinde bulunuyoruz...`);
    if (meslek === "pharmacist") {
      resolve("Ooo eczacım hoşgeldin, görüşelim hemen!");
    } else {
      reject(
        `Üzgünüm sayın ${meslek} muhattabım, bir eczacı ile görüşmem var :D`
      );
    }
  });
}

function processRequest() {}
// ASYNC AWAIT ENDS
