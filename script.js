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
document.getElementById("bookTitle").addEventListener("input", () => {
    const inputBookTitle = document.getElementById("bookTitle");
    inputBookTitle.setCustomValidity("");

    if (inputBookTitle.validity.valueMissing) {
        inputBookTitle.setCustomValidity("Please input the book title");
        inputBookTitle.reportValidity();
    } 
})
document.getElementById("authorName").addEventListener("input", () => {
    const inputAuthorName = document.getElementById("authorName");
    inputAuthorName.setCustomValidity("");

    if (inputAuthorName.validity.valueMissing) {
        inputAuthorName.setCustomValidity("Please input the name of author");
        inputAuthorName.reportValidity();
    } 
})
document.getElementById("noOfPages").addEventListener("input", () => {
    const inputNoOfPages = document.getElementById("noOfPages");
    inputNoOfPages.setCustomValidity("");

    if (inputNoOfPages.validity.valueMissing) {
        inputNoOfPages.setCustomValidity("Please input the number of pages");
        inputNoOfPages.reportValidity();
    } else if (inputNoOfPages.validity.typeMismatch) {
        inputNoOfPages.setCustomValidity("Please input whole numbers only");
        inputNoOfPages.reportValidity();
    } else if (inputNoOfPages.validity.rangeUnderflow) {
        inputNoOfPages.setCustomValidity("Pages must be 10 or greater");
        inputNoOfPages.reportValidity();
    }
})
form.addEventListener("submit", (e) => {
    e.preventDefault();
  
    // constraint validation
    if (!isValid()) {
        return;
    }

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

function isValid() {
    const inputBookTitle = document.getElementById("bookTitle");
    const inputAuthorName = document.getElementById("authorName");
    const inputNoOfPages = document.getElementById("noOfPages");

    if (inputBookTitle.validity.valueMissing) {
        inputBookTitle.setCustomValidity("Please input the book title");
       inputBookTitle.reportValidity();
        return false;
    } 

    if (inputAuthorName.validity.valueMissing) {
        inputAuthorName.setCustomValidity("Please input the name of author");
        inputAuthorName.reportValidity();
        return false;
    } 

    if (inputNoOfPages.validity.valueMissing) {
        inputNoOfPages.setCustomValidity("Please input the number of pages");
        inputNoOfPages.reportValidity();
        return false;
    } else if (inputNoOfPages.validity.typeMismatch) {
        inputNoOfPages.setCustomValidity("Please input whole numbers only");
        inputNoOfPages.reportValidity();
        return false;
    } else if (inputNoOfPages.validity.rangeUnderflow) {
        inputNoOfPages.setCustomValidity("Pages must be 10 or greater");
        inputNoOfPages.reportValidity();
        return false;
    }

    return true;
}

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

    modal.close();
    bookContainer.appendChild(divBook);
    indexCounter++;
}
