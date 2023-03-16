let PROJECTS;

(async function (){

const REPONSE = await fetch('http://localhost:5678/api/works');
PROJECTS = await REPONSE.json();

genererProject(PROJECTS); // Premier affichage de la page
})()


let lastProjectId;

const TOKEN = getToken()

// Bouton filtre Objet

const btnFilterObject = document.getElementById("btn-filtrer");

// Bouton filtre Appartement

const btnFilterFlat = document.getElementById("btn-filtrer2");

// Bouton filtre Hotels & Restaurants

const btnFilterHotel = document.getElementById("btn-filtrer3");

// Bouton filtre Tous

const btnFilterAll = document.getElementById("btn-filtrer4");

// Gestion couleur des filtres actifs

const filter = document.querySelectorAll('.btn-filtre')

// Affichage de la connexion

const btnDisplayForm = document.getElementById('displayform')
btnDisplayForm.addEventListener('click', showForm);

function generateProjectGlobal(articleGlobal){

  const idElementGlobal = articleGlobal.id;
  lastProjectId = articleGlobal.id;

  const sectionFicheGlobal = document.querySelector(".gallery");
  const projectElementGlobal = document.createElement("figure");
  projectElementGlobal.setAttribute("id", "element-" + idElementGlobal);
  const imageElementGlobal = document.createElement("img");
  imageElementGlobal.crossOrigin = "anonymous";
  imageElementGlobal.src = articleGlobal.imageUrl;
  const nomElementGlobal = document.createElement("figcaption");
  nomElementGlobal.innerText = articleGlobal.title;

  sectionFicheGlobal.appendChild(projectElementGlobal);
  projectElementGlobal.appendChild(imageElementGlobal);
  projectElementGlobal.appendChild(nomElementGlobal);

}



function genererProject(projectfiltres) {

  for (let i = 0; i < projectfiltres.length; i++) {

    generateProjectGlobal(projectfiltres[i]);


    if(i == projectfiltres.length -1){

  
      console.log(lastProjectId)
  
    }

  }
}

// Supréssion du TOKEN

function removeToken(){

  localStorage.removeItem("token", TOKEN);
  window.location.reload();
  console.log("Token remove")

}

function getToken(){

  let TOKEN = localStorage.getItem("token");
  return TOKEN;

}

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


    document.querySelector("#filtre-btn-modif").innerHTML = `
    
    <button class="btn-modification" id="displaymodal">
				
    <i class="fa-regular fa-pen-to-square"></i> 

    Modifier

  </button>`;


    document.querySelector("#introduction-btn-modif").innerHTML = `
    
    <button class="btn-modification" name="displaymodal">
    <i class="fa-regular fa-pen-to-square"></i> 
    Modifier
  </button>`;

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

function showForm() {

  document.querySelector('.hiddensection').classList.toggle('hidden');
  document.querySelector('.connexion-box').classList.toggle('visible');

}

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

IfTokenOk()

// Bouton filtre Objet

btnFilterObject.addEventListener("click", function () {
  const projectFiltre1 = PROJECTS.filter(function (project) {
    return project.categoryId === 1;
  });

  console.log(projectFiltre1)

  document.querySelector(".gallery").innerHTML = "";

  genererProject(projectFiltre1);

});

// Bouton filtre Appartement

btnFilterFlat.addEventListener("click", function () {
  const projectFiltre2 = PROJECTS.filter(function (project) {
    return project.categoryId === 2;
  });

  console.log(projectFiltre2)

  document.querySelector(".gallery").innerHTML = "";

  genererProject(projectFiltre2);

});

// Bouton filtre Hotels & Restaurants

btnFilterHotel.addEventListener("click", function () {
  const projectFiltre3 = PROJECTS.filter(function (project) {
    return project.categoryId === 3;
  });

  console.log(projectFiltre3)

  document.querySelector(".gallery").innerHTML = "";

  genererProject(projectFiltre3);

});

// Bouton filtre Tous


btnFilterAll.addEventListener("click", function () {
  const projectFiltre4 = PROJECTS.filter(function (project) {
    return PROJECTS
  });

  console.log(projectFiltre4)

  document.querySelector(".gallery").innerHTML = "";

  genererProject(projectFiltre4);

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