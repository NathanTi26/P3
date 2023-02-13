function getToken() {

    const token = localStorage.getItem("token");

    return token;

}

const reponseModal = await fetch('http://localhost:5678/api/works');

const projectsModal = await reponseModal.json();

genererProjectModal(projectsModal);
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

    document.querySelector('.modal').style.visibility = "hidden";
    document.querySelector('.modal-box').style.visibility = "hidden";
    document.querySelector('.modal-project-gallery').style.visibility = "hidden";
    document.querySelector('.modal-project-remove-confirm').style.visibility = "hidden";
    document.querySelector('.modal-box-list').style.visibility = "hidden";
    document.querySelector('.modal-add-project').style.visibility = "hidden";

}

// Fonction du check de l'ajout des projets

// function getNewProject() {


//     if (category.value === "0" || title.value === "" || imgSrc.value === "") {

//         console.log("Un des champs est vide.")
//     }

//     else {
//         // Envoi du projet au serveur
//         fetch("http://localhost:5678/api/works", {
//             method: "POST",
//             headers: {
//                 'accepte': "application/json",
//                 "Content-Type": "application/json;charset=utf-8",
//                 Authorization: "Bearer" + " " + getToken(),
//             },
//         })

//         console.log(getToken())
//         console.log("Normalement le fichier est envoyé")

//     }
// }

// Fonction d'affichage de la liste des projets dans la modal

function genererProjectModal(projectModal) {

    for (let i = 0; i < projectModal.length; i++) {

        const article = projectModal[i];


        const sectionFichesModal = document.querySelector(".modal-box-list");
        const projectElementModal = document.createElement("figure");
        const imageElementModal = document.createElement("img");
        imageElementModal.crossOrigin = "anonymous";
        imageElementModal.src = article.imageUrl;
        const mooveElement = document.createElement("button-modal-box");
        const deleteElement = document.createElement("button-modal-box");
        const editElement = document.createElement("button-modal-box");
        const idElement = article.id;


        mooveElement.innerHTML = `<button class="modal-modif-place"><i class="fa-solid fa-arrows-up-down-left-right"></i></button>`;
        mooveElement.setAttribute("id", "place-" + idElement);
        deleteElement.innerHTML = `<button class="modal-modif-remove" name="remove"><i class="fa-solid fa-trash-can"></i></button>`;
        deleteElement.setAttribute("id", "remove-" + idElement);
        editElement.innerHTML = `<button class="modal-modif-edit">éditer</button>`;
        editElement.setAttribute("id", "edit-" + idElement);
        sectionFichesModal.appendChild(projectElementModal);
        projectElementModal.appendChild(imageElementModal);
        imageElementModal.setAttribute("id", "image-project-" + idElement);
        projectElementModal.appendChild(mooveElement);
        projectElementModal.appendChild(deleteElement);
        projectElementModal.appendChild(editElement);



        let boutonRemoveId = document.getElementById("remove-" + idElement);

        let projectRemoveId = document.getElementById("image-project-" + idElement);



        boutonRemoveId.addEventListener("click", async function getRemovedId() {


            const idToRemove = boutonRemoveId.id.split("-", 2)[1]

            const projectRemove = projectRemoveId.src
            const projectToRemoveImg = projectRemove

            console.log(idToRemove);

            console.log(projectToRemoveImg);

            if (idToRemove !== null) {

                console.log("ID OK");

                removedSectionOpen()

                document.querySelector('.modal-project-gallery').style.visibility = "hidden";


                let imageElementRemove = document.createElement("img");
                imageElementRemove.crossOrigin = "anonymous";
                imageElementRemove.src = projectToRemoveImg;

                document.querySelector('.modal-project-remove-confirm-img').appendChild(imageElementRemove);


                let boutonRemoveProject = document.getElementById("remove-confirmation");

                boutonRemoveProject.addEventListener("click", async function removeProject() {

                    console.log("Mettre ici la supréssion du project " + idToRemove);



                    fetch("http://localhost:5678/api/works" + "/" + idToRemove, {

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

const displayModal = document.getElementById('displaymodal')

displayModal.addEventListener('click', showModal);

// Masquer la modal

const hideDisplayModal = document.getElementById('hideModal')

hideDisplayModal.addEventListener('click', hideModal);

// Bouton ajouter une nouvelle photo

const newProject = document.getElementById("add-project");

newProject.addEventListener("click", function () {

    document.querySelector('.modal-project-remove-confirm').style.visibility = "hidden";
    document.querySelector('.modal-project-gallery').style.visibility = "hidden";
    document.querySelector('.modal-box-list').style.visibility = "hidden";
    document.querySelector('.modal-add-project').style.visibility = "visible";

});






function previewPhoto() {

    const file = input.files;
    if (file) {
        const fileReader = new FileReader();
        const preview = document.getElementById('img-added');
        fileReader.onload = event => {
            preview.setAttribute('src', event.target.result);
        }

        fileReader.readAsDataURL(file[0]);
     


    }



    document.querySelector('.img-to-add-content').style.visibility = "hidden";

    const newProject2 = document.getElementById("add-confirmation2");

    newProject2.addEventListener("click", function () {
    



        const formData = new FormData()

        formData.append('image', document.getElementById('img-added').files[0], document.getElementById('img-added').files[0].type)
        formData.append('title', document.querySelector('input[id="title]').value)
        formData.append('category', document.querySelector('select[id="category]').value)
        console.log(formData)
        console.log("Les data")

        fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {

        'accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer` + " " + getToken(),

        },
        body: JSON.stringify(formData)
        })



    });
    }


const input = document.getElementById("btn-add-img");
input.addEventListener('change', previewPhoto);





