const searchInput = document.getElementById('searchQuery');

searchInput.addEventListener('input', debounce(() => {
    const query = searchInput.value;
    // Perform search operation (e.g., fetch data from API, filter local data)
    console.log('Searching for:', query);
}, 300)); // Debounce with a 300ms delay

function debounce(func, delay) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}