 
const addNewBookBtn = document.querySelector(".add-books-box__btn");
const favouritesBtn = document.querySelector(".favourites__link");
const searchBookInput = document.querySelector(".search-input");
const bookTitle = document.querySelector(".books__title");
const booksRow = document.querySelector(".books__row");
const hamburgerMenu = document.querySelector(".hamburger-menu");
const sidebar = document.querySelector(".sidebar");

let books = JSON.parse(window.localStorage.getItem("books")) || [];
let readPages = JSON.parse(window.localStorage.getItem("read-pages")) || [];
let bookInformation = JSON.parse(window.localStorage.getItem("book-info")) || {};

const toggleBooleanValues = {
    isGenresOpen: false,
    isInformationOpen: false,
    isDangerZoneOpen: false,
    isMenuOpen: false,
};

const addBookFormNodes = {
    addBookForm: document.querySelector("#add-book-form"),
    addBookFormTitle: document.querySelector("#add-book-form__title"),
    addBookFormAuthor: document.querySelector("#add-book-form__author"),
    addBookFormPages: document.querySelector("#add-book-form__pages"),
    addBookFormCategories: document.querySelector("#add-book-form__categories"),
    addBookFormIsRead: document.querySelector("#add-book-form__read"),
    addBookFormIsFavourite: document.querySelector("#add-book-form__favourite"),
    addBookFormCancelBtn: document.querySelector("#add-book-form__cancel-btn"),
    addBookFormAddBtn: document.querySelector("#add-book-form__add-btn"),
};
const editBookFormNodes = {
    editBookForm: document.querySelector("#edit-book-form"),
    editBookFormTitle: document.querySelector("#edit-book-form__title"),
    editBookFormAuthor: document.querySelector("#edit-book-form__author"),
    editBookFormPages: document.querySelector("#edit-book-form__pages"),
    editBookFormCategories: document.querySelector("#edit-book-form__categories"),
    editBookFormIsRead: document.querySelector("#edit-book-form__read"),
    editBookFormIsFavourite: document.querySelector("#edit-book-form__favourite"),
    editBookFormCancelBtn: document.querySelector("#edit-book-form__cancel-btn"),
    editBookFormEditBtn: document.querySelector("#edit-book-form__edit-btn"),
};
const modalNodes = {
    modal: document.querySelector(".modal"),
    cancelModalBtn: document.querySelector(".modal .modal__cancel-btn"),
    deleteModalBtn: document.querySelector(".modal .modal__delete-btn"),
};
const genresNodes = {
    genresContainer: document.querySelector(".genres"),
    genresBtn: document.querySelector(".genres-box__link"),
    genres: document.querySelectorAll(".genres .genres__link"),
};
 
const bookInformationNodes = {
    infoContainer: document.querySelector(".info"),
    infoBtn: document.querySelector(".info-box__link"),
    infoBookAmount: document.querySelector(".info .info__books-amount"),
    infoCompletedBooksAmount: document.querySelector(".info .info__completed-books-amount"),
    infoPagesAmount: document.querySelector(".info .info__total-pages-amount"),
    infoTotalReadPagesAmount: document.querySelector(".info .info__read-pages-amount"),
};
const dangerZoneNodes = {
    dangerZoneBtn: document.querySelector(".danger-zone__link"),
    deleteAllBtn: document.querySelector(".btn__delete-all-btn"),
};


 
const BookStore = function(){}
BookStore.getBooksFromLocalStorage = function(){
    books =  JSON.parse(window.localStorage.getItem("books"));
    if(!books){
        books = [];
        return books;
    }   
    return books;
}
BookStore.addBookToLocalStorage = function(books){
   window.localStorage.setItem("books", JSON.stringify(books));
}
BookStore.removeBookFromLocalStorage = function(index){
    books = BookStore.getBooksFromLocalStorage();
    if(!books)return;
    if(books[index]){
        books.splice(index, 1);
        window.localStorage.setItem("books", JSON.stringify(books));
    }
}

const ReadPagesStore = function(){}

ReadPagesStore.getReadPagesFromLocalStorage = function(){
    readPages = JSON.parse(window.localStorage.getItem("read-pages"));
   
    if(!readPages){
        readPages = [];
        return readPages;
    }
    return readPages;
}

