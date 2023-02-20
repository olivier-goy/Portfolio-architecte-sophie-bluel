import Project from "../models/project-model.js";
import Category from "../models/category-model.js";

getDatas();

let projects;
let categories;

async function getDatas() {

    const reponseApiWorks = await fetch("http://localhost:5678/api/works");
    const worksResponse = await reponseApiWorks.json();

    const reponseApiCategories = await fetch("http://localhost:5678/api/categories");
    const categoriesResponse = await reponseApiCategories.json();

    projects = worksResponse.map(work => new Project(work));
    generateHtml(projects);

    categories = categoriesResponse.map(category => new Category(category));
    generateCategory();

    getCategoryData();

};

function getCategoryData() {

    const listenerFilter = document.querySelectorAll('.filterInput');

    listenerFilter[0].style.backgroundColor = "#1D6154";
    listenerFilter[0].style.color = "#FFFFFF";


    for(let i = 0; listenerFilter.length > i; i++) {
        
        const listener = listenerFilter[i];
        
      
        listener.addEventListener("click", function () {
            for (let i = 0; listenerFilter.length > i; i++) {
                listenerFilter[i].style = "";
            }
            listener.style.backgroundColor = "#1D6154";
            listener.style.color = "#FFFFFF";

            const filters = projects.filter(function (project) {

                if (listener.id == 0) {
                    return project;
                } else {
                    return project.categoryId == listener.id;
                }
            });
            generateHtml(filters);
        });

    }
};

function generateHtml(projects) {

    document.querySelector('.gallery').innerHTML = "";
    const gallery = document.querySelector('.gallery');

    for (const project of projects) {
        gallery.appendChild(project.createProjectCard());
    }
};

function generateCategory() {

    const gallery = document.getElementById('filter');
    const input = document.createElement('input');

    input.type = "button";
    input.classList = "filterInput";
    input.id = 0;
    input.placeholder = "Tous";
    input.value = "Tous";

    gallery.appendChild(input);

    for (const category of categories) {
       gallery.appendChild(category.createFilterCategory());
    }
};





















