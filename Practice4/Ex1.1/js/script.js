
let students = [];
const nameInput = document.getElementById('name');
const scoreInput = document.getElementById('score');
const addBtn = document.getElementById('addBtn');
const tableBody =document.getElementById('tableBody');
const stats = document.getElementById('stats');
 function getRank(score) {
    if (score >= 8.5) return 'Giỏi';
    if (score >= 7.0) return 'Khá';
    if (score >= 5.0) return 'Trung bình';
    return 'Yếu';
}
function renderTable(){
    tableBody.innerHTML = '';
    students.forEach((sv, index) => {
        const tr = document.createElement('tr');
        if(sv.score < 5)
            tr.classList.add('low-score');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${sv.name}</td>
            <td>${sv.score}</td>
            <td>${getRank(sv.score)}</td>
            <td>
                <button data-index="${index}" class = "delete-btn">Xóa</button>
            </td>
             `;
        tableBody.appendChild(tr);
    });
    updateStats();
}
function updateStats(){
    const total = students.length;
    let sum=0;
    students.forEach(sv=>{
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
    renderTable();
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
        const index = e.target.getAttribute('data-index');
        students.splice(index, 1);
        renderTable();
    }
});
