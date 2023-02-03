# Backend API - Sophie Bluel

Ce repo contient le code backend de l'architecte Sophie Bluel. 

## Lancement du backend

Après avoir récupéré le REPO executez la commande `npm install` pour installer les dépendances du projet

Une fois les dépendances installées lancez le projet avec la commande `npm start`

Compte de test pour Sophie Bluel

```
email: sophie.bluel@test.tld

password: S0phie 
```
Lien pour voir la
[documentation Swagger](http://localhost:5678/api-docs/)

Pour lire la documentation, utiliser Chrome ou Firefox



async function login(){

  // Récupérer identifiant dans l'input 
  // Récupérer mot de passe dans l'input

  // Faire un fetch de l'API login avec l'identifiant et le mot de passe
  let user = {
    "email": "sophie.bluel@test.tld",
    "password": "S0phie"
  };


  let response = await fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
  });
  
  let result = await response.json();

  console.log(result);

  localStorage.setItem(result, 'Token');

  // Si erreur afficher une alerte

  

  // Si OK enregistrer le token et le user id dans le local storage document.formeSignUp.addEventListener('submit' async function(e){






}



document.formLogIn.addEventListener('submit', async function(e) {

e.preventDefault();

const user = {

  email: this.email.value,
  password: this.password.value,
};


const res = await fetch('http://localhost:5678/api/users/login', {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(user);
});

const data = await res.json();
console.log('date')
});




const boutonLog = document.getElementById("btn-log");

boutonLog.addEventListener("click", async function (e) {

login()

})

async function login(){

  const user = {

    email: this.email.value,
    password: this.password.value,

  };


  let response = await fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user),
  });
  
  let result = await response.json();

  console.log(result);

  localStorage.setItem(result, 'Token');

}




document.formSignUp.addEventListener('submit', async function (e){
e.preventDefault();

const user = {

firstname: this.fristname.value,
lastname: this.lastname.value,
email: this.email.value,
pseudo: this.pseudo.value,
password: this.password.value,
};

const res = await fetch('http://localhost:5678/api/users/login', {
  method: 'post',
  headers: {

    'Content-Type': 'application/json',
  },
  body: JSON.stringify(user),

  });


});
