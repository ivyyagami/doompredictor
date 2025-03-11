function validateLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMsg = document.getElementById("error-message");

    const validUsername = "doom";
    const validPassword = "asd12345";

    if (username.length < 4 || username.length > 12) {
        errorMsg.innerText = "Username must be 4-12 characters long.";
        errorMsg.style.display = "block";
        return;
    }

    if (!/^[a-zA-Z0-9]{8,18}$/.test(password)) {
        errorMsg.innerText = "Password must be 8-18 characters long and contain only letters and numbers.";
        errorMsg.style.display = "block";
        return;
    }

    errorMsg.style.display = "none";
    document.querySelector(".btn").innerText = "Loading...";
    document.querySelector(".btn").disabled = true;

    setTimeout(() => {
        if (username === validUsername && password === validPassword) {
            window.location.href = "predictor.html";
        } else {
            errorMsg.innerText = "Invalid credentials";
            errorMsg.style.display = "block";
            document.querySelector(".btn").innerText = "Sign In";
            document.querySelector(".btn").disabled = false;
        }
    }, 3000);
}