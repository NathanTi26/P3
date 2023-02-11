

const reponse = await fetch('http://localhost:5678/api/works');
const projects = await reponse.json();


function genererProject(projectfiltres)

{

    for (let i = 0; i < projectfiltres.length; i++) {




    const article = projectfiltres[i] ;


    const sectionFiches = document.querySelector(".gallery");

    const projectElement = document.createElement("figure");

    const imageElement = document.createElement("img") ;   
    imageElement.crossOrigin = "anonymous";
    imageElement.src = article.imageUrl;

    const nomElement = document.createElement("figcaption");
    nomElement.innerText = article.title;

    sectionFiches.appendChild(projectElement);

    projectElement.appendChild(imageElement);
    projectElement.appendChild(nomElement);

}
 }

 genererProject(projects); // Premier affichage de la page


// Bouton filtre Objets

 const boutonObjects = document.getElementById("btn-filtrer"); 

 boutonObjects.addEventListener("click", function () {
    const projetcsFiltre = projects.filter(function (project) {
        return project.categoryId === 1;
    });
   console.log(projetcsFiltre)

   document.querySelector(".gallery").innerHTML = "";

   genererProject(projetcsFiltre);

});

// Bouton filtre Appartement



const boutonFlat = document.getElementById("btn-filtrer2"); 

boutonFlat.addEventListener("click", function () {
   const projetcsFiltre2 = projects.filter(function (project) {
    return project.categoryId === 2;
   });



  console.log(projetcsFiltre2)

  document.querySelector(".gallery").innerHTML = "";

  genererProject(projetcsFiltre2);
  
});

// Bouton filtre Hotels & Restaurants



const boutonHotel = document.getElementById("btn-filtrer3"); 

boutonHotel.addEventListener("click", function () {
   const projetcsFiltre3 = projects.filter(function (project) {
    return project.categoryId === 3;
   });



  console.log(projetcsFiltre3)

  document.querySelector(".gallery").innerHTML = "";

  genererProject(projetcsFiltre3);
  
});

// Bouton filtre Tous

const boutonAll = document.getElementById("btn-filtrer4"); 

boutonAll.addEventListener("click", function () {
   const projetcsFiltre4 = projects.filter(function (project) {
    return projects
   });

  console.log(projetcsFiltre4)

  document.querySelector(".gallery").innerHTML = "";

  genererProject(projetcsFiltre4);
});





const displayform = document.getElementById('displayform')


displayform.addEventListener('click', showForm);

function showForm(){
  document.querySelector('.hiddensection').classList.toggle('hidden');
  document.querySelector('.connexion-box').classList.toggle('visible');
}




// Box connexion






const boutonLog = document.getElementById("btn-log");

boutonLog.addEventListener("click", async function(e) {

  e.preventDefault();
  
  const user = {

    email: document.getElementsByName("email").value,
    password: document.getElementsByName("password").value

  };
  
  
  let res = await fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user),
  });
  
  let result = await res.json();

  console.log(result);

  localStorage.set('token',result);

})




// Changement de la couleur des filtres 
const activeFilter = document.getElementById('btn-filtrer4')

activeFilter.addEventListener('click', activerFiltre);

function activerFiltre(){

  document.getElementById('btn-filtrer4').classList.toggle('active');
  document.getElementById('btn-filtrer').classList.remove('active');
}

// Changement de la couleur des filtres 
const activeFilter2 = document.getElementById('btn-filtrer')

activeFilter2.addEventListener('click', activerFiltre2);

function activerFiltre2(){

  document.getElementById('btn-filtrer').classList.toggle('active');
  document.getElementById('btn-filtrer4').classList.remove('active');

}


const filter = document.querySelectorAll('.btn-filtre')

for ( let allFilter of filter){

  allFilter.addEventListener('click', function(){

for (let filterRemove of filter){

filterRemove.classList.remove('active')

}

allFilter.classList.add('active')
})
}
























function getToken(){

  let token = localStorage.getItem("token");

  return token;

}


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


const imgToAdd = {

  tittle: document.getElementById("tittle").value,
  category: document.getElementById("category").value,
  imgSrc : document.getElementById("img-added").src
};

function getNewProject() {


  console.log(tittle.value);
  console.log(category.value);
  console.log(imgSrc);
  


  if (category.value === "0" || tittle.value === "" || imgSrc.value === ""  ) {

    console.log("Un des champs est vide.")  
  }

  else {
      // Envoi du projet au serveur
      fetch("http://localhost:5678/api/works", {
          method: "POST",
          headers: {
              'accepte' : "application/json",
              "Content-Type": "application/json;charset=utf-8",
              Authorization: "Bearer" + " " + getToken(),
          },
      })
      
      console.log(getToken())
      console.log("Normalement le fichier est envoyé")

  }
}

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


        let imageElementRemove = document.createElement("img") ;   
        imageElementRemove.crossOrigin = "anonymous";
        imageElementRemove.src = projectToRemoveImg;
    
        document.querySelector('.modal-project-remove-confirm-img').appendChild(imageElementRemove);


        let boutonRemoveProject = document.getElementById("remove-confirmation");

        boutonRemoveProject.addEventListener("click", async function removeProject() {

          console.log("Mettre ici la supréssion du project " + idToRemove);



      fetch("http://localhost:5678/api/works" + "/" + idToRemove , {

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

hideDisplayModal.addEventListener('click', hideModal  );

// Bouton ajouter une nouvelle photo

const newProject = document.getElementById("add-project");

newProject.addEventListener("click", function () {

document.querySelector('.modal-project-remove-confirm').style.visibility = "hidden";
document.querySelector('.modal-project-gallery').style.visibility = "hidden";
document.querySelector('.modal-box-list').style.visibility = "hidden";
document.querySelector('.modal-add-project').style.visibility = "visible";

});

const newProject2 = document.getElementById("add-confirmation2");

newProject2.addEventListener("click", function () {

getNewProject()



});



// Ajouter une IMAGE



  const input = document.getElementById("btn-add-img");
  input.addEventListener('change', previewPhoto);

  const reponseModal = await fetch('http://localhost:5678/api/works');

  const projectsModal = await reponseModal.json();

genererProjectModal(projectsModal);

