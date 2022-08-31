import player from './player.js'
import quotes from './quotes.js'
import settings from './settings.js'
import {getLocalStorageLang, lang } from './settings.js';
import todo from './todo.js'

const SelectLang = document.querySelector('.select-lang');
getLocalStorageLang()

// === Time ===

const time = document.querySelector('.time');

const day = document.querySelector('.date');

const greeting = document.querySelector('.greeting');

const name = document.querySelector('.name')
const city = document.querySelector('.city');

getLocalStorageName()

function showTime() {
    const date = new Date();

    showDay(date)
    // showGreeting(date)

    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    setTimeout(showTime, 1000);
}

showTime();

function showDay() {
    const date = new Date();
    const options = {
        month: 'long',
        day: 'numeric',
        weekday:'long'
    };
    const currentDay = date.toLocaleDateString(lang, options);
    day.textContent = currentDay;
}
showDay();

  // === Greeting ===
function setLocalStorageName() {
    localStorage.setItem('name', name.value);
}
name.addEventListener('change', setLocalStorageName)

function getLocalStorageName() {
    if(localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
}

function translatePlaceholderName() {
    lang == 'en' ? name.placeholder = 'Enter name' : name.placeholder = 'Введите имя' 
};
translatePlaceholderName ()

function translatePlaceholderCity() {
    lang == 'en' ? city.placeholder = 'Enter city' : city.placeholder = 'Введите город' 
};
translatePlaceholderCity ()

function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    const arr = ['night', 'morning', 'afternoon', 'evening'];
    return arr[Math.floor(hours/6)]
}

function showGreeting() {
    const date = new Date();
    const hours = date.getHours();
    const greetingText = [
        {
            'en': 'Good night',
            'ru': 'Доброй ночи'
        },
        {
            'en': 'Good morning',
            'ru': 'Доброе утро'
        },
        {
            'en': 'Good afternoon',
            'ru': 'Добрый день'
        },
        {
            'en': 'Good evening',
            'ru': 'Добрый вечер'
        },
    ]
    greeting.textContent = greetingText[Math.floor(hours/6)][lang];
}
showGreeting()

// === local storage ===



  
getLocalStorageCity()



function setLocalStorageCity() {
    localStorage.setItem('city', city.value);
}
city.addEventListener('change', setLocalStorageCity)


function getLocalStorageCity() {
    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');   
    }
    else {
        if (lang == 'en') city.value = 'Minsk';
        else city.value = 'Минск'
    }
}



// === Slider ===

const body = document.querySelector('body');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev')

let randomNum = ("" + getRandomNum(1, 20));

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setBg() {
    let bgNum = ("" + randomNum).padStart(2, '0');
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/YuliDemins/momentum/assets/images/${getTimeOfDay()}/${bgNum}.jpg`;
  
    img.addEventListener('load', () => {
        body.style.backgroundImage = `url(${img.src})`;
      })
  }
setBg()

function getSlideNext() {
    
    randomNum++;
    if (randomNum > 20) {
        randomNum = 1;
    }
    setBg()
    
};

function getSlidePrev() {
    randomNum--;
    if (randomNum < 1) {
        randomNum = 20;
    }
    setBg()
};

slideNext.addEventListener('click', getSlideNext)
slidePrev.addEventListener('click', getSlidePrev)

// === Weather ===
// https://api.openweathermap.org/data/2.5/weather?q=Нижний&Новгород&lang=en&appid=c5616020b94e7402c03671d8d86a818c&units=metric

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');

const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error')



async function getWeather() { 
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=c5616020b94e7402c03671d8d86a818c&units=metric`;
    
    const res = await fetch(url);
    
    const data = await res.json();


    // const data = {"coord":{"lon":37.6156,"lat":55.7522},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"base":"stations","main":{"temp":21.33,"feels_like":20.64,"temp_min":20.81,"temp_max":22.29,"pressure":1018,"humidity":43,"sea_level":1018, "grnd_level":1001},"visibility":10000,"wind":{"speed":1.62,"deg":296, "gust":3.35},"clouds":{"all":9},"dt":1659199412,"sys":{"type":2,"id":47754,"country":"RU","sunrise":1659144634,"sunset":1659202872},"timezone":10800,"id":524901,"name":"Moscow","cod":200}

   
    try {

    weatherIcon.className = 'weather-icon owf';
    
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    if (lang == 'en') {
        wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
        humidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%`
    } else {
        wind.textContent = `Скорость ветра: ${Math.round(data.wind.speed)} м/с`;
        humidity.textContent = `Влажность: ${Math.round(data.main.humidity)}%`    
    }
    weatherError.textContent = '';

    } catch (err) {
        weatherError.textContent = `Error!!! ${data.message}` 
        console.log(err)

        temperature.textContent = '';
        weatherDescription.textContent = '';
        wind.textContent = '';
        humidity.textContent = '';
    }

  }
  getWeather();

city.addEventListener('change', () => {
    getWeather(city.value)
});


export { showGreeting, translatePlaceholderName, translatePlaceholderCity, getWeather, getLocalStorageCity}
export default './main.js'