ReadPagesStore.addReadPagesToLocalStorage = function(readPages){
    
    window.localStorage.setItem("read-pages", JSON.stringify(readPages));
};
ReadPagesStore.removeReadPagesFromLocalStorage = function(index){
    readPages = ReadPagesStore.getReadPagesFromLocalStorage();
    if(readPages[index]){
        readPages.splice(index, 1);
        window.localStorage.setItem("read-pages", JSON.stringify(readPages));
    }
};
const BookInformationStore = function(){}
BookInformationStore.getBookInfoFromLocalStorage = function(){
   bookInformation = JSON.parse(window.localStorage.getItem("book-info"));
   if(!bookInformation){
       bookInformation = {};
       return bookInformation;
   }
   return bookInformation;
};
BookInformationStore.addBookInfoToLocalStorage = function(bookInformation){
    window.localStorage.setItem("book-info", JSON.stringify(bookInformation));
};


const Book = function(title, author, pages, category, isRead = false, isFavourite = false, id = new Date().getDate().toString()){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.category = category;
    this.isRead = isRead;
    this.isFavourite = isFavourite;
    this.id = id;
}
const saveToLocalStorage = (bookInformation)=>{
    window.localStorage.setItem("book-info", JSON.stringify(bookInformation));
}
const hideNode = (node)=>{
    node.style.display = "none";
};
const displayNode = (node)=>{
    node.style.display = "block";
};
const displayFlexNode = (node)=>{
    node.style.display = "flex";
};
const displayModal = ()=>{
    displayFlexNode(modalNodes.modal);
}
const removeModal = ()=>{
    hideNode(modalNodes.modal);
}


const removeAddBookForm = (event)=>{
    hideNode(addBookFormNodes.addBookForm.parentElement);
}
const updateBookInfo = ()=>{
    bookInformation = BookInformationStore.getBookInfoFromLocalStorage();
    if(bookInformation.bookAmount){
    // infoContainer: document.querySelector(".info"),
    // infoBookAmount: document.querySelector(".info .info__books-amount"),
    // infoCompletedBooksAmount: document.querySelector(".info .info__completed-books-amount"),
    // infoPagesAmount: document.querySelector(".info .info__total-pages-amount"),
    // infoTotalReadPagesAmount: document.querySelector(".info .info__read-pages-amoun"),
        bookInformationNodes.infoBookAmount.textContent = bookInformation.bookAmount;
        bookInformationNodes.infoCompletedBooksAmount.textContent = bookInformation.completedBooksAmount;
        bookInformationNodes.infoPagesAmount.textContent = bookInformation.totalPagesAmount;
        bookInformationNodes.infoTotalReadPagesAmount.textContent = bookInformation.totalReadPagesAmount;
    }
     
}
const updateReadPageCount = (bookEl, bookObj, event)=>{
    const books = BookStore.getBooksFromLocalStorage();
    const readPages = ReadPagesStore.getReadPagesFromLocalStorage();
    const index = books.findIndex(book => book.id === bookObj.id);
    const bookReadAmountText = bookEl.querySelector(".book__read-amount-page");
    let readAmount =readPages[index];
    const currentBtnType = event.target.dataset.btnType;
    if(currentBtnType === "increment"){
        bookReadAmountText.textContent = readAmount < books[index].pages ? ++readAmount : readAmount; 
    } else {
        bookReadAmountText.textContent = readAmount > 0 ? --readAmount : readAmount;
    }
    readPages[index] = readAmount;  
    bookInformation.totalReadPagesAmount = readPages.reduce((total, currEl)=> total + currEl, 0);
    ReadPagesStore.addReadPagesToLocalStorage(readPages);
    BookInformationStore.addBookInfoToLocalStorage(bookInformation);
    updateBookInfo();
};
const toggleReadStatus = (bookEl, bookObj, event)=>{
    const books = BookStore.getBooksFromLocalStorage();
    const index = books.findIndex(book => book.id === bookObj.id);
    const bookReadText = bookEl.querySelector(".book__read-text");
    const toggleIcon = event.target
    if(toggleIcon.classList.contains("fa-check")){
        toggleIcon.className = "fa fa-times book__not-read book__read-icon";
        bookReadText.textContent = "Not read yet";
        books[index].isRead = !books[index].isRead;
    } else {
        toggleIcon.className = "fa fa-check book__read book__read-icon";
        bookReadText.textContent = "I've completed reading";
        books[index].isRead = !books[index].isRead;
    }
    bookInformation = BookInformationStore.getBookInfoFromLocalStorage();
    bookInformation.completedBooksAmount = books.filter(book => book.isRead).length;
    bookObj.isRead = books[index].isRead;

    BookStore.addBookToLocalStorage(books);
    BookInformationStore.addBookInfoToLocalStorage(bookInformation);
    updateBookInfo();
};
 
