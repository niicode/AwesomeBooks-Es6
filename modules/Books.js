import Collections from './Collections.js';

import { DateTime } from './luxon.min.js';

const bookContainer = document.querySelector('.book-container');
const date = document.querySelector('.date');

const collections = new Collections();

export default class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.timeStamp = Book.timeStamp();
  }

  addBook() {
    collections.addBook(this);
    this.render();
  }

  static timeStamp = () => {
    const date = new Date();
    return date.getMinutes();
  }

  render = () => {
    bookContainer.innerHTML = '';
    date.innerHTML = DateTime.now().toFormat('MMMM dd, yyyy hh:mm:ss a');
    if (collections.getBooks().length === 0) {
      bookContainer.innerHTML = '<p class="empty">No books in your collection</p>';
    }
    collections.getBooks().forEach((book, index) => {
      const bookElement = document.createElement('div');
      if (index % 2 === 0) {
        bookElement.classList.add('odd-book');
      } else {
        bookElement.classList.add('book');
      }
      function timeStamp() {
        let time = '';
        if (Book.timeStamp() - book.timeStamp < 1) {
          time = 'Just now';
        } else {
          time = `${Book.timeStamp() - book.timeStamp} minutes ago`;
        }
        return time;
      }
      bookElement.innerHTML = `
              <p>'${book.title}' by ${book.author}</p>
              <p class='timestamp'>${timeStamp()}</p>
              <div class='remove-button'>
                <button data-remove=${index} class='delete'>Remove</button>
              </div>
            `;
      bookContainer.appendChild(bookElement);

      const deleteButton = bookElement.querySelector('.delete');
      deleteButton.addEventListener('click', () => {
        this.removeBook(index);
      });
    });
  }

  removeBook(index) {
    collections.removeBook(index);
    localStorage.setItem('collections', JSON.stringify(collections.getBooks()));
    this.render();
  }
}
