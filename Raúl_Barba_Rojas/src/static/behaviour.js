document.addEventListener('DOMContentLoaded', function() {
    // Load data when the page is loaded
    fetchData();

    // Add click event listener to the button
    document.getElementById('load-data-btn').addEventListener('click', function() {
        fetchData();
    });
});

function fetchData() {
    fetch('http://localhost:8000/centers')
        .then(response => response.json())
        .then(data => {
            displayData(data);
        })
        .catch(error => console.error('Error:', error));
}

function displayData(data) {
    const elementsList = document.querySelector('.center-list');
    // Clear previous data in the list
    elementsList.innerHTML = '';

    data.forEach(item => {
        // Create a new div for each center
        const centerDiv = document.createElement('div');
        centerDiv.classList.add('center');

        // Assuming each item is an object with 'name' and 'activity' properties
        centerDiv.innerHTML = `
            <span class="name">${item.name}</span>
            <span class="activity">${item.activity}</span>
        `;

        // Append the new div to the elements list
        elementsList.appendChild(centerDiv);
    });
}
