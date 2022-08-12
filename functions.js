const addBtn = document.querySelector(".floating-btn");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const booksGrid = document.querySelector(".books-grid");
const container = document.querySelector(".container");
const removeBtns = document.querySelectorAll(".remove-btn");
//form
const bookForm = document.querySelector(".book-form");
let index = -1;

addBtn.addEventListener("click", () => {
    displayForm();
})
overlay.addEventListener("click", () => {
    closeForm();
})

function displayForm(){
    modal.classList.add("show");
    overlay.classList.add("show");
}

function closeForm(){
    modal.classList.remove("show");
    overlay.classList.remove("show");
}

bookForm.addEventListener("submit", () => {
    closeForm();

    let bookTitle = bookForm.elements["title"].value;
    let bookAuthor = bookForm.elements["author"].value;
    let isRead = bookForm.elements["isRead"].checked;
    let newBook =  new Book(bookTitle, bookAuthor, isRead);

    addBookToLibrary(newBook);
    bookForm.reset();
})



let library = []; 

function Book(title, author, isRead){
    index = index + 1;
    this.index = index;
    this.title = title;
    this.author = author; 
    this.isRead = isRead;
}

function createCard(book){
    let card = document.createElement('div');
    card.classList.add("card")
    card.setAttribute("index", book.index)

    let line = document.createElement('div');
    line.classList.add('line');

    let bookInfo = document.createElement('div');
    bookInfo.classList.add('book-info');

    let bookTitle = document.createElement('h3');
    bookTitle.textContent = book.title; 

    let bookAuthor = document.createElement('p');
    bookAuthor.textContent = book.author; 

    let readTag = document.createElement('div');
    readTag.classList.add('read-tag');

    if(book.isRead==true){
        readTag.textContent = 'Completed'; 
        readTag.classList.add('read');
    }else{
        readTag.textContent = 'In process'; 
        readTag.classList.add('not-read');
    }

    let remove = document.createElement('div'); 
    remove.classList.add("remove-btn");
    remove.onclick = removeBookFromLibrary;

    bookInfo.append(bookTitle, bookAuthor,readTag);
    card.append(line,bookInfo,remove);

    return card;
}

function appendToGrid(book){
    let bookCard = createCard(book);
    booksGrid.appendChild(bookCard);
}


function addBookToLibrary(book){
    library.push(book);
    displayBooks();
}

function removeBookFromLibrary(event){
    let cardIndex = event.currentTarget.parentNode.getAttribute("index");

    library.splice(cardIndex, cardIndex+1);

    displayBooks();
    
}

function displayBooks(){
    if(library.length > 0){
        //empty the grid
        booksGrid.innerHTML = "";

        //display books
        for (let book of library) {
            appendToGrid(book);
        }
    }
}
