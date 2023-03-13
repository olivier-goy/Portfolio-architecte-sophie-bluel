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
    generateProjectHome(projects);

    deletedWork = new DeletedWork();

    categoriesApi = categoriesResponse.map(categoryApi => new Category(categoryApi));

    createWork = new CreateWorkService();

    categories = [];
    projects.forEach(project => {
        const category = categories.find(cat => cat.id == project.category.id);
        if (!category) {
            categories.push(project.category);
        }
    });

    userConnected();
    generateModalUser();
    generateDeletedModal();
    deletedProject();
    generateCategory();
    getCategoryData();
    generateAddWorkModal();
    validateAddNewWork();
};

function userConnected() {
    if (isConnected) {
        login.addEventListener("click", logout);
    } else {
        document.getElementById('navBarUser').remove();
        document.getElementById('userBtnModification').remove();
        document.getElementById('modalProject').remove();
    }
}

function logout() {
    localStorage.clear();
    location.reload();
}

function getCategoryData() {
    if (document.querySelector('.filterInput')) {
        const listenerFilter = document.querySelectorAll('.filterInput');

        listenerFilter[0].style.backgroundColor = "#1D6154";
        listenerFilter[0].style.color = "#FFFFFF";

        for (let i = 0; listenerFilter.length > i; i++) {
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
                generateProjectHome(filters);
            });
        }
    }
};

function generateProjectHome(projects) {
    if (document.querySelector('.gallery')) {
        document.querySelector('.gallery').innerHTML = "";
        const gallery = document.querySelector('.gallery');

        for (const project of projects) {
            gallery.appendChild(project.createProjectCard());
        }
    }
};

function generateCategory() {
    if (document.getElementById('filter')) {
        document.getElementById('filter').innerHTML = "";
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

function generateModalUser() {
    if (isConnected) {
        document.getElementById('portfolio').querySelector('h2').style = "padding-left: 80px;"

        const modal = document.getElementById('modalProject');
        const openModal = document.getElementById('userBtnModification');
        openModal.addEventListener('click', function () {
            modal.style.display = "block";
        });

        const backModal = document.querySelector('.backModal');
        backModal.addEventListener('click', function () {
            document.getElementById('titleModal').innerText = "Galerie photo";
            document.querySelector('.backModal').style.display = "none";
            document.getElementById('formAddWork').style.display = "none";
            document.getElementById('deletedWork').style.display = "grid";
            document.getElementById('separatorModal').style.display = "block";
            document.getElementById('btnModalRedirectDeleted').style.display = "block";
            document.querySelector('.fa-image').style.display = "block";
            document.getElementById('watchImage').style.display = "none";

            document.getElementById('formAddWork').reset();
        });

        const closeModal = document.querySelector('.closeModal');
        closeModal.addEventListener('click', function () {
            modal.style.display = "none";
        });

        window.addEventListener('click', function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });
    }
}

function generateDeletedModal() {
    if (document.querySelector('.modalContent')) {
        document.getElementById('deletedWork').innerHTML = "";
        document.querySelector('.backModal').style.display = "none";
        document.getElementById('formAddWork').style.display = "none"
        document.getElementById('deletedWork').style.display = "grid";
        document.getElementById('titleModal').innerText = "Galerie photo";

        const sectionMain = document.getElementById('deletedWork');

        for (const project of projects) {
            sectionMain.appendChild(project.deleteProjectCard());
        }
    }
}

function deletedProject() {
    const btnListenerDeleted = document.querySelectorAll('.btnDeletedProject');

    for (let i = 0; btnListenerDeleted.length > i; i++) {
        const listenerDeletedProject = btnListenerDeleted[i];

        listenerDeletedProject.addEventListener("click", async function (event) {
            const constructorDeleted = {
                id: listenerDeletedProject.id,
                token: localStorage.getItem("token")
            }

            const responseDeleted = await deletedWork.deletedProjectService(constructorDeleted);

            if (responseDeleted) {
                alert("Votre session est déconnecté \nVous allez être redirige vers la page de login");
                logout();
                document.location.href = "./loginPage.html"
            } else {
                event.target.parentNode.remove();
                document.getElementById("gallery" + listenerDeletedProject.id).remove()
            };
        });
    }
}

function generateAddWorkModal() {
    if (isConnected) {
        const btnAddPicture = document.getElementById('btnAddNewImage');
        btnAddPicture.addEventListener("click", function () {
            document.querySelector('.backModal').style.display = "block"
            document.getElementById('deletedWork').style.display = "none"
            document.getElementById('formAddWork').style.display = "flex"
            document.getElementById('btnValidateNewWork').style.display = "flex";
            document.getElementById('btnModalRedirectDeleted').style.display = "none";
            document.getElementById('separatorModal').style.display = "none";
            document.getElementById('titleModal').innerText = "";
            document.getElementById('watchImage').style.display = "none";

            const title = document.getElementById('titleModal');
            const selectCategory = document.getElementById('addNewProjectCategory')

            title.innerText = "Ajout photo";

            if (!document.querySelector('.optionCategory')) {
                for (const category of categoriesApi) {
                    selectCategory.appendChild(category.createNewProjectCategory());
                }
            }
        });
    }
}

function validateAddNewWork() {
    if (isConnected) {
        const formSubmit = document.getElementById('formAddWork');
        const inputNewProjectPicture = document.getElementById('addNewProjectPicture');
        const inputNewProjectTitle = document.getElementById('addNewProjectTitle');
        const selectNewProjectCategory = document.getElementById('addNewProjectCategory');

        inputNewProjectPicture.addEventListener('change', function () {
            document.querySelector('.fa-image').style.display = "none";
            document.getElementById('watchImage').style.display = "block";

            const watchImage = document.getElementById('watchImage');
            const inputNewImage = inputNewProjectPicture.files[0];

            watchImage.src = URL.createObjectURL(inputNewImage);
        });

        formSubmit.addEventListener('submit', async function (event) {
            event.preventDefault();
            const addNewProjectImage = inputNewProjectPicture.files[0];
            const addNewProjectTitle = inputNewProjectTitle.value;
            const addNewProjectCategory = selectNewProjectCategory.value;

            const formData = new FormData();

            formData.append("image", addNewProjectImage);
            formData.append("title", addNewProjectTitle);
            formData.append("category", addNewProjectCategory);

            const responseCreateWork = await createWork.createWork(formData);

            if (!responseCreateWork) {
                alert("Une erreur s'est produite");
            } else {
                document.getElementById('modalProject').style.display = "none";
                document.getElementById('btnModalRedirectDeleted').style.display = "block";
                document.getElementById('separatorModal').style.display = "block";

                getDatas();
            }
            document.querySelector('.fa-image').style.display = "block";
            document.getElementById('watchImage').style.display = "none";

            formSubmit.reset();
        });
    }
}























