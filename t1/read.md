
  // 5. Password (ít nhất 6 ký tự)
  password: (value) => {
    if (!value) {
      return 'Password is required';
    }
    if (value.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return '';
  },

  // 6. Confirm password
  confirmPassword: (value, allValues) => {
    if (!value) {
      return 'Please confirm your password';
    }
    if (value !== allValues.password) {
      return 'Passwords do not match';
    }
    return '';
  },

  // 7. Tuổi (>= 18)
  age: (value) => {
    if (!value) {
      return 'Age is required';
    }
    if (value < 18) {
      return 'You must be at least 18 years old';
    }
    return '';
  },

  // 8. Số (chỉ cho phép số dương)
  number: (value) => {
    if (!value) {
      return 'This field is required';
    }
    if (isNaN(value) || value <= 0) {
      return 'Must be a positive number';
    }
    return '';
  },

  // 9. URL (link website)
  url: (value) => {
    if (!value.trim()) {
      return 'URL is required';
    }
    const urlRegex = /^(https?:\/\/)?([\w-]+)+\.[\w-]+(\/[\w-]*)*$/;
    if (!urlRegex.test(value.trim())) {
      return 'Invalid URL format';
    }
    return '';
  },

  // 10. Ngày (phải chọn)
  date: (value) => {
    if (!value) {
      return 'Date is required';
    }
    return '';
  },

  // 11. Checkbox (phải tick)
  checkbox: (value) => {
    if (!value) {
      return 'You must accept this';
    }
    return '';
  },

  // 12. Text dài tối đa (ví dụ: mô tả)
  description: (value) => {
    if (value.length > 200) {
      return 'Description must be less than 200 characters';
    }
    return '';
  },

  // 13. Username (không có khoảng trắng)
  username: (value) => {
    if (!value.trim()) {
      return 'Username is required';
    }
    if (/\s/.test(value)) {
      return 'Username must not contain spaces';
    }
    return '';
  }
};