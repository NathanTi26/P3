let PROJECTS;

(async function (){

const REPONSE = await fetch('http://localhost:5678/api/works');
PROJECTS = await REPONSE.json();

genererProject(PROJECTS); // Premier affichage de la page

console.log(PROJECTS)


const REPONSE2 = await fetch('http://localhost:5678/api/categories');
PROJECTS2 = await REPONSE2.json();

generateFilterBtn(PROJECTS2); // Premier affichage de la page

console.log(PROJECTS2)



})()

let lastProjectId;

const TOKEN = getToken()



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

const MESSAGE_LOG_ERROR = document.createElement("message");
const MESSAGELOG = document.getElementById("connexion-error-message");

function showErrorMsg() {

    MESSAGE_LOG_ERROR.innerHTML = `<h4> Erreur dans l'indentifiant ou le mot de passe </h4>`;
    MESSAGELOG.appendChild(MESSAGE_LOG_ERROR);
    
    console.log("Clear Message Error")

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

IfTokenOk();


function getCategory(){

};


function generateFilterBtn(categoryFilter) {

  for (let i = 0; i < categoryFilter.length; i++) {

    generateFilterList(categoryFilter[i]);


  }
};

function generateFilterList(filterGlobal){

  const idCategory = filterGlobal.id;
  const nameCategory = filterGlobal.name;
  const sectionFilter = document.querySelector(".box-filtre");
  const categoryFilter2 = document.createElement("button");
  categoryFilter2.setAttribute("class", "btn-filtre");
  categoryFilter2.setAttribute("id", "btn-filtrer-" + idCategory);
  categoryFilter2.textContent = nameCategory;
  sectionFilter.appendChild(categoryFilter2);

  const btnFilter = document.getElementById("btn-filtrer-"+ idCategory);

  btnFilter.addEventListener("click", function () {

  idFilterCategory = btnFilter.id.split("-", 3)[1]

  const projectFiltred = PROJECTS.filter(function (project) {

    return project.categoryId === idCategory;

  });

  document.querySelector(".gallery").innerHTML = "";

  genererProject(projectFiltred);


});

const btnFilterAll = document.getElementById("btn-filtrer-4");

btnFilterAll.addEventListener("click", function () {

  const projectFiltre4 = PROJECTS.filter(function (project) {
    return PROJECTS
  });

  document.querySelector(".gallery").innerHTML = "";

  genererProject(projectFiltre4);

});


const filter = document.querySelectorAll('.btn-filtre')
  
for (let allFilter of filter) {

  allFilter.addEventListener('click', function () {

    for (let filterRemove of filter) {
      filterRemove.setAttribute("class", "btn-filtre")
    }
    allFilter.setAttribute("class", "btn-filtre active")
  })
}

};

