let PROJECTS_MODAL_LIST;
let ID_TO_REMOVE;


const MESSAGE_IMG = document.createElement("message");
const MESSAGE = document.getElementById("modal-remove-message");

const ADD_PREVIEW_IMAGE = document.getElementById("btn-add-img");

const DISPLAY_MODAL = document.getElementsByClassName('btn-modification')

const NEW_PROJECT_BOX = document.getElementById("add-project");

const DELETE_PROJECT = document.getElementById("del-projects");


// Masquer la modal

const hideDisplayModal = document.getElementById('hideModal')
hideDisplayModal.addEventListener('click', hideModal);


// Masquer la modal

const HIDE_DISPLAY_MODAL2 = document.getElementById('hideModal2')
HIDE_DISPLAY_MODAL2.addEventListener('click', hideModal);

// Retour dans la modal

const returnDisplayModal = document.getElementById('returnModal')
returnDisplayModal.addEventListener('click', returnModal);


(async function () {

    const modalAnswerWorks = await fetch('http://localhost:5678/api/works');
    PROJECTS_MODAL_LIST = await modalAnswerWorks.json();

    genererProjectModal(PROJECTS_MODAL_LIST); // Premier affichage MODAL

})()

function getToken() {

    const TOKEN = localStorage.getItem("token");
    return TOKEN;
}


function clearAddMessageError(){

    MESSAGE_IMG.innerHTML = ``;
    MESSAGE.appendChild(MESSAGE_IMG);
    
    console.log("Clear Message Error")
    
}

function showModal() {

    document.querySelector('.modal').style.visibility = "visible";
    document.querySelector('.modal-box').style.visibility = "visible";
    document.querySelector('.modal-project-gallery').style.visibility = "visible";
    document.querySelector('.modal-box-list').style.visibility = "visible";
    document.querySelector('.modal-project-gallery').style.visibility = "visible";
    document.querySelector('.returnModal').style.visibility = "hidden";

}

function removePreview(){

    ADD_PREVIEW_IMAGE.value = null;

console.log("Preview remove")

}

function hideModal() {

    removePreview()
    clearAddMessageError()
    removePreviewImg();
    document.querySelector('.modal').style.visibility = "hidden";
    document.querySelector('.modal-box').style.visibility = "hidden";
    document.querySelector('.modal-project-gallery').style.visibility = "hidden";
    document.querySelector('.returnModal').style.visibility = "hidden";
    document.querySelector('.modal-box-list').style.visibility = "hidden";
    document.querySelector('.modal-add-project').style.visibility = "hidden";
    document.querySelector('.modal-project-remove-confirm').style.visibility = "hidden";
    document.querySelector('.img-to-add-content').style.visibility = "hidden";


}

function returnModal() {

    removePreview()
    clearAddMessageError()
    removePreviewImg();
    document.querySelector('.modal').style.visibility = "visible";
    document.querySelector('.modal-box').style.visibility = "visible";
    document.querySelector('.modal-project-gallery').style.visibility = "visible";
    document.querySelector('.modal-box-list').style.visibility = "visible";

    document.querySelector('.returnModal').style.visibility = "hidden";
    document.querySelector('.modal-add-project').style.visibility = "hidden";
    document.querySelector('.modal-project-remove-confirm').style.visibility = "hidden";
    document.querySelector('.img-to-add-content').style.visibility = "hidden";

}

ADD_PREVIEW_IMAGE.addEventListener('change', previewPhoto);

let boutonRemoveProject = document.getElementById("remove-confirmation");

boutonRemoveProject.addEventListener("click", function removeProject() {

    console.log("Mettre ici la supression du project " + ID_TO_REMOVE);

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

    const menu = document.getElementById('modal-project-remove-confirm-img');
    menu.removeChild(menu.firstElementChild);

    returnModal()
});


