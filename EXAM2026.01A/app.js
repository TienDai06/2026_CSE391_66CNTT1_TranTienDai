
let transactions = [...initialTransactions];

const transactionTableBody = document.getElementById('transactionTableBody');
const addBtn = document.getElementById('addBtn');
const exportBtn = document.getElementById('exportBtn');
const overlay = document.getElementById('overlay');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const form = document.querySelector('.modal-form');

const customerInput = document.getElementById('customer');
const employeeInput = document.getElementById('employee');
const emailInput = document.getElementById('email');

const noteInput = document.getElementById('note');
const locationInput = document.getElementById('location');

function renderTransactions() {
  if (!transactionTableBody) return;

  transactionTableBody.innerHTML = transactions
    .map((tx) => {
      return `<tr>
            <td>${escapeHtml(tx.customer)}</td>
            <td>${escapeHtml(tx.employee)}</td>
            <td>${escapeHtml(tx.email)}</td>
            <td>${tx.date}</td>
            <td>${escapeHtml(tx.location)}</td>
          </tr>`;
    })
    .join('');

  transactionTableBody.querySelectorAll('.btn-delete').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = Number(e.target.dataset.id);
      transactions = transactions.filter((tx) => tx.id !== id);
      renderTransactions();
    });
  });
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(text).replace(/[&<>"']/g, (m) => map[m]);
}

function openModal() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  form.reset();
  clearValidationErrors();
}

function closeModalFn() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  clearValidationErrors();
}

function showError(inputElement, message) {
  removeFieldError(inputElement);
  const error = document.createElement('div');
  error.className = 'error';
  error.textContent = message;
  inputElement.parentNode.appendChild(error);
}

function removeFieldError(inputElement) {
  const existing = inputElement.parentNode.querySelector('.error');
  if (existing) existing.remove();
}

function clearValidationErrors() {
  [customerInput, employeeInput, amountInput, noteInput].forEach((element) => {
    removeFieldError(element);
  });
}

function validateForm() {
  clearValidationErrors();
  let valid = true;

  if (!customerInput.value.trim()) {
    showError(customerInput, 'Customer is required.');
    valid = false;
  } else if (customerInput.value.trim().length > 60) {
    showError(customerInput, 'Conference name must not exceed 60 characters.');
    valid = false;
  }

  if (!employeeInput.value.trim()) {
    showError(employeeInput, 'Employee is required.');
    valid = false;
  } else if (employeeInput.value.trim().length > 30) {
    showError(employeeInput, 'Employee must not exceed 30 characters.');
    valid = false;
  }

  if (!amountInput.value.trim()) {
    showError(amountInput, 'Amount is required.');
    valid = false;
  } else {
    const parsed = Number(amountInput.value.replace(/,/g, ''));
    if (Number.isNaN(parsed) || parsed <= 0) {
      showError(amountInput, 'Amount must be a positive number.');
      valid = false;
    }
  }

  if (noteInput.value && noteInput.value.length > 100) {
    showError(noteInput, 'Note must not exceed 100 characters.');
    valid = false;
  }

  return valid;
}

function getNextId() {
  return transactions.reduce((max, tx) => Math.max(max, tx.id), 0) + 1;
}
//
addBtn.addEventListener('click', openModal);
closeModal.addEventListener('click', (e) => {
  e.preventDefault();
  closeModalFn();
});
cancelBtn.addEventListener('click', () => closeModalFn());
overlay.addEventListener('click', closeModalFn);

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  const newTransaction = {
    customer: customerInput.value.trim(),
    employee: employeeInput.value.trim(),
    email: employeeInput.value.trim(),
    date: new Date().toISOString().slice(0, 10),
    location: employeeInput.value.trim(),
    note: noteInput.value.trim() || '-'
  };

  transactions.push(newTransaction);
  renderTransactions();
  closeModalFn();
});

window.addEventListener('DOMContentLoaded', () => {
  renderTransactions();
});
