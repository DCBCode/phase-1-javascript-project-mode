
document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('searchButton')
  searchButton.addEventListener('click', searchCat)
});


const fs = require('fs');

fs.readFile('http://127.0.0.1:3000/data', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const jsonData = JSON.parse(data);
  console.log(jsonData);
});