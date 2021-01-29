"use strict";

function outputMassage(name, age) {
  /* name, age парметры функции*/
  console.log("Hello " + name);
  console.log("My age: " + age);
}
outputMassage("Vlad", 19); /*Vlad, 19 аргументы функции*/

let res = 0;

const sum = function (a, b) {
  res = a + b;
  console.log(a + b);
};

console.log(res);
sum(3, 5);
console.log(res);

// анонимные функции - после функции нет имени функции
const sum2 = function (a, b) {
  return a + b;
};

const sum3 = new Function("a", "b", "return a + b");

console.log(sum2);
console.log(sum3);

// именованная цункция - после функции есть имя функции

function sum4(a, b) {
  return a + b;
}

console.log(sum4);

const doNum = function (a, b, callback) {
  if (typeof a === "number" && typeof b === "number") {
    callback(a, b);
  }
};

doNum(5, 10, function (a, b) {
  console.log(a + b);
});

function mult(a, b) {
  console.log(a * b);
}

doNum(3, 5, mult);

// callback функции всегда передается в другую функцию и выполняется после той ф-ции

// function one(callback) {
//   console.log("Делаем запрос на сервер");
//   setTimeout(function () {
//     console.log("Получаем запрос от сервера");
//     callback();
//   }, 1000);
// }

// function two() {
//   console.log("Выводим на страницу");
// }

// one(two);

// Деторменированная ф-ция зависит только от входных данных
// чистая ф-ия деторменированная и без побочных эффектов! Она зависти только от входных данных

function foo(a, b) {
  const sum = a + b;
  return sum;
}

console.log(foo(2, 3));
console.log(foo(2, 3));
console.log(foo(1, 3));
console.log(foo(2, 3));
console.log(foo(2, 3));

// область видимости

let y = 10;

function one() {
  let y = 4;

  function two() {
    let y = 7;

    console.log(y);
  }
  two();
}

one();

// Замыкание
function funcMath(a) {
  return function (b) {
    console.log(a * b);
  };
}

const mathPow = funcMath(10);
mathPow(5);
console.dir(mathPow);
