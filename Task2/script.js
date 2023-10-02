document.querySelector('.form__btn').onclick = validation;
const error = document.querySelector('.error');
//Динамическая валидация полей ри вводе
//имя
const form = document.forms.formRegistration;
const nameInput = document.getElementById('name');
const errorName = document.querySelector('.error_name');
const namePattern = /^[a-zA-Zа-яА-я ]{2,20}$/;
nameInput.oninput = function () {
    let nameValue = nameInput.value;
    if (nameValue.match(namePattern) || nameValue == "") {
        errorName.classList.add('invisible');
        nameInput.classList.remove('form__input__error'); //убрать подсветку поля красным
    } else {
        errorName.classList.remove('invisible');

    }
}
//email
const emailInput = document.getElementById('email');
const errorEmail = document.querySelector('.error_email');
const emailPattern = /^[/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,30}$/i;
emailInput.oninput = function () {
    let emailValue = emailInput.value;
    if (emailValue.match(emailPattern) || emailValue == "") {
        errorEmail.classList.add('invisible');
        emailInput.classList.remove('form__input__error'); //убрать подсветку поля красным
    } else {
        errorEmail.classList.remove('invisible');
    }
}
//Возраст
const ageInput = document.getElementById('age');
const errorAge = document.querySelector('.error_age');
ageInput.oninput = function () {
    let ageValue = ageInput.value;
    if (ageValue >= 14 && ageValue < 100) {
        errorAge.classList.add('invisible');
        ageInput.classList.remove('form__input__error'); //убрать подсветку поля красным
    } else {
        ageInput.classList.add('form__input__error');
        errorAge.classList.remove('invisible');
    }//добавить подсветку поля красным
}
//Пол

// const sexInputArr = document.querySelectorAll('input[type="radio"][name="sex"]');
// const sexWrap = document.querySelector('.form__input__sex');
// sexInputArr.forEach(function (sex) {
//     sex.onchange = function () {
//         sexWrap.classList.remove('form__input__error');
//     }
// })

//Профессия
const professionInput = form.elements.professions;
//console.log(professionInput);
professionInput.onchange = function () {
    professionInput.classList.remove('form__input__error');
}

//пароль первое поле
const parol1Input = document.getElementById('parol1');
const error_parol1 = document.querySelector('.error_parol1');
const parolPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,20}$/;
parol1Input.oninput = function () {
    let parol1Value = parol1Input.value;
    if (parol1Value.match(parolPattern) || parol1Value == "") {
        error_parol1.classList.add('invisible');
    } else {
        error_parol1.classList.remove('invisible');
    }
}
//пароль второе поле
const parol2Input = document.getElementById('parol2');
const error_parol2 = document.querySelector('.error_parol2');
parol2Input.oninput = function () {
    console.log('сверка паролней');
    let parol2Value = parol2Input.value;
    let parol1Value = parol1Input.value;
    if (parol1Value === parol2Value) {
        error_parol2.classList.add('invisible');
    } else {
        error_parol2.classList.remove('invisible');
    }

}
//согласие на обработку персональных данных
const agreementInput = form.elements.agreement;
const agreementLabel = document.querySelector('.agreement');
agreementInput.onchange = function () {
    agreementLabel.classList.remove('form__input__errorLebel');
}

// ---------------------------------------------------------

//функция валидации при нажатии на кнопку
function validation(event) {
    event.preventDefault(event); //отмена события по умолчанию
    let test = 'false';
    const sexInput = form.elements.sex;

    //очищение формы от ошибок
    clearForm();
    //валидация имени
    test = validationName(nameInput);
    //валидация email
    test = validationEmail(emailInput);
    // валидация возраста
    test = validationAge(ageInput);
    //валидация пола - не было в задании
    // const sexInput = document.querySelector('input[type="radio"]:checked');
    // test = validationSex(sexInput);
    //валидация профессии
    test = validationProfession(professionInput);
    //валидация пароля
    test = validationPassword(parol1Input);
    test = validationPassword(parol2Input);
    //валидация согласия
    test = validationAgreement(agreementInput);

    // console.log(test);
    if (test == 'true') {
        console.log('Ура! Все данные введены верно');
        console.log('Ваше имя:', nameInput.value);
        console.log('Ваш email:', emailInput.value);
        console.log('Ваш возраст:', ageInput.value);
        console.log('Ваш пол:', sexInput.value);
        console.log('Ваша проффесия:', professionInput.value);
        console.log('Ваш пароль:', parol1Input.value);
        console.log('Ваше согласие:', agreementInput.value);
        form.reset();
    }
}

