// ✓ LIST 2: Render data from data.js
function renderTable(data) {
  const tableBody = document.getElementById('tableBody');
  tableBody.innerHTML = '';

  data.forEach((employee, index) => {
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${escapeHtml(employee.name)}</td>
      <td>${escapeHtml(employee.category)}</td>
      <td>${escapeHtml(employee.content)}</td>
      <td>${escapeHtml(employee.topic)}</td>
      <td>
        <button class="btn edit" data-id="${employee.id}">Sửa</button>
        <button class="btn delete" data-id="${employee.id}">Xóa</button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  attachDeleteListeners();
}
// Helper function to escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Helper function to format date
function formatDate(dateStr) {
  // If already in DD/MM/YYYY format, return as is
  if (dateStr.includes('/')) {
    return dateStr;
  }
  // If in YYYY-MM-DD format (from date input), convert to DD/MM/YYYY
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}


// ✓ LIST 3 & 4: Form popup and validation
const btnAdd = document.getElementById('btnAdd');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const employeeForm = document.getElementById('employeeForm');
const tableBody = document.getElementById('tableBody');

// Show modal
function showModal() {
  modal.classList.remove('hidden');
  clearErrors();
  employeeForm.reset();
}

// Hide modal
function hideModal() {
  modal.classList.add('hidden');
  employeeForm.reset();
  clearErrors();
}

// Clear all error messages
function clearErrors() {
  document.querySelectorAll('.error-message').forEach(el => {
    el.textContent = '';
  });
}

// ✓ LIST 4: Validation logic

//Họ tên nhỏ hơn 30
const validators = {
  name: (value) => {
    if (!value.trim()) {
      return 'Name is required';
    }
    if (value.trim().length > 30) {
      return 'Name must be 30 characters or less';
    }
    return '';
  },
  
  email: (value) => {
    if (!value.trim()) {
      return 'Email is required';
    }
    // Basic email format validation
    //email đúng định dạng
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value.trim())) {
      return 'Email format is invalid';
    }
    return '';
  },
  // Số điện thoại phải là 10 chữ số  
  phone: (value) => {
    if (!value.trim()) {
      return 'Phone number is required';
    }
    if (!/^\d{10}$/.test(value.trim())) {
      return 'Phone number must be exactly 10 digits';
    }
    return '';
  },
  
  position: (value) => {
    if (!value) {
      return 'Position is required';
    }
    return '';
  }
};

// Validate single field
function validateField(fieldName, value) {
  const validator = validators[fieldName];
  if (validator) {
    const error = validator(value);
    const errorElement = document.getElementById(fieldName + 'Error');
    if (errorElement) {
      errorElement.textContent = error;
    }
    return !error;
  }
  return true;
}

// Validate entire form
function validateForm() {
  const name = document.getElementById('name').value;
  const category = document.getElementById('category').value;
  const content = document.getElementById('content').value;
  const topic = document.getElementById('topic').value;

  const isNameValid = validateField('name', name);
  const isCategoryValid = validateField('category', category);
  const isContentValid = validateField('content', content);
  const isTopicValid = validateField('topic', topic);

  return isCategoryValid && isContentValid && isTopicValid;
}

// ✓ LIST 5: Handle adding data
employeeForm.addEventListener('submit', (event) => {
  event.preventDefault();
  clearErrors();

  // Validate all fields
  if (!validateForm()) {
    return;
  }

  // Get form data
  const name = document.getElementById('name').value.trim();
  const category = document.getElementById('category').value.trim();
  const content = document.getElementById('content').value.trim();
  const topic = document.getElementById('topic').value;


  // Create new employee object
  const newEmployee = {
    id: Math.max(...employees.map(e => e.id), 0) + 1,
    name: name,
    category: category,
    content: content,
    topic: topic
  };

  // Add to employees array
  employees.push(newEmployee);

  // Re-render table
  renderTable(employees);

  // Close modal and reset form
  hideModal();
});

// Validate on blur for better UX
document.getElementById('name').addEventListener('blur', (e) => {
  validateField('name', e.target.value);
});

document.getElementById('category').addEventListener('blur', (e) => {
  validateField('category', e.target.value);
});

document.getElementById('content').addEventListener('blur', (e) => {
  validateField('content', e.target.value);
});

document.getElementById('topic').addEventListener('blur', (e) => {
  validateField('topic', e.target.value);
});

// Modal event listeners
btnAdd.addEventListener('click', showModal);
closeModal.addEventListener('click', hideModal);
cancelBtn.addEventListener('click', hideModal);
modal.addEventListener('click', (event) => {
  if (event.target === modal) hideModal();
});

// Delete functionality
function attachDeleteListeners() {
  document.querySelectorAll('.delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const row = e.target.closest('tr');
      const rowIndex = Array.from(tableBody.querySelectorAll('tr')).indexOf(row);
      
      if (rowIndex !== -1) {
        // Find and remove from employees array
        const employeeIndex = employees.findIndex(emp => emp.id === parseInt(e.target.dataset.id));
        if (employeeIndex !== -1) {
          employees.splice(employeeIndex, 1);
        }
        
        // Re-render table
        renderTable(employees);
      }
    });
  });
}

// Initialize: Render table on page load
document.addEventListener('DOMContentLoaded', () => {
  renderTable(employees);
});