const deleteBook = (bookEl, bookObj, event)=>{
    const books = BookStore.getBooksFromLocalStorage();
    const readPages = ReadPagesStore.getReadPagesFromLocalStorage();
    const index = books.findIndex(book => book.id === bookObj.id);

    if(index >= 0){
        
        console.log(books)
        console.log(readPages);
        console.log(index)
        bookInformation = BookInformationStore.getBookInfoFromLocalStorage();
        bookInformation.bookAmount -= 1;
        bookInformation.completedBooksAmount -= books[index].isRead ? 1 : 0;
        bookInformation.totalPagesAmount -= books[index].pages;
        bookInformation.totalReadPagesAmount -= readPages[index] || 0;


        books.splice(index, 1);
        readPages.splice(index, 1);
        BookStore.addBookToLocalStorage(books);
        BookInformationStore.addBookInfoToLocalStorage(bookInformation);
        ReadPagesStore.addReadPagesToLocalStorage(readPages);
        updateBookInfo();
        removeModal();
        
        window.location.reload();
    }
};
const deleteCurrentBook = (bookEl, bookObj, event)=>{
    displayModal();
    modalNodes.cancelModalBtn.addEventListener("click", removeModal);
    modalNodes.deleteModalBtn.addEventListener("click", deleteBook.bind(null, bookEl, bookObj));
};
const removeEditBookForm = (event)=>{
    hideNode(editBookFormNodes.editBookForm.parentElement);
    hideNode(editBookFormNodes.editBookForm);
};
const populateInputWithExistingValues = (bookObj)=>{
    console.log(bookObj.isRead);
    editBookFormNodes.editBookFormTitle.value = bookObj.title;
    editBookFormNodes.editBookFormAuthor.value = bookObj.author;
    editBookFormNodes.editBookFormPages.value = bookObj.pages;
    editBookFormNodes.editBookFormCategories.value = bookObj.category;
    editBookFormNodes.editBookFormIsRead.checked = bookObj.isRead;
    editBookFormNodes.editBookFormIsFavourite.checked = bookObj.isFavourite;
}
const updateBookObject = (book)=>{
    book.title = editBookFormNodes.editBookFormTitle.value; 
    book.author = editBookFormNodes.editBookFormAuthor.value; 
    book.pages = editBookFormNodes.editBookFormPages.value; 
    book.category = editBookFormNodes.editBookFormCategories.value; 
    book.isRead = editBookFormNodes.editBookFormIsRead.checked; 
    book.isFavourite = editBookFormNodes.editBookFormIsFavourite.checked; 
}
const editBook = (bookEl, bookObj, event)=>{
    const books = BookStore.getBooksFromLocalStorage();
    const index = books.findIndex(book => book.id === bookObj.id);
    const toggleIcon = bookEl.querySelector(".book__read-btn i");
    const bookReadText = bookEl.querySelector(".book__read-text"); 
    updateBookObject(books[index]);
    BookStore.addBookToLocalStorage(books);

     
    bookInformation = BookInformationStore.getBookInfoFromLocalStorage();
    if((!bookObj.isRead && books[index].isRead) && 
        bookInformation.completedBooksAmount < bookInformation.bookAmount) {
            bookInformation.completedBooksAmount += 1;     
            toggleIcon.className = "fa fa-check book__read book__read-icon";
            bookReadText.textContent = "I've completed reading";
    } else if(bookObj.isRead && !books[index].isRead) {
            bookInformation.completedBooksAmount -= 1; 
            toggleIcon.className = "fa fa-times book__not-read book__read-icon";
            bookReadText.textContent = "Not read yet";   
    }
    if(bookObj.pages >= books[index].pages){
        bookInformation.totalPagesAmount = bookInformation.totalPagesAmount - (bookObj.pages - books[index].pages) 
    } else {
        bookInformation.totalPagesAmount -= bookObj.pages;
    }

    bookObj.isRead = books[index].isRead; 
    saveToLocalStorage(bookInformation);
    updateBookInfo();
    hideNode(editBookFormNodes.editBookForm.parentElement);
    hideNode(editBookFormNodes.editBookForm);
    window.location.reload();
}
const editCurrentBook = (bookEl, bookObj, event)=>{
    displayNode(editBookFormNodes.editBookForm.parentElement);
    displayNode(editBookFormNodes.editBookForm);
    editBookFormNodes.editBookForm.addEventListener("submit", e => e.preventDefault());
    hideNode(addBookFormNodes.addBookForm);
    populateInputWithExistingValues(bookObj);

    editBookFormNodes.editBookFormCancelBtn.addEventListener("click", removeEditBookForm);
    editBookFormNodes.editBookFormEditBtn.addEventListener("click", editBook.bind(null, bookEl, bookObj));
    
}

