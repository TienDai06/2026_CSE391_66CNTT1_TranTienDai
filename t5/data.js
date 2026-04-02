// data.js - Fake dataset for transaction table
// Contains minimum 5 records. Mỗi bản ghi phù hợp với cấu trúc bảng (ID, Khách hàng, Nhân viên, Số tiền, Ngày mua, Ghi chú)
const initialTransactions = [
  { id: 1, 
    customer: 'Nguyen Van A',
    employee: 'Le Thi B', 
    amount: 3500000, 
    date: '2026-03-01', 
    note: 'Trả góp lần 1' 
  },
  { id: 2, 
    customer: 'Tran Thi C', 
    employee: 'Pham Van D', 
    amount: 750000, 
    date: '2026-03-04', 
    note: 'Khuyến mãi 5%' 
  },
  { id: 3, 
    customer: 'Hoang Van E', 
    employee: 'Nguyen Thi F', 
    amount: 1200000, 
    date: '2026-03-10', 
    note: 'Bảo hành 12 tháng' 
  },
  { id: 4, 
    customer: 'Le Van G', 
    employee: 'Tran Thi H', 
    amount: 430000, 
    date: '2026-03-15', 
    note: 'Giao hàng nhanh' },
  { id: 5, 
    customer: 'Pham Thi I', 
    employee: 'Le Van J', 
    amount: 1590000, 
    date: '2026-03-18', 
    note: 'Hóa đơn VAT' }
];
