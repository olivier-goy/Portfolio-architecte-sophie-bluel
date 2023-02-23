import AuthUser from "../models/authUser-model.js";

let auth;

postData();
authLoginPage();

async function postData() {

    auth = new AuthUser();

    validateAuthUser();
};

function authLoginPage() {
    const login = document.querySelector('#login');
    login.addEventListener('click', function () {
        document.location.href="./loginPage.html"
    });
};

function validateAuthUser() {

    if (document.getElementById('submitAuth')) {
        const submitAuth = document.getElementById('submitAuth');
    
        submitAuth.addEventListener("click", function(event) {
            const emailLogin = document.getElementById('email');
            const password = document.getElementById('password');

            if(!emailLogin.value || !password.value) {
                alert("Veuillez remplire tout les champs avant de valider.")
            } else {
                const regexMail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
                const isValidEmail = regexMail.test(emailLogin.value);
    
                const regexPassword = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,10}$/gm);
                const isValidPassword = regexPassword.test(password.value);

                if (isValidEmail == true && isValidPassword == true ) {
                    event.preventDefault();

                    const constructorLogin = {
                        email: emailLogin.value,
                        password: password.value
                    }

                    const login = JSON.stringify(constructorLogin);

                    async function postLoginData () {
                        const postLogin = await fetch("http://localhost:5678/api/users/login", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: login
                        })

                        if(postLogin.status ==! 200) {
                            alert('Erreur dans l’identifiant ou le mot de passe')
                        } else {

                            const response = await postLogin.json();

                            const responseLogin = JSON.stringify(response)

                            localStorage.setItem('user', responseLogin);

                            document.location.href = "./index.html"
                        }
                    }

                    postLoginData();

                } else {
                    alert("Erreur dans l’identifiant ou le mot de passe");
                }
            }
        });
    }
}



