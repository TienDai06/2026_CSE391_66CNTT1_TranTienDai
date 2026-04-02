let contacts = [...contactsData];

const listEl = document.getElementById("contactList");
const form = document.getElementById("contactForm");

function renderList(data) {
    listEl.innerHTML = "";

    data.forEach(c => {
        listEl.innerHTML += `
            <div class="contact">
                <b>${c.firstName} ${c.lastName}</b>
                <p>SDT: ${c.phone}</p>
                <p>Email: ${c.email}</p>
                <p>Địa chỉ: ${c.address}</p>
                <p>Công ty: ${c.company}</p>
                <p>Category: ${c.category}</p>

                <div class="actions">
                    <button onclick="deleteContact(${c.id})" class="delete">Xóa</button>
                </div>
            </div>
        `;
    });
}

renderList(contacts);

// XÓA
function deleteContact(id) {
    contacts = contacts.filter(c => c.id !== id);
    renderList(contacts);
}

// VALIDATE
function validate(data) {
    clearErrors();
    let isValid = true;

    if (!data.firstName) {
        showError("firstName", "Không được để trống");
        isValid = false;
    }

    if (!data.lastName) {
        showError("lastName", "Không được để trống");
        isValid = false;
    }

    if (!/^\d{10}$/.test(data.phone)) {
        showError("phone", "Số điện thoại phải 10 số");
        isValid = false;
    }

    if (!/^\S+@\S+\.\S+$/.test(data.email)) {
        showError("email", "Email không hợp lệ");
        isValid = false;
    }

    return isValid;
}
// HIỂN THỊ LỖI
function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorEl = input.nextElementSibling;
    errorEl.textContent = message;
}

function clearErrors() {
    document.querySelectorAll(".error").forEach(e => e.textContent = "");
}

// THÊM
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const newContact = {
        id: Date.now(),
        firstName: firstName.value,
        lastName: lastName.value,
        phone: phone.value,
        email: email.value,
        address: address.value,
        company: company.value,
        category: category.value
    };

    if (!validate(newContact)) return;

    contacts.push(newContact);
    renderList(contacts);

    form.reset();
});