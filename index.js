document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('searchButton');
  searchButton.addEventListener('click', searchCat);
  fetchCatData(); // Fetch and display existing cat data on page load
});

const catUrl = 'http://localhost:3000/data'; // Replace with the correct server URL

function searchCat() {
  const searchTerm = document.getElementById('addInput').value.toLowerCase();

  fetch(catUrl)
    .then(response => response.json())
    .then(jsonData => {
      const container = document.getElementById('catCard');
      container.innerHTML = ''; // Clear previous cat cards

      jsonData.forEach(cat => {
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

      jsonData.forEach(cat => {
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
    <button class="likeButton">Like</button>
    <button class="dislikeButton">Dislike</button>
    <span class="likeCount">0</span>`;

  const likeButton = card.querySelector('.likeButton');
  const dislikeButton = card.querySelector('.dislikeButton');
  const likeCount = card.querySelector('.likeCount');
  let count = 0;

  likeButton.addEventListener('click', () => {
    count++;
    likeCount.textContent = count;
  });
  dislikeButton.addEventListener('click', () => {
    count--;
    likeCount.textContent = count;
  });

  return card;
};

const addCatButton = document.getElementById('catButton');
addCatButton.addEventListener('click', addCat);

function addCat() {
  const breedName = document.getElementById('addInput').value;
  const height = document.getElementById('heightInput').value;
  const weight = document.getElementById('weightInput').value;
  const characteristics = document.getElementById('characteristicsInput').value;
  const picture = document.getElementById('imageInput').value;

  const newCat = {
    "Breed-Name": breedName,
    "Height": height,
    "Weight": weight,
    "Physical-Characteristics": characteristics,
    "Picture": picture
  };

  fetch(catUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newCat)
  })
    .then(response => response.json())
    .then(addedCat => {
      // Handle the response, such as displaying the added cat card on the page
    })
    .catch(error => {
      console.error('Error adding cat:', error);
    });
}