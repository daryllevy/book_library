"use strict";

const myLibrary = [];

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

// prompt pour avoir les valeurs des livres$
let title = prompt("What's the title of the book ?");
let author = prompt("Who wrote it ?");
let nberOfPg = +prompt("How many pages does it have ?");
let haveRead = prompt("Have you read it ? (type 'yes' or 'no')");

// Gère le cas où il n' y a pas de réponse
if (haveRead === null) {
  alert("Vous n'avez pas donné de réponse");
}

// Gère les espaces et rend tout en minuscule
haveRead = haveRead.trim().toLowerCase();
if (haveRead === "yes") {
  haveRead = true;
} else {
  haveRead = false;
}

// Fonction qui créée un livre et le sauvegarde
function addBookToLibrary(title, author, nberOfPg, haveRead) {
  const book = new Book(title, author, nberOfPg, haveRead);
  myLibrary.push(book);
  console.log(book);
}

// Fonction pour afficher chaque livre dans une card
function displayBook(array) {
  for (let i = 0; i < array.length; i++) {
    // J'initialise les élément html qui ferons la card
    const div = document.createElement("div");
    const bookNumber = document.createElement("h2");
    const title = document.createElement("h2");
    const author = document.createElement("p");
    const nberOfPg = document.createElement("p");
    const haveRead = document.createElement("p");

    bookNumber.textContent = `Book number ${i}`;
    title.textContent = `Title : ${array[i].title}`;
    author.textContent = `Author : ${array[i].author}`;
    nberOfPg.textContent = `Number of pages : ${array[i].numberOfPages}`;
    haveRead.textContent = `Read? : ${array[i].haveRead}`;

    div.append(title, author, nberOfPg, haveRead);
    document.body.append(bookNumber, div);
  }
}

addBookToLibrary(title, author, nberOfPg, haveRead);
addBookToLibrary("good moring", "Gayle King", 321, true);
displayBook(myLibrary);
console.log(myLibrary);
