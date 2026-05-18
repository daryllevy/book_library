function Book(title, author, number_of_pages, have_read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }

  this.title = title;
  this.author = author;
  this.number_of_pages = number_of_pages;
  this.have_read = have_read;
  this.infos = function () {
    if (have_read) {
      console.log(
        `${title} by ${author}, ${number_of_pages} pages, already read it`,
      );
    } else {
      console.log(
        `${title} by ${author}, ${number_of_pages} pages, not read yet`,
      );
    }
  };
}

const book1 = new Book("Les Misérables", "Victor Hugo", 234, false);
const book2 = new Book("Père Inconnu", "Pabé Mongo", 134, true);

console.log(book1.infos());
console.log(book2.infos());

function Player(name, marker) {
  this.name = name;
  this.marker = marker;
  this.sayName = function () {
    console.log(`${this.name}`);
  };
}

const player1 = new Player("Steve", "X");
const player2 = new Player("Jobs", "O");
