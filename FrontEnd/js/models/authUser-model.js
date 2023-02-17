export default class AuthUser {
    email
    password

    // constructor(authUserData) {
    //     this.email = authUserData.email
    //     this.password = authUserData.password
    // }

    createAuthUserPage () {

        console.log(this.email);
        console.log(this.password);

        const loginPage = document.getElementById('contact');

        const titleAuth = document.createElement('h2');

        const formAuthPage = document.createElement('form');
        const labelInputEmail = document.createElement('label');
        const inputEmail = document.createElement('input');
        const labelInputPassword = document.createElement('label');
        const inputPassword = document.createElement('input');

        const inputSubmitAuth = document.createElement('input');

        const linkForgetPassword = document.createElement('a');

        titleAuth.innerText = "Log In";

        formAuthPage.method = "post";

        labelInputEmail.innerText = "E-mail";
        labelInputEmail.for = "email";

        inputEmail.type = "Email";
        inputEmail.id = "email";
        inputEmail.required;

        labelInputPassword.innerText = "Mot de passe";
        labelInputPassword.for = "pass";

        inputPassword.type = "password";
        inputPassword.id = "pass";
        inputPassword.required;

        inputSubmitAuth.type = "submit";
        inputSubmitAuth.value = "Se connerter";

        linkForgetPassword.href = "#";
        linkForgetPassword.innerText = "Mot de passe oublié";
        linkForgetPassword.width = "100%";

        loginPage.appendChild(titleAuth);
        loginPage.appendChild(formAuthPage);
        loginPage.appendChild(linkForgetPassword);

        formAuthPage.appendChild(labelInputEmail);
        formAuthPage.appendChild(inputEmail);
        formAuthPage.appendChild(labelInputPassword);
        formAuthPage.appendChild(inputPassword);
        formAuthPage.appendChild(inputSubmitAuth);

        console.log(inputSubmitAuth);


        return formAuthPage;

    }

}