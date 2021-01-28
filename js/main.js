let num = 266219;

num = num.toString();
num = num.split("");
let result = num.reduce(function (a, b) {
  return a * b;
});
console.log(result);

num = result ** 3;
console.log(num.toString().substr(0, 2));
