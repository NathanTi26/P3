const REPONSE = await fetch('http://localhost:5678/api/works');
const PROJECTS = await REPONSE.json();

// Bouton filtre Objet

const BOUTON_OBJECT = document.getElementById("btn-filtrer");

// Bouton filtre Appartement

const BOUTON_FLAT = document.getElementById("btn-filtrer2");

// Bouton filtre Hotels & Restaurants

const BOUTON_HOTEL = document.getElementById("btn-filtrer3");

// Bouton filtre Tous

const BOUTON_ALL = document.getElementById("btn-filtrer4");

// Gestion couleur des filtres actifs

const filter = document.querySelectorAll('.btn-filtre')

// Affichage de la connexion

const DISPLAY_FORM = document.getElementById('displayform')
DISPLAY_FORM.addEventListener('click', showForm);



function genererProject(projectfiltres) {

  for (let i = 0; i < projectfiltres.length; i++) {

    const ARTICLE = projectfiltres[i];


    const SECTION_FICHES = document.querySelector(".gallery");
    const PROJECT_ELEMENT = document.createElement("figure");
    const IMAGE_ELEMENT = document.createElement("img");
    IMAGE_ELEMENT.crossOrigin = "anonymous";
    IMAGE_ELEMENT.src = ARTICLE.imageUrl;
    const NOM_ELEMENT = document.createElement("figcaption");
    NOM_ELEMENT.innerText = ARTICLE.title;
    SECTION_FICHES.appendChild(PROJECT_ELEMENT);
    PROJECT_ELEMENT.appendChild(IMAGE_ELEMENT);
    PROJECT_ELEMENT.appendChild(NOM_ELEMENT);

  }
}

// Supréssion du TOKEN

function removeToken(){

  localStorage.removeItem("token", TOKEN);

  window.location.reload();
  
  console.log("Token remove")

}


// On récupère le token

function getToken(){

  let TOKEN = localStorage.getItem("token");

  return TOKEN;

}

// Check du TOKEN


function IfTokenOk(){

  if (TOKEN  !== null) {

    console.log("Voici le token :" + TOKEN)

    document.querySelector(".btn-show").innerHTML = `<a href="#" id="logout">logout</a>`;

    document.querySelector(".box-editing-mode1").innerHTML = `
    
    <div class="box-editing-mode">

    <h2>

    <i class="fa-regular fa-pen-to-square"></i> 
    
    Mode édition
    
    </h2>

    <button class="btn-publish">Publier les changements</button>
    
    </div>`;



     const BTN_LOGOUT = document.getElementById("logout"); 

     BTN_LOGOUT.addEventListener("click", function () {

      removeToken()
    });
  }

  else { // Si Token PAS OK

    console.log("Vous n'êtes pas connecté");
    document.querySelector(".btn-show").innerHTML = `<a href="#">login</a>`;
  }
}

// Affichage de la box de connexion

function showForm() {

  document.querySelector('.hiddensection').classList.toggle('hidden');
  document.querySelector('.connexion-box').classList.toggle('visible');

}

// Récupération des informations de connexion

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

document.getElementById("btn-log").addEventListener("click", async function (e) {

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

        window.location.reload();

      }
    })
}
);

genererProject(PROJECTS); // Premier affichage de la page


const TOKEN = getToken()

IfTokenOk()


// Bouton filtre Objet

BOUTON_OBJECT.addEventListener("click", function () {
  const PROJECT_FILTRE_1 = PROJECTS.filter(function (project) {
    return project.categoryId === 1;
  });

  console.log(PROJECT_FILTRE_1)

  document.querySelector(".gallery").innerHTML = "";

  genererProject(PROJECT_FILTRE_1);

});

// Bouton filtre Appartement

BOUTON_FLAT.addEventListener("click", function () {
  const PROJECT_FILTRE_2 = PROJECTS.filter(function (project) {
    return project.categoryId === 2;
  });

  console.log(PROJECT_FILTRE_2)

  document.querySelector(".gallery").innerHTML = "";

  genererProject(PROJECT_FILTRE_2);

});

// Bouton filtre Hotels & Restaurants

BOUTON_HOTEL.addEventListener("click", function () {
  const PROJECT_FILTRE_3 = PROJECTS.filter(function (project) {
    return project.categoryId === 3;
  });

  console.log(PROJECT_FILTRE_3)

  document.querySelector(".gallery").innerHTML = "";

  genererProject(PROJECT_FILTRE_3);

});

// Bouton filtre Tous


BOUTON_ALL.addEventListener("click", function () {
  const projetcsFiltre4 = PROJECTS.filter(function (project) {
    return projects
  });

  console.log(projetcsFiltre4)

  document.querySelector(".gallery").innerHTML = "";

  genererProject(projetcsFiltre4);

});






// Gestion couleur des filtres actifs



for (let allFilter of filter) {

  allFilter.addEventListener('click', function () {

    for (let filterRemove of filter) {
      filterRemove.classList.remove('active')
    }
    allFilter.classList.add('active')
  })
}