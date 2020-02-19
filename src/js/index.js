function addFixedHeightToDropdown(dropdownDOMElement) {
    if( typeof(dropdownDOMElement.classList) !== 'object') 
        return;

    var dropdown = $(dropdownDOMElement);
    var content = dropdown.find('.content').get(0);
    var contentContainer = content.parentElement;
    var contentHeight = content.offsetHeight;
    
    contentContainer.style.height = contentHeight + 'px';
}

function removeFixedHeightFromDropdown(dropdownDOMElement) {
    if( typeof(dropdownDOMElement.classList) !== 'object') 
        return;

    var dropdown = $(dropdownDOMElement);
    var content = dropdown.find('.content-container').get(0);
    
    content.style.height = '';
}

function resetAllDropdowns() {
    var dropdowns = $('.dropdown-section .dropdowns-container .dropdown');
    var countDropdowns = dropdowns.length;
    var dropdown;

    for (var i = 0; i < countDropdowns; i++) {
        dropdown = dropdowns[i];
        removeFixedHeightFromDropdown(dropdown);
        removeClass(dropdown, 'active');
    }
}

function addClass(el, className = 'active') {
    if(
        typeof(el) !== 'object' ||
        typeof(el.classList) !== 'object'
    ) {
        return false;
    }

    el.classList.add(className);
}

function removeClass(el, className = 'active') {
    if(
        typeof(el) !== 'object' ||
        typeof(el.classList) !== 'object'
    ) {
        return false;
    }

    el.classList.remove(className);
}

function controlClass(el, className = 'active') {
    if(
        typeof(el) !== 'object' ||
        typeof(el.classList) !== 'object'
    ) {
        return false;
    }

    if(el.classList.contains(className)) {
        el.classList.remove(className);
    }else {
        el.classList.add(className);
    }
}

function disableButton(form) {
    var button = $(form).find('button[type=submit]');
    button.attr('disabled', true);
}

function enableButton(form) {
    var button = $(form).find('button[type=submit]');
    button.attr('disabled', false);
}

function sendMail() {
    /*
    $.ajax({
        type: 'POST',
        url: 'https://api.sendgrid.com/api/mail.send.json',
        contentType: 'application/json',
        data: {
            api_user: '',
            api_key: '',
            to: [{
                email: ''
            }],
            subject: "",
            from: '',
        },
    }).done(function(response) {
        console.log(response);
    });
    */

    return true;
}

function isNameValid(name) {
    if(name == undefined)
        return false;

    return (name.length > 2 && name.length < 31);
}

function isEmailValid(email) {
    if(email == undefined)
        return false;

    var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(String(email).toLowerCase());
}

function isPhoneValid(phone) {
    if(phone == undefined)
        return false;
    
    var regexOnlyNumbers = /\d+/g;
    var regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    
    phone = phone.match(regexOnlyNumbers).join('');
    
    return regexPhone.test(phone);
}

function isMessageValid(message) {
    if(message == undefined)
        return false;

    return (message.length > 9 && name.length < 531);
}

function isFormValid(form) {
    var nameInput = $(form).find('input[name=name]').get(0);
    var phoneInput = $(form).find('input[name=phone]').get(0);
    var emailInput = $(form).find('input[name=email]').get(0);
    var messageTextarea = $(form).find('textarea').get(0);

    if(!isNameValid(nameInput.value)) {
        addClass(nameInput, 'error');
        toastr.warning('Nome deve coner entre 3 e 30 caracteres');

        return false;
    }
    
    if(!isEmailValid(emailInput.value)) {
        addClass(emailInput, 'error');
        toastr.warning('Email inválido');

        return false;
    }

    if(!isPhoneValid(phoneInput.value)) {
        addClass(phoneInput, 'error');
        toastr.warning('Telefone inválido');
        return false;
    }

    if(!isMessageValid(messageTextarea.value)) {
        addClass(messageTextarea, 'error');
        toastr.warning('Sua mensagem deve conter entre 10 e 150 caracteres');
        return false;
    }

    return true;
}

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    console.log(elem);
    console.log(((elemBottom <= docViewBottom) && (elemTop >= docViewTop)));
    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

$(window).on('scroll', function(e) {

    var targets = $('.anime');
    var countTargets = targets.length;

    for (var i = 0; i < countTargets; i++) {
        var target = targets[i];
        if (isScrolledIntoView(target)) {
            addClass(target, 'anime-init');
        }
    }
});

$('.big-banner .carroussel').slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
});

$('.container-multiple-slides .carroussel').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    dots: false,
    draggable: false,
    responsive: [
        {
            breakpoint: 1280,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: false,
                dots: false
            }
        },
        {
            breakpoint: 1000,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: false,
                dots: false
            }
        },
    ]
});

$('.container-multiple-slides .arrows .prev').on('click', function(){
    $('.container-multiple-slides .carroussel').slick('slickPrev');
});

$('.container-multiple-slides .arrows .next').on('click', function(){
    $('.container-multiple-slides .carroussel').slick('slickNext');
});

$('.dropdown-section .dropdowns-container .dropdown header').on('click', function(e) {
    e.preventDefault();

    var dropdown = e.currentTarget.parentElement;

    if(dropdown.classList.contains('active')) {
        removeFixedHeightFromDropdown(dropdown);
        removeClass(dropdown, 'active');
    }else {
        resetAllDropdowns();
        addFixedHeightToDropdown(dropdown);
        addClass(dropdown, 'active');
    }
});

$('.phone-with-ddd').mask('(00) 0000-0000');

$('#contact-form').on('keypress', 'input.error', function() {
    removeClass(this, 'error');
});

$('#contact-form').on('keypress', 'textarea.error', function() {
    removeClass(this, 'error');
});

$('#contact-form').on('keydown', 'textarea', function(e) {
    if(this.value.length >= 530 && e.keyCode !== 8 && e.keyCode !== 46) {
        toastr.warning('Você atingiu o limite de caracteres');
        e.stopImmediatePropagation();
        this.value = this.value.substring(0, 530);
        return false;
    }
});

$('#contact-form').on('submit', function(e) {
    e.preventDefault();

    var form = this, inputs, textarea;

    disableButton(form);

    if(isFormValid(form) != true) {
        enableButton(form);
        return false;
    }

    //sendEmail();

    enableButton(form);

    toastr.options.progressBar = true;
    toastr.success('Retornaremos em breve', 'E-mail enviado');

    return true;
});