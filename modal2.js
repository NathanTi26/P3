const REPONSE_MODAL = await fetch('http://localhost:5678/api/works');
const PROJECTS_MODAL = await REPONSE_MODAL.json();


function getToken() {
    
    const TOKEN = localStorage.getItem("token");
    return TOKEN;
}


genererProjectModal(PROJECTS_MODAL);


////// MODAL /////


// Fonction du bouton d'affichage de la modal

function showModal() {

    document.querySelector('.modal').style.visibility = "visible";
    document.querySelector('.modal-box').style.visibility = "visible";
    document.querySelector('.modal-project-gallery').style.visibility = "visible";
    document.querySelector('.modal-box-list').style.visibility = "visible";
    document.querySelector('.modal-project-gallery').style.visibility = "visible";

}

// Fonction du bouton dde fermeture de la modal

function hideModal() {

    const CLEAR_PROJECT = document.getElementById("modal-project-remove-confirm-img");


    document.querySelector('.modal').style.visibility = "hidden";
    document.querySelector('.modal-box').style.visibility = "hidden";
    document.querySelector('.modal-project-gallery').style.visibility = "hidden";
    document.querySelector('.modal-project-remove-confirm').style.visibility = "hidden";
    document.querySelector('.modal-box-list').style.visibility = "hidden";
    document.querySelector('.modal-add-project').style.visibility = "hidden";
    CLEAR_PROJECT.removeChild(list.firstElementChild);

}



// Fonction d'affichage de la liste des projets dans la modal

function genererProjectModal(projectModal) {

    for (let i = 0; i < projectModal.length; i++) {

        const ARTICLE = projectModal[i];
        const SECTION_FICHES_MODAL = document.querySelector(".modal-box-list");
        const PROJECT_ELEMENT_MODAL = document.createElement("figure");
        const IMAGE_ELEMENT_MODAL = document.createElement("img");
        IMAGE_ELEMENT_MODAL.crossOrigin = "anonymous";
        IMAGE_ELEMENT_MODAL.src = ARTICLE.imageUrl;
        const MOOVE_ELEMENT = document.createElement("button-modal-box");
        const DELETE_ELEMENT = document.createElement("button-modal-box");
        const EDIT_ELEMENT = document.createElement("button-modal-box");
        const ID_ELEMENT = ARTICLE.id;


        MOOVE_ELEMENT.innerHTML = `<button class="modal-modif-place"><i class="fa-solid fa-arrows-up-down-left-right"></i></button>`;
        MOOVE_ELEMENT.setAttribute("id", "place-" + ID_ELEMENT);
        DELETE_ELEMENT.innerHTML = `<button class="modal-modif-remove" name="remove"><i class="fa-solid fa-trash-can"></i></button>`;
        DELETE_ELEMENT.setAttribute("id", "remove-" + ID_ELEMENT);
        EDIT_ELEMENT.innerHTML = `<button class="modal-modif-edit">éditer</button>`;
        EDIT_ELEMENT.setAttribute("id", "edit-" + ID_ELEMENT);
        SECTION_FICHES_MODAL.appendChild(PROJECT_ELEMENT_MODAL);
        PROJECT_ELEMENT_MODAL.appendChild(IMAGE_ELEMENT_MODAL);
        IMAGE_ELEMENT_MODAL.setAttribute("id", "image-project-" + ID_ELEMENT);
        PROJECT_ELEMENT_MODAL.appendChild(MOOVE_ELEMENT);
        PROJECT_ELEMENT_MODAL.appendChild(DELETE_ELEMENT);
        PROJECT_ELEMENT_MODAL.appendChild(EDIT_ELEMENT);



        let boutonRemoveId = document.getElementById("remove-" + ID_ELEMENT);

        let projectRemoveId = document.getElementById("image-project-" + ID_ELEMENT);



        boutonRemoveId.addEventListener("click", async function getRemovedId() {


            const ID_TO_REMOVE = boutonRemoveId.id.split("-", 2)[1]

            const PROJECT_REMOVE = projectRemoveId.src
            const PROJECT_TO_REMOVE_IMG = PROJECT_REMOVE

            console.log(ID_TO_REMOVE);

            console.log(PROJECT_TO_REMOVE_IMG);

            if (ID_TO_REMOVE !== null) {

                console.log("ID OK");

                removedSectionOpen()

                document.querySelector('.modal-project-gallery').style.visibility = "hidden";


                let imageElementRemove = document.createElement("img");
                imageElementRemove.crossOrigin = "anonymous";
                imageElementRemove.src = PROJECT_TO_REMOVE_IMG;

                document.querySelector('.modal-project-remove-confirm-img').appendChild(imageElementRemove);


                let boutonRemoveProject = document.getElementById("remove-confirmation");

                boutonRemoveProject.addEventListener("click", async function removeProject() {

                    console.log("Mettre ici la supréssion du project " + ID_TO_REMOVE);



                    fetch("http://localhost:5678/api/works" + "/" + ID_TO_REMOVE, {

                        method: "DELETE",

                        headers: {

                            Authorization: "Bearer" + " " + getToken(),
                            "Content-Type": "application/json;charset=utf-8",

                        },
                    });
                })
            }
            else {
                console.log("Une erreur est survenue dans la supréssion des projects");
            }
        })
    }

    // Fonction ouverture confirmation supréssion

    function removedSectionOpen() {

        document.querySelector('.modal-project-remove-confirm').style.visibility = "visible";
        console.log("Page confirmation de supréssion")

    }

    function removedSectionBack() {

        document.querySelector('.modal-box').style.visibility = "visible";
        document.querySelector('.modal-project-remove-confirm').style.visibility = "hidden";
        console.log("Page confirmation de supréssion")

    }
}

