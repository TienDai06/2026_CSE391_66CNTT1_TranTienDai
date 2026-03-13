// **Mô tả:** Nâng cấp bài 1.1 (hoặc tạo trang mới) với khả năng tìm kiếm và lọc dữ liệu theo thời gian thực. 

// **Yêu cầu chức năng:**

// 1. **Tìm kiếm realtime**: Thêm ô tìm kiếm phía trên bảng. Khi người dùng gõ vào (`input` event), bảng lập tức chỉ hiển thị các hàng có tên **chứa chuỗi tìm kiếm** (không phân biệt hoa thường). Nếu không tìm thấy kết quả → hiển thị dòng chữ "Không có kết quả".

// 2. **Lọc theo xếp loại**: Thêm `<select>` với các tùy chọn: Tất cả / Giỏi / Khá / Trung bình / Yếu. Khi thay đổi (`change` event), bảng chỉ hiển thị sinh viên thuộc xếp loại được chọn.

// 3. **Sắp xếp**: Khi người dùng click vào tiêu đề cột **"Điểm"**, danh sách được sắp xếp tăng dần; click lần nữa thì giảm dần. Tiêu đề cột hilển thị mũi tên ▲ / ▼ để chỉ chiều sắp xếp hiện tại.

// 4. **Kết hợp**: Tìm kiếm, lọc và sắp xếp có thể **hoạt động đồng thời** (ví dụ: tìm tên "Nguyễn" trong nhóm "Khá" sắp xếp theo điểm tăng dần).

// **Gợi ý kỹ thuật:**
// - Giữ nguyên mảng gốc `students[]`, tạo thêm biến `filteredStudents[]` là kết quả sau khi áp dụng bộ lọc + tìm kiếm + sắp xếp. Hàm `renderTable()` chỉ vẽ `filteredStudents[]`.
// - Viết một hàm `applyFilters()` duy nhất, gọi hàm này mỗi khi có bất kỳ thay đổi nào (tìm kiếm, lọc, sắp xếp).
// - Dùng `array.filter()`, `array.sort()` để xử lý dữ liệu.
// - Dùng `str.toLowerCase().includes(keyword)` để tìm kiếm không phân biệt hoa thường.

// ---

let students = [];
let filteredStudents= [];
let sortAsc = true;
const nameInput = document.getElementById('name');
const scoreInput = document.getElementById('score');
const addBtn = document.getElementById('addBtn');
const tableBody =document.getElementById('tableBody');
const stats = document.getElementById('stats');
const searchInput = document.getElementById('searchInput');
const rankFilter = document.getElementById('rankFilter');
const scoreHeader = document.getElementById('scoreHeader');

 function getRank(score) {
    if (score >= 8.5) return 'Giỏi';
    if (score >= 7.0) return 'Khá';
    if (score >= 5.0) return 'Trung bình';
    return 'Yếu';
}
function renderTable(){
    tableBody.innerHTML = '';
    if(filteredStudents.length == 0){
        tableBody.innerHTML = '<tr><td colspan = "5">Không có kết quả</td></tr>';
        return;
    }
    filteredStudents.forEach((sv, index) => {
        const tr = document.createElement('tr');
        if(sv.score < 5){
            tr.classList.add('low-score');
        }
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${sv.name}</td>
            <td>${sv.score}</td>
            <td>${getRank(sv.score)}</td>
            <td>
                <button data-name="${sv.name}" class = "delete-btn">Xóa</button>
            </td>
             `;
        tableBody.appendChild(tr);
    });
    updateStats();
}
function updateStats(){
    let total = filteredStudents.length;
    let sum=0;
    filteredStudents.forEach(sv=>{
        sum +=sv.score;
    });
    let avg = total ? (sum/total).toFixed(2): 0;
    stats.textContent = `Tổng số sinh viên: ${total} | Điểm trung bình: ${avg}`;
}
function addStudent(){
    const name=nameInput.value.trim();
    const score = parseFloat(scoreInput.value);
    if(!name){
        alert('Họ tên không được để trống');
        return;
    }
    if(isNaN(score) || score < 0 || score >10){
        alert('Điểm phải là số từ 0 đến 10');
        return;
    }
    students.push({name, score});
    applyFilter();
    nameInput.value = '';
    scoreInput.value = '';
    nameInput.focus();
}
addBtn.addEventListener('click', addStudent);
scoreInput.addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        addStudent();
    }
});
tableBody.addEventListener('click', function(e){
    if(e.target.classList.contains('delete-btn')){
        const name = e.target.getAttribute('data-name');
        const index=students.findIndex(sv => sv.name === name);
        students.splice(index, 1);
        applyFilter();
    }
});
function applyFilter(){
    let keyword = searchInput.value.toLowerCase();
    let rank = rankFilter.value;
    filteredStudents = students.filter(sv =>{
        let matchName = sv.name.toLowerCase().includes(keyword);
        let matchRank = rank === 'all' || getRank(sv.score) === rank;
        return matchName && matchRank;
    });
    filteredStudents.sort((a,b)=>{
        return sortAsc ? a.score-b.score : b.score - a.score;
    });
    scoreHeader.textContent = sortAsc ? "Điểm ▲" : "Điểm ▼";
    renderTable();
}
searchInput.addEventListener('input', applyFilter);
rankFilter.addEventListener('change', applyFilter);
scoreHeader.addEventListener('click', function(){
    sortAsc=!sortAsc;
    applyFilter();
})
