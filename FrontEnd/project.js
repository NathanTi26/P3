

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


 console.log(projects);

 genererProject(projects); // Premier affichage de la page


////// MODAL /////

// On récupère le token

const token = localStorage.getItem("token");

const headerEdit = document.querySelector(".box-editing-mode");





  // Si Token OK afficher :
if(token !== null){

  console.log("TOKEN OK");

  console.log(token);

  document.querySelector('.box-editing-mode').classList.toggle('visible');

}

// Si Token PAS OK

  else {

    console.log("TOKEN PAS OK");

    document.querySelector('.box-editing-mode').classList.toggle('hidden');

  }



 // Afficher la modal

  const displayModal = document.getElementById('displaymodal')

  displayModal.addEventListener('click', showModal);
  
  function showModal(){
    document.querySelector('.modal').classList.toggle('visible');

  }
  
// Masquer la modal

  const hideDisplayModal = document.getElementById('hideModal')

  hideDisplayModal.addEventListener('click', showModal);
  
  function hideModal(){
    document.querySelector('.modal').classList.remove('visible');

  }


// Récupération des projects pour la modal

const reponseModal = await fetch('http://localhost:5678/api/works');

const projectsModal = await reponseModal.json();


function genererProjectModal(projectModal)

{

    for (let i = 0; i < projectModal.length; i++) {

    const article = projectModal[i] ;


    const sectionFichesModal = document.querySelector(".modal-box-list");

    const projectElementModal = document.createElement("figure");



    const imageElementModal = document.createElement("img") ;  

    imageElementModal.crossOrigin = "anonymous";
    imageElementModal.src = article.imageUrl;

    const mooveElement = document.createElement("button-modal-box");

    const deleteElement = document.createElement("button-modal-box");

    const editElement = document.createElement("button-modal-box");



// Afficher les projects dans la modal

    mooveElement.innerHTML = `<button class="modal-modif" id="place"><i class="fa-solid fa-arrows-up-down-left-right"></i></button>`;
    deleteElement.innerHTML = `<button class="modal-modif" id="remove"><i class="fa-solid fa-trash-can"></i></button>`;
    editElement.innerHTML = `<button class="modal-modif" id="edit">éditer</button>`;
    sectionFichesModal.appendChild(projectElementModal);

    projectElementModal.appendChild(imageElementModal);
    projectElementModal.appendChild(mooveElement);
    projectElementModal.appendChild(deleteElement);
    projectElementModal.appendChild(editElement);



}
 }



 genererProjectModal(projectsModal);


// Bouton supprésion procjet modal



const deleteProjectModal2 = document.getElementById("remove"); 

deleteProjectModal2.addEventListener("click", function () {
   const ProjectModal2 = projects.filter(function (project) {
       return project.id;
   });

   console.log("projet supprimé");

   genererProject(ProjectModal2);
});





////// FIN MODAL /////





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



function getUserLog() {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

  const user = {
    email: email,
    password: password
}

return user;

}

function showErrorMsg() {
  alert("Erreur dans l'identifiant ou le mot de passe");
}

document.getElementById("btn-log").addEventListener("click", async function(e) {

  e.preventDefault();
  
  
  let user = getUserLog()
  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user),
  })
  .then((res) => {
      if (res.ok) {
          return res.json();


      }
      else {
          showErrorMsg();
          return 0;
      }
  })
  .then((value) => {
      if (value !== 0) {
          localStorage.setItem("token", value.token);
          console.log(value.token);
      }
  })
}); 

// Gestion couleur des filtres actifs



const filter = document.querySelectorAll('.btn-filtre')

for ( let allFilter of filter){

  allFilter.addEventListener('click', function(){

for (let filterRemove of filter){

filterRemove.classList.remove('active')

}

allFilter.classList.add('active')
})}




// Affichage si token ok








