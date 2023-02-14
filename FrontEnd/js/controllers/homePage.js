import Project from "../models/project-model.js";


const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

console.log(Project)

for (let i = 0; i < works.length; i++) {

let create = new Project({
    imageUrl : works[i].imageUrl,
    title : works[i].title,
});

create.createProjectCard();


}






