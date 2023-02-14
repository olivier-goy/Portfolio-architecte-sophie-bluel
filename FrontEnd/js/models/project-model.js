export default class Project {
    id
    title
    imageUrl
    categoryId
    userId
    category

    constructor(projectData) {
        this.id = projectData.id
        this.title = projectData.title
        this.imageUrl = projectData.imageUrl
        this.categoryId = projectData.categoryId
        this.userId = projectData.userId
        this.category = projectData.category        
    }

    createProjectCard() {
        const gallery = document.querySelector(".gallery");
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        const figcaption = document.createElement("figcaption");

        gallery.appendChild(figure);
        figure.appendChild(image);
        figure.appendChild(figcaption);

        image.src = this.imageUrl;
        image.alt = this.title;

        console.log("coucou", this.imageUrl);

        figcaption.innerText = this.title;

        return figure;
    }

    createProjectTag() {

    }
}