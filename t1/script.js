// ✓ LIST 2: Render data from data.js
function renderTable(data) {
  const tableBody = document.getElementById('tableBody');
  tableBody.innerHTML = '';
// Duyệt qua từng nhân viên và tạo hàng cho mỗi người
  data.forEach((employee, index) => {
    const row = document.createElement('tr'); // Tạo một hàng mới
    const displayDate = employee.birthdate ? formatDate(employee.birthdate) : '-';
    // Gán nội dung cho hàng, sử dụng escapeHtml để tránh XSS và formatDate để hiển thị ngày tháng đúng định dạng
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${escapeHtml(employee.name)}</td>
      <td>${escapeHtml(employee.email)}</td>
      <td>${escapeHtml(employee.phone)}</td>
      <td>${displayDate}</td>
      <td>${escapeHtml(employee.position)}</td>
      <td>
        <button class="btn edit" data-id="${employee.id}">Sửa</button>
        <button class="btn delete" data-id="${employee.id}">Xóa</button>
      </td>
    `;
    tableBody.appendChild(row); // Thêm hàng vào tbody
  });

  attachDeleteListeners();
}

// Helper function to escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Định dạng ngày tháng từ YYYY-MM-DD sang DD/MM/YYYY
function formatDate(dateStr) {
  // Nếu đã là định dạng DD/MM/YYYY, trả về nguyên bản
  if (dateStr.includes('/')) {
    return dateStr;
  }
  // Nếu là định dạng YYYY-MM-DD, chuyển đổi sang DD/MM/YYYY
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
// Ẩn modal và reset form
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
  },
  birthdate: (value) => {
    if (!value) {
      return 'Birthdate is required';
    }
    const birthdate = new Date(value);
    const today = new Date();
    if (birthdate >= today) {
      return 'Birthdate must be in the past';
    }
    const age = today.getFullYear() - birthdate.getFullYear();
    const m=today.getMonth() - birthdate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
        age--;
    }
    if (age < 18) {
      return 'Employee must be at least 18 years old';
    }
    return '';
  },

  password: (value) => {
    if (!value.trim()) {
      return 'Mật khẩu là bắt buộc';
    }
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!passwordRegex.test(value.trim())) {
      return 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và ký tự đặc biệt';
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
// Kiểm tra tất cả các trường trong form
function validateForm() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const position = document.getElementById('position').value;
  const birthdate = document.getElementById('birthdate').value;
  const password = document.getElementById('password').value;

  const isNameValid = validateField('name', name);
  const isEmailValid = validateField('email', email);
  const isPhoneValid = validateField('phone', phone);
  const isPositionValid = validateField('position', position);
  const isBirthdateValid = validateField('birthdate', birthdate);
  const isPasswordValid = validateField('password', password);

  return isNameValid && isEmailValid && isPhoneValid && isPositionValid && isBirthdateValid && isPasswordValid;
}




// ✓ LIST 5: Handle adding data
employeeForm.addEventListener('submit', (event) => {
  event.preventDefault();
  clearErrors();

  // Validate all fields
  // Nếu có lỗi, dừng lại và không thêm nhân viên mới
  if (!validateForm()) {
    return;
  }

  // Get form data
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const birthdate = document.getElementById('birthdate').value;
  const position = document.getElementById('position').value;

  // Create new employee object
  const newEmployee = {
    id: Math.max(...employees.map(e => e.id), 0) + 1,
    name: name,
    email: email,
    phone: phone,
    birthdate: birthdate ? formatDate(birthdate) : '',
    position: position
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

document.getElementById('email').addEventListener('blur', (e) => {
  validateField('email', e.target.value);
});

document.getElementById('phone').addEventListener('blur', (e) => {
  validateField('phone', e.target.value);
});

document.getElementById('position').addEventListener('blur', (e) => {
  validateField('position', e.target.value);
});
document.getElementById('birthdate').addEventListener('blur', (e) => {
  validateField('birthdate', e.target.value);
});
document.getElementById('password').addEventListener('blur', (e) => {
  validateField('password', e.target.value);
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