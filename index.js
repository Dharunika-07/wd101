const form = document.getElementById('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const dobInput = document.getElementById('dob');
const termsInput = document.getElementById('terms');
const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];


window.addEventListener('load', loadTableData);

form.addEventListener('submit', function(e) {
    e.preventDefault();  

    if (validateForm()) {
        addToTable();
        saveToLocalStorage(); 
        form.reset();
    }
});

function validateForm() {
    let isValid = true;
    clearErrors();

   
    if (nameInput.value.trim() === '') {
        setErrorFor(nameInput, 'Name cannot be blank');
        isValid = false;
    }

  
    const emailValue = emailInput.value.trim();
    if (emailValue === '') {
        setErrorFor(emailInput, 'Email cannot be blank');
        isValid = false;
    } else if (!isValidEmail(emailValue)) {
        setErrorFor(emailInput, 'Email is not valid');
        isValid = false;
    }

    
    if (passwordInput.value.trim() === '') {
        setErrorFor(passwordInput, 'Password cannot be blank');
        isValid = false;
    }

    const dobValue = dobInput.value.trim();
    if (dobValue === '') {
        setErrorFor(dobInput, 'Date of Birth cannot be blank');
        isValid = false;
    } else if (!isValidDOB(dobValue)) {
        setErrorFor(dobInput, 'You must be between 18 and 55 years old');
        isValid = false;
    }

    if (!termsInput.checked) {
        setErrorFor(termsInput, 'You must accept the terms and conditions');
        isValid = false;
    }

    return isValid;
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}

function clearErrors() {
    document.querySelectorAll('.form-control').forEach(control => {
        control.className = 'form-control';
    });
}

function isValidEmail(email) {
    return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);
}

function isValidDOB(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age >= 18 && age <= 55;
}

function addToTable() {
    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    const dobValue = dobInput.value.trim();
    const termsValue = termsInput.checked;

    const newRow = userTable.insertRow();
    const nameCell = newRow.insertCell(0);
    const emailCell = newRow.insertCell(1);
    const passwordCell = newRow.insertCell(2);
    const dobCell = newRow.insertCell(3);
    const termsCell = newRow.insertCell(4);

    nameCell.textContent = nameValue;
    emailCell.textContent = emailValue;
    passwordCell.textContent = passwordValue;
    dobCell.textContent = dobValue;
    termsCell.textContent = termsValue ? 'true' : 'false';
}

function saveToLocalStorage() {
    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    const dobValue = dobInput.value.trim();
    const termsValue = termsInput.checked;

    const userData = {
        name: nameValue,
        email: emailValue,
        password: passwordValue,
        dob: dobValue,
        termsAccepted: termsValue
    };

    
    let users = JSON.parse(localStorage.getItem('users')) || [];

 
    users.push(userData);

   
    localStorage.setItem('users', JSON.stringify(users));
}

function loadTableData() {
    const users = JSON.parse(localStorage.getItem('users')) || [];

   
    users.forEach(user => {
        const newRow = userTable.insertRow();
        const nameCell = newRow.insertCell(0);
        const emailCell = newRow.insertCell(1);
        const passwordCell = newRow.insertCell(2);
        const dobCell = newRow.insertCell(3);
        const termsCell = newRow.insertCell(4);

        nameCell.textContent = user.name;
        emailCell.textContent = user.email;
        passwordCell.textContent = user.password;
        dobCell.textContent = user.dob;
        termsCell.textContent = user.termsAccepted ? 'true' : 'false';
    });
}
