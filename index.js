document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('searchButton');
  searchButton.addEventListener('click', searchCat);
  e.preventDefault()
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

  const catCard = `
  <div class="card">
    <img src="{{picture}}" alt= {{breedName}}" />
    <h2>{{breedName}}</h2>
    <p>Height: {{height}}</>p>
    <p>Weight: {{weight}}</>p>
    <p>PhysicalCharacteristics: {{physicalCharacteristics}}</p>
    </div>
`;

fetch(catDataUrl)
  .then(response => response.json())
  .then(jsonData => {
    const container = document.getElementById('cardContainer'); // Replace 'cardContainer' with the ID of the container element in your HTML
    jsonData.data.forEach(item => {
      const card = cardTemplate
        .replace('{{picture}}', item.Picture)
        .replace('{{breedName}}', item['Breed-Name'])
        .replace('{{height}}', item.Height)
        .replace('{{weight}}', item.Weight)
        .replace('{{physicalCharacteristics}}', item['Physical-Characteristics']);

      container.innerHTML += card;
    });
  })
  .catch(error => {
    console.error(error);
  });