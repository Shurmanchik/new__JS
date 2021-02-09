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
  this.getexpensesMonth = 0;
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

  periodSelect.addEventListener("input", function () {
    incomePeriodValue.value = _this.calcPeriod();
  });
};
AppData.prototype.getReset = function () {
  start.style.display = "none";
  cancel.style.display = "block";
};
AppData.prototype.getCancel = function () {
  let textInput = document.querySelectorAll("input[type=text]");
  for (let i = 0; i < textInput.length; i++) {
    textInput[i].disabled = true;
  }
};
AppData.prototype.addExpensesBlock = function () {
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
  expensesItems = document.querySelectorAll(".expenses-items");
  if (expensesItems.length === 3) {
    expensesPlus.style.display = "none";
  }
};
AppData.prototype.getExpenses = function () {
  const _this = this;
  expensesItems.forEach(function (item) {
    let itemExpenses = item.querySelector(".expenses-title").value;
    let cashExpenses = item.querySelector(".expenses-amount").value;
    if (itemExpenses !== "" && cashExpenses !== "") {
      _this.expenses[itemExpenses] = cashExpenses;
    }
  });
};
AppData.prototype.addIncomeBlock = function () {
  let cloneIncomeItem = incomeItems[0].cloneNode(true);
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
  incomeItems = document.querySelectorAll(".income-items");
  if (incomeItems.length === 3) {
    incomePlus.style.display = "none";
  }
};
AppData.prototype.getIncome = function () {
  const _this = this;
  incomeItems.forEach(function (item) {
    let itemIncome = item.querySelector(".income-title").value;
    let cashIncome = item.querySelector(".income-amount").value;
    if (itemIncome !== "" && cashIncome !== "") {
      _this.income[itemIncome] = cashIncome;
    }
  });
};
AppData.prototype.getAddExpenses = function () {
  const _this = this;
  let addExpenses = additionalExpensesItem.value.split(",");
  addExpenses.forEach(function (item) {
    item = item.trim();
    if (item !== "") {
      _this.addExpenses.push(item);
    }
  });
};
AppData.prototype.getAddIncome = function () {
  const _this = this;
  additionalIncomeItem.forEach(function (item) {
    let itemValue = item.value.trim();
    if (itemValue !== "") {
      _this.addIncome.push(itemValue);
    }
  });
};
AppData.prototype.getPeriodAmount = function () {
  let periodAmountItem = document.querySelector(".period-amount");
  periodSelect.addEventListener("input", function () {
    periodAmountItem.textContent = periodSelect.value;
  });
};
AppData.prototype.getExpensesMonth = function () {
  const _this = this;
  let sum = 0;
  for (let key in _this.expenses) {
    sum += +_this.expenses[key];
    this.expensesMonth = sum;
  }
  return sum;
};
AppData.prototype.getIncomeMonth = function () {
  const _this = this;
  for (let key in _this.income) {
    _this.incomeMonth += +_this.income[key];
  }
};
AppData.prototype.getBudget = function () {
  this.budgetMonth = this.budget + this.incomeMonth - this.getExpensesMonth();
  this.budgetDay = this.budgetMonth / 30;
};
AppData.prototype.getTargetMonth = function () {
  return targetAmount.value / this.budgetMonth;
};
AppData.prototype.getStatusIncome = function () {
  const _this = this;
  if (_this.budgetDay > 800) {
    return "Высокий уровень дохода";
  } else if (_this.budgetDay > 300 && _this.budgetDay < 800) {
    return "Средний уровень дохода";
  } else if (_this.budgetDay > 0 && _this.budgetDay < 300) {
    return "Низкий уровень дохода";
  } else {
    return "Что то пошло не так";
  }
};
AppData.prototype.getInfoDeposit = function () {
  const _this = this;
  if (_this.deposit) {
    do {
      _this.percentDeposit = prompt("Какой годовой процент?", 10);
    } while (
      isNaN(_this.percentDeposit) ||
      _this.percentDeposit === "" ||
      _this.percentDeposit === null
    );

    do {
      _this.moneyDeposit = prompt("Какая сумма заложана?", 10000);
    } while (
      isNaN(_this.moneyDeposit) ||
      _this.moneyDeposit === "" ||
      _this.moneyDeposit === null
    );
  }
};
AppData.prototype.calcPeriod = function () {
  const _this = this;
  return _this.budgetMonth * periodSelect.value;
};
AppData.prototype.reset = function () {
  const _this = this;
  inputs.forEach(function (item) {
    item.removeAttribute("disabled");
    item.value = "";
    periodSelect.value = 1;
    periodAmount.textContent = 1;
    _this.delete();
    start.style.display = "block";
    cancel.style.display = "none";
  });
};
AppData.prototype.delete = function () {
  inputs = document.querySelectorAll("input");
  incomeItems = document.querySelectorAll(".income-items");
  expensesItems = document.querySelectorAll(".expenses-items");
  for (let i = 1; i < incomeItems.length; i++) {
    incomeItems[i].remove();
  }
  for (let i = 1; i < expensesItems.length; i++) {
    expensesItems[i].remove();
  }
};
AppData.prototype.eventListener = function () {
  const _this = this;

  start.addEventListener("click", _this.start.bind(_this));
  incomePlus.addEventListener("click", _this.addIncomeBlock);
  expensesPlus.addEventListener("click", _this.addExpensesBlock);
  cancel.addEventListener("click", _this.reset);
  _this.getPeriodAmount();

  console.log(_this);
};

appData.eventListener();
