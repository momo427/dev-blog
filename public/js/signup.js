const signupFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();

    // Gather the data from the form elements on the page
    const name = document.querySelector('#name-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (name && password) {
        // Send the e-mail and password to the server
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to create account');
        }
    }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);