const form=document.getElementById('orderForm');

const product=document.getElementById('product');
const quantity = document.getElementById("quantity");
const deliveryDate = document.getElementById("deliveryDate");
const address = document.getElementById("address");
const note = document.getElementById("note");

const charCount = document.getElementById("charCount");
const total = document.getElementById("total");

const confirmBox = document.getElementById("confirmBox");
const summary = document.getElementById("summary");
const success = document.getElementById("success");

const prices={
    Ao:150000,
    Quan:200000,
    Giay:500000
};

function showError(id,message){
    document.getElementById(id).innerText=message;
}
function clearError(id){
    document.getElementById(id).innerText="";
}

function validateProduct(){
    if(product.value===""){
        showError("productError","Hãy chọn sản phẩm");
        return false;
    }
    clearError("productError");
    return true;

}

function validateQuantity(){
    let q=Number(quantity.value);
    if(!Number.isInteger(q) || q<1 || q>99){
        showError("quantityError","Số lượng từ 1-99");
        return false;
    }
    clearError("quantityError");
    return true;
}

function validateDate(){
    let date = new Date(deliveryDate.value);
    let today = new Date();
    today.setHours(0,0,0,0);
    let maxDate = new Date();
    maxDate.setDate(today.getDate() +30);

    if(!deliveryDate.value){
        showError("dateError","Chọn ngày giao");
        return false;
    }

    if(date<today){
        showError("dateError","Không được chọn ngày quá khứ");
        return false;
    }
    clearError("dateError");
    return true;
}

function validateAddress(){
    if(address.value.trim().length < 10){
        showError("addressError","Địa chỉ tối thiểu 10 kí tự");
        return false;
    }
    clearError("addressError");
    return true;
}

function validateNote(){
    if(note.value.length >200){
        showError("noteError","Tối đa 200 ký tự");
        return false;
    }
    clearError("noteError");
    return true;
}

function validatePayment(){
    let payment=document.querySelector('input[name="payment"]:checked');
    if(!payment){
        showError("paymentError","Chọn phương thức thanh toán");
        return false;
    }
    clearError("paymentError");
    return true;
}

function calculateTotal(){
    let p=product.value;
    let q=Number(quantity.value);
    if(prices[p] && q){
        let t=prices[p]*q;
        total.innerText=t.toLocaleString('vi-VN');

    }
}
product.addEventListener("change",calculateTotal);
quantity.addEventListener("input",calculateTotal);

note.addEventListener("input",function(){
    let length = note.value.length;
    charCount.innerText=length+"/200";
    if(length>200){
        charCount.classList.add("red");
    }
    else{
        charCount.classList.remove("red");
    }
    clearError("noteError");
});
product.addEventListener("blur",validateProduct);
quantity.addEventListener("blur",validateQuantity);
deliveryDate.addEventListener("blur",validateDate);
address.addEventListener("blur",validateAddress);
note.addEventListener("blur",validateNote);

product.addEventListener("input",()=>clearError("productError"));
quantity.addEventListener("input",()=>clearError("quantityError"));
deliveryDate.addEventListener("input",()=>clearError("dateError"));
address.addEventListener("input",()=>clearError("addressError"));

form.addEventListener("submit", function(e){
    e.preventDefault();

    let valid=
    validateProduct() &
    validateQuantity() &
    validateDate() &
    validateAddress() &
    validateNote() &
    validatePayment();

    if(valid){
        let payment=document.querySelector('input[name="payment"]:checked').value;
        summary.innerHTML=
        `
        Sản phẩm: ${product.value} <br>
        Số lượng: ${quantity.value} <br>
        Tổng tiền: ${total.innerText} VND <br>
        Ngày giao: ${deliveryDate.value} <br>
        Thanh toán: ${payment} <br>
        `;
        confirmBox.style.display="block";

    }

});

document.getElementById("confirmBtn").onclick=function(){
    confirmBox.style.display="none";
    form.style.display="none";
    success.innerHTML="Đặt hàng thành công";
};

document.getElementById("cancelBtn").onclick=function(){
    confirmBox.style.display="none";

};