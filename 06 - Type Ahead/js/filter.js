const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');
const cities = [];
const xhr = new XMLHttpRequest();

xhr.addEventListener('load', e => {
  cities.push(...JSON.parse(xhr.responseText))
});

xhr.open('GET', endpoint);
xhr.send();

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function filtred(searchWord, array) {
  return array.filter(obj => {
    const regex = new RegExp(searchWord, 'ig');
    return obj.city.match(regex) || obj.state.match(regex);
  })
}


function showList() {
  const shownArray = filtred(this.value, cities);

  const makeHtml = shownArray.map(place => {
    const regex = new RegExp(this.value, 'ig');
    const highlightedCity = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const highlightedState = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
    return `
      <li>
        <span class="name">${highlightedCity}, ${highlightedState}</span> 
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>`;  
  }).join('');
  suggestions.innerHTML = makeHtml;
}

searchInput.addEventListener('change', showList);
searchInput.addEventListener('keyup', showList);