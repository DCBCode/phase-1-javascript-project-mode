
document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('searchButton');
  searchButton.addEventListener('click', searchCat);
});

const catDataUrl = 'http://localhost:3000/data'; // Use the correct URL

fetch(catDataUrl)
  .then(response => response.json())
  .then(jsonData => {
    // Use the jsonData to update your webpage
    console.log(jsonData);
  })
  .catch(error => {
    console.error(error);
  });