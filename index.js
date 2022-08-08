import Book from './modules/Books.js';
import Render from './modules/render.js';

// eslint-disable-next-line max-classes-per-file
const AddBookForm = document.querySelector('.book-form');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const error = document.querySelector('.error');
const viewBook = document.getElementById('books-section');
const addBook = document.getElementById('add-section');
const contact = document.getElementById('contact-section');
const list = document.getElementById('list');
const addButton = document.getElementById('add-new');
const contactButton = document.getElementById('contact');
const formAdd = document.querySelector('.form-add');
const isClicked = false;

const render = new Render(viewBook, addBook, contact);

document.addEventListener('DOMContentLoaded', () => {
  render.render();
});

list.addEventListener('click', () => {
  if (isClicked === false) {
    viewBook.style.display = 'block';
    addBook.style.display = 'none';
    contact.style.display = 'none';
  }
});

addButton.addEventListener('click', () => {
  if (isClicked === false) {
    viewBook.style.display = 'none';
    addBook.style.display = 'block';
    contact.style.display = 'none';
  }
});

contactButton.addEventListener('click', () => {
  if (isClicked === false) {
    viewBook.style.display = 'none';
    addBook.style.display = 'none';
    contact.style.display = 'block';
  }
});

const books = new Book();

AddBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = bookTitle.value;
  const author = bookAuthor.value;
  if (title === '' || author === '') {
    error.innerHTML = 'Please fill in all fields';
    setTimeout(() => {
      error.innerHTML = '';
    }, 5000);
  } else {
    const books = new Book(title, author);
    books.addBook();
    formAdd.innerHTML = `'${title}' was added to your collection`;
    formAdd.style.animation = 'fadeIn 2s ease-in-out';
    setTimeout(() => {
      formAdd.style.animation = 'fadeOut 2s ease-in-out';
    }, 5000);
    setTimeout(() => {
      formAdd.innerHTML = '';
    }, 6000);
    bookTitle.value = '';
    bookTitle.focus();
    bookAuthor.value = '';
    error.innerHTML = '';
  }
});

window.onload = books.render();