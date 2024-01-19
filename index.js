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
          container.prepend(card); // Add the card to the beginning of the container
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

        // Retrieve and display existing comments for the cat
        fetch(`${catUrl}/${cat.id}/comments`)
          .then(response => response.json())
          .then(comments => {
            const commentList = card.querySelector('.commentList');
            comments.forEach(comment => {
              const commentItem = document.createElement('li');
              commentItem.textContent = comment.comment;
              commentList.appendChild(commentItem);
            });
          })
          .catch(error => {
            console.error('Error fetching comments:', error);
          });
      });
    })
    .catch(error => {
      console.error('Error fetching cat data:', error);
    });
}

function generateCatCard(cat) {
  const card = document.createElement('div');
  card.classList.add('card', 'cat-card'); // Add the 'cat-card' class
  card.innerHTML = `
    <img src="${cat.Picture}" alt="${cat['Breed-Name']}" style="width: 750px; height: 500px;" />
    <h2>${cat['Breed-Name']}</h2>
    <p>Height: ${cat.Height}</p>
    <p>Weight: ${cat.Weight}</p>
    <p>Physical Characteristics: ${cat['Physical-Characteristics']}</p>
    <div class="comments">
      <input type="text" class="commentInput" placeholder="Add a comment" />
      <button class="commentButton">Add Comment</button>
      <ul class="commentList"></ul>
    </div>
    <button class="likeButton">Like</button>
    <button class="dislikeButton">Dislike</button>
    <span class="likeCount">0</span>
    <button class="deleteButton">Delete</button>`;

  const likeButton = card.querySelector('.likeButton');
  const dislikeButton = card.querySelector('.dislikeButton');
  const likeCount = card.querySelector('.likeCount');
  const deleteButton = card.querySelector('.deleteButton');
  let count = 0;

  likeButton.addEventListener('click', () => {
    count++;
    likeCount.textContent = count;
  });

  dislikeButton.addEventListener('click', () => {
    count--;
    likeCount.textContent = count;
  });

  deleteButton.addEventListener('click', () => {
    const catId = cat.id;

    fetch(`${catUrl}/${catId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          card.remove(); // Remove the cat card from the DOM
        } else {
          throw new Error('Failed to delete cat');
        }
      })
      .catch(error => {
        console.error('Error deleting cat:', error);
      });
  });

  const commentButton = card.querySelector('.commentButton');
  const commentInput = card.querySelector('.commentInput');
  const commentList = card.querySelector('.commentList');

  commentButton.addEventListener('click', () => {
    const commentText = commentInput.value;
    if (commentText) {
      const commentItem = document.createElement('li');
      commentItem.textContent = commentText;
      commentList.appendChild(commentItem);
      commentInput.value = '';
    }
  });

  return card;
}

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
      const container = document.getElementById('catCard');
      const card = generateCatCard(addedCat);
      container.appendChild(card);

      // Clear the input fields
      document.getElementById('addInput').value = '';
      document.getElementById('heightInput').value = '';
      document.getElementById('weightInput').value = '';
      document.getElementById('characteristicsInput').value = '';
      document.getElementById('imageInput').value = '';
    })
    .catch(error => {
      console.error('Error adding cat:', error);
    });
}