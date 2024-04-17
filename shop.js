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
        var saleInfo = book.saleInfo;
        var amazonLink = '';
        var saleLinks = '';
        var isbn13 = ''; // Variable to store ISBN_13

        if (book.volumeInfo.industryIdentifiers) {
            // Find ISBN_13 identifier
            var isbn13Obj = book.volumeInfo.industryIdentifiers.find(identifier => identifier.type === 'ISBN_13');
            if (isbn13Obj) {
                isbn13 = isbn13Obj.identifier; // Store ISBN_13 value
            }
        }

        // Add link to Amazon with ISBN as search query
        amazonLink = `<a href="https://www.amazon.com/s?k=${isbn13}" target="_blank">Search on Amazon</a>`;

        if (saleInfo && saleInfo.saleability === 'FOR_SALE') {
            saleLinks = '<p>Available for purchase at: </p>';
            if (saleInfo.buyLink) {
                saleLinks += `<a href="${saleInfo.buyLink}" target="_blank">Buy on Google Books</a><br>`;
            }
            if (saleInfo.retailPrice && saleInfo.retailPrice.amount) {
                saleLinks += `<p>Price: ${saleInfo.retailPrice.amount} ${saleInfo.retailPrice.currencyCode}</p>`;
            }
        } else if (saleInfo && saleInfo.saleability === 'FREE') {
            saleLinks = '<p>Available for free on Google Books</p>';
        }

        // Construct HTML for the book with ISBN displayed
        var bookHTML = `
            <div class="book">
                <img src="${thumbnail}" alt="${title}">
                <div class="book-details">
                    <h3>${title}</h3>
                    <p>By ${authors}</p>
                    ${saleLinks}
                    ${amazonLink}
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

// Initial search when the page loads
searchBooks();