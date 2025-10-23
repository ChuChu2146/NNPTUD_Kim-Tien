// Cache DOM elements
const searchInput = document.getElementById('searchInput');
const suggestionsBox = document.getElementById('suggestions');
const minViewRange = document.getElementById('minViewRange');
const maxViewRange = document.getElementById('maxViewRange');
const minValue = document.getElementById('minValue');
const maxValue = document.getElementById('maxValue');
const resultsContainer = document.getElementById('results');

// Store fetched data
let allData = [];
let filteredData = [];

// Fetch data from server
async function fetchData() {
    try {
        const response = await fetch('http://localhost:3001/posts');
        allData = await response.json();
        filteredData = [...allData];
        renderResults(filteredData);
    } catch (error) {
        console.error('Error fetching data:', error);
        resultsContainer.innerHTML = '<p>Error loading data. Please try again later.</p>';
    }
}

// Search and suggestions functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    if (searchTerm === '') {
        suggestionsBox.style.display = 'none';
        filteredData = filterByViews(allData);
        renderResults(filteredData);
        return;
    }

    // Filter suggestions based on title
    const suggestions = allData
        .filter(item => item.title.toLowerCase().includes(searchTerm))
        .slice(0, 5); // Limit to 5 suggestions

    // Show suggestions
    if (suggestions.length > 0) {
        suggestionsBox.innerHTML = suggestions
            .map(item => `<div class="suggestion-item" data-id="${item.id}">${item.title}</div>`)
            .join('');
        suggestionsBox.style.display = 'block';
    } else {
        suggestionsBox.style.display = 'none';
    }

    // Filter and render results
    filteredData = filterByViews(suggestions);
    renderResults(filteredData);
});

// Handle suggestion clicks
suggestionsBox.addEventListener('click', (e) => {
    if (e.target.classList.contains('suggestion-item')) {
        const selectedTitle = e.target.textContent;
        searchInput.value = selectedTitle;
        suggestionsBox.style.display = 'none';
        
        // Filter and show only the selected item
        filteredData = filterByViews(allData.filter(item => item.title === selectedTitle));
        renderResults(filteredData);
    }
});

// Hide suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!suggestionsBox.contains(e.target) && e.target !== searchInput) {
        suggestionsBox.style.display = 'none';
    }
});

// View range slider functionality
function updateViewRanges() {
    let minViews = parseInt(minViewRange.value);
    let maxViews = parseInt(maxViewRange.value);
    
    // Ensure min doesn't exceed max
    if (minViews > maxViews) {
        if (this === minViewRange) {
            maxViews = minViews;
            maxViewRange.value = minViews;
        } else {
            minViews = maxViews;
            minViewRange.value = maxViews;
        }
    }
    
    // Update display values
    minValue.textContent = minViews;
    maxValue.textContent = maxViews;
    
    // Filter by current search term and views
    const searchTerm = searchInput.value.toLowerCase();
    const searchResults = searchTerm 
        ? allData.filter(item => item.title.toLowerCase().includes(searchTerm))
        : allData;
    
    filteredData = filterByViews(searchResults);
    renderResults(filteredData);
}

minViewRange.addEventListener('input', updateViewRanges);
maxViewRange.addEventListener('input', updateViewRanges);

// Filter data by views
function filterByViews(data) {
    const minViews = parseInt(minViewRange.value);
    const maxViews = parseInt(maxViewRange.value);
    return data.filter(item => item.views >= minViews && item.views <= maxViews);
}

// Render results to the page
function renderResults(data) {
    if (data.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    resultsContainer.innerHTML = data
        .map(item => `
            <div class="card">
                <h3>${item.title}</h3>
                <p>Views: ${item.views}</p>
                <p>${item.content}</p>
            </div>
        `)
        .join('');
}

// Initial data load
fetchData();