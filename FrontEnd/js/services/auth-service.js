export default class AuthService {
    baseUrl = "http://localhost:5678/api/users/"

    async login(credentials) {
        try {
            const body = JSON.stringify(credentials);

            const postLogin = await fetch(this.baseUrl + "login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body
            })

            if(postLogin.status === 200){
                const response = await postLogin.json();
                return response;
            } else {
                throw postLogin.statusText;
            }
        } catch (error) {
            console.error(error);
        }
    }
}