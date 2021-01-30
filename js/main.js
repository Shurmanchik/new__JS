"use strict";

let money,
  income = "mcdonalds",
  deposit = confirm("Есть ли у вас депозит в банке?"),
  mission = 1000000,
  period = 10;

const start = function () {
  do {
    money = prompt("Ваш месячный доход?", 100000);
  } while (isNaN(money) || money === "" || money === null);
};

start();

let showTypeOf = function (data) {
  console.log(data, typeof data);
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let expenses1, expenses2;

const getExpensesMonth = function () {
  let sum = 0,
    sumExpenses = 0;

  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      expenses1 = prompt("Введите обязательную статью расходов", "проститутки");
    }
    if (i === 1) {
      expenses2 = prompt(
        "Введите обязательную статью расходов",
        "туалетная бумага"
      );
    }

    do {
      sumExpenses = prompt("Во сколько это обойдется?", 5000);
    } while (isNaN(sumExpenses) || sumExpenses === "" || sumExpenses === null);

    sum += +sumExpenses;
  }

  return sum;
};

let expensesAmount = getExpensesMonth();

console.log("Расходы за месяц: " + expensesAmount + " рублей");

const getAccumulatedMonth = function () {
  return money - expensesAmount;
};
console.log("доход за месяц:", getAccumulatedMonth() + " рублей");

const getTargetMonth = function () {
  return mission / getAccumulatedMonth();
};

if (getTargetMonth() < 0) {
  console.log("Цель не будет достигнута");
}
else (getTargetMonth() > 0) {
  console.log(
    "цель будет достигнута через:",
    Math.ceil(getTargetMonth()) + " месяцев"
  );
}

let accumulatedMonth = getAccumulatedMonth;

let budgetDay = getAccumulatedMonth() / 30;

const getStatusIncome = function () {
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
