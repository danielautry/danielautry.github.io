(function(){
    var bools = [false, false, false, false, false, false, false];

    $(window).scroll(function() {
         // console.log($(window).scrollTop());
        
        var offsetPoint1 = 500;
        var offsetPoint2 = 1535;
        var offsetPoint3 = 3870;
        var offsetPoint4 = 4850;
        var offsetPoint5 = 5400;
        var offsetPoint6 = 6100;
        var offsetPoint7 = 6700;
        

        if ($(window).scrollTop() >= offsetPoint1 && bools[0] != true) {
            bools[0] = true;
            $('.about-all').css('visibility', 'visible').hide().fadeIn(1000);

            $('.l1').css('-webkit-animation-play-state', 'running');
            $('.l20').css('-webkit-animation-play-state', 'running');
            $('.l21').css('-webkit-animation-play-state', 'running');
            $('.l3').css('-webkit-animation-play-state', 'running');
            $('.l4').css('-webkit-animation-play-state', 'running');
            $('.line3').css('-webkit-animation-play-state', 'running');
            $('.line4').css('-webkit-animation-play-state', 'running');
            
            $('.a-l1').css('-webkit-animation-play-state', 'running');
            $('.a-l2').css('-webkit-animation-play-state', 'running');
            $('.a-l3').css('-webkit-animation-play-state', 'running');
           
        }

        if ($(window).scrollTop() >= offsetPoint2 && bools[1] != true) {
            bools[1] = true;
            $('.services-all').css('visibility', 'visible').hide().fadeIn(1000);

            $('.s-l1').css('-webkit-animation-play-state', 'running');
            $('.s-l20').css('-webkit-animation-play-state', 'running');
            $('.s-l21').css('-webkit-animation-play-state', 'running');
            $('.s-l3').css('-webkit-animation-play-state', 'running');
            $('.s-line3').css('-webkit-animation-play-state', 'running');
            $('.s-line4').css('-webkit-animation-play-state', 'running');
           
        }

        if ($(window).scrollTop() >= offsetPoint3 && bools[2] != true) {
            bools[2] = true;
            $('.experience-whole').css('visibility', 'visible').hide().fadeIn(1000);

            $('.e-l1').css('-webkit-animation-play-state', 'running');
            $('.e-l20').css('-webkit-animation-play-state', 'running');
            $('.e-l21').css('-webkit-animation-play-state', 'running');
            $('.e-l3').css('-webkit-animation-play-state', 'running');
            $('.e-line3').css('-webkit-animation-play-state', 'running');
            $('.e-line4').css('-webkit-animation-play-state', 'running');
           
        }

        if ($(window).scrollTop() >= offsetPoint4 && bools[3] != true) {
            bools[3] = true;
            $('.abilities-title-box').css('visibility', 'visible').hide().fadeIn(1000);

            $('.ab-l1').css('-webkit-animation-play-state', 'running');
            $('.ab-l20').css('-webkit-animation-play-state', 'running');
            $('.ab-l21').css('-webkit-animation-play-state', 'running');
            $('.ab-l3').css('-webkit-animation-play-state', 'running');
            $('.ab-line3').css('-webkit-animation-play-state', 'running');
            $('.ab-line4').css('-webkit-animation-play-state', 'running');

            $('.abilities-text').css('visibility', 'visible').hide().fadeIn(1000);
            
        }

         if ($(window).scrollTop() >= offsetPoint5 && bools[4] != true) {
            bools[4] = true;
            $('.skillbars').css('visibility', 'visible').hide().fadeIn(1000);
            $('.skill').css('-webkit-animation-play-state', 'running');

        }

        if ($(window).scrollTop() >= offsetPoint6 && bools[5] != true) {
            bools[5] = true;
            $('.freelance-all').css('visibility', 'visible').hide().fadeIn(1000);

            $('.f-l1').css('-webkit-animation-play-state', 'running');
            $('.f-l20').css('-webkit-animation-play-state', 'running');
            $('.f-l21').css('-webkit-animation-play-state', 'running');
            $('.f-l3').css('-webkit-animation-play-state', 'running');
            $('.f-line3').css('-webkit-animation-play-state', 'running');
            $('.f-line4').css('-webkit-animation-play-state', 'running');

             $('.h-l1').css('-webkit-animation-play-state', 'running');
            $('.h-l20').css('-webkit-animation-play-state', 'running');
            $('.h-l21').css('-webkit-animation-play-state', 'running');
            $('.h-l3').css('-webkit-animation-play-state', 'running');
            $('.h-l40').css('-webkit-animation-play-state', 'running');
            $('.h-l41').css('-webkit-animation-play-state', 'running');
           
            
        }
        if ($(window).scrollTop() >= offsetPoint7 && bools[6] != true) {
            bools[6] = true;
            $('.contact-all').css('visibility', 'visible').hide().fadeIn(1000);

            $('.c-l1').css('-webkit-animation-play-state', 'running');
            $('.c-l20').css('-webkit-animation-play-state', 'running');
            $('.c-l21').css('-webkit-animation-play-state', 'running');
            $('.c-l3').css('-webkit-animation-play-state', 'running');
            $('.c-l4').css('-webkit-animation-play-state', 'running');
            $('.c-line3').css('-webkit-animation-play-state', 'running');
            $('.c-line4').css('-webkit-animation-play-state', 'running');
            $(this).off('scroll');
        }
        
    });
})();

$('.contact_form').submit(function () {
    var formData = $('.contact_form').serializeArray();
    var errors = validateForm(formData);

    if (errors[0] != "") {
        console.log("errors found");
        $('.form_errors').html(errors[0]);
        return false;
    }

    console.log("no errors, posting");

    $.post("send_form_email.php", formData);
    triggerMessageSent();

    return false;
});

function validateForm(data) {

    var numValues = 0;
    for (var i=0; i<data.length; i++){
        if (data[i]['value'] != "") numValues++;
    }

    if (numValues < 3) {
        return ["Name, Email, and Message are required fields"];
    }

    var validName = validateName(escapeHTML(data[0]['value']));
    var validEmail = validateEmail(escapeHTML(data[1]['value']));

    var validPhone;
    var message;
    
    if (numValues == 3){
        if (data[2]['value'] != "") {
            return ["Message field is required"];
        } else {
            message = escapeHTML(data[2]['value']);
            validPhone = "";
        }
    } else {
        validPhone = validatePhone(escapeHTML(data[2]['value']));
        message = escapeHTML(data[3]['value']);
    }

    var errors = [];
    var errorMessage = "";

    if (!validName) errorMessage += 'Valid name required\n<br>';
    if (!validEmail) errorMessage += 'Valid email required\n<br>';
    if (!validPhone && validPhone != "") errorMessage += 'Valid phone required';

    console.log("errorMessage", errorMessage);

    errors.push(errorMessage);
    console.log("errors", errors);

    return errors;
}

function validateName(name) {
    return /^[A-Za-z .'-]+$/.test(name);
}

function validateEmail(email) {
    return /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email);
}

function validatePhone(phone) {
    return /[^a-zA-Z.]/.test(phone);
}

function escapeHTML(text) {

    text.trim();

    var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function triggerMessageSent() {
    $('.form').fadeOut(500, function() {
        $('.form').css('display', 'none');
        $('.sent-social1').css('display', 'none');
        $('.message-sent').fadeIn(1000).css('display', "block");
    });
}

function scrollToAbout() {
    $('html, body').animate({ scrollTop: $('.about').offset().top }, 1200);
    return false;
}

function scrollToServices() {
    $('html, body').animate({ scrollTop: $('.services').offset().top }, 1500);
    return false;
}

function scrollToContact() {
    $('html, body').animate({ scrollTop: $('.contact').offset().top }, 2500);
    return false;
}

function scrollToPortfolio() {
    $('html, body').animate({ scrollTop: $('.freelance').offset().top }, 2400);
    return false;
}

function scrollTop() {
    $('html, body').animate({ scrollTop: $('.top').offset().top }, 1500);
    return false;
}

