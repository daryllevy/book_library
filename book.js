"use strict";
// Mes variables
let myLibrary = [];
const btnSubmit = document.querySelector("#submit");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const nberOfPg = document.querySelector("#book-pages");
const btnRead = document.querySelector("#read");
const card = document.querySelector("#card");

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

// La fonction qui donne des infos sur les livres
Book.prototype.infos = function () {
  if (this.haveRead === "yes") {
    console.log(
      `${this.title} by ${this.author}, ${this.numberOfPages} pages, already read it`,
    );
  } else {
    console.log(
      `${this.title} by ${this.author}, ${this.numberOfPages} pages, not read yet`,
    );
  }
};

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
    bookNberOfPg = nberOfPg.value;
    isBookRead = true; // pour effectuer des tests pour le moment

    addBookToLibrary(bookTitle, bookAuthor, bookNberOfPg, isBookRead);
    displayBook(myLibrary);
  }
});

// Fonction qui créée un livre et le sauvegarde
function addBookToLibrary(title, author, nberOfPg, haveRead) {
  const book = new Book(title, author, nberOfPg, haveRead);
  myLibrary.push(book);
  console.log(book);
}

// Fonction pour afficher chaque livre dans une card
function displayBook(array) {
  card.textContent = "";

  array.forEach((arr) => {
    const div = document.createElement("div");
    const title = document.createElement("h2");
    const author = document.createElement("p");
    const nberOfPg = document.createElement("p");
    const haveRead = document.createElement("p");
    const btnDelete = document.createElement("button");

    title.textContent = `Title : ${arr.title}`;
    author.textContent = `Author : ${arr.author}`;
    nberOfPg.textContent = `Number of pages : ${arr.numberOfPages}`;
    haveRead.textContent = `Read? : ${arr.haveRead}`;
    btnDelete.dataset.id = `${arr.id}`;
    btnDelete.textContent = "Delete";

    div.append(title, author, nberOfPg, haveRead, btnDelete);
    card.appendChild(div);
  });
}

//Evènement pour supprimmer un livre de la bibliothèque
card.addEventListener("click", (e) => {
  let target = e.target;
  if (target.hasAttribute("data-id")) {
    myLibrary = deleteBook(myLibrary, target);
    displayBook(myLibrary);
  }
});

// Fonction pour supprimmer un livre
function deleteBook(array, element) {
  //1. je créé une copie de l'array
  let arrCop = array.filter((arr) => arr.id !== element.dataset.id);
  return arrCop;
}

console.log(myLibrary);
