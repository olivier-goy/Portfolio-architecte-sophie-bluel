import Project from "../models/project-model.js";
import DeletedWork from "../services/deleteWork-service.js";
import CreateWorkService from "../services/createWork-service.js";
import Category from "../models/category-model.js";

let projects;
let categories;
let deletedWork;
let createWork;
let categoriesApi;

getDatas();

const isConnected = !!localStorage.getItem('token');
const login = document.getElementById('login');
login.innerText = isConnected ? "logout" : "login";
login.href = isConnected ? "" : "./loginPage.html";


async function getDatas() {

    const reponseApiWorks = await fetch("http://localhost:5678/api/works");
    const worksResponse = await reponseApiWorks.json();

    const responseApiCategories = await fetch("http://localhost:5678/api/categories");
    const categoriesResponse = await responseApiCategories.json();


    projects = worksResponse.map(work => new Project(work));
    generateHtml(projects);

    deletedWork = new DeletedWork();

    categoriesApi = categoriesResponse.map(categoryApi => new Category(categoryApi));

    createWork = new CreateWorkService();

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

    generateAddWorkModal();

    validateAddNewWork();

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

        const backModal = document.querySelector('.backModal');
        backModal.addEventListener('click', function() {
            generateDeletedModal();
            generateAddWorkModal();
            deletedProject();
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
    if (document.querySelector('.modalContent')) {
        document.querySelector('.backModal').style.display = "none";
        document.getElementById('sectionModal').innerHTML = "";
        document.getElementById('sectionModal').style.display = "grid";
        document.getElementById('validateModal').innerHTML = "";
        document.getElementById('titleModal').innerText = "";

        document.getElementById('titleModal').innerText = "Galerie photo";

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

        const validateModal = document.getElementById('validateModal');
        const inputAddPicture = document.createElement('input');
        const br = document.createElement('br')
        const deleteAll = document.createElement('a');

        inputAddPicture.type = "submit";
        inputAddPicture.id = "addPicture";
        inputAddPicture.placeholder = "Ajouter une photo";
        inputAddPicture.value = "Ajouter une photo";

        deleteAll.id = "deleteAll";
        deleteAll.href = "#";
        deleteAll.innerText = "Supprimer la galerie";

        validateModal.appendChild(inputAddPicture);
        validateModal.appendChild(br);
        validateModal.appendChild(deleteAll);
    }
}

function deletedProject() {
    const btnListenerDeleted = document.querySelectorAll('.btnDeletedProject');

    for(let i = 0; btnListenerDeleted.length > i; i++) {
        const listenerDeletedProject = btnListenerDeleted[i];

        listenerDeletedProject.addEventListener("click", function(event) {
            const constructorDeleted = {
                id: listenerDeletedProject.id,
                token: localStorage.getItem("token")
            }

            const responseDeleted = deletedWork.deletedProjectService(constructorDeleted);

            if(!responseDeleted) {
                alert("Une erreur c'est produite");
            } else {
                event.target.parentNode.remove();
                // document.getElementById('filter').innerHTML = "";
                // document.getElementById('sectionModal').innerHTML = "";
                // getDatas();
            };
        });
    }
}
async function generateAddWorkModal() {
    if (document.getElementById('addPicture')) {
        const btnAddPicture = document.getElementById('addPicture');
    
        btnAddPicture.addEventListener("click", function() {
            document.querySelector('.backModal').style.display = "block"
            document.getElementById('sectionModal').innerHTML = "";
            document.getElementById('sectionModal').style.display = "flex";
            document.getElementById('validateModal').innerHTML = "";
            document.getElementById('titleModal').innerText = "";
            
    
            const title = document.getElementById('titleModal');
    
            title.innerText = "Ajouter photo";
    
            const sectionModal = document.getElementById('sectionModal');
            const form = document.createElement('form');
            const inputImage = document.createElement('input');
            const labelTitle = document.createElement('label');
            const inputTitle = document.createElement('input');
            const labelCategory = document.createElement('label');
            const selectCategory = document.createElement('select');
            const optionCategory = document.createElement('option');
    
            form.id = "submitAddWork";
            form.method = "POST";
            form.enctype = "multipart/form-data";
            form.name = "fileinfo"
            
            inputImage.id = "addNewProjectPicture"
            inputImage.type = "file";
            inputImage.name = "image"
            inputImage.accept = "image/jpeg, image/png"
            inputImage.ariaRequired = true
    
            labelTitle.innerText = "Titre";
    
            inputTitle.id = "addNewProjectTitle";
            inputTitle.type = "text";
            inputTitle.name = "title"
            inputTitle.ariaRequired = true;
    
    
            labelCategory.innerText = "Catégorie";
            labelCategory.htmlFor = "addNewProjectCategory"
    
            selectCategory.name = "category"
            selectCategory.id = "addNewProjectCategory";
            selectCategory.ariaRequired = true;
    
            optionCategory.value = "0";
            optionCategory.id = "selectCategory";
    
            sectionModal.appendChild(form);
    
            form.appendChild(inputImage);
            form.appendChild(labelTitle);
            form.appendChild(inputTitle);
            form.appendChild(labelCategory);
            form.appendChild(selectCategory);
    
            selectCategory.appendChild(optionCategory);
    
            for (const category of categoriesApi) {
                selectCategory.appendChild(category.createNewProjectCategory());
            }
            
    
            const validateModal = document.getElementById('validateModal')
            const btnAddWork = document.createElement('input');
    
            btnAddWork.type = "submit";
            btnAddWork.id = "validateAddNewWork";
            btnAddWork.value = "Valider";
            btnAddWork.placeholder = "Valider";
    
            validateModal.appendChild(btnAddWork);
    
            validateAddNewWork();
        });
    }
}

function validateAddNewWork() {
    if (document.getElementById('validateAddNewWork')) {
        const inputNewProjectPicture = document.getElementById('addNewProjectPicture');
        const inputNewProjectTitle = document.getElementById('addNewProjectTitle');
        const selectNewProjectCategory = document.getElementById('addNewProjectCategory');
        const btnValidateNewWork = document.getElementById('validateAddNewWork');

        btnValidateNewWork.addEventListener('click', async function () {  
            // const formAddNewWork = document.getElementById('submitAddWork');
            const addNewProjectImage = inputNewProjectPicture.files[0];
            const addNewProjectTitle = inputNewProjectTitle.value;
            const addNewProjectCategory = selectNewProjectCategory.value; 

            console.log(addNewProjectImage); 
            console.log(addNewProjectTitle); 
            console.log(addNewProjectCategory); 

        
            const formData = new FormData();

            formData.append("image", addNewProjectImage);
            formData.append("title", addNewProjectTitle);
            formData.append("category", addNewProjectCategory);
            
            // const blob = new Blob([addNewProjectImage], {type: "image/png"});

            // const reader = new FileReader();
            
            // reader.readAsDataURL(blob);


            // let constructorNewWork;
            
            // reader.onload = function() {
            //     constructorNewWork = {
            //         image: reader.result,
            //         title: addNewProjectTitle,
            //         category: addNewProjectCategory
            //     }
            //     console.log(constructorNewWork);
                createWork.createWork(formData);


            // }

            
            


            // formData.append("image", reader);

            // formData.append("title", addNewProjectTitle);

            // formData.append("category", addNewProjectCategory);




        })

    }
}





















