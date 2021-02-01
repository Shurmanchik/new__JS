"use strict";
let money,
  start = function () {
    do {
      money = prompt("Ваш месячный доход?", 100000);
    } while (isNaN(money) || money === "" || money === null);
  };

start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 1000000,
  period: 9,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {
    if (confirm("Есть ли у вас дополнительный заработок?")) {
      let itemIncome, cashIncome;
      do {
        itemIncome = prompt("Какой у вас дополнительный доход?", "Таксую");
      } while (!isNaN(itemIncome) || itemIncome === "" || itemIncome === null);
      do {
        cashIncome = prompt("Сколько в месяц вы на этом зарабатываете?", 15000);
      } while (isNaN(cashIncome) || cashIncome === "" || cashIncome === null);
      appData.income[itemIncome] = cashIncome;
    }

    let addExpenses = prompt(
      "перечислете возможные расходы через запятую",
      "трусы, чай, тампоны"
    );
    appData.addExpenses = addExpenses.toLowerCase().split(", ");
    appData.deposit = confirm("Есть ли у вас депозит в банке?");
    let expenses, sumExpenses;

    for (let i = 0; i < 2; i++) {
      do {
        if (i === 0) {
          expenses = prompt(
            "Введите обязательную статью расходов",
            "проститутки"
          );
        }
        if (i === 1) {
          expenses = prompt(
            "Введите обязательную статью расходов",
            "туалетная бумага"
          );
        }
      } while (!isNaN(expenses) || expenses === "" || expenses === null);

      do {
        sumExpenses = prompt("Во сколько это обойдется?", 5000);
      } while (
        isNaN(sumExpenses) ||
        sumExpenses === "" ||
        sumExpenses === null
      );

      appData.expenses[expenses] = sumExpenses;
    }
  },
  getExpensesMonth: function () {
    let sum = 0;
    for (let key in appData.expenses) {
      sum += +appData.expenses[key];
    }
    return sum;
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.getExpensesMonth();
    appData.budgetDay = appData.budgetMonth / 30;
  },
  getTargetMonth: function () {
    return appData.mission / appData.budgetMonth;
  },
  getStatusIncome: function () {
    if (appData.budgetDay > 800) {
      return "Высокий уровень дохода";
    } else if (appData.budgetDay > 300 && appData.budgetDay < 800) {
      return "Средний уровень дохода";
    } else if (appData.budgetDay > 0 && appData.budgetDay < 300) {
      return "Низкий уровень дохода";
    } else {
      return "Что то пошло не так";
    }
  },
  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt("Какой годовой процент?", 10);
      } while (
        isNaN(appData.percentDeposit) ||
        appData.percentDeposit === "" ||
        appData.percentDeposit === null
      );

      do {
        appData.moneyDeposit = prompt("Какая сумма заложана?", 10000);
      } while (
        isNaN(appData.moneyDeposit) ||
        appData.moneyDeposit === "" ||
        appData.moneyDeposit === null
      );
    }
  },
  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
  },
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
appData.getInfoDeposit();

console.log("Расходы за месяц: ", appData.getExpensesMonth());
console.log("Доход: ", appData.budgetMonth);
console.log(appData.getStatusIncome());

if (appData.getTargetMonth() < 0) {
  console.log("Цель не будет достигнута");
} else {
  console.log(
    "цель будет достигнута через:",
    Math.ceil(appData.getTargetMonth()) + " месяцев"
  );
}

appData.addExpenses.forEach(function (item, i, arr) {
  arr[i] = item[0].toUpperCase() + item.slice(1);
});
console.log(appData.addExpenses);

// for (let key in appData) {
//   console.log(
//     "Наша программа включает в себя данные: " + key + ": " + appData[key]
//   );
// }
