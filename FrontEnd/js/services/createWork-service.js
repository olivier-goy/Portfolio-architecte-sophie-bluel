export default class CreateWorkService {
    baseUrl = "http://localhost:5678/api/works"

    async createWork(body) {
        try {
            const sendNewWork = await fetch(this.baseUrl, {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body
            });

            if(sendNewWork.status === 201) {
                const json = await sendNewWork.json();
                return json;
            } else {
                return await sendNewWork;
            }
        } catch (error) {
            console.error(error);
        }
    }
}