function generateProject(articleModal) {

    const elementId = articleModal.id;

    const sectionFichesModal = document.querySelector(".modal-box-list");
    const projectElementModal = document.createElement("figure");
    projectElementModal.setAttribute("id", "toremove-" + elementId);
    const imageElementModal = document.createElement("img");
    imageElementModal.crossOrigin = "anonymous";
    imageElementModal.src = articleModal.imageUrl;
    // const MOOVE_ELEMENT = document.createElement("button-modal-box");
    const deleteElement = document.createElement("button-modal-box");
    const editElement = document.createElement("button-modal-box");



    // MOOVE_ELEMENT.innerHTML = `<button class="modal-modif-place"><i class="fa-solid fa-arrows-up-down-left-right"></i></button>`;
    // MOOVE_ELEMENT.setAttribute("id", "place-" + elementId);
    deleteElement.innerHTML = `<button class="modal-modif-remove" name="remove"><i class="fa-solid fa-trash-can"></i></button>`;
    deleteElement.setAttribute("id", "remove-" + elementId);
    editElement.innerHTML = `<button class="modal-modif-edit">éditer</button>`;
    editElement.setAttribute("id", "edit-" + elementId);
    sectionFichesModal.appendChild(projectElementModal);
    projectElementModal.appendChild(imageElementModal);
    imageElementModal.setAttribute("id", "image-project-" + elementId);
    // projectElementModal.appendChild(MOOVE_ELEMENT);
    projectElementModal.appendChild(deleteElement);
    projectElementModal.appendChild(editElement);

    let boutonRemoveId = document.getElementById("remove-" + elementId);
    let projectRemoveId = document.getElementById("image-project-" + elementId);

    boutonRemoveId.addEventListener("click", async function getRemovedId() {

        ID_TO_REMOVE = boutonRemoveId.id.split("-", 2)[1]

        let PROJECT_REMOVE = projectRemoveId.src
        let PROJECT_TO_REMOVE_IMG = PROJECT_REMOVE

        if (ID_TO_REMOVE !== null) {

            removedSectionOpen()

            document.querySelector('.modal-project-gallery').style.visibility = "hidden";


            let imageElementRemove = document.createElement("img");
            imageElementRemove.crossOrigin = "anonymous";
            imageElementRemove.src = PROJECT_TO_REMOVE_IMG;

            document.querySelector('.modal-project-remove-confirm-img').appendChild(imageElementRemove);

            delete ID_TO_REMOVE;

            console.log(ID_TO_REMOVE)

        }
        else {
            console.log("Une erreur est survenue dans la supréssion des projects");
        }
    })



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

function genererProjectModal(projectModal) {

    for (let i = 0; i < projectModal.length; i++) {

        generateProject(projectModal[i]);

    }

    // Fonction ouverture confirmation supréssion

}


function clearRemove() {

    document.getElementById("modal-project-remove-confirm-img").innerHTML = "";

}

for (var i = 0; i < DISPLAY_MODAL.length; i++) {
    DISPLAY_MODAL[i].addEventListener('click', showModal, false);
}



// Bouton ajouter une nouvelle photo



NEW_PROJECT_BOX.addEventListener("click", function () {

    document.querySelector('.modal-project-remove-confirm').style.visibility = "hidden";
    document.querySelector('.modal-project-gallery').style.visibility = "hidden";
    document.querySelector('.modal-box-list').style.visibility = "hidden";
    document.querySelector('.modal-add-project').style.visibility = "visible";
    document.querySelector('.returnModal').style.visibility = "visible";
    document.querySelector('.img-to-add-content').style.visibility = "visible";

});


let newWorkImagePreview;

let FILE_IMG;

function previewPhoto(e) {


    document.querySelector('.img-to-add-content').style.visibility = "hidden";

    FILE_IMG = ADD_PREVIEW_IMAGE.files;

    if (FILE_IMG) {

        let fileReader = new FileReader();

        let preview = document.getElementById('img-added');

        fileReader.onload = eventNewProject => {

            preview.setAttribute('src', eventNewProject.target.result);

            newWorkImagePreview = eventNewProject.target.result;

        }

        fileReader.readAsDataURL(FILE_IMG[0]);

    }

    e.preventDefault();



}



const titleInputNewProject = document.getElementById("title");
const categoryInputNewProject = document.getElementById("category");

const newProject = document.getElementById("add-confirmation2");

newProject.addEventListener("click", async function (e) {

    e.preventDefault();
    if (ADD_PREVIEW_IMAGE.files[0] == null) {

        MESSAGE_IMG.innerHTML = `<h4> Vous devez séléctioner une image </h4>`;
        MESSAGE.appendChild(MESSAGE_IMG);

    }
    else if (titleInputNewProject.value == "") {

        MESSAGE_IMG.innerHTML = `<h4> Vous devez renseigner un titre </h4>`;
        MESSAGE.appendChild(MESSAGE_IMG);


    }
    else if (categoryInputNewProject.value == 0) {

        MESSAGE_IMG.innerHTML = `<h4> Vous devez renseigner une catégorie </h4>`;
        MESSAGE.appendChild(MESSAGE_IMG);


    }
    else {

        const FORM_DATA = new FormData()

        FORM_DATA.append('image', ADD_PREVIEW_IMAGE.files[0]);
        FORM_DATA.append('title', titleInputNewProject.value);
        FORM_DATA.append('category', categoryInputNewProject.value);
    
        let newWorkTitle = titleInputNewProject.value;
    
        lastProjectId++
    
        const newArticle = {
    
            id: lastProjectId,
            imageUrl: newWorkImagePreview,
            title: newWorkTitle,
        }
    
        generateProjectGlobal(newArticle)
        generateProject(newArticle)

        for (var pair of FORM_DATA.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer` + " " + getToken(),
            },

            body: FORM_DATA

        })

        returnModal();
        removePreviewImg()

    }
});


function removePreviewImg() {

    document.getElementById("newProject").reset();
    document.getElementById("new-project-form").reset();
    document.getElementById("img-added").removeAttribute('src')

    FILE_IMG = null;

}

DELETE_PROJECT.addEventListener("click", function () {

    fetch('http://localhost:5678/api/works')

    for (let i = 0; i < PROJECTS_MODAL_LIST.length; i++) {
        fetch('http://localhost:5678/api/works' + "/" + PROJECTS_MODAL_LIST[i].id, {
            method: "DELETE",
            headers: {
                'Authorization': "Bearer " + getToken(),
                'Content-type': 'application/json'
            }
        })
    }
})