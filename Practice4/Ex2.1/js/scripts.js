const form=document.getElementById('registerForm');

const fullname = document.getElementById('fullname');
const email =document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const terms=document.getElementById('terms');

function showError(field,message){
    document.getElementById(field + "error").innerText=message;
}
function clearError(field){
    document.getElementById(field + "error").innerText="";
}

function validateFullname(){
    const value=fullname.value.trim();
    const regex=/^[A-Za-zÀ-ỹ\s]{3,}$/;
    if(value===""){
        showError("fullname","Không được để trống");
        return false;
    }
    else if(!regex.test(value)){
        showError("fullname","Ít nhất 3 kí tự");
        return false;
    }
    clearError("fullname");
    return true;
}
function validateEmail(){
    const value=email.value.trim();
    const regex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(value==""){
        showError("email","Email không được trống");
        return false;
    }
    else if(!regex.test(value)){
        showError("email","Email không đúng định dạng");
        return false;
    }
    clearError("email");
    return true;
}
function validatePhone(){
    const value=phone.value.trim();
    const regex= /^0\d{9}$/;
    if(value==""){
        showError("phone","SĐT không được trống");
        return false;
    }
    else if(!regex.test(value)){
        showError("phone","SĐT phải 10 số bắt đầu bằng 0");
        return false;
    }
    clearError("phone");
    return true;
}
function validatePassword(){
    const value=password.value;
    const regex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if(value==""){
        showError("password","Mật khẩu không được để trống");
        return false;
    }
    else if(!regex.test(value)){
        showError("password","≥ 8 kí tự, có chữ hoa, chữ thường và số");
        return false;
    }
    clearError("password");
    return true;
}
function validateConfirmPassword(){
    if(confirmPassword.value!=password.value){
        showError("confirmPassword","Mật khẩu không khớp");
        return false;
    }
    clearError("confirmPassword");
    return true;
}
function validateGender(){
    const gender=document.querySelector('input[name="gender"]:checked');

    if(!gender){
        showError("gender","Vui lòng chọn giới tính");
        return false;
    }
    clearError("gender");
    return true;
}
function validateTerms(){
    if(!terms.checked){
        showError("terms","Bạn phải đồng ý điều khoản");
        return false;
    }
    clearError("terms");
    return true;
}

form.addEventListener("submit",function(e){
    e.preventDefault();

    let isValid=
        validateFullname() &
        validateEmail() &
        validatePhone() &
        validatePassword() &
        validateConfirmPassword() &
        validateGender() &
        validateTerms();
    if(isValid){
        form.style.display="none";
        document.getElementById("successMessage").innerText="Đăng kí thành công! Chào mừng " +fullname.value;
     }
});

fullname.addEventListener("blur",validateFullname);
email.addEventListener("blur",validateEmail);
phone.addEventListener("blur",validatePhone);
password.addEventListener("blur",validatePassword);
confirmPassword.addEventListener("blur",validateConfirmPassword);

fullname.addEventListener("input",()=>clearError("fullname"));
email.addEventListener("input",()=>clearError("email"));
phone.addEventListener("input",()=>clearError("phone"));
password.addEventListener("input",()=>clearError("password"));
confirmPassword.addEventListener("input",()=>clearError("confirmPassword"));