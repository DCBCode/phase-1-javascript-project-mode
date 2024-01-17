document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('searchButton');
  searchButton.addEventListener('click', searchCat);
  fetchCatData(); // Fetch and display existing cat data on page load
});

const catUrl = 'http://localhost:3000/cats'; // Replace with the correct server URL

function searchCat() {
  const searchTerm = document.getElementById('addInput').value.toLowerCase();

  fetch(catUrl)
    .then(response => response.json())
    .then(jsonData => {
      const container = document.getElementById('catCard');
      container.innerHTML = ''; // Clear previous cat cards

      jsonData.data.forEach(cat => {
        const breedName = cat['Breed-Name'].toLowerCase();
        if (breedName.includes(searchTerm)) {
          const card = generateCatCard(cat);
          container.appendChild(card);
        }
      });
    })
    .catch(error => {
      console.error('Error fetching cat data:', error);
    });
}

function fetchCatData() {
  fetch(catUrl)
    .then(response => response.json())
    .then(jsonData => {
      const container = document.getElementById('catCard');
      container.innerHTML = ''; // Clear previous cat cards

      jsonData.data.forEach(cat => {
        const card = generateCatCard(cat);
        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error fetching cat data:', error);
    });
}

function generateCatCard(cat) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <img src="${cat.Picture}" alt="${cat['Breed-Name']}" />
    <h2>${cat['Breed-Name']}</h2>
    <p>Height: ${cat.Height}</p>
    <p>Weight: ${cat.Weight}</p>
    <p>Physical Characteristics: ${cat['Physical-Characteristics']}</p>
  `;
  return card;
};
const express = require('express');
   const cors = require('cors');

   const app = express();

   // Enable all CORS requests
   app.use(cors());

   // ... your other middleware and routes ...

   // Start the server
   const port = 3000;
   app.listen(port, () => {
     console.log(`Server is running on port ${port}`);
   });