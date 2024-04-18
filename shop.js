// Function to make API requests and display results
function searchBooks() {
    var searchInput = document.getElementById('searchInput').value;
    var url = 'https://www.googleapis.com/books/v1/volumes?q=' + encodeURIComponent(searchInput);

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayBooks(data.items);
        })
        .catch(error => console.error('Error fetching books:', error));
}

// Function to display books on the webpage
function displayBooks(books) {
    var bookList = document.querySelector('.book-list');
    bookList.innerHTML = '';

    books.forEach(book => {
        var title = book.volumeInfo.title || 'Unknown Title';
        var authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author';
        var thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150';
        var isbn13 = ''; // Variable to store ISBN_13

        if (book.volumeInfo.industryIdentifiers) {
            // Find ISBN_13 identifier
            var isbn13Obj = book.volumeInfo.industryIdentifiers.find(identifier => identifier.type === 'ISBN_13');
            if (isbn13Obj) {
                isbn13 = isbn13Obj.identifier; // Store ISBN_13 value
            }
        }

        var bookDetailsURL = `book_details.html?title=${encodeURIComponent(title)}&authors=${encodeURIComponent(authors)}&isbn=${encodeURIComponent(isbn13)}&thumbnail=${encodeURIComponent(thumbnail)}`;

        // Construct HTML for the book with minimal details.
        var bookHTML = `
            <div class="book">
                <a href="${bookDetailsURL}">
                    <img src="${thumbnail}" alt="${title}">
                
                <div class="book-details">
                    <h3>${title}</h3>
                    <p>By ${authors}</p>
                </a>
                </div>
            </div>
        `;
        bookList.innerHTML += bookHTML;
    });
}

// Event listener for search input
document.getElementById('searchInput').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        searchBooks();
    }
});
document.getElementById('searchButton').addEventListener('click', function() {
    searchBooks();
});

// Initial search when the page loads
searchBooks();