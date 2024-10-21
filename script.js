const openModal = document.querySelector(".show-modal");
const closeModal = document.querySelector("dialog form button");
const modal = document.querySelector("dialog");
const form = document.querySelector("dialog form");
const bookContainer = document.querySelector(".books-container");
const library = [];
let indexCounter = 0;

openModal.addEventListener("click", () => {
    resetModalContent();
    modal.showModal();
});
form.addEventListener("submit", () => {
    if (document.querySelector(".text-new")) {
        document.querySelector(".text-new").remove();
    }
    let isRead;
    if (document.getElementById("isReadTrue").checked) {
        isRead = true;
    } else {
        isRead = false;
    }

    const book = new Book(
        indexCounter,
        document.getElementById("bookTitle").value,
        document.getElementById("authorName").value,
        document.getElementById("noOfPages").value,
        isRead
    );

    library.push(book);
    insertBookToDom(book);
});
closeModal.addEventListener("click", () => {
    modal.close();
})


class Book {
    constructor(index, title, author, noOfPages = 0, isRead = false) {
        this.index = index;
        this.title = title;
        this.author = author;
        this.noOfPages = noOfPages;
        this.isRead = isRead;
    }

    /**
     * Removes Book object from DOM
     */
    removeBookFromDom(objIndex) {
        library[objIndex] = undefined;
        document.querySelector(`[data-book-index="${objIndex}"]`).remove();
    }

    /**
     * Toggles status of the book; read or not read
     */
    toggleIsRead(objIndex) {
        if (library[objIndex].isRead) {
            library[objIndex].isRead = false;
        } else {
            library[objIndex].isRead = true;
        }

        document.querySelector(`[data-book-index="${objIndex}"] .status`).textContent = `Have read: ${library[objIndex].isRead}`;
    }
}

function resetModalContent() {
    document.getElementById("bookTitle").value = null;
    document.getElementById("authorName").value = null;
    document.getElementById("noOfPages").value = null;
    document.getElementById("isReadFalse").checked = true;
}

function insertBookToDom(bookObj) {
    const divBook = document.createElement("div");
    divBook.setAttribute("data-book-index", indexCounter);
    
    const divBookTitle = document.createElement("p");
    divBookTitle.textContent = `Title: ${bookObj.title}`;

    const divBookAuthor = document.createElement("p");
    divBookAuthor.textContent = `Author: ${bookObj.author}`;

    const divBookNoOfPages = document.createElement("p");
    divBookNoOfPages.textContent = `Number of Pages: ${bookObj.noOfPages}`;

    const divBookIsRead = document.createElement("p");
    divBookIsRead.classList.add("status")
    divBookIsRead.textContent = `Have read: ${bookObj.isRead}`;
    
    const buttonToggleRead = document.createElement("button");
    buttonToggleRead.textContent = "Toggle Read"
    buttonToggleRead.addEventListener("click", () => {
        bookObj.toggleIsRead(bookObj.index);
    });

    const deleteBookButton = document.createElement("button");
    deleteBookButton.textContent = "Delete";
    deleteBookButton.addEventListener("click", () => {
        bookObj.removeBookFromDom(bookObj.index);
    });

    divBook.append(
        divBookTitle,
        divBookAuthor,
        divBookNoOfPages,
        divBookIsRead,
        buttonToggleRead,
        deleteBookButton
    );

    bookContainer.appendChild(divBook);
    indexCounter++;
}
