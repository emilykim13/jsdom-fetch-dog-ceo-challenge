document.addEventListener('DOMContentLoaded', function () {
  dogImages();
  dogBreeds();
});

// main function, called in document loader
function dogImages() {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  fetch(imgUrl)
    .then(response => response.json())
    .then(dogPics => {
      dogPics.message.forEach(pic => addPic(pic))
    });
}

// called in dogImages
function addPic(picUrl) {
  let imgContainer = document.querySelector('#dog-image-container');
  let nuImage = document.createElement('img');
  nuImage.src = picUrl;
  imgContainer.appendChild(nuImage);
}

// main function, called in document loader
function dogBreeds() {
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  fetch(breedUrl)
    .then(response => response.json())
    .then(dogeBreeds => {
      breeds = Object.keys(dogeBreeds.message);
      updateDogBreeds(breeds);
      breedSelectLetter();
    });
}

// called in dogBreeds
function updateDogBreeds(breeds) {
  let ul = document.getElementById("dog-breeds");
  removePastList(ul);
  breeds.forEach(breed => addBreedsToList(breed));
}

// called in updateDogBreeds
function removePastList(pastlist) {
  let past = pastlist.lastElementChild;
  while (past) {
    pastlist.removeChild(past);
    past = pastlist.lastElementChild;
  }
}

// called in dogBreeds
function breedSelectLetter() {
  let list = document.getElementById('breed-dropdown');
  list.addEventListener('change', function (e) {
    selectBreedsStartingWith(e.target.value);
  });
}

// called in breedSelectLetter
function selectBreedsStartingWith(letter) {
    updateDogBreeds(breeds.filter(breed => breed.startsWith(letter)));
}

// called in updateDogBreeds
function addBreedsToList(breeds) {
  let ul = document.getElementById('dog-breeds');
  let li = document.createElement('li');
  li.innerText = breeds;
  ul.appendChild(li);
  li.addEventListener('click', function(e) { 
      e.target.style.color = '#FFB6C1'})
}