Book.addBookToDOM = (bookObj)=>{
    const books = BookStore.getBooksFromLocalStorage();
    const readPages = ReadPagesStore.getReadPagesFromLocalStorage();
    
    const index = books.findIndex(book => book.id === bookObj.id);
     
    const article = document.createElement("article");
    article.classList.add("book");
    article.innerHTML = `
        <header class="book__header">
            <h2 class="book__title">
                <span class="book__title-span">
                    Title:
                </span>
                <span class="book__title-container">
                    ${books[index].title}
                </span>
            </h2>
            <h2 class="book__author">
                <span class="book__author-span">
                    Author:
                </span>
                <span class="book__author-container">
                    ${books[index].author}
                </span>
            </h2>
        </header>
        <div class="book__read-status">
            <button class="book__read-btn">
                <i class="${books[index].isRead ? "fa fa-check book__read" : "fa fa-times book__not-read"} book__read-icon"></i>
            </button>
            <p class="book__read-text">
               ${books[index].isRead ? "I've completed reading" : "Not read yet"}
            </p>
        </div>
        <section class="book__btns">
            <button class="book__edit-btn">
                <i class="fas fa-edit"></i>
            </button>
            <button class="book__delete-btn">
                <i class="fas fa-trash-alt"></i>
            </button>
        </section>
        
        <div class="book__read-pages">
                Read 
                <span class="book__read-amount-page">
                    ${readPages[index]}
                </span>
                of 
                <span class="book__total-book-pages">
                    ${books[index].pages}
                </span>
                pages
        </div>
        <section class="book__page-count-btns book__btns">   
            <button data-btn-type="decrement" class="btn book__increment-btn book__read-amount-btn">
                -
            </button>
            <button data-btn-type="increment" class="btn book__increment-btn book__read-amount-btn">
                +
            </button>
        </section>
    `;
    booksRow.appendChild(article);
    article.querySelector(".book__page-count-btns").addEventListener("click", updateReadPageCount.bind(null, article, bookObj));
    article.querySelector(".book__read-btn").addEventListener("click", toggleReadStatus.bind(null, article, bookObj));
    article.querySelector(".book__delete-btn").addEventListener("click", deleteCurrentBook.bind(null, article, bookObj));
    article.querySelector(".book__edit-btn").addEventListener("click", editCurrentBook.bind(null, article, bookObj));
};
const addCurrentBook = (event)=>{
    event.stopPropagation();

    const {value: title} = addBookFormNodes.addBookFormTitle;
    const {value: author} = addBookFormNodes.addBookFormAuthor;
    const {value: pages} = addBookFormNodes.addBookFormPages;
    const {value: category} = addBookFormNodes.addBookFormCategories;
    const {checked: isRead} = addBookFormNodes.addBookFormIsRead;
    const {checked: isFavourite} = addBookFormNodes.addBookFormIsFavourite;

    const book = new Book(title, author, pages, category, isRead, isFavourite, uuidv4());
    books.push(book);
    readPages.push(0);

    
    

    BookStore.addBookToLocalStorage(books);
    ReadPagesStore.addReadPagesToLocalStorage(readPages);
   
    Book.addBookToDOM(book);

    bookInformation.bookAmount = books.length;
    bookInformation.completedBooksAmount = books.filter(book => book.isRead).length;
    bookInformation.totalPagesAmount = books.reduce((total, currEl)=> total + Number(currEl.pages), 0);
    bookInformation.totalReadPagesAmount = ReadPagesStore.getReadPagesFromLocalStorage().reduce((total, currEl)=> total + currEl, 0);

    BookInformationStore.addBookInfoToLocalStorage(bookInformation);
    updateBookInfo()
    


    hideNode(addBookFormNodes.addBookForm.parentElement);
}
const addBook = (event) =>{
    event.preventDefault();    
    addBookFormNodes.addBookForm.reset();
};
const displayAddForm = (event)=>{
    displayNode(addBookFormNodes.addBookForm.parentElement);
    displayNode(addBookFormNodes.addBookForm);
    hideNode(editBookFormNodes.editBookForm);
    addBookFormNodes.addBookFormCancelBtn.addEventListener("click", removeAddBookForm);
    addBookFormNodes.addBookFormAddBtn.addEventListener("click", addCurrentBook);
    addBookFormNodes.addBookForm.addEventListener("submit", addBook);
};
const loadData = (event)=>{
    const books = BookStore.getBooksFromLocalStorage();
    document.querySelector(".books__row").innerHTML = "";
    books.forEach(book =>{
        Book.addBookToDOM(book);
    })
    updateBookInfo();
}
const displayFavouriteBooks = (event)=>{
    const books = BookStore.getBooksFromLocalStorage();
    booksRow.innerHTML = "";
    bookTitle.innerHTML = "Favourites";
    books
        .filter(book => book.isFavourite)
        .forEach(book => Book.addBookToDOM(book));

}

 
const displayGenres = (event)=>{
    if(!toggleBooleanValues.isGenresOpen){
        displayNode(genresNodes.genresContainer);
        toggleBooleanValues.isGenresOpen = !toggleBooleanValues.isGenresOpen;
    } else {
        hideNode(genresNodes.genresContainer);
        toggleBooleanValues.isGenresOpen = !toggleBooleanValues.isGenresOpen;
    }
};
const removeActiveClass = ()=>{
    genresNodes.genres.forEach(genre => genre.parentElement.classList.remove("genres__item--active"));
}
const toggleGenreContainer = (event)=>{
    const books = BookStore.getBooksFromLocalStorage();
    booksRow.innerHTML = "";
    bookTitle.textContent = event.target.textContent.trim();
    removeActiveClass();
    event.target.parentElement.classList.add("genres__item--active");
    books.forEach(book => console.log(book.category, event.target.textContent.trim()));
    books
        .filter(book =>  book.category == event.target.textContent.trim())
        .forEach(book => Book.addBookToDOM(book));
};
const toggleInformationContainer = (event)=>{
    console.log(event)
    if(!toggleBooleanValues.isInformationOpen){
        displayNode(bookInformationNodes.infoContainer);
        toggleBooleanValues.isInformationOpen = !toggleBooleanValues.isInformationOpen;
    } else {
        hideNode(bookInformationNodes.infoContainer);
        toggleBooleanValues.isInformationOpen = !toggleBooleanValues.isInformationOpen;
    }
};
const deleteAllBooks = (event)=>{
    window.localStorage.setItem("books", JSON.stringify(""));
    window.localStorage.setItem("read-pages", JSON.stringify(""));
    window.localStorage.setItem("book-info", JSON.stringify(""));

    window.location.reload();
};
 
