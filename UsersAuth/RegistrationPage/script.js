const emailsDB = new Map();

function returnError(errorMessage, location) {
    stat = $("#Error" + location.substring(1)).remove();
    if (errorMessage.length > 0) {
        $(location).after(`<p style="color:red;" id="${"Error" + location.substring(1)}">${errorMessage}</p>`)
    }
}

function validateName(text, title, location) {
    if (text.length == 0) {
        returnError(title + " is empty", location)
        return false
    }
    for (let char of text) {
        if (char >= '0' && char <= '9') {
            returnError(title + " cannot contain digits", location)
            return false
        }
    }
    returnError("", location)
    return true
}
function validateEmail(text, title, location) {
    if (text.length == 0) {
        returnError(title + " is empty", location)
        return false
    }
    const pattern = /^(.+)@(\S+)$/
    if (!pattern.test(text)) {
        returnError(title + " format is invalid", location)
        return false;
    }

    text = text.trim();
    if (emailsDB.has(text)) {
        returnError(title + " have been already used for registration", location)
        return false
    }
    returnError("", location)
    return true
}

function validatePassword(text, title, location) {
    if (text.length == 0) {
        returnError(title + " is empty", location)
        return false
    }
    if (text.length < 8) {
        returnError(title + " must contain at least 8 symbols", location)
        return false
    }

    containNumbers = false
    containLetters = false
    containSymbols = false

    for (let char of text) {
        if (char >= '0' && char <= '9') {
            containNumbers = true
        } else if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
            containLetters = true
        } else {
            containSymbols = true
        }
    }
    if (!containNumbers || !containLetters || !containSymbols) {
        returnError(title + " must contain digits, letter and special symbols", location)
        return false
    }
    returnError("", location)
    return true
}

function validatePhoneNumber(text, title, location) {
    if (text.length == 0) {
        returnError(title + " is empty", location)
        return false
    }
    if (text.length != 11) {
        returnError(title + "'s length is not valid", location)
        return false
    }

    for (let char of text) {
        if (!(char >= '0' && char <= '9')) {
            returnError(title + " cannot contain any other symbols beside digits", location)
            return false
        }
    }
    returnError("", location)
    return true
}

function validateBirthDate(date, title, location) {
    if (isNaN(date)) {
        returnError(title + " is empty", location)
        return false
    }
    console.log(date)
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const year = day * 365;

    let currentYears = Math.round(Date.now() / year);
    let userYears = Math.round(date / year);

    if (currentYears - userYears < 0) {
        returnError(title + " is invalid: you are not born yet", location);
        return false
    } else if (currentYears - userYears < 18) {
        returnError(title + " is invalid: you are to young to register here", location)
        return false
    }
    returnError("", location)
    return true
}

$("#RegistrationButton").click(function () {
    firstName = $("#firstName").val();
    secondName = $("#secondName").val();
    email = $("#email").val();
    password = $("#password").val();
    phone = $("#phoneNumber").val();
    date = new Date($("#dateOB").val());

    let verification = true;
    // Validation of names
    verification &= validateName(firstName, "First Name", "#firstName");
    verification &= validateName(secondName, "Second Name", "#secondName");
    // Validation of an email
    verification &= validateEmail(email, "Email", "#email");
    // Validation of the password
    verification &= validatePassword(password, "Password", "#password");
    // Validation of the Phone Number
    verification &= validatePhoneNumber(phone, "Phone number", "#phoneNumber");
    // Validation of Birth Date
    verification &= validateBirthDate(date, "Birth Date", "#dateOB");

    if (verification) {
        emailsDB.set(email, true)
        $("#RegistrationButton").animate({left: '100px'}, "slow");
        $("#RegistrationButton").animate({left: '-100px'}, "fast");
        $("#RegistrationButton").animate({left: '0px'}, "slow");
    }
});