import $ from "jquery";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const membresDeLaFamille = [{
        name: "Jean",
        age: 29,
        jambes: 1,
        métier : "Infirmier"
    },
    {
        name: "Tim",
        jambes: 2,
        age: 55,
        métier : "Plombier"
    },
    {
        name: "Zoé",
        jambes: 2,
        age: 11,
        métier : "Ecole primaire"
    },
    {
        name: "Marie-Lou",
        jambes: 2,
        age: 25,
        métier : "Pompier"
    },
    {
        name: "Bernard",
        jambes: 2,
        age: 11,
        métier : "Ecole Primaire"
    },
    {
        name: "Renée",
        jambes: 3,
        age: 68,
        métier : "Retraité"
    }
];



let tableau = document.getElementById("tableau");
let ajouter = document.getElementById("ajouter");
let myInput = document.getElementById("myInput");
let selectionne = document.getElementById("selectionne");
let tableauHead = document.getElementById("tableauHead");
let test = document.getElementById("test");
let recherche;
let choix;

function afficherTableau(tab) {
    const $table = document.getElementById("tableau");
    for (let i = 0; i < tab.length; i++) {
        const element = tab[i];
        const keys = Object.keys(element);

        for (let j = 0; j < keys.length; j++) {
            const key = keys[j]
            const val = element[key]
        }
    }
}

function afficherTableau2(tab) {
    const $table = document.getElementById("tableau");
    for (let i = 0; i < tab.length; i++) {
        const element = tab[i];
        console.log(element);
        const keys = Object.keys(element);
        console.log(keys);

        for (let j = 0; j < keys.length; j++) {
            const key = keys[j]
            console.log(key);
            const val = element[key]
            console.log(val);
        }
    }
}

const $table = document.getElementById("tableau");
function creerTableau(tab) {
    let remplirTableau = "";

    for (let i = 0; i < tab.length; i++) {
        const personne = tab[i];
        const caracteristiques = Object.keys(personne);
        caracteristiques.sort();
        caracteristiques.reverse();
        remplirTableau += "<tr>";

            for (let j = 0; j < caracteristiques.length; j++) {
                const caractUnique = caracteristiques[j]
                const valeur = personne[caractUnique]
                remplirTableau += "<td>"+valeur+"</td>"
            }

        remplirTableau += "</tr>";        
    }
    $table.innerHTML = remplirTableau;

}

// afficherTableau2(membresDeLaFamille)
creerTableau(membresDeLaFamille);

// $table.innerHTML = remplirTableau;

function creerTableau2(tab) {
    for (let i = 0; i < tab.length ; i++) {
        const personne = tab[i];
        const caracteristiques = Object.keys(personne);                                 // Object.keys(tab[i])
        caracteristiques.sort();
        caracteristiques.reverse();
        $table.innerHTML += `<tr id="ligne${i}"></tr>`;

        for (let j=0; j<caracteristiques.length; j++) {
            const caractUnique = caracteristiques[j];
            const valeur = personne[caractUnique];
            document.getElementById(`ligne${i}`).innerHTML += "<td>"+valeur+"</td>";
        }
    }
}

// creerTableau2(membresDeLaFamille);

function creerTableauHeader(tab) {
    const caracteristiques = Object.keys(tab[0]);
    for (let i=0 ; i <caracteristiques.length; i++ ) {

        caracteristiques.sort();
        caracteristiques.reverse();
        tableauHead.innerHTML += "<th>" +caracteristiques[i].toUpperCase()+ "</th>"
    }
}
creerTableauHeader(membresDeLaFamille);

//////////////////////////FILTRER///////////////////////////////

function filtrerNom() {
    recherche = document.getElementById("myInput").value;
    const filtrage = membresDeLaFamille.filter(function(person){
        return person.name.toLowerCase().includes(recherche.toLowerCase());
    });
    tableauHead.innerHTML = "";
    creerTableauHeader(membresDeLaFamille);
    creerTableau(filtrage);
}
myInput.oninput = filtrerNom;

///////////////////////////SELECT///////////////////////////////

function creerSelection(tab) {
    const caracteristiques = Object.keys(tab[0]);
    caracteristiques.sort();
    caracteristiques.reverse();
    let contenuSelect = "<option>---</option>";
    for (let i=0; i <caracteristiques.length; i++) {
        contenuSelect += "<option value ='"+ caracteristiques[i]+"'>" + caracteristiques[i].toUpperCase() + "</option>";
    }
    selectionne.innerHTML = contenuSelect;
}
creerSelection(membresDeLaFamille);


function triParCategorie(tab) {
    choix = selectionne.value;
    const tri = membresDeLaFamille.map(f => f[choix]);
    if (choix != "---") {
        $table.innerHTML = "";
        tableauHead.innerHTML = "<th>"+choix.toUpperCase()+"</th>";
            for (let i = 0 ; i < tab.length ; i++) {
                $table.innerHTML += "<tr><td>"+tri[i]+"</td></tr>"
            }
    }
    else {
        creerTableau(membresDeLaFamille);
        tableauHead.innerHTML = "";
        creerTableauHeader(membresDeLaFamille);
    }
}

function appliquerTri() {
    triParCategorie(membresDeLaFamille)
}

selectionne.onchange = appliquerTri;

////////////////////////////AJOUT COLONNE///////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// afficherTableau(membresDeLaFamille);

/*function ajouterligne() {
    document.getElementById("tableau").innerHTML = "<tr><th>Nom</th><th>Age</th><th>Jambes</th></tr>";
	 for ( let i = 0 ; i<membresDeLaFamille.length ; i++) {
        document.getElementById("tableau").innerHTML += 
        '<tr><td scope="row">'+membresDeLaFamille[i].name+'</td><td>'+membresDeLaFamille[i].age+'</td><td>'+membresDeLaFamille[i].jambes+'</td></tr>'; }
}

ajouter.onclick = ajouterligne;
ajouterligne();

function chercherTexte() {
    texte = document.getElementById("myInput").value; 

    document.getElementById("tableau").innerHTML = "<tr><th>Nom</th><th>Age</th><th>Jambes</th></tr>";

    for ( let i = 0 ; i<membresDeLaFamille.length ; i++) {
            if (membresDeLaFamille[i].name.includes(texte)) {
                document.getElementById("tableau").innerHTML += 
                '<tr><td scope="row">'+membresDeLaFamille[i].name+'</td><td>'+membresDeLaFamille[i].age+'</td><td>'+membresDeLaFamille[i].jambes+'</td></tr>';
            }
    }
}

myInput.oninput = chercherTexte;

function triParCategorie() {
    choix = document.getElementById("selectionne").value;
    console.log(choix);
    document.getElementById("tableau").innerHTML = "";

    for (let i = 0; i<membresDeLaFamille.length ; i++){
        if (selectionne.value === "select-nom") {
            document.getElementById("tableau").innerHTML += 
                '<tr><td scope="row">'+membresDeLaFamille[i].name+'</td></tr>';
        }
        else if (selectionne.value === "select-age") {
            document.getElementById("tableau").innerHTML += 
                '<tr><td scope="row">'+membresDeLaFamille[i].age+'</td></tr>';
        }
        else if (selectionne.value === "select-jambes") {
            document.getElementById("tableau").innerHTML += 
                '<tr><td scope="row">'+membresDeLaFamille[i].jambes+'</td></tr>';
        }
        else {
            ajouterligne()
        }
    }
}

selectionne.onchange = triParCategorie;*/


// EXO 1

// PREMIERE SOLUTION
// const result = membresDeLaFamille.filter(e => e.age === 11);

// SECONDE SOLUTION
// const result = membresDeLaFamille.filter(function (person){
//     return person.age === 11
// });

// console.log(result);


// EXO 2

// PREMIERE SOLUTION
// const result2 = membresDeLaFamille.map(f => f.name);

// SECONDE SOLUTION
// const result2 = membresDeLaFamille.map(function(f){
//     return f.name
// })

// console.log(result2);


// EXO 3

//PREMIERE SOLUTION
// const result3 = membresDeLaFamille.find(g => g.jambes === 1);

//SECONDE SOLUTION
// const result3 = membresDeLaFamille.find(function(g){
//     return g.jambes === 1;
// })

// console.log(result3);


// EXO 4 

//PREMIERE SOLUTION
// const result4 = membresDeLaFamille.find(h => h.name.includes(texte))

// SECONDE SOLUTION
// const result4 = membresDeLaFamille.find(function(h){
//     return h.name.includes("-");
// })

// console.log(result4);


// EXO 5 

// PREMIERE SOLUTION
// const result5 = membresDeLaFamille.some(i => (i.age < 30) && (i.age>20))

// SECONDE SOLUTION
// const result5 = membresDeLaFamille.some(function(i){
//     return (i.age < 30) && (i.age>20);
// })

// console.log(result5)


// EXO 6

// PREMIERE SOLUTION
// const result6= membresDeLaFamille.every(j => j.jambes === 2)

// SECONDE SOLUTION
// const result6 = membresDeLaFamille.every(function(j){
//     return j.jambes === 2;
// })

// console.log(result6);


// EXO 7 

// PREMIERE SOLUTION
// const result7 = membresDeLaFamille.reduce(function(somme,personne){
//     return somme + personne.age;
// }, 0);

// SECONDE SOLUTION
// const result7 = membresDeLaFamille.reduce(
//     (somme, personne) => somme + personne.age, 0
//     );

// console.log(result7);


// EXO 8

// const result8 = membresDeLaFamille.reduce(function(accumulateur,{name,age}){
//     accumulateur[name]=age;
//     return accumulateur
// }, {})

// console.log(result8);