// Afficher la modal

const DISPLAY_MODAL = document.getElementById('displaymodal')

DISPLAY_MODAL.addEventListener('click', showModal);

// Masquer la modal

const HIDE_DISPLAY_MODAL = document.getElementById('hideModal')

HIDE_DISPLAY_MODAL.addEventListener('click',  hideModal );

// Bouton ajouter une nouvelle photo

const NEW_PROJECT_BOX = document.getElementById("add-project");

NEW_PROJECT_BOX.addEventListener("click", function () {

    document.querySelector('.modal-project-remove-confirm').style.visibility = "hidden";
    document.querySelector('.modal-project-gallery').style.visibility = "hidden";
    document.querySelector('.modal-box-list').style.visibility = "hidden";
    document.querySelector('.modal-add-project').style.visibility = "visible";

});



const ADD_PREVIEW_IMAGE = document.getElementById("btn-add-img");
ADD_PREVIEW_IMAGE.addEventListener('change', previewPhoto);


function previewPhoto() {

    const FILE_IMG =  ADD_PREVIEW_IMAGE.files;
    if (FILE_IMG) {
        const fileReader = new FileReader();
        const preview = document.getElementById('img-added');
        fileReader.onload = event => {
            preview.setAttribute('src', event.target.result);
        }

        fileReader.readAsDataURL(FILE_IMG[0]);

    }
    
    document.getElementById('img-to-add-content').style.visibility = "hidden";

}
   
const IMG_URL = document.getElementById("img-added");
const TITLE_INPUT = document.getElementById("title");
const CATEGORY_INPUT = document.getElementById("category");

const NEW_PROJECT = document.getElementById("add-confirmation2");

NEW_PROJECT.addEventListener("click", function () {

    const FORM_DATA = new FormData()

    FORM_DATA.append('image', IMG_URL);
    FORM_DATA.append('title', TITLE_INPUT.value);
    FORM_DATA.append('category', CATEGORY_INPUT.value);

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

    })

    console.log(getToken())
    console.log(FORM_DATA)

});













