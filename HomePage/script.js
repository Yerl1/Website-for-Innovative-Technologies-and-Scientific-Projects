
const reviews = [
    {
        name: "Yerlan Dochshanov",
        text: "Excellent service! Best experience ever!",
        rating: 5,
        image: "img/account-circle.svg"
    },
    {
        name: "Timur Chuyko",
        text: "Average experience, could be better",
        rating: 3,
        image: "img/account-circle.svg"
    },
    {
        name: "Zhaslan Kabiev",
        text: "Very poor service quality",
        rating: 1,
        image: "img/account-circle.svg"
    },
    {
        name: "Kasim Aubakirov",
        text: "There are more things to upgrade",
        rating: 2,
        image: "img/account-circle.svg"
    },
    // Add more reviews as needed
];

// Function to render reviews
function renderReviews(filterRating = 'all') {
    const $reviewsStack = $('.ReviewsStack');
    $reviewsStack.empty();

    const filtered = reviews.filter(review => 
        filterRating === 'all' || review.rating === parseInt(filterRating)
    );

    filtered.forEach(review => {
        $reviewsStack.append(`
            <div class="card mb-3 w-100" data-rating="${review.rating}" style="max-width: 800px;">
                <div class="row g-0">
                    <div class="col-md-2">
                        <img src="${review.image}" class="img-fluid rounded-start h-100" alt="${review.name}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${review.name}</h5>
                            <p class="card-text">${review.text}</p>
                            <div class="rating-display">
                                ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);
    });
}

// Initial render and event handlers
$(document).ready(function() {
    // Add "All" rating option
    $('.rating-area').prepend(`
        <input type="radio" id="star-all" name="rating" value="all" checked>
        <label for="star-all" title="All Ratings"></label>
    `);

    // Initial render
    renderReviews();

    // Filter reviews when rating changes
    $('input[name="rating"]').change(function() {
        const rating = $(this).val();
        renderReviews(rating);
    });
});

$(document).ready(function () {
    $("form").submit(function (event) {
        event.preventDefault(); // Prevent form submission

        let isValid = true; // Track if all inputs are valid

        // Reset previous errors
        $(".form-control").removeClass("is-invalid");
        $(".error-text").remove();

        // Validate Name
        let name = $("#name").val().trim();
        if (name.length < 2) {
            showError("#name", "Name must be at least 2 characters.");
            isValid = false;
        }

        // Validate Email
        let email = $("#email").val().trim();
        let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            showError("#email", "Enter a valid email address.");
            isValid = false;
        }

        // Validate Phone
        let phone = $("#phone").val().trim();
        let phonePattern = /^[0-9]{10,}$/;
        if (!phonePattern.test(phone)) {
            showError("#phone", "Enter a valid phone number (at least 10 digits).");
            isValid = false;
        }

        // Validate Message
        let message = $("#message").val().trim();
        if (message.length === 0) {
            showError("#message", "Message cannot be empty.");
            isValid = false;
        }

        // If all inputs are valid, show success alert
        if (isValid) {
            alert("✅ Your message has been sent successfully!");
            $("form")[0].reset(); // Reset the form after successful submission
        }
    });

    // Function to show error messages
    function showError(inputSelector, message) {
        $(inputSelector).addClass("is-invalid").after(`<div class="error-text text-danger">${message}</div>`);
    }
});