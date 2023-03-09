import Category from "./category-model.js";

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
        this.category = new Category(projectData.category)        
    }

    createProjectCard() {
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        const figcaption = document.createElement("figcaption");

        figure.id = "gallery" + this.id;

        image.src = this.imageUrl;
        image.alt = this.title;
        image.crossOrigin = 'anonymous';

        figcaption.innerText = this.title;

        figure.appendChild(image);
        figure.appendChild(figcaption);

        return figure;
    }
}