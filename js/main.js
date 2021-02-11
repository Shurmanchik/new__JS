"use strict";

const start = document.querySelector("#start"),
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
  additionalExpensesItem = document.querySelector(".additional_expenses-item"),
  additionalIncomeItem = document.querySelectorAll(".additional_income-item"),
  expensesTitle = document.querySelector(".expenses-title"),
  targetAmount = document.querySelector(".target-amount"),
  periodSelect = document.querySelector(".period-select"),
  data = document.querySelector(".data"),
  cancel = document.querySelector("#cancel"),
  inputs = document.querySelectorAll("input"),
  periodAmount = document.querySelector(".period-amount");

const AppData = function () {
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
};
const appData = new AppData();
AppData.prototype.check = function () {
  if (salaryAmount.value === "") {
    start.setAttribute("disable", "");
    return;
  } else {
    start.removeAttribute("disable", "");
  }
  this.budget = +salaryAmount.value;
};

AppData.prototype.start = function () {
  if (salaryAmount.value === "") {
    start.setAttribute("disable", "");
    return;
  } else {
    start.removeAttribute("disable", "");
  }
  this.budget = +salaryAmount.value;

  console.log(salaryAmount.value);

  this.getExpenses();
  this.getIncome();
  this.getIncomeMonth();
  this.getExpensesMonth();
  this.getAddExpenses();
  this.getAddIncome();
  this.getBudget();
  this.getCancel();
  this.getReset();

  this.showResult();
};

AppData.prototype.showResult = function () {
  const _this = this;
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = Math.floor(this.budgetDay);
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(", ");
  additionalIncomeValue.value = this.addIncome.join(", ");
  targetMonthValue.value = Math.ceil(this.getTargetMonth());
  incomePeriodValue.value = this.calcPeriod();
  periodSelect.addEventListener("change", function () {
    incomePeriodValue.value = _this.calcPeriod();
  });
};
AppData.prototype.getReset = function () {
  start.style.display = "none";
  cancel.style.display = "block";
};
AppData.prototype.getCancel = function () {
  const textInput = document.querySelectorAll("input[type=text]");
  for (let i = 0; i < textInput.length; i++) {
    textInput[i].disabled = true;
  }
};
let expensesItems = document.querySelectorAll(".expenses-items");
AppData.prototype.addExpensesBlock = function () {
  const cloneExpensesItem = expensesItems[0].cloneNode(true);
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
  expensesItems = document.querySelectorAll(".expenses-items");
  if (expensesItems.length === 3) {
    expensesPlus.style.display = "none";
  }
};
AppData.prototype.getExpenses = function () {
  expensesItems.forEach((item) => {
    const itemExpenses = item.querySelector(".expenses-title").value;
    const cashExpenses = item.querySelector(".expenses-amount").value;
    if (itemExpenses !== "" && cashExpenses !== "") {
      this.expenses[itemExpenses] = cashExpenses;
    }
  });
};
let incomeItems = document.querySelectorAll(".income-items");
AppData.prototype.addIncomeBlock = function () {
  const cloneIncomeItem = incomeItems[0].cloneNode(true);
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
  incomeItems = document.querySelectorAll(".income-items");
  if (incomeItems.length === 3) {
    incomePlus.style.display = "none";
  }
};
AppData.prototype.getIncome = function () {
  incomeItems.forEach((item) => {
    const itemIncome = item.querySelector(".income-title").value;
    const cashIncome = item.querySelector(".income-amount").value;
    if (itemIncome !== "" && cashIncome !== "") {
      this.income[itemIncome] = cashIncome;
    }
  });
};
AppData.prototype.getAddExpenses = function () {
  const addExpenses = additionalExpensesItem.value.split(",");
  addExpenses.forEach((item) => {
    item = item.trim();
    if (item !== "") {
      this.addExpenses.push(item);
    }
  });
};
AppData.prototype.getAddIncome = function () {
  additionalIncomeItem.forEach((item) => {
    let itemValue = item.value.trim();
    if (itemValue !== "") {
      this.addIncome.push(itemValue);
    }
  });
};
AppData.prototype.getPeriodAmount = function () {
  const periodAmountItem = document.querySelector(".period-amount");
  periodSelect.addEventListener("change", function () {
    periodAmountItem.textContent = periodSelect.value;
  });
};
AppData.prototype.getExpensesMonth = function () {
  for (let key in this.expenses) {
    this.expensesMonth += +this.expenses[key];
  }
};
AppData.prototype.getIncomeMonth = function () {
  for (let key in this.income) {
    this.incomeMonth += +this.income[key];
  }
};
AppData.prototype.getBudget = function () {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = this.budgetMonth / 30;
};
AppData.prototype.getTargetMonth = function () {
  return targetAmount.value / this.budgetMonth;
};
AppData.prototype.getStatusIncome = function () {
  if (this.budgetDay > 800) {
    return "Высокий уровень дохода";
  } else if (this.budgetDay > 300 && this.budgetDay < 800) {
    return "Средний уровень дохода";
  } else if (this.budgetDay > 0 && this.budgetDay < 300) {
    return "Низкий уровень дохода";
  } else {
    return "Что то пошло не так";
  }
};
AppData.prototype.getInfoDeposit = function () {
  if (this.deposit) {
    do {
      this.percentDeposit = prompt("Какой годовой процент?", 10);
    } while (
      isNaN(this.percentDeposit) ||
      this.percentDeposit === "" ||
      this.percentDeposit === null
    );

    do {
      this.moneyDeposit = prompt("Какая сумма заложана?", 10000);
    } while (
      isNaN(this.moneyDeposit) ||
      this.moneyDeposit === "" ||
      this.moneyDeposit === null
    );
  }
};
AppData.prototype.calcPeriod = function () {
  return this.budgetMonth * periodSelect.value;
};
AppData.prototype.reset = function () {
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.expensesMonth = 0;
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  document.querySelectorAll(".data input[type=text]").forEach(function (item) {
    item.disabled = false;
  });
  document.querySelectorAll("input[type=text]").forEach(function (item) {
    item.value = "";
  });
  start.style.display = "block";
  cancel.style.display = "none";
};

AppData.prototype.eventListener = function () {
  start.addEventListener("click", this.start.bind(appData));
  incomePlus.addEventListener("click", this.addIncomeBlock);
  expensesPlus.addEventListener("click", this.addExpensesBlock);
  cancel.addEventListener("click", this.reset);
  this.getPeriodAmount();

  console.log(this);
};

appData.eventListener();
