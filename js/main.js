"use strict";

let money = +prompt("Ваш месячный доход?", 100000),
  income = "mcdonalds",
  addExpenses = prompt(
    "Перечислите возможные расходы за рассчитываемый период через запятую"
  ),
  deposit = confirm("Есть ли у вас депозит в банке?"),
  mission = 1000000,
  period = 10;

let showTypeOf = function (data) {
  console.log(data, typeof data);
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log("период: " + period + " месяцев");
console.log("Цель заработать " + mission + " руб");

addExpenses = addExpenses.toLowerCase().split(", ");
console.log(addExpenses);
console.log(money % 30);

let oblExpenses = prompt("Какие обязательные ежемесячные расходы у вас есть?"),
  costExpenses = +prompt("Во сколько это обойдется?"),
  oblExpenses2 = prompt("Какие обязательные ежемесячные расходы у вас есть?"),
  costExpenses2 = +prompt("Во сколько это обойдется?"),
  budgetMonth = money - costExpenses - costExpenses2,
  budgetDay = budgetMonth / 30;

console.log("доход за месяц:", budgetMonth + " рублей");
console.log(
  "цель будет достигнута через:",
  Math.ceil(mission / budgetMonth) + " месяцев"
);
console.log("бюджет на день:", Math.floor(budgetDay) + " рублей");

let getStatusIncome = function () {
  if (budgetDay > 800) {
    return "Высокий уровень дохода";
  } else if (budgetDay > 300 && budgetDay < 800) {
    return "Средний уровень дохода";
  } else if (budgetDay > 0 && budgetDay < 300) {
    return "Низкий уровень дохода";
  } else if (budgetDay < 0) {
    return "Что то пошло не так";
  }
};

console.log(getStatusIncome());