// -----------------Ниже функции валидайции формы при нажатии на кнопку

function clearForm() {
    error.classList.add('invisible');//убираем сообщение об ошибке, если оно было

}

function validationName(input) {
    let validity = input.validity;
    let errorPattern = errorName.classList.contains('invisible');//false, если есть ошибка формата ввода

    if (validity.valueMissing) //значение не введено
    {
        input.classList.add('form__input__error'); //подсветить поле красным
        error.classList.remove('invisible'); // показать ошибку, что не все поля заполнены
        return 'false';
    } else if (errorPattern) //если ошибок ввода нет
    {
        error.classList.add('invisible'); //скрыть ошибку формата ввода
        input.classList.remove('form__input__error');//убрать красную подсветку поля
        console.log('валидания имени прошла успешно');
        return 'true';
    } else {//подсветить поле с ошибкой
        input.classList.add('form__input__error');
        return 'false';
    }
}
function validationEmail(input) {
    let validity = input.validity;
    let errorPattern = errorEmail.classList.contains('invisible');//false, если есть ошибка формата ввода

    if (validity.valueMissing) //значение не введено
    {
        input.classList.add('form__input__error'); //подсветить поле красным
        error.classList.remove('invisible'); // показать ошибку, что не все поля заполнены
        return 'false';
    } else if (errorPattern) //если ошибок ввода нет
    {
        error.classList.add('invisible'); //скрыть ошибку формата ввода
        input.classList.remove('form__input__error');//убрать красную подсветку поля
        console.log('валидания email прошла успешно');
        return 'true';
    } else {//подсветить поле с ошибкой
        input.classList.add('form__input__error');
        return 'false';
    }
}

function validationAge(input) {
    let validity = input.validity;
    let errorPattern = errorAge.classList.contains('invisible');//false, если есть ошибка формата ввода
    if (validity.valueMissing) //значение не введено
    {
        input.classList.add('form__input__error'); //подсветить поле красным
        return 'false';
    } else if (errorPattern) //если ошибок ввода нет
    {
        error.classList.add('invisible'); //скрыть ошибку формата ввода
        input.classList.remove('form__input__error');//убрать красную подсветку поля
        console.log('валидания возраста прошла успешно');
        return 'true';
    } else {//подсветить поле с ошибкой
        input.classList.add('form__input__error');
        return 'false';
    }
}
// в заданнии не было это поле обязательным
// function validationSex(input) {
//     // console.log(input);
//     if (input == null) {
//         // console.log('не выбран пол');
//         sexWrap.classList.add('form__input__error');
//     } else {
//         sexWrap.classList.remove('form__input__error');
//     }
// }

function validationProfession(input) {
    if (input.selectedIndex > 0) {
        // console.log('не выбран пол');
        professionInput.classList.remove('form__input__error');
        console.log('валидания профессии прошла успешно');
        return 'true';
    } else {
        professionInput.classList.add('form__input__error');
        return 'false';
    }
}

function validationPassword(input) {
    let validity = input.validity;
    let errorPattern = error_parol1.classList.contains('invisible');//false, если есть ошибка формата ввода

    if (validity.valueMissing) //значение не введено
    {
        input.classList.add('form__input__error'); //подсветить поле красным
        error.classList.remove('invisible'); // показать ошибку, что не все поля заполнены
        return 'false';
    } else if (errorPattern) //если ошибок ввода нет
    {
        error.classList.add('invisible'); //скрыть ошибку формата ввода
        input.classList.remove('form__input__error');//убрать красную подсветку поля
        console.log('валидания пароля1 прошла успешно');
        return 'true';
    } else {//подсветить поле с ошибкой
        input.classList.add('form__input__error');
        return 'false';
    }
}

function validationAgreement(input) {

    if (input.checked) {
        agreementLabel.classList.remove('form__input__errorLebel');
        console.log('валидания согласия прошла успешно');
        return 'true';
    } else {
        agreementLabel.classList.add('form__input__errorLebel');
        return 'false';
    }
}