const toggleDangerZoneContainer = (event)=>{
    
    if(!toggleBooleanValues.isDangerZoneOpen){
        displayNode(dangerZoneNodes.deleteAllBtn);
       
        toggleBooleanValues.isDangerZoneOpen = !toggleBooleanValues.isDangerZoneOpen;
        
    } else {
        toggleBooleanValues.isDangerZoneOpen = !toggleBooleanValues.isDangerZoneOpen; 
        hideNode(dangerZoneNodes.deleteAllBtn);   
    }
    dangerZoneNodes.deleteAllBtn.addEventListener("click", displayModal);
    modalNodes.cancelModalBtn.addEventListener("click", removeModal);
    modalNodes.deleteModalBtn.addEventListener("click", deleteAllBooks);
};
const displayMatchedBooks = ({target: {value}})=>{
    const books = BookStore.getBooksFromLocalStorage();
    booksRow.innerHTML = "";
    books
        .filter(book => book.title.toLowerCase().includes(value.trim().toLowerCase()))
        .forEach(book => Book.addBookToDOM(book));
}
const toggleMenu = (event)=>{
    const el = event.target;
    console.log(event.target);
    if(!toggleBooleanValues.isMenuOpen){
        toggleBooleanValues.isMenuOpen = !toggleBooleanValues.isMenuOpen;
        sidebar.classList.add("active");
        el == hamburgerMenu ? el.classList.add("active") : el.parentElement.classList.add("active");
    } else {
        toggleBooleanValues.isMenuOpen = !toggleBooleanValues.isMenuOpen;
        el == hamburgerMenu ? el.classList.remove("active") : el.parentElement.classList.remove("active");
        sidebar.classList.remove("active");
    }
}


addNewBookBtn.addEventListener("click", displayAddForm);

window.addEventListener("DOMContentLoaded", loadData);

favouritesBtn.addEventListener("click", displayFavouriteBooks);

genresNodes.genresBtn.addEventListener("click", displayGenres);

genresNodes.genres.forEach(genre => genre.addEventListener("click", toggleGenreContainer));

bookInformationNodes.infoBtn.addEventListener("click", toggleInformationContainer);

dangerZoneNodes.dangerZoneBtn.addEventListener("click", toggleDangerZoneContainer);

searchBookInput.addEventListener("input", displayMatchedBooks);

hamburgerMenu.addEventListener("click", toggleMenu);