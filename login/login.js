function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        // Perform your AJAX/Fetch login
        const username = loginForm.querySelector("#username").value;
        const password = loginForm.querySelector("#password").value;
        var xhr = new XMLHttpRequest();
        var url = "/api/login";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var json = JSON.parse(xhr.responseText);
                console.log(json);
                if (json.success) {
                    setFormMessage(loginForm, "success", "Login successful!");
                    document.cookie="token="+json.token+";expires="+json.expires+";path=/";
                    document.cookie="username="+json.username+";expires="+json.expires+";path=/";
                    setTimeout(() => {
                        window.location.href = "/Dashboard/dashboard.html";
                    }, 1000);
                } else {
                    setFormMessage(loginForm, "error", "Invalid username/password combination");
                }
            }
        };
        var data = JSON.stringify({
            username: username,
            password: password
        });
        xhr.send(data);

    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});

window.onload=check_token();

function check_token() {
    var xhr = new XMLHttpRequest();
    var url = "/api/check_token";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(json);
            if (json.valid) {
                window.location.href = "/Dashboard/dashboard.html";
            } else {
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            }
        }
    };
    var data = JSON.stringify({
        token: getCookie("token")
    });
    xhr.send(data);
}