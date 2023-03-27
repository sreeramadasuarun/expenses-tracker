//elements//
const totalbalanceEl = document.getElementById("balance");
const listEl = document.getElementById("list");
const formEl = document.getElementById("form");
const descriptionEl = document.getElementById("text");
const moneyEl = document.getElementById("amount");
const PlusEl = document.getElementById("money-plus");
const MinusEl = document.getElementById("money-minus");

//generateID//
function generaterandomID() {
  return Date.now();
}

//local storage//
const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);
let transactions =
  localStorageTransactions !== null ? localStorageTransactions : [];
function updateLocaleStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

//onsubmit//
formEl.addEventListener("submit", function (e) {
  e.preventDefault();

  if (descriptionEl.value.trim() === "" || moneyEl.value.trim() === "") {
    alert("please fill the blanks");
  } else {
    const transaction = {
      id: generaterandomID(),
      descriptionEl: descriptionEl.value,
      moneyEl: +moneyEl.value,
    };
    transactions.push(transaction);
    transactionList(transaction);
    updateBalanceAmount();
    updateLocaleStorage();
    descriptionEl.value = "";
    moneyEl.value = "";
  }
});

//trans-List display//
function transactionList(transaction) {
  const sign = transaction.moneyEl < 0 ? "-" : "+";
  const itemEl = document.createElement("li");
  itemEl.classList.add(sign === "+" ? "plus" : "minus");
  itemEl.innerHTML = `
          ${transaction.descriptionEl} <span>${sign}${Math.abs(
    transaction.moneyEl
  )}</span
          ><button class="delete-btn" onclick="removeTransaction(${
            transaction.id
          })"><i class="fa fa-times"></i></button>
    `;
  listEl.appendChild(itemEl);
}

//amount update//
function updateBalanceAmount() {
  const amounts = transactions.map((transaction) => transaction.moneyEl);
  const total = amounts.reduce((acc, value) => (acc += value), 0).toFixed(2);

  //income and expense//
  const income = amounts
    .filter((value) => value > 0)
    .reduce((acc, value) => (acc += value), 0)
    .toFixed(2);

  const expense = (
    amounts
      .filter((value) => value < 0)
      .reduce((acc, value) => (acc += value), 0) * -1
  ).toFixed(2);

  //push values//
  totalbalanceEl.innerText = `₹${total}`;
  PlusEl.innerText = `₹${income}`;
  MinusEl.innerText = `₹${expense}`;
}

//trans-delete//
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocaleStorage();
  init();
}

function init() {
  listEl.innerHTML = "";
  transactions.forEach(transactionList);
  updateBalanceAmount();
}
init();
