

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

const token = localStorage.getItem("token");
console.log(token);
const headerDisplay = () => {

    if (localStorage.token) {

      document.querySelector('.box-change').classList.toggle('visible');

    }
    
    else {
      showErrorMsg("Token non reconnu");
    }
}




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

