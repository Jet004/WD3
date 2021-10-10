//--------------------------------------------------------------------------//
// Form validation
//--------------------------------------------------------------------------//

// Custome validation messages for each input based on id
const errorMessage = {
    'fname': 'f',
    'lname': 'l',
    'email': 'e',
    'password': 'p',
    'confirm-password': 'cp',
    'public-key': 'pk',
    'agree': 'a'
}

// Prevent form submission
function validateFormOnSubmit(e){
    return false;
}

// Check input validity on input and show custom error message depending on
// element id
function validateOnFormInput(e){
    // Capture the element which received input
    const elem = e.target

    console.log(elem.getAttribute('id'))
    if(!elem.checkValidity()){
        // Get parent node then build css query to select error div child
        document.querySelector('#' + elem.parentNode.getAttribute('id') + '> .error').innerHTML = errorMessage[elem.getAttribute('id')] 
        // elem.nextElementSibling.nextElementSibling.innerHTML = errorMessage[elem.getAttribute('id')]  
    }
}



//--------------------------------------------------------------------------//


//--------------------------------------------------------------------------//
// SHOW/HIDE HELP POPUP
//--------------------------------------------------------------------------//
// Set behaviour for displaying and hiding help popup
// Set up element variables
let helpButton = document.getElementById('help')
let helpPopup = document.getElementById('help-popup')
let helpIframe = document.querySelector('#help-popup > iframe')

// Set up event listeners to show help popup
helpButton.addEventListener('mouseover', displayHelpPopup) // Hover event for desktop
helpButton.addEventListener('click', displayHelpPopup) // Set behaviour for mobile/tablet

// Display help popup and set up event listener for click outside of iframe element
function displayHelpPopup(){
    helpPopup.style.display = 'flex';

    // Set event listener for click outside of iframe
    hideHelpPopup()
}

// Set up event listeners to hide help popup
function hideHelpPopup(){
    function outsideClickListener(event){
        if (!helpPopup.contains(event.target)){
            helpPopup.style.display = 'none'

            // Reset iframe source to stop and reset video when popup hidden
            helpIframe.setAttribute('src', helpIframe.getAttribute('src'))

            removeListeners()
        }
    }

    function mouseoutListener(){
        helpPopup.style.display = 'none'

        // Reset iframe source to stop and reset video when popup hidden
        helpIframe.setAttribute('src', helpIframe.getAttribute('src'))

        // Remove event listener for clicks outside of iframe
        removeListeners()
    }

    function removeListeners(){
        document.removeEventListener('click', outsideClickListener)
        helpIframe.removeEventListener('mouseout', mouseoutListener)
    }

    document.addEventListener('click', outsideClickListener) // Hide on mobile/tablet
    helpIframe.addEventListener('mouseout', mouseoutListener) // Hide on desktop
}

//--------------------------------------------------------------------------//