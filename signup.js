// Form Validation
let registrationForm = document.querySelector('#myform')
registrationForm.addEventListener('submit', function(event){
    event.preventDefault();      // Stope auto form submission
    if (validateForm()){
        signUp()
        
    }
    
})

let validateForm = () => {
    
    return (checkFirstName() && checkLastName() && checkEmail() && checkPassword() && checkPin() && checkPhoneNumber())
}

let checkFirstName = () => {
    let inputEl = document.querySelector('#first_name')
    let inputFeedbackEl = document.querySelector('#firstname-feedback')
    let regExp = /^[a-zA-Z0-9]{4,10}$/
    if (regExp.test(inputEl.value)){
        makeValid(inputEl, inputFeedbackEl)
        return true
    }
    else {
        makeInValid(inputEl, inputFeedbackEl)
        return false
    }
}

let checkLastName = () => {
    let inputEl = document.querySelector('#last_name')
    let inputFeedbackEl = document.querySelector('#lastname-feedback')
    let regExp = /^[a-zA-Z0-9]{4,10}$/
    if (regExp.test(inputEl.value)){
        makeValid(inputEl, inputFeedbackEl)
        return true
    }
    else {
        makeInValid(inputEl, inputFeedbackEl)
        return false
    }
}

let checkEmail = () => {
    let inputEl = document.querySelector('#your_email')
    let inputFeedbackEl = document.querySelector('#email-feedback')
    let regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (regExp.test(inputEl.value)){
        makeValid(inputEl, inputFeedbackEl)
        return true
    }
    else {
        makeInValid(inputEl, inputFeedbackEl)
        return false
    }
}

let checkPassword = () => {
    let inputEl = document.querySelector('#password')
    let inputFeedbackEl = document.querySelector('#password-feedback')
    let regExp = /^[A-Za-z]\w{4,14}$/
    if (regExp.test(inputEl.value)){
        makeValid(inputEl, inputFeedbackEl)
        return true
    }
    else {
        makeInValid(inputEl, inputFeedbackEl)
        return false
    }
}

let checkPin = () => {
    let inputEl = document.querySelector('#pin')
    let inputFeedbackEl = document.querySelector('#pin-feedback')
    let regExp = /\d{4}$/
    if (regExp.test(inputEl.value)){
        makeValid(inputEl, inputFeedbackEl)
        return true
    }
    else {
        makeInValid(inputEl, inputFeedbackEl)
        return false
    }
}

let checkPhoneNumber = () => {
    let inputEl = document.querySelector('#phone')
    let inputFeedbackEl = document.querySelector('#phonenumber-feedback')
    let regExp = /\d{11}$/
    if (regExp.test(inputEl.value)){
        makeValid(inputEl, inputFeedbackEl)
        return true
    }
    else {
        makeInValid(inputEl, inputFeedbackEl)
        return false
    }
}


// Make Valid
let makeValid = (inputEl, inputFeedbackEl) => {
    inputEl.classList.add('is-form-valid')
    inputEl.classList.remove('is-form-invalid')
    inputFeedbackEl.classList.add('text-success')
    inputFeedbackEl.classList.remove('text-danger')
    inputFeedbackEl.innerHTML = 'Looks Good'
}

let makeInValid = (inputEl, inputFeedbackEl) => {
    inputEl.classList.remove('is-form-valid')
    inputEl.classList.add('is-form-invalid')
    inputFeedbackEl.classList.remove('text-success')
    inputFeedbackEl.classList.add('text-danger')
    inputFeedbackEl.innerHTML = `Please ${inputEl.placeholder}`
}

let firstnameEl = document.querySelector('#first_name')
firstnameEl.addEventListener('keyup', function(){
    checkFirstName()
})

let lastnameEl = document.querySelector('#last_name')
lastnameEl.addEventListener('keyup', function(){
    checkLastName()
})

let emailEl = document.querySelector('#your_email')
emailEl.addEventListener('keyup', function(){
    checkEmail()
})

let passwordEl = document.querySelector('#password')
passwordEl.addEventListener('keyup', function(){
    checkPassword()
})

let pinEl = document.querySelector('#pin')
pinEl.addEventListener('keyup', function(){
    checkPin()
})

let phoneNumberEl = document.querySelector('#phone')
phoneNumberEl.addEventListener('keyup', function(){
    checkPhoneNumber()
})

