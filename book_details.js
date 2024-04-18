// JavaScript code to retrieve book information from URL parameters and populate the page
window.onload = function() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get('title');
    const authors = urlParams.get('authors');
    const isbn = urlParams.get('isbn');
    const thumbnail = urlParams.get('thumbnail');

    // Populate book details
    document.getElementById('bookCover').src = thumbnail || 'https://via.placeholder.com/400x600';
    document.getElementById('bookTitle').textContent = title || 'Unknown Title';
    document.getElementById('bookAuthors').textContent = authors ? `By ${authors}` : 'Unknown Author';
    
    fetchBookDetails(isbn);

    function fetchBookDetails(isbn) {
        const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const book = data.items[0].volumeInfo;
                const description = book.description || 'No description available';
                document.getElementById('bookDescription').textContent = description;
            })
            .catch(error => console.error('Error fetching book details:', error));
    }
    // Add event listener for buy button
    document.getElementById('buyButton').addEventListener('click', function() {
        const amazonSearchURL = `https://www.amazon.com/s?k=${isbn}`;
        window.location.href = amazonSearchURL;
    });
};