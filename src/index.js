import './css/styles.css';

import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const refs = {
  countriesNameInput: document.querySelector('#search-box'),
  countriesList: document.querySelector('.country-list'),
  countriesInfo: document.querySelector('.country-info'),
};

function createTemplateItem(element) {
  return element.map(
    ({ name, capital, population, flags, languages }) =>
      `
      <img class="img-flag"
        src="${flags.svg}" 
        alt="${name.official}" 
        width="200" 
        height="120">
      <h1 class="country-info__title">${name.official}</h1>
      <ul class="country-info__list">
          <li class="country-info__item">
          <span>Capital:</span>
        ${capital}
          </li>
          <li class="country-info__item">
          <span>Population:</span>
          ${population}
          </li>
          <li class="country-info__item">
          <span>Lenguages:</span>
          ${Object.values(languages)}
          </li>
      </ul>
  `
  );
}

function createTemplateItemList(elements) {
  return elements
    .map(
      ({ name, flags }) => `
      <li class="country-list__item">
        <img class="country-list__img" 
          src="${flags.svg}" 
          alt="${name.official}" 
          width="40" 
          height="20">
        ${name.official}
        </li>`
    )
    .join('');
}

function renderTemplate(elements) {
  let template = '';
  let refsTemplate = '';
  clearTemplate();

  if (elements.length === 1) {
    template = createTemplateItem(elements);
    refsTemplate = refs.countriesInfo;
  } else {
    template = createTemplateItemList(elements);
    refsTemplate = refs.countriesList;
  }

  creatTemplate(refsTemplate, template);
}



function creatTemplate(refs, markup) {
  refs.innerHTML = markup;
}

function specificNameInfo() {
  Notify.info('Too many matches found. Please enter a more specific name.');
}

function errorWarn() {
  Notify.failure(`Oops, there is no country with that name`);
}



refs.countriesNameInput.addEventListener(
  'input',
  debounce(onInput, DEBOUNCE_DELAY)
);

function onInput(e) {
  const countryName = e.target.value.trim();

  if (!countryName) {
    clearTemplate();
    return;
  }

  fetchCountries(countryName)
    .then(data => {
      if (data.length > 10) {
        specificNameInfo();
        clearTemplate();
        return;
      }
      renderTemplate(data);
      console.log(data);
    })
    .catch(error => {
      clearTemplate();
      errorWarn();
    });
}
function clearTemplate() {
  refs.countriesInfo.innerHTML = '';
  refs.countriesList.innerHTML = '';
}


