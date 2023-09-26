let modal = document.querySelector("#modal");
let btn = document.querySelector("#btn");
let span = document.querySelector(".close");
let main = document.querySelector(".main");

btn.addEventListener("click", function () {
    modal.style.display = "block";
    main.classList.add("main_disable");
    btn.style.display = "none";
});

span.addEventListener("click", function () {
    modal.style.display = "none";
    main.classList.remove("main_disable");
    btn.style.display = "inline";
});

modal.addEventListener("click", function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
        main.classList.remove("main_disable");
        btn.style.display = "inline";
    }
});


function validForm (form) {
    
    function removeError(input) {
        const parent = input.parentNode;
        if (parent.classList.contains('error')) {
            parent.querySelector('.error-label').remove();
            parent.classList.remove('error');
        }
    }

    function removeErrorUpload () {
        // const parentDiv = upload.parentNode;
        const parent = document.querySelector('.modal-form__upload');
        // console.log(parent);
        if (parent.classList.contains('error')) {
            parent.querySelector('.error-label').remove();
            // console.log(parent.querySelector('error-label'))
            parent.classList.remove('error');
        }
    }
    function createError(input, text) {
        const parent = input.parentNode;
        const errorLabel = document.createElement('label');
        errorLabel.classList.add('error-label');
        errorLabel.textContent = text;
        parent.classList.add('error');
        parent.append(errorLabel);
    }

    function createErrorUpload(input, text) {
        const parentDiv = input.parentNode;
        const parent = parentDiv.parentNode;
        console.log(parent);
        const errorDiv = document.createElement('div')
        errorDiv.classList.add('error-label');
        errorDiv.textContent = text;
        parent.classList.add('error');
        parent.append(errorDiv);
    }

    let result = true;
    let inputs = form.querySelectorAll('.required');
    let upload = form.querySelector('.upload__file');
    let phone = form.querySelector('#phone');
    let email = form.querySelector('#email');
    let maskTel = /^[\d\+][\d\ -]{4,14}\d$/;
    let maskEmail = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    let validTel = maskTel.test(phone.value);
    let validEmail = maskEmail.test(email.value);
    for (const input of inputs) {
        removeError(input);
        
        if (input.value == "") {
            createError(input, 'Поле не заполнено!');
            result = false;
            input.style.margin = "0";
            
        }
    }

    
//    console.log(removeError(upload))

    
    
    removeError(phone);

    if (validTel) {
        result = true;
    } 
    else {
        createError(phone, 'Номер телефона введен неправильно!');
        result = false;
    }

    removeError(email);
    if (!validEmail) {
        createError(email, 'Email введен неправильно!');
        result = false;
    }
    removeErrorUpload(upload);

    if (upload.value == "") {
        createErrorUpload(upload, 'Загрузите картинку в формате: *jpg, *jpeg, *png');
        result = false;
    }

    return result
}

document.getElementById('modal-form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    if (validForm(this) == true) {
        alert('Сообщение отправлено');
    }
    

})


function showFile(e) {
    let files = e.target.files;
    for (let i = 0, f; f = files[i]; i++) {
        if (!f.type.match('image.*')) continue;
            let fr = new FileReader();
            fr.onload = (function(theFile) {
            return function(e) {
                let div = document.createElement('div');
                div.innerHTML = "<img src='" + e.target.result + "' />";
                document.getElementById('image').insertBefore(div, null);
                div.classList.add('image__loading');
                document.querySelector('.upload__img').style.display = "none";
                document.querySelector('.upload__text').style.display = "none";
            };
        })(f);

        fr.readAsDataURL(f);
    }
}
document.getElementById('logo').addEventListener('change', showFile, false);
document.querySelector('.delete-file ').addEventListener('click', function () {
    document.querySelector('.upload__img').style.display = "block";
    document.querySelector('.upload__text').style.display = "block";
    document.querySelector('.image__loading').remove();
})
