let PROJECTS_MODAL;

(async function (){

const REPONSE_MODAL = await fetch('http://localhost:5678/api/works');
PROJECTS_MODAL = await REPONSE_MODAL.json();

genererProjectModal(PROJECTS_MODAL); // Premier affichage MODAL

})()



const message_img = document.createElement("message");
const message = document.getElementById("modal-remove-message");


function getToken() {
    
    const TOKEN = localStorage.getItem("token");
    return TOKEN;
}


////// MODAL /////


// Fonction du bouton d'affichage de la modal

function showModal() {

    document.querySelector('.modal').style.visibility = "visible";
    document.querySelector('.modal-box').style.visibility = "visible";
    document.querySelector('.modal-project-gallery').style.visibility = "visible";
    document.querySelector('.modal-box-list').style.visibility = "visible";
    document.querySelector('.modal-project-gallery').style.visibility = "visible";
    document.querySelector('.returnModal').style.visibility = "hidden";

}

// Fonction du bouton dde fermeture de la modal

function hideModal() {


    document.querySelector('.modal').style.visibility = "hidden";
    document.querySelector('.modal-box').style.visibility = "hidden";
    document.querySelector('.modal-project-gallery').style.visibility = "hidden";
    document.querySelector('.returnModal').style.visibility = "hidden";
    document.querySelector('.modal-box-list').style.visibility = "hidden";
    document.querySelector('.modal-add-project').style.visibility = "hidden";
    document.querySelector('.modal-project-remove-confirm').style.visibility = "hidden";



}

function returnModal() {


    document.querySelector('.modal').style.visibility = "visible";
    document.querySelector('.modal-box').style.visibility = "visible";
    document.querySelector('.modal-project-gallery').style.visibility = "visible";
    document.querySelector('.modal-box-list').style.visibility = "visible";
    document.querySelector('.modal-box-list').style.visibility = "visible";
    document.querySelector('.returnModal').style.visibility = "hidden";
    document.querySelector('.modal-add-project').style.visibility = "hidden";
    document.querySelector('.modal-project-remove-confirm').style.visibility = "hidden";



}

const stopPropagation = function (e) {

e.stopPropagation()

}



function generateProject(articleModal){

    const ID_ELEMENT = articleModal.id;

    const SECTION_FICHES_MODAL = document.querySelector(".modal-box-list");
    const PROJECT_ELEMENT_MODAL = document.createElement("figure");
    PROJECT_ELEMENT_MODAL.setAttribute("id", "toremove-" + ID_ELEMENT);
    const IMAGE_ELEMENT_MODAL = document.createElement("img");
    IMAGE_ELEMENT_MODAL.crossOrigin = "anonymous";
    IMAGE_ELEMENT_MODAL.src = articleModal.imageUrl;
    // const MOOVE_ELEMENT = document.createElement("button-modal-box");
    const DELETE_ELEMENT = document.createElement("button-modal-box");
    const EDIT_ELEMENT = document.createElement("button-modal-box");



    // MOOVE_ELEMENT.innerHTML = `<button class="modal-modif-place"><i class="fa-solid fa-arrows-up-down-left-right"></i></button>`;
    // MOOVE_ELEMENT.setAttribute("id", "place-" + ID_ELEMENT);
    DELETE_ELEMENT.innerHTML = `<button class="modal-modif-remove" name="remove"><i class="fa-solid fa-trash-can"></i></button>`;
    DELETE_ELEMENT.setAttribute("id", "remove-" + ID_ELEMENT);
    EDIT_ELEMENT.innerHTML = `<button class="modal-modif-edit">éditer</button>`;
    EDIT_ELEMENT.setAttribute("id", "edit-" + ID_ELEMENT);
    SECTION_FICHES_MODAL.appendChild(PROJECT_ELEMENT_MODAL);
    PROJECT_ELEMENT_MODAL.appendChild(IMAGE_ELEMENT_MODAL);
    IMAGE_ELEMENT_MODAL.setAttribute("id", "image-project-" + ID_ELEMENT);
    // PROJECT_ELEMENT_MODAL.appendChild(MOOVE_ELEMENT);
    PROJECT_ELEMENT_MODAL.appendChild(DELETE_ELEMENT);
    PROJECT_ELEMENT_MODAL.appendChild(EDIT_ELEMENT);



    let boutonRemoveId = document.getElementById("remove-" + ID_ELEMENT);

    let projectRemoveId = document.getElementById("image-project-" + ID_ELEMENT);



    boutonRemoveId.addEventListener("click", async function getRemovedId() {


        let ID_TO_REMOVE = boutonRemoveId.id.split("-", 2)[1]

        let PROJECT_REMOVE = projectRemoveId.src
        let PROJECT_TO_REMOVE_IMG = PROJECT_REMOVE

        console.log(ID_TO_REMOVE);

        console.log(PROJECT_TO_REMOVE_IMG);

        if (ID_TO_REMOVE !== null) {

            console.log("ID OK" + ID_TO_REMOVE);

            removedSectionOpen()

            document.querySelector('.modal-project-gallery').style.visibility = "hidden";


            let imageElementRemove = document.createElement("img");
            imageElementRemove.crossOrigin = "anonymous";
            imageElementRemove.src = PROJECT_TO_REMOVE_IMG;

            document.querySelector('.modal-project-remove-confirm-img').appendChild(imageElementRemove);


            let boutonRemoveProject = document.getElementById("remove-confirmation");

            boutonRemoveProject.addEventListener("click", function removeProject() {

                console.log("Mettre ici la supréssion du project " + ID_TO_REMOVE);



                fetch("http://localhost:5678/api/works" + "/" + ID_TO_REMOVE, {

                    method: "DELETE",

                    headers: {

                        Authorization: "Bearer" + " " + getToken(),
                        "Content-Type": "application/json;charset=utf-8",

                    },
                });

                const delProjectModal = document.getElementById("toremove-" + ID_TO_REMOVE);
                delProjectModal.remove();

                const delProjectGlobal = document.getElementById("element-" + ID_TO_REMOVE);
                delProjectGlobal.remove();

                let menu = document.getElementById('modal-project-remove-confirm-img');
                menu.removeChild(menu.firstElementChild);

                returnModal()


            })


            console.log(ID_TO_REMOVE)

            const HIDE_DISPLAY_MODAL = document.getElementById('hideModal')

            HIDE_DISPLAY_MODAL.addEventListener('click',  clearRemove );

            const RETURN_DISPLAY_MODAL = document.getElementById('returnModal')

            RETURN_DISPLAY_MODAL.addEventListener('click',  clearRemove );



        }
        else {
            console.log("Une erreur est survenue dans la supréssion des projects");
        }

    
    }



    )    




}




function removedSectionOpen() {

    document.querySelector('.modal-project-remove-confirm').style.visibility = "visible";
    console.log("Page confirmation de supréssion")
    document.querySelector('.returnModal').style.visibility = "visible";

}

function removedSectionBack() {

    document.querySelector('.modal-box').style.visibility = "visible";
    document.querySelector('.modal-project-remove-confirm').style.visibility = "hidden";
    console.log("Page confirmation de supréssion")
    document.querySelector('.returnModal').style.visibility = "visible";
}


// Fonction d'affichage de la liste des projets dans la modal

function genererProjectModal(projectModal) {

    for (let i = 0; i < projectModal.length; i++) {

        generateProject(projectModal[i]);

    }

    // Fonction ouverture confirmation supréssion

}


function clearRemove() {

    document.getElementById("modal-project-remove-confirm-img").innerHTML = "";

    }



// Afficher la modal

const DISPLAY_MODAL = document.getElementsByClassName('btn-modification')


for (var i = 0 ; i < DISPLAY_MODAL.length; i++) {
    DISPLAY_MODAL[i].addEventListener('click' , showModal , false ) ; 
 }

// Masquer la modal

const HIDE_DISPLAY_MODAL = document.getElementById('hideModal')

HIDE_DISPLAY_MODAL.addEventListener('click',  hideModal );


// Masquer la modal

const HIDE_DISPLAY_MODAL2 = document.getElementById('hideModal2')

