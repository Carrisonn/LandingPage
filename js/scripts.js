document.addEventListener('DOMContentLoaded', () => {
    const inputName =  document.querySelector('#name');
    const inputMail =  document.querySelector('#email');
    const inputPassword = document.querySelector('#password');
    const inputPhone = document.querySelector('#phone');
    const btnSubmit = document.querySelector('#submit');
    const form = document.querySelector('#form');
    const spinner = document.querySelector('#spinner');
    
    inputName.addEventListener('blur', validate);
    inputMail.addEventListener('blur', validate);
    inputPassword.addEventListener('blur', validate);
    inputPhone.addEventListener('blur', validate);
    form.addEventListener('submit', submitForm);
    
    const formInfo = {
        name: '',
        email: '',
        password: '',
        phone: ''
    }
    
    window.addEventListener('load', () => checkFormInfo(), form.reset());
    

    function validate(event) {
        if(event.target.value.trim() === '') {
            showAlert(`The ${event.target.id} is mandatory`, event.target.parentElement);
            checkFormInfo();
            return;
        }

        if(event.target.id === 'name' && event.target.value.length > 30) {
            showAlert('Your name is too long', event.target.parentElement);
            formInfo[event.target.name] = '';
            inputName.value = '';
            checkFormInfo();
            return;
        }

        if(event.target.id === 'email' && !validateEmail(event.target.value)) {
            showAlert('Invalid email', event.target.parentElement);
            formInfo[event.target.name] = '';
            inputMail.value = '';
            checkFormInfo();
            return;
        }

        if(event.target.id === 'password' && !validatePassword(event.target.value)) {
            showAlert('The password must contain between 8 and 16 characters, at least one digit, at least one lowercase and at least one uppercase letter.', event.target.parentElement)
            formInfo[event.target.name] = '';
            inputPassword.value = '';
            checkFormInfo();
            return;
        }

        if(event.target.id === 'phone' && !validatePhone(event.target.value)) {
            showAlert('The number must contain 9 digits or is an invalid number', event.target.parentElement);
            formInfo[event.target.name] = '';
            inputPhone.value = '';
            checkFormInfo();
            return;
        }

        formInfo[event.target.name] = event.target.value.trim().toLowerCase();
        checkFormInfo();
    };
    
    function validateEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const result = regex.test(email);
        return result;
    };
    
    function validatePassword(password) {
        const regex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
        const result = regex.test(password);
        return result;
    };
    
    function validatePhone(phone) {
        const regex = /^[6789]\d{8}$/;
        const result = regex.test(phone);
        return result;
    };
    
    function checkFormInfo() {
        if(Object.values(formInfo).includes('')) {
            btnSubmit.classList.add('disabled');
            btnSubmit.disabled = true;
        } else {
            btnSubmit.classList.remove('disabled');
            btnSubmit.disabled =  false;
        }
    };
    
    function submitForm(event) {
        event.preventDefault();
        
        spinner.classList.remove('hide-spinner');
        
        setTimeout(() => {
            spinner.classList.add('hide-spinner');
            
            Swal.fire({
                title: "Success!",
                text: "You suscribed to our News Letter!",
                icon: "success",
                confirmButtonText: "Nice!",
                allowOutsideClick: false
            });
        }, 4000);
        
        Object.keys(formInfo).forEach(key => formInfo[key] = '');
        form.reset();
        checkFormInfo();
    };

    function showAlert(message, referenceParent) {
        cleanAlert(referenceParent);
    
        const msgError = document.createElement('P');
        msgError.textContent =  message;
        msgError.classList.add('error');
        referenceParent.appendChild(msgError);
    
        setTimeout(() => {
            msgError.remove();
        }, 4000);
    };
    
    function cleanAlert(referenceParent) {
        const alert = referenceParent.querySelector('.error');
        alert ? alert.remove() : null;
    };
});
