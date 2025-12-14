
// Closure: private transaction storage
const createStore = () => {
  let transactions = [];

  // First-class functions 
  const addTransaction = tx => {
    transactions = [...transactions, tx]; // spread operator
  };

  const getTransactions = () => [...transactions]; // spread

  return { addTransaction, getTransactions };
};

const store = createStore();

const balanceEl = document.getElementById('balance-amount');
const incomeEl = document.getElementById('income-amount');
const expenseEl = document.getElementById('expense-amount');
const listEl = document.getElementById('transaction-list');

const noteInput = document.getElementById('note-input');
const amountInput = document.getElementById('amount-input');
const typeSelect = document.getElementById('type-select');
const addBtn = document.getElementById('add-transaction-btn');


// First-class + Higher-order functions
const sumByType = type => transactions =>
  transactions
    .filter(tx => tx.type === type) // higher-order
    .reduce((sum, tx) => sum + tx.amount, 0); // higher-order

const calculateIncome = sumByType('income');
const calculateExpense = sumByType('expense');


// Arrow function + DOM manipulation
const createCard = ({ note, amount, type }) => {
  const li = document.createElement('li');
  li.className = `transaction-card ${type}`;

  li.innerHTML = `
    <div class="transaction-info">
      <span class="transaction-note">${note}</span>
    </div>
    <span class="transaction-amount ${type}-amount">
      ${type === 'income' ? '+' : '-'}$${amount.toFixed(2)}
    </span>
  `;

  return li; 
};


// function HOF 
const render = () => {
  const transactions = store.getTransactions();
  listEl.innerHTML = '';

  transactions
    .map(createCard)        // higher-order
    .forEach(card => listEl.appendChild(card)); // higher-order

  const income = calculateIncome(transactions);
  const expense = calculateExpense(transactions);

  incomeEl.textContent = income.toFixed(2);
  expenseEl.textContent = expense.toFixed(2);
  balanceEl.textContent = (income - expense).toFixed(2);
};


// arrow function
addBtn.addEventListener('click', () => {
  const note = noteInput.value.trim();
  const amount = Number(amountInput.value);

  if (!note || !amount) return alert('Please fill all fields');

  store.addTransaction({
    note,
    amount,
    type: typeSelect.value
  });

  render();

  noteInput.value = '';
  amountInput.value = '';
});
