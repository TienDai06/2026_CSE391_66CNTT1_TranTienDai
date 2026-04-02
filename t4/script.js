// ===========================
// ✓ LIST 1: Mock data loaded from data.js
// ===========================
// The employees array is loaded from data.js file
// This section depends on data.js being loaded before script.js

// ===========================
// ✓ LIST 2: Render data from data.js
// ===========================
function renderEmployeesTable() {
    const tableBody = document.getElementById('employeesTableBody');
    tableBody.innerHTML = '';

    employees.forEach((employee, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox"></td>
            <td>${escapeHtml(employee.name)}</td>
            <td>${escapeHtml(employee.email)}</td>
            <td>${escapeHtml(employee.address)}</td>
            <td>${formatPhone(employee.phone)}</td>
            <td class="actions">
                <button class="btn-edit" title="Edit" data-id="${employee.id}">✏️</button>
                <button class="btn-delete" title="Delete" data-id="${employee.id}">🗑</button>
            </td>
        `;
        tableBody.appendChild(row);
        attachRowButtonListeners(row);
    });
}

// Helper function to escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Helper function to format phone number
function formatPhone(phone) {
    if (phone.length === 10) {
        return `(${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(6)}`;
    }
    return phone;
}

// ===========================
// ✓ LIST 3: Modal popup functionality
// ===========================
const addBtn = document.getElementById('addBtn');
const closeModal = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const modal = document.getElementById('addEmployeeModal');
const modalOverlay = document.getElementById('modalOverlay');
const addEmployeeForm = document.getElementById('addEmployeeForm');

// Open Modal
addBtn.addEventListener('click', () => {
    clearErrors();
    addEmployeeForm.reset();
    modal.classList.add('show');
    modalOverlay.classList.add('show');
});

// Close Modal
function closeAddModal() {
    modal.classList.remove('show');
    modalOverlay.classList.remove('show');
    clearErrors();
    addEmployeeForm.reset();
}

closeModal.addEventListener('click', closeAddModal);
cancelBtn.addEventListener('click', closeAddModal);

// Close Modal when clicking on overlay
modalOverlay.addEventListener('click', closeAddModal);

// Prevent closing when clicking inside modal
modal.addEventListener('click', (e) => {
    e.stopPropagation();
});

// ===========================
// ✓ LIST 4: Validation logic
// ===========================
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

  address: (value) => {
    if (!value.trim()) {
      return 'Address is required';
    }
    if (value.trim().length < 4) {
      return 'Address must be at least 4 characters';
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
    const inputElement = document.getElementById('employee' + fieldName.charAt(0).toUpperCase() + fieldName.slice(1));
    
    if (errorElement) {
      errorElement.textContent = error;
      if (inputElement) {
        if (error) {
          inputElement.classList.add('has-error');
        } else {
          inputElement.classList.remove('has-error');
        }
      }
    }
    return !error;
  }
  return true;
}

// Validate entire form
function validateForm() {
  const name = document.getElementById('employeeName').value;
  const email = document.getElementById('employeeEmail').value;
  const phone = document.getElementById('employeePhone').value;
  const address = document.getElementById('employeeAddress').value;

  const isNameValid = validateField('name', name);
  const isEmailValid = validateField('email', email);
  const isPhoneValid = validateField('phone', phone);
  const isAddressValid = validateField('address', address);

  return isNameValid && isEmailValid && isPhoneValid && isAddressValid;
}

// ===========================
// ✓ LIST 4: Clear & Display Error Messages
// ===========================
function clearErrors() {
  document.querySelectorAll('.error-message').forEach(el => {
    el.textContent = '';
  });
  document.querySelectorAll('input, textarea').forEach(el => {
    el.classList.remove('has-error');
  });
  const errorBanner = document.getElementById('errorBanner');
  if (errorBanner) {
    errorBanner.style.display = 'none';
  }
}

// ===========================
// ✓ LIST 5: Handle adding data
// ===========================
addEmployeeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    // Validate all fields
    if (!validateForm()) {
        return;
    }

    // Get form values
    const name = document.getElementById('employeeName').value.trim();
    const email = document.getElementById('employeeEmail').value.trim();
    const phone = document.getElementById('employeePhone').value.trim();
    const address = document.getElementById('employeeAddress').value.trim();

    // Create new employee object
    const newEmployee = {
        id: employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1,
        name: name,
        email: email,
        phone: phone,
        address: address
    };

    // Add to employees array
    employees.push(newEmployee);

    // Re-render table
    renderEmployeesTable();

    // Close modal and reset form
    closeAddModal();

    // Show success message
    alert(`Employee "${name}" added successfully!`);
});

// ✓ LIST 4: Validate on blur for better UX
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('employeeName').addEventListener('blur', (e) => {
    validateField('name', e.target.value);
  });

  document.getElementById('employeeEmail').addEventListener('blur', (e) => {
    validateField('email', e.target.value);
  });

  document.getElementById('employeePhone').addEventListener('blur', (e) => {
    validateField('phone', e.target.value);
  });

  document.getElementById('employeeAddress').addEventListener('blur', (e) => {
    validateField('address', e.target.value);
  });

  // Initialize table
  renderEmployeesTable();
});

// ===========================
// ✓ LIST 6: Delete functionality
// ===========================
function attachSelectAllListener() {
    const selectAllCheckbox = document.querySelector('.employees-table thead input[type="checkbox"]');
    const rowCheckboxes = document.querySelectorAll('#employeesTableBody input[type="checkbox"]');

    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', () => {
            rowCheckboxes.forEach(checkbox => {
                checkbox.checked = selectAllCheckbox.checked;
            });
        });
    }
}

function attachRowButtonListeners(row) {
    const editBtn = row.querySelector('.btn-edit');
    const deleteBtn = row.querySelector('.btn-delete');

    editBtn.addEventListener('click', () => {
        alert('Edit functionality coming soon!');
    });

    deleteBtn.addEventListener('click', () => {
        const employeeId = parseInt(deleteBtn.getAttribute('data-id'));
        if (confirm('Are you sure you want to delete this employee?')) {
            // Remove from employees array
            employees = employees.filter(emp => emp.id !== employeeId);
            // Re-render table
            renderEmployeesTable();
            alert('Employee deleted successfully!');
        }
    });
}

// ===========================
// ADDITIONAL FEATURES (COMMENTED OUT)
// ===========================

// ===========================
// BULK DELETE FUNCTIONALITY (LIST 7?)
// ===========================
// const deleteBtn = document.getElementById('deleteBtn');

// deleteBtn.addEventListener('click', () => {
//     const selectedCheckboxes = document.querySelectorAll('#employeesTableBody input[type="checkbox"]:checked');

//     if (selectedCheckboxes.length === 0) {
//         alert('Please select at least one employee to delete!');
//         return;
//     }

//     if (confirm(`Delete ${selectedCheckboxes.length} selected employee(s)?`)) {
//         const namesToDelete = [];
//         selectedCheckboxes.forEach(checkbox => {
//             const row = checkbox.closest('tr');
//             const name = row.querySelector('td:nth-child(2)').textContent;
//             namesToDelete.push(name);
//         });

//         // Remove from employees array
//         namesToDelete.forEach(name => {
//             employees = employees.filter(emp => emp.name !== name);
//         });

//         renderEmployeesTable();
//         alert('Selected employees deleted successfully!');
//     }
// });

// ===========================
// SELECT ALL CHECKBOX FUNCTIONALITY (LIST 8?)
// ===========================
// function attachSelectAllListener() {
//     const selectAllCheckbox = document.querySelector('.employees-table thead input[type="checkbox"]');
//     const rowCheckboxes = document.querySelectorAll('#employeesTableBody input[type="checkbox"]');

//     if (selectAllCheckbox) {
//         selectAllCheckbox.addEventListener('change', () => {
//             rowCheckboxes.forEach(checkbox => {
//                 checkbox.checked = selectAllCheckbox.checked;
//             });
//         });
//     }
// }

// ===========================
// PAGINATION FUNCTIONALITY (LIST 9?)
// ===========================
// const paginationPages = document.querySelectorAll('.pagination-page');
// const prevBtn = document.querySelector('.pagination-btn.prev-btn');
// const nextBtn = document.querySelector('.pagination-btn.next-btn');

// paginationPages.forEach(pageBtn => {
//     pageBtn.addEventListener('click', () => {
//         paginationPages.forEach(btn => btn.classList.remove('active'));
//         pageBtn.classList.add('active');
//     });
// });

// prevBtn.addEventListener('click', () => {
//     const activePage = document.querySelector('.pagination-page.active');
//     const currentPageNum = parseInt(activePage.textContent);
//     if (currentPageNum > 1) {
//         paginationPages[currentPageNum - 2].click();
//     }
// });

// nextBtn.addEventListener('click', () => {
//     const activePage = document.querySelector('.pagination-page.active');
//     const currentPageNum = parseInt(activePage.textContent);
//     if (currentPageNum < paginationPages.length) {
//         paginationPages[currentPageNum].click();
//     }
// });
