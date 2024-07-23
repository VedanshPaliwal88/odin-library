const addBook = document.getElementById("addBook");
const library = document.querySelector("#library");

const form = document.getElementById("newBookForm");
const dialog = document.querySelector("dialog");

const confirmBtn = document.getElementById("submit");

const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const isRead = document.getElementById("isRead");


const myLibrary = []

function Book([title, author, pages, isRead]) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}


function addBookToLibrary(book) {
    let newBook = document.createElement("div");
    newBook.classList.add("book");
    let newTitle = document.createElement("div");
    let newAuthor = document.createElement("div");
    let newPages = document.createElement("div");
    let newIsRead = document.createElement("div");
    let delButton = document.createElement("button");
    let toggleRead = document.createElement("button");

    newTitle.textContent = "Title: " + book.title;
    newTitle.classList.add("bookData");
    newAuthor.textContent = "Author: " + book.author;
    newAuthor.classList.add("bookData");
    newPages.textContent = "Pages: " + book.pages;
    newPages.classList.add("bookData");
    newIsRead.textContent = "Read: " + (book.isRead ? "yes" : "no");
    newIsRead.classList.add("bookData");
    
    delButton.textContent = "delete";
    delButton.addEventListener('click', function(e) {
        library.removeChild(newBook);
    })

    toggleRead.textContent = "toggle read";
    toggleRead.addEventListener('click', function(e) {
        book.isRead = !(book.isRead);
        newIsRead.textContent = "Read: " + (book.isRead ? "yes" : "no");
    })

    newBook.appendChild(newTitle);
    newBook.appendChild(newAuthor);
    newBook.appendChild(newPages);
    newBook.appendChild(newIsRead);
    newBook.appendChild(delButton);
    newBook.appendChild(toggleRead);
    
    library.appendChild(newBook);
}

let abc = new Book(['boom', 'ved', 123, false]);
let def = new Book(['abra', 'heta', 345, true]);
let kgf = new Book(['omg', 'hemu', 999, true]);

myLibrary.push(abc);
myLibrary.push(def);
myLibrary.push(kgf);

for (let newBook of myLibrary) {
    addBookToLibrary(newBook);
}

addBook.addEventListener("click", () => {
    dialog.showModal();
})

dialog.addEventListener('close', (e) => {
    const bookInfo = dialog.returnValue.split(',')
    let book = new Book(bookInfo);
    addBookToLibrary(book);
})

confirmBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let returns = [title.value, author.value, pages.value, isRead.value];
    dialog.close(returns);
})