HIDE_DISPLAY_MODAL2.addEventListener('click',  hideModal );

// Retour dans la modal

const RETURN_DISPLAY_MODAL = document.getElementById('returnModal')

RETURN_DISPLAY_MODAL.addEventListener('click',  returnModal );

// Bouton ajouter une nouvelle photo

const NEW_PROJECT_BOX = document.getElementById("add-project");

NEW_PROJECT_BOX.addEventListener("click", function () {

    document.querySelector('.modal-project-remove-confirm').style.visibility = "hidden";
    document.querySelector('.modal-project-gallery').style.visibility = "hidden";
    document.querySelector('.modal-box-list').style.visibility = "hidden";
    document.querySelector('.modal-add-project').style.visibility = "visible";
    document.querySelector('.returnModal').style.visibility = "visible";


    document.getElementById('img-added').setAttribute('src', "");






});



const ADD_PREVIEW_IMAGE = document.getElementById("btn-add-img");

ADD_PREVIEW_IMAGE.addEventListener('change', previewPhoto);



let newWorkImagePreview;



function previewPhoto() {



    document.querySelector(".img-to-add").innerHTML = `
    
    <img src="" alt="" id="img-added">
    
    
    `;

    let FILE_IMG =  ADD_PREVIEW_IMAGE.files;
    if (FILE_IMG) {
        const fileReader = new FileReader();
        const preview = document.getElementById('img-added');
        fileReader.onload = event => {
            preview.setAttribute('src', event.target.result);

            newWorkImagePreview = event.target.result;

        }

        fileReader.readAsDataURL(FILE_IMG[0]);

    }


}
   


const TITLE_INPUT = document.getElementById("title");
const CATEGORY_INPUT = document.getElementById("category");

const NEW_PROJECT = document.getElementById("add-confirmation2");

NEW_PROJECT.addEventListener("click", async function (e) {

    e.preventDefault();

    const FORM_DATA = new FormData()

    FORM_DATA.append('image', ADD_PREVIEW_IMAGE.files[0]);
    FORM_DATA.append('title', TITLE_INPUT.value);
    FORM_DATA.append('category', CATEGORY_INPUT.value);

    newWorkTitle = TITLE_INPUT.value;

    lastProjectId ++

    const newArticle = {

        id: lastProjectId,
        imageUrl: newWorkImagePreview,
        category: newWorkTitle,
    }

    console.log(lastProjectId)
    console.log(newWorkTitle)
    generateProjectGlobal(newArticle)

    generateProject(newArticle)

    if (ADD_PREVIEW_IMAGE.files[0] == null){

        message_img.innerHTML = `<h2> Vous devez séléctioner une image </h2>`;
        message.appendChild(message_img);
    
        }
    else if (TITLE_INPUT.value == ""){

        message_img.innerHTML = `<h2> Vous devez renseigner un titre </h2>`;
        message.appendChild(message_img);

            
        }
        else if (CATEGORY_INPUT.value == 0){

            message_img.innerHTML = `<h2> Vous devez renseigner une catégorie </h2>`;
            message.appendChild(message_img);

                
            }


    else {

    for(var pair of FORM_DATA.entries()) {
        console.log(pair[0]+ ', '+ pair[1]);
     }

    fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
    'accept': 'application/json',
    'Authorization': `Bearer` + " " + getToken(),
    },

    body: FORM_DATA

    })}

    returnModal(),



    document.getElementById("newProject").reset();  
    // document.getElementById('img-added').remove();

    let FILE_IMG = null;
    console.log(FILE_IMG)

}


);

    const NEW_PROJECT2 = document.getElementById("del-projects");

    NEW_PROJECT2.addEventListener("click", function () {

        fetch('http://localhost:5678/api/works')

        for (let i = 0; i < PROJECTS_MODAL.length; i++) {
            fetch('http://localhost:5678/api/works' + "/" + PROJECTS_MODAL[i].id, {
                method: "DELETE",
                headers: {
                    'Authorization': "Bearer " + getToken(),
                    'Content-type': 'application/json'
                }
            })}
    })
