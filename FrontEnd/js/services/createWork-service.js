export default class CreateWorkService {
    baseUrl = "http://localhost:5678/api/works"

    async createWork(body) {
        try {
            const sendNewWork = await fetch('http://localhost:5678/api/works', {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body
            });

            const response = await sendNewWork.json();

            return response;
            
        } catch (error) {
            console.error(error);
        }
    }
}