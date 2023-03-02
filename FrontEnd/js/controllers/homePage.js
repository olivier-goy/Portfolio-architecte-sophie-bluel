import Project from "../models/project-model.js";
import DeletedWork from "../services/deleteWork-service.js";

let projects;
let categories;
let deletedWork;

getDatas();

const isConnected = !!localStorage.getItem('token');
const login = document.getElementById('login');
login.innerText = isConnected ? "logout" : "login";
login.href = isConnected ? "" : "./loginPage.html";


async function getDatas() {

    const reponseApiWorks = await fetch("http://localhost:5678/api/works");
    const worksResponse = await reponseApiWorks.json();

    projects = worksResponse.map(work => new Project(work));
    generateHtml(projects);

    deletedWork = new DeletedWork();

    // categories = [...new Set(projects.map(project => project.category))];

    categories = [];
    projects.forEach(project => {
       const category = categories.find(cat => cat.id == project.category.id);
       if (!category) {
        categories.push(project.category); 
       }
    });

    userConnected();
    
    modalUser();
    
    generateDeletedModal();
    
    deletedProject();

    generateCategory();

    getCategoryData();
};

function userConnected() {
    if (isConnected) {
        login.addEventListener("click", function(){
            localStorage.clear();
            location.reload();
        });
    } else {
        document.getElementById('navBarUser').remove();
        document.getElementById('userBtnModification').remove();
        document.getElementById('modalProject').remove();
    }
}

function getCategoryData() {
    if (document.querySelector('.filterInput')) {
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
    }
};

function generateHtml(projects) {
    if(document.querySelector('.gallery')) {
        document.querySelector('.gallery').innerHTML = "";
        const gallery = document.querySelector('.gallery');

        for (const project of projects) {
            gallery.appendChild(project.createProjectCard());
        }
    }
};

function generateCategory() {
    if (document.getElementById('filter')) {
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
    }
};

function modalUser() {
    if (isConnected) {
        document.getElementById('portfolio').querySelector('h2').style = "padding-left: 80px;"

        const modal = document.getElementById('modalProject');
        const openModal = document.getElementById('userBtnModification');
    
        openModal.addEventListener('click', function(){
            modal.style.display = "block";
        });

        const closeModal = document.querySelector('.closeModal');

        closeModal.addEventListener('click', function(){
            modal.style.display = "none";
        });

        window.addEventListener('click', function(event){
            if(event.target == modal) {
                modal.style.display = "none";
            }
        });
    }
}

function generateDeletedModal() {
    if (document.getElementById('sectionModal')) {
        const sectionMain = document.getElementById('sectionModal');

        for (const project of projects) {
            const figure = document.createElement('figure');
            const image = document.createElement('img');
            const figcaption = document.createElement("figcaption");
            const btnDeleted = document.createElement('i');

            btnDeleted.classList = "fa-solid fa-trash-can fa-xs btnDeletedProject"
            btnDeleted.id = project.id;

            image.src = project.imageUrl;
            image.alt = project.title;
            image.crossOrigin = 'anonymous';

            figcaption.innerText = "éditer";

            sectionMain.appendChild(figure)
            figure.appendChild(btnDeleted)
            figure.appendChild(image);
            figure.appendChild(figcaption);
        }
    }
}

function deletedProject() {
    const btnListenerDeleted = document.querySelectorAll('.btnDeletedProject');

    for(let i = 0; btnListenerDeleted.length > i; i++) {
        const listenerDeletedProject = btnListenerDeleted[i];

        listenerDeletedProject.addEventListener("click", function() {
            const constructorDeleted = {
                id: listenerDeletedProject.id,
                token: localStorage.getItem("token")
            }

            const responseDeleted = deletedWork.deletedProjectService(constructorDeleted);


             
            if(!responseDeleted) {
                alert("Une erreur c'est produite");
            } else {
                document.getElementById('filter').innerHTML = "";
                document.getElementById('sectionModal').innerHTML = "";
                getDatas();
            }
        });
    }
}





















