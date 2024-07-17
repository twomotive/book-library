let myLibrary = [
    {author: "George Orwell", title: "1984", page: 328, read: true},
    {author: "J.R.R. Tolkien", title: "The Hobbit", page: 310, read: false},
    {author: "Harper Lee", title: "To Kill a Mockingbird", page: 281, read: true},
    {author: "F. Scott Fitzgerald", title: "The Great Gatsby", page: 180, read: true},
    {author: "Jane Austen", title: "Pride and Prejudice", page: 432, read: false},
    {author: "Gabriel García Márquez", title: "One Hundred Years of Solitude", page: 417, read: true},
    {author: "J.D. Salinger", title: "The Catcher in the Rye", page: 234, read: true},
    {author: "Aldous Huxley", title: "Brave New World", page: 311, read: false},
    {author: "William Golding", title: "Lord of the Flies", page: 224, read: true},
    {author: "Charlotte Brontë", title: "Jane Eyre", page: 532, read: false},
    {author: "Leo Tolstoy", title: "War and Peace", page: 1225, read: false},
    {author: "Ernest Hemingway", title: "The Old Man and the Sea", page: 127, read: true},
    {author: "Virginia Woolf", title: "Mrs Dalloway", page: 194, read: false},
    {author: "Mark Twain", title: "The Adventures of Huckleberry Finn", page: 366, read: true},
    {author: "Emily Brontë", title: "Wuthering Heights", page: 342, read: false},
    {author: "Charles Dickens", title: "Great Expectations", page: 544, read: true},
    {author: "Herman Melville", title: "Moby-Dick", page: 585, read: false},
    {author: "Fyodor Dostoevsky", title: "Crime and Punishment", page: 671, read: true},
    {author: "Mary Shelley", title: "Frankenstein", page: 280, read: true},
    {author: "Oscar Wilde", title: "The Picture of Dorian Gray", page: 254, read: false},
    {author: "Joseph Heller", title: "Catch-22", page: 453, read: true},
    {author: "Gustave Flaubert", title: "Madame Bovary", page: 329, read: false},
    {author: "Franz Kafka", title: "The Metamorphosis", page: 201, read: true},
    {author: "John Steinbeck", title: "Of Mice and Men", page: 107, read: true},
    {author: "Louisa May Alcott", title: "Little Women", page: 759, read: false},
    {author: "Albert Camus", title: "The Stranger", page: 123, read: true},
    {author: "Toni Morrison", title: "Beloved", page: 324, read: false},
    {author: "Kurt Vonnegut", title: "Slaughterhouse-Five", page: 215, read: true},
    {author: "Margaret Atwood", title: "The Handmaid's Tale", page: 311, read: false},
    {author: "Ray Bradbury", title: "Fahrenheit 451", page: 249, read: true}
];


const dialog = document.querySelector("dialog");
const showButton = document.querySelector("#add-book-modal");
const closeButton = document.querySelector("#close-dialog");
const form = document.querySelector("form");

showButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});

class Book {
    constructor(author , title , page , isRead) {
        this.author = author;
        this.title = title;
        this.page = page;
        this.isRead = isRead;
    }

    get bookCard() {
        return {author :this.author , title :this.title , page :this.page , isRead :this.isRead }
    }
}

function addBookToLibrary(book) {
    myLibrary.unshift(book);
    displayBooks();
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const author = document.getElementById("author").value;
    const title = document.getElementById("title").value;
    const page = document.getElementById("page").value;
    let isRead = document.getElementById('read').checked;


    const newBook = new Book(author, title, page, isRead);

    addBookToLibrary(newBook);


    form.reset();

    dialog.close();
});

const showAllButton = document.getElementById('show-all');

const booksContainer = document.querySelector('.books');

showAllButton.addEventListener('click', () => {
    searchInput.value = '';
    displayBooks();
});

function displayBooks(filteredBooks = myLibrary) {
    booksContainer.innerHTML = '';

    filteredBooks.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.page}</p>
            <p>Read: ${book.isRead ? 'Yes' : 'No'}</p>
            <button onclick="removeBook(${index})">Remove</button>
            `;
        booksContainer.appendChild(bookCard);
    });
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}


function filterBooks(searchTerm) {
    return myLibrary.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
}

const searchInput = document.querySelector('.search input');
searchInput.addEventListener('input', function() {
    const searchTerm = this.value;
    const filteredBooks = filterBooks(searchTerm);
    displayBooks(filteredBooks);
});