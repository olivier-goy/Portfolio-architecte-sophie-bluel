import AuthService from "../services/auth-service.js";

const authService = new AuthService();

validateAuthUser();

async function validateAuthUser() {
    const submitAuth = document.getElementById('submitAuth');

    if (submitAuth) { 
        submitAuth.addEventListener("submit", async function(event) {
            event.preventDefault();

            const emailLogin = document.getElementById('email');
            const password = document.getElementById('password');

            const regexMail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
            const isValidEmail = regexMail.test(emailLogin.value);

            const regexPassword = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,10}$/gm);
            const isValidPassword = regexPassword.test(password.value);

            if (isValidEmail && isValidPassword) {
                const constructorLogin = {
                    email: emailLogin.value,
                    password: password.value
                }

                const response = await authService.login(constructorLogin);
                
                if (!response) {
                    return alert("Erreur dans l’identifiant ou le mot de passe");
                } 
                localStorage.setItem('userId', response.userId);
                localStorage.setItem('token', response.token);

                document.location.href = "./index.html";
            } else {
                alert("Erreur dans l’identifiant ou le mot de passe");
            }

        });
    }
}



