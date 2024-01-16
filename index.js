document.addEventListener('DOMContentLoaded', () => {
  const addCatButton = document.getElementById('addCatButton');
  addCatButton.addEventListener('click', addCat);
});

const catUrl = 'http://localhost:3000/data'; // Use the correct URL

function addCat() {
  const breedName = prompt("Enter the breed name of the cat:");
  const height = prompt("Enter the height of the cat:");
  const weight = prompt("Enter the weight of the cat:");
  const physicalCharacteristics = prompt("Enter the physical characteristics of the cat:");

  const catData = {
    'Breed-Name': breedName,
    Height: height,
    Weight: weight,
    'Physical-Characteristics': physicalCharacteristics
  };

  fetch(catUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(catData)
  })
    .then(response => response.json())
    .then(newCat => {
      const container = document.getElementById('catCard');
      const card = generateCatCard(newCat);
      container.appendChild(card);
    })
    .catch(error => {
      console.error('Error adding cat:', error);
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
}

fetch(catUrl)
  .then(response => response.json())
  .then(jsonData => {
    const container = document.getElementById('catCard');
    jsonData.data.forEach(cat => {
      const card = generateCatCard(cat);
      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error(error);
  });