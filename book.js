"use strict";

// Mes variables
let myLibrary = [];
const table = document.querySelector("#table-book");
const tableBody = document.querySelector("#table-body");
const form = document.querySelector("#form");
const btnSubmit = document.querySelector("#submit");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const nberOfPg = document.querySelector("#book-pages");
const btnRead = document.querySelector("#read");
const btnScore = document.querySelector("#score");
const card = document.querySelector("#card");
let isCheckboxChecked = false;

//Le constructeur des livres
function Book(title, author, numberOfPages, score, haveRead) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }

  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.score = score;
  this.haveRead = haveRead;
  this.id = crypto.randomUUID(); // permet d'avoir un identifiant unique
}

// MES EVENEMENTS //
// *** //

//Evènement qui ajoute des livres
btnSubmit.addEventListener("click", (e) => {
  let bookTitle;
  let bookAuthor;
  let bookNberOfPg;
  let bookScore;
  let isBookRead;

  if (title.value === "" || author.value === "" || nberOfPg.value === "") {
    alert("Veuillez remplir tous les champs obligatoires");
    e.preventDefault();
  } else {
    bookTitle = title.value;
    bookAuthor = author.value;
    bookNberOfPg = +nberOfPg.value;
    if (isCheckboxChecked) {
      isBookRead = "READ";
    } else {
      isBookRead = "NOT READ";
    }
    bookScore = +btnScore.value;

    addBookToLibrary(
      bookTitle,
      bookAuthor,
      bookNberOfPg,
      bookScore,
      isBookRead,
    );
    displayBook(myLibrary);
    form.reset(); // Ca permet de renitialiser les champs du formulaire
  }
});

//Evènement pour supprimmer un livre de la bibliothèque
table.addEventListener("click", (e) => {
  let target = e.target;

  // Si le clic c'est sur le bouton delete
  if (target.hasAttribute("data-btn-deleteid")) {
    myLibrary = deleteBook(myLibrary, target);
    displayBook(myLibrary);
  }

  // Si le clic c'est sur le bouton "read"
  if (target.hasAttribute("data-btn-readid")) {
    // Si myLibrary contient le bouton avec dataset.btnReadid
    const found = myLibrary.find(
      (element) => element.id === target.dataset.btnReadid,
    );

    found.toggle();
    displayBook(myLibrary);
  }
});

// Evènement qui vérifie l'état du bouton read
btnRead.addEventListener("change", getBtnReadValue);

// *** //

// MES FONCTIONS //
// *******//

// Fonction pour supprimmer un livre
function deleteBook(array, element) {
  //1. je créé une copie de l'array
  let arrCop = array.filter((arr) => arr.id !== element.dataset.btnDeleteid);
  return arrCop;
}

// Fonction qui créée un livre et le sauvegarde
function addBookToLibrary(title, author, nberOfPg, bookScore, haveRead) {
  const book = new Book(title, author, nberOfPg, bookScore, haveRead);
  myLibrary.push(book);
}

// Fonction pour afficher chaque livre dans une card
function displayBook(array) {
  tableBody.innerHTML = "";

  array.forEach((arr) => {
    const htmlBook = `
    <tr>
      <td>${arr.title}</td>
      <td>${arr.author}</td>
      <td>${arr.numberOfPages}</td>
      <td><button class ="book-status" data-btn-readid ="${arr.id}">${arr.haveRead}</button></td>
      <td>${arr.score}</td>
      <td><button class ="btn-delete" data-btn-deleteid ="${arr.id}">DELETE</button></td>
    `;

    tableBody.insertAdjacentHTML("afterbegin", htmlBook);
  });
}

//Fonction qui récupère la valeur du bouton read
function getBtnReadValue(e) {
  isCheckboxChecked = e.currentTarget.checked; // Ca prend la valeur de lachecked true lorsque c'est coché, false lorsque c'est pas coché
}

// Fonction pour toggle le statut de lecture du livre
Book.prototype.toggle = function () {
  this.haveRead === "READ"
    ? (this.haveRead = "NOT READ")
    : (this.haveRead = "READ");
};

// Injecte mon svg dans mon html
fetch("images/illustration.svg")
  .then((response) => response.text())
  .then((svgContent) => {
    document.querySelector(".illustration").innerHTML = svgContent;
  });
