export default class DeletedWork {
    baseUrl = "http://localhost:5678/api/works"

    async deletedProjectService(credentials){
        try {
            console.log("HELLO SERVICE");
            const deleted = await fetch(this.baseUrl + "/" + credentials.id, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + credentials.token,
                }
            });
            return deleted;
        } catch (error) {
            console.error(error);
        }
    }


}