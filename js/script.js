//--------------------------------------------------------------------------//
// Form validation
//--------------------------------------------------------------------------//

// Custome validation messages for each input based on id
const errorMessage = {
    fname: "Your first name should contain only letters, be capitalised and longer than two characters long",
    lname: "Your last name should contain only letters, be capitalised and longer than two characters long",
    email: "Provide a valid email address",
    password: `Your password should contain: a capital letter, a lower case letter, a number, no spaces and be longer than 6 characters long`,
    "confirm-password": "Passwords must match",
    "public-key":
        "A public key can only contain letters, numbers hyphens and underscores",
    agree: "You must agree to the terms and conditions and the privacy policy to proceed",
};

function checkElementValid(elem) {
    elem.setCustomValidity("");
    if (!elem.checkValidity()) {
        // Set custom error message
        elem.setCustomValidity(errorMessage[elem.getAttribute("id")]);

        //Set error div to error message
        let errorDiv = document.querySelector(
            "#" + elem.parentNode.getAttribute("id") + "> .error"
        );
        errorDiv.innerHTML = elem.validationMessage;
        // Set border top styling (Doing so in CSS creates conflicts with the
        // checkbox validation)
        errorDiv.style.borderTop = "1px solid #ef233c";
        return true;
    } else {
        elem.setCustomValidity("");
        return false;
    }
}

// Run on form submission
function validateFormOnSubmit(e) {
    // Get all form controls
    const [form] = document.getElementsByTagName("form");

    // Check HTML validity of user input
    let errorCheck = false;
    for (let elem of form.elements) {
        errorCheck = errorCheck && checkElementValid(elem);
        console.log(checkElementValid(elem));
    }

    // Check that passwords match
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirm-password");

    // Check that there are no empty values
    if (password && confirmPassword) {
        // Check that passwords match
        if (password.value != confirmPassword.value) {
            //Set custom error message
            confirmPassword.setCustomValidity("Passwords must match");

            //Set error div to error message
            let errorDiv = document.querySelector(
                "#" + confirmPassword.parentNode.getAttribute("id") + "> .error"
            );
            errorDiv.innerHTML = confirmPassword.validationMessage;
            // Set error flag to prevent form from submitting
            errorCheck = true;
        }
    }

    if (errorCheck) {
        // Prevent form submission on form error
        return false;
    } else {
        // Prevent form submission as there is no back end: Ordinarilly this is
        // where a post fetch request could be made
        alert("Registration Successful");
        return false;
    }
}

// Check input validity on input and show custom error message depending on
// element id
function validateOnFormInput(e) {
    // Capture the element which received input
    const elem = e.target;

    // Validation check for the element
    checkElementValid(elem);
}

// END FORM VALIDATION
//--------------------------------------------------------------------------//

//--------------------------------------------------------------------------//
// SHOW/HIDE HELP POPUP
//--------------------------------------------------------------------------//
// Set behaviour for displaying and hiding help popup
// Set up element variables
let helpButton = document.getElementById("help");
let helpPopup = document.getElementById("help-popup");
let helpIframe = document.querySelector("#help-popup > iframe");

// Set up event listeners to show help popup
helpButton.addEventListener("mouseover", displayHelpPopup); // Hover event for desktop
helpButton.addEventListener("click", displayHelpPopup); // Set behaviour for mobile/tablet

// Display help popup and set up event listener for click outside of iframe element
function displayHelpPopup() {
    helpPopup.style.display = "flex";

    // Set event listener for click outside of iframe
    hideHelpPopup();
}

// Set up event listeners to hide help popup
function hideHelpPopup() {
    function outsideClickListener(event) {
        if (!helpPopup.contains(event.target)) {
            helpPopup.style.display = "none";

            // Reset iframe source to stop and reset video when popup hidden
            helpIframe.setAttribute("src", helpIframe.getAttribute("src"));

            removeListeners();
        }
    }

    function mouseoutListener() {
        helpPopup.style.display = "none";

        // Reset iframe source to stop and reset video when popup hidden
        helpIframe.setAttribute("src", helpIframe.getAttribute("src"));

        // Remove event listener for clicks outside of iframe
        removeListeners();
    }

    function removeListeners() {
        document.removeEventListener("click", outsideClickListener);
        helpIframe.removeEventListener("mouseout", mouseoutListener);
    }

    document.addEventListener("click", outsideClickListener); // Hide on mobile/tablet
    helpIframe.addEventListener("mouseout", mouseoutListener); // Hide on desktop
}

// END SHOW/HIDE HELP POPUP
//--------------------------------------------------------------------------//
