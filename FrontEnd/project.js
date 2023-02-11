function genererProject(projectfiltres) {

  for (let i = 0; i < projectfiltres.length; i++) {

    const article = projectfiltres[i];


    const sectionFiches = document.querySelector(".gallery");
    const projectElement = document.createElement("figure");
    const imageElement = document.createElement("img");
    imageElement.crossOrigin = "anonymous";
    imageElement.src = article.imageUrl;
    const nomElement = document.createElement("figcaption");
    nomElement.innerText = article.title;
    sectionFiches.appendChild(projectElement);
    projectElement.appendChild(imageElement);
    projectElement.appendChild(nomElement);

  }
}

// Supréssion du TOKEN

function removeToken(){

  localStorage.removeItem("token", token);

  window.location.reload();
  
  console.log("Token remove")

}


// On récupère le token

function getToken(){

  let token = localStorage.getItem("token");

  return token;

}

// Check du TOKEN


function IfTokenOk(){

  if (token  !== null) {

    console.log("Voici le token :" + token)

    document.querySelector(".btn-show").innerHTML = `<a href="#" id="logout">logout</a>`;

    document.querySelector(".box-editing-mode1").innerHTML = `
    
    <div class="box-editing-mode">

    <h2>

    <i class="fa-regular fa-pen-to-square"></i> 
    
    Mode édition
    
    </h2>

    <button class="btn-publish">Publier les changements</button>
    
    </div>`;



     const btnLogout = document.getElementById("logout"); 

     btnLogout.addEventListener("click", function () {

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


const reponse = await fetch('http://localhost:5678/api/works');
const projects = await reponse.json();

console.log(projects);

genererProject(projects); // Premier affichage de la page


const token = getToken()

IfTokenOk()


// Bouton filtre Objet

const boutonObject = document.getElementById("btn-filtrer2");

boutonObject.addEventListener("click", function () {
  const projetcsFiltre3 = projects.filter(function (project) {
    return project.categoryId === 1;
  });

  console.log(projetcsFiltre3)

  document.querySelector(".gallery").innerHTML = "";

  genererProject(projetcsFiltre3);

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


// Affichage de la connexion

const displayform = document.getElementById('displayform')
displayform.addEventListener('click', showForm);


// Gestion couleur des filtres actifs

const filter = document.querySelectorAll('.btn-filtre')

for (let allFilter of filter) {

  allFilter.addEventListener('click', function () {

    for (let filterRemove of filter) {
      filterRemove.classList.remove('active')
    }
    allFilter.classList.add('active')
  })
}