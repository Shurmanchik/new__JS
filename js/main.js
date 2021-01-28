let money = 100000,
  income = "mcdonalds",
  addExpenses = "gas, Utilities, supermarket ",
  deposit = true,
  mission = 1000000,
  period = 10,
  budgetDay = money / 30;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(income.length);
console.log("period " + period + " months");
console.log("The goal is to make " + mission + " USD");

addExpenses = addExpenses.toLowerCase().split(", ");
console.log(addExpenses);
console.log(budgetDay);
console.log(money % 30);
