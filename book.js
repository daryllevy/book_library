"use strict";

// Mes variables
let myLibrary = [];
const form = document.querySelector("#form");
const btnSubmit = document.querySelector("#submit");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const nberOfPg = document.querySelector("#book-pages");
const btnRead = document.querySelector("#read");
const card = document.querySelector("#card");
let isCheckboxChecked = false;

//Le constructeur des livres
function Book(title, author, numberOfPages, haveRead) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }

  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
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
  let isBookRead;

  if (title.value === "" || author.value === "" || nberOfPg.value === "") {
    console.log("Veuillez remplir tous les champs obligatoires");
    e.preventDefault();
  } else {
    bookTitle = title.value;
    bookAuthor = author.value;
    bookNberOfPg = +nberOfPg.value;
    isBookRead = isCheckboxChecked;

    addBookToLibrary(bookTitle, bookAuthor, bookNberOfPg, isBookRead);
    displayBook(myLibrary);
    form.reset(); // Ca permet de renitialiser les champs du formulaire
  }
});

//Evènement pour supprimmer un livre de la bibliothèque
card.addEventListener("click", (e) => {
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
function addBookToLibrary(title, author, nberOfPg, haveRead) {
  const book = new Book(title, author, nberOfPg, haveRead);
  myLibrary.push(book);
}

// Fonction pour afficher chaque livre dans une card
function displayBook(array) {
  card.textContent = "";

  array.forEach((arr) => {
    const div = document.createElement("div");
    const title = document.createElement("h2");
    const author = document.createElement("p");
    const nberOfPg = document.createElement("p");
    const haveRead = document.createElement("button");
    const btnDelete = document.createElement("button");

    title.textContent = `Title : ${arr.title}`;
    author.textContent = `Author : ${arr.author}`;
    nberOfPg.textContent = `Number of pages : ${arr.numberOfPages}`;
    arr.haveRead === true
      ? (haveRead.textContent = "READ")
      : (haveRead.textContent = "NOT READ YET");
    haveRead.dataset.btnReadid = arr.id; // Ca lie le bouton read à l'id du livre
    btnDelete.dataset.btnDeleteid = arr.id; // Ca lie bouton delete à l'id du bouton
    btnDelete.textContent = "Delete";

    div.append(title, author, nberOfPg, haveRead, btnDelete);
    card.appendChild(div);
  });
}

//Fonction qui récupère la valeur du bouton read
function getBtnReadValue(e) {
  isCheckboxChecked = e.currentTarget.checked; // Ca prend la valeur de lachecked true lorsque c'est coché, false lorsque c'est pas coché
}

// Fonction pour toggle le statut de lecture du livre
Book.prototype.toggle = function () {
  this.haveRead = !this.haveRead;
};
