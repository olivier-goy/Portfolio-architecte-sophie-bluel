export default class DeletedWork {
    baseUrl = "http://localhost:5678/api/works"

    async deletedProjectService(credentials){
        try {
            const deleted = await fetch(this.baseUrl + "/" + credentials.id, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + credentials.token,
                }
            });

            if(deleted.status === 401) {
                const json = await deleted.json();
                return json
            } else if (deleted.status === 500) {
                alert("Une Erreur c'est produit");
            }
            
        } catch (error) {
            console.error(error);
        }
    }


}