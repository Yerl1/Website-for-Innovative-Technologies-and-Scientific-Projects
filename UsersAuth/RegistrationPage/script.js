$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault(); // Prevent form submission

        let isValid = true; // Track if form is valid

        // Reset previous errors
        $(".form-control").removeClass("is-invalid");
        $(".error-text").remove();

        // Validate First Name
        let firstName = $("#FirstNameInput").val().trim();
        if (firstName.length < 2) {
            showError("#FirstNameInput", "First name must be at least 2 characters.");
            isValid = false;
        }

        // Validate Second Name
        let secondName = $("#SeconNameInput").val().trim();
        if (secondName.length < 2) {
            showError("#SeconNameInput", "Second name must be at least 2 characters.");
            isValid = false;
        }

        // Validate Email
        let email = $("#EmailInput").val().trim();
        let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            showError("#EmailInput", "Enter a valid email address.");
            isValid = false;
        }

        // Validate Password
        let password = $("#PasswordInput").val().trim();
        if (password.length < 6) {
            showError("#PasswordInput", "Password must be at least 6 characters.");
            isValid = false;
        }

        // If all inputs are valid, show success message
        if (isValid) {
            alert("✅ Registration successful!");
            $("form")[0].reset(); // Reset form
        }
    });

    // Function to show error messages
    function showError(inputSelector, message) {
        $(inputSelector).addClass("is-invalid").after(`<div class="error-text text-danger">${message}</div>`);
    }
});
