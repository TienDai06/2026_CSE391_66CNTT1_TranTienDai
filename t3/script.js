// 
const booksTableBody = document.getElementById('booksTableBody');
const btnAdd = document.getElementById('btnAdd');
const modal = document.getElementById('popupForm');
const btnCancel = document.getElementById('btnCancel');
const bookForm = document.getElementById('bookForm');

function renderTable() {
  booksTableBody.innerHTML = '';
  books.forEach((book, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.phone}</td>
      <td>${book.topic}</td>
      <td>
        <button class="btn-edit" type="button" data-id="${book.id}">Sửa</button>
        <button class="btn-delete" type="button" data-id="${book.id}">Xóa</button>
      </td>
    `;
    booksTableBody.appendChild(row);
  });
  attachActionListeners();
}
// 
function attachActionListeners() {
  // chọn tất cả nút xóa và gán sự kiện
  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);// Lấy id từ data-id của nút
      const i = books.findIndex(b => b.id === id);// Tìm index của sách trong mảng và xóa nếu tồn tại
      if (i > -1) {
        books.splice(i, 1);
        renderTable();
      }
    });
  });
}
// Hiển thị form popup và xử lý validation
function openModal() {
  bookForm.reset();
  delete bookForm.dataset.editId;
  
  // Clear all error messages
  // Ẩn tất cả các thông báo lỗi và xóa class is-invalid
  document.querySelectorAll('.error-message').forEach(el => {
    el.classList.remove('show');
    el.textContent = '';
  });
  document.querySelectorAll('input').forEach(el => {
    el.classList.remove('is-invalid');
  });
  
  modal.classList.remove('hidden');
}
// Ẩn form popup và reset form
function closeModal() {
  modal.classList.add('hidden');
  bookForm.reset();
  delete bookForm.dataset.editId;
}

btnAdd.addEventListener('click', openModal);
btnCancel.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); }); // Đóng modal khi click ra ngoài

// Helper functions
// Hàm hiển thị thông báo lỗi cho một trường cụ thể
function showErrorMessage(fieldId, message) {
  const input = document.getElementById(fieldId);
  const errorDiv = input.closest('.form-group').querySelector('.error-message');
  if (message) {
    input.classList.add('is-invalid');
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
  } else {
    input.classList.remove('is-invalid');
    errorDiv.classList.remove('show');
    errorDiv.textContent = '';
  }
}

// Hiển thị lỗi
function validateForm() {
  let isValid = true;
  
  // Tên sách
  // Họ tên nhỏ hơn 30
  const nameBookInput = document.getElementById('nameBook');
  if (!nameBookInput.value.trim()) {
    showErrorMessage('nameBook', 'Book title is required.');
    isValid = false;
  } else if (nameBookInput.value.trim().length < 2) {
    showErrorMessage('nameBook', 'Book title must be at least 2 characters.');
    isValid = false;
  } else {
    showErrorMessage('nameBook', '');
  }

  // Tên tác giả
  // Họ tên nhỏ hơn 3
  const authorNameInput = document.getElementById('authorName');
  if (!authorNameInput.value.trim()) {
    showErrorMessage('authorName', 'Author name is required.');
    isValid = false;
  } else if (authorNameInput.value.trim().length < 3) {
    showErrorMessage('authorName', 'Author name must be at least 3 characters.');
    isValid = false;
  } else {
    showErrorMessage('authorName', '');
  }

  // Số điện thoại
  // Số điện thoại phải là 10 chữ số
  const phoneInput = document.getElementById('phone');
  if (!phoneInput.value.trim()) {
    showErrorMessage('phone', 'Phone number is required.');
    isValid = false;
  } else if (!/^[0-9]{10}$/.test(phoneInput.value.trim())) {
    showErrorMessage('phone', 'Phone must be exactly 10 digits.');
    isValid = false;
  } else {
    showErrorMessage('phone', '');
  }

  // Chủ đề
  // Chủ đề phải có ít nhất 2 ký tự
  const topicInput = document.getElementById('topic');
  if (!topicInput.value.trim()) {
    showErrorMessage('topic', 'Topic is required.');
    isValid = false;
  } else if (topicInput.value.trim().length < 2) {
    showErrorMessage('topic', 'Topic must be at least 2 characters.');
    isValid = false;
  } else {
    showErrorMessage('topic', '');
  }

  return isValid;
}

// Xử lý submit form
bookForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Ngăn form submit mặc định
  if (!validateForm()) {
    return;
  }

  // Tạo đối tượng sách mới từ form và thêm vào mảng
  const newRecord = {
    id: books.length ? Math.max(...books.map(b => b.id)) + 1 : 1,
    title: document.getElementById('nameBook').value.trim(),
    author: document.getElementById('authorName').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    topic: document.getElementById('topic').value.trim()
  };

  books.push(newRecord);
  renderTable();
  closeModal();
});

renderTable();
