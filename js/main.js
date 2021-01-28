let money = 100000,
  income = "mcdonalds",
  addExpenses = "gas, Utilities, supermarket ",
  deposit = true,
  mission = 1000000,
  period = 10,
  budgetDay = money / 30;

console.log(income.length);
console.log("period " + period + " months");
console.log("The goal is to make " + mission + " USD");

addExpenses = addExpenses.toLowerCase().split(", ");
console.log(addExpenses);
console.log(money % 30);

money = +prompt("Ваш месячный доход?");
addExpenses = prompt(
  "Перечислите возможные расходы за рассчитываемый период через запятую"
);
deposit = confirm("Есть ли у вас депозит в банке?");

let oblExpenses = prompt("Какие обязательные ежемесячные расходы у вас есть?"),
  costExpenses = +prompt("Во сколько это обойдется?"),
  oblExpenses2 = prompt("Какие обязательные ежемесячные расходы у вас есть?"),
  costExpenses2 = +prompt("Во сколько это обойдется?"),
  budgetMonth = money - costExpenses - costExpenses2;
budgetDay = budgetMonth / 30;

console.log(addExpenses.split(", "));
console.log(deposit);
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log("доход за месяц:", budgetMonth);
console.log("цель будет достигнута через:", Math.ceil(mission / budgetMonth));
console.log("бюджет на день:", Math.floor(budgetDay));

if (budgetDay > 800) {
  console.log("Высокий уровень дохода");
} else if (budgetDay > 300 && budgetDay < 800) {
  console.log("Средний уровень дохода");
} else if (budgetDay > 0 && budgetDay < 300) {
  console.log("Низкий уровень дохода");
} else if (budgetDay < 0) {
  console.log("Что то пошло не так");
}
