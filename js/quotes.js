import settings from './settings.js'

import {getLocalStorageLang, lang } from './settings.js';

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuoter = document.querySelector('.change-quote');

async function getQuotes() {  
    const res = await fetch('quote.json');
    
    const quotes = await res.json();

    const index = changeQuotes (0, quotes.length - 1)
    quote.textContent = quotes[index][`text-${lang}`];
    author.textContent = quotes[index][`author-${lang}`];
}

getQuotes()

function changeQuotes (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;  
}
changeQuoter.addEventListener('click', getQuotes)

export default './quotes.js'
export { getQuotes }