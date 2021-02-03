"use strict";

let start = document.querySelector("#start"),
  btnPlus = document.getElementsByTagName("button"),
  incomePlus = btnPlus[0],
  expensesPlus = btnPlus[1],
  btnDepositCheck = document.querySelector("#deposit-check"),
  additionaliIncomeItem = document.querySelector(".additional_income-item"),
  budgetMonthValue = document.querySelector(".budget_month-value"),
  budgetDayValue = document.querySelector(".budget_day-value"),
  expensesMonthValue = document.querySelector(".expenses_month-value"),
  additionalIncomeValue = document.querySelector(".additional_income-value"),
  additionalExpensesValue = document.querySelector(
    ".additional_expenses-value"
  ),
  incomePeriodValue = document.querySelector(".income_period-value"),
  targetMonthValue = document.querySelector(".target_month-value"),
  salaryAmount = document.querySelector(".salary-amount"),
  incomeItems = document.querySelectorAll(".income-items"),
  additionalExpensesItem = document.querySelector(".additional_expenses-item"),
  additionalIncomeItem = document.querySelectorAll(".additional_income-item"),
  expensesTitle = document.querySelector(".expenses-title"),
  expensesItems = document.querySelectorAll(".expenses-items"),
  targetAmount = document.querySelector(".target-amount"),
  periodSelect = document.querySelector(".period-select"),
  data = document.querySelector(".data"),
  cancel = document.querySelector("#cancel");

let appData = {
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  getexpensesMonth: 0,
  start: function () {
    if (salaryAmount.value === "") {
      start.setAttribute("disable", "");
      return;
    } else {
      start.removeAttribute("disable", "");
    }
    appData.budget = +salaryAmount.value;

    console.log(salaryAmount.value);

    appData.getExpenses();
    appData.getIncome();
    appData.getIncomeMonth();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();
    appData.getCancel();
    appData.getReset();

    appData.showResult();
  },
  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = Math.floor(appData.budgetDay);
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(", ");
    additionalIncomeValue.value = appData.addIncome.join(", ");
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());

    periodSelect.addEventListener("input", function () {
      incomePeriodValue.value = appData.calcPeriod();
    });
  },
  getReset: function () {
    start.style.display = "none";
    cancel.style.display = "block";
  },
  getCancel: function () {
    let textInput = document.querySelectorAll("input[type=text]");
    for (let i = 0; i < textInput.length; i++) {
      textInput[i].disabled = true;
    }
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll(".expenses-items");
    if (expensesItems.length === 3) {
      expensesPlus.style.display = "none";
    }
  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector(".expenses-title").value;
      let cashExpenses = item.querySelector(".expenses-amount").value;
      if (itemExpenses !== "" && cashExpenses !== "") {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll(".income-items");
    if (incomeItems.length === 3) {
      incomePlus.style.display = "none";
    }
  },
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector(".income-title").value;
      let cashIncome = item.querySelector(".income-amount").value;
      if (itemIncome !== "" && cashIncome !== "") {
        appData.income[itemIncome] = cashIncome;
      }
    });
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(",");
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== "") {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function () {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== "") {
        appData.addIncome.push(itemValue);
      }
    });
  },
  getPeriodAmount: function () {
    let periodAmountItem = document.querySelector(".period-amount");
    periodSelect.addEventListener("input", function () {
      periodAmountItem.textContent = periodSelect.value;
    });
  },
  getExpensesMonth: function () {
    let sum = 0;
    for (let key in appData.expenses) {
      sum += +appData.expenses[key];
      appData.expensesMonth = sum;
    }
    return sum;
  },
  getIncomeMonth: function () {
    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },
  getBudget: function () {
    appData.budgetMonth =
      appData.budget + appData.incomeMonth - appData.getExpensesMonth();
    appData.budgetDay = appData.budgetMonth / 30;
  },
  getTargetMonth: function () {
    return targetAmount.value / appData.budgetMonth;
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
  calcPeriod: function () {
    return appData.budgetMonth * periodSelect.value;
  },
};
start.addEventListener("click", appData.start);

// console.log("Расходы за месяц: ", appData.getExpensesMonth());
// console.log("Доход: ", appData.budgetMonth);
// console.log(appData.getStatusIncome());

incomePlus.addEventListener("click", appData.addIncomeBlock);

expensesPlus.addEventListener("click", appData.addExpensesBlock);

appData.getPeriodAmount();

// if (appData.getTargetMonth() < 0) {
//   console.log("Цель не будет достигнута");
// } else {
//   console.log(
//     "цель будет достигнута через:",
//     Math.ceil(appData.getTargetMonth()) + " месяцев"
//   );
