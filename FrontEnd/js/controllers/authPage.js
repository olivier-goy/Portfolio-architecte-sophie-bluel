import AuthUser from "../models/authUser-model.js";

let auth;

postData();

authLoginPage();

authLoginUser();

async function postData() {
auth = new AuthUser();

};

function authLoginPage() {

    const login = document.querySelector('#login');
    login.addEventListener('click', function () {
        document.getElementById('introduction').innerHTML = "";
        document.getElementById('portfolio').innerHTML = "";
        document.getElementById('contact').innerHTML = "";
        
        auth.createAuthUserPage();
    });

};

function authLoginUser() {

    const authUserSubmit = document.querySelector

}


