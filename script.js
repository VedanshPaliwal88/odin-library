const addBook = document.getElementById("addBook");
const library = document.querySelector("#library");

const form = document.getElementById("newBookForm");
const dialog = document.querySelector("dialog");

const confirmBtn = document.getElementById("submit");

const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const isRead = document.getElementById("isRead");

const titleError = document.querySelector("#title + span.error");
const authorError = document.querySelector("#author + span.error");
const pagesError = document.querySelector("#pages + span.error");


class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
}

class Library {
    constructor() {
        this.library = [];
    }

    isInLibrary(newBook) {
        return this.library.some((book) => book.title === newBook.title);
    }

    addBookToLibrary(book) {
        if(!this.isInLibrary(book)){
            this.library.push(book);
            
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
    }

}


let a = new Book('The Hobbit', 'J.R.R. Tolkien', 304, true);
let b = new Book('To Kill a Mockingbird', 'Harper Lee', 336, false);
let c = new Book('Atomic Habits', 'James Clear', 320, true);

let myLibrary = new Library();

myLibrary.addBookToLibrary(a);
myLibrary.addBookToLibrary(b);
myLibrary.addBookToLibrary(c);

addBook.addEventListener("click", () => {
    dialog.showModal();
})

dialog.addEventListener('close', (e) => {
    const bookInfo = dialog.returnValue.split(',')
    if(bookInfo === null) console.log(...bookInfo);
    let book = new Book(...bookInfo);
    myLibrary.addBookToLibrary(book);
})

confirmBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (title.validity.valid && author.validity.valid && pages.validity.valid) {
        let returns = [title.value, author.value, pages.value, isRead.value];
        dialog.close(returns);
    } else showError();
});


function showError() {
    if (title.validity.valueMissing) {
        titleError.textContent = "Please enter a title";
        titleError.className = "error active";
    }

    if (author.validity.valueMissing) {
        authorError.textContent = "Please enter author's name";
        authorError.className = "error active";
    }
    
    if (pages.validity.valueMissing) {
        pagesError.textContent = "Please enter number of pages";
        pagesError.className = "error active";    
    }
}