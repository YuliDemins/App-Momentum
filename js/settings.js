import {
    showGreeting,
    translatePlaceholderName,
    translatePlaceholderCity,
    getWeather,
    getLocalStorageCity
  } from "./main.js";
  
  import quotes from "./quotes.js";
  import { getQuotes } from "./quotes.js";
  import main from "./main.js";
  import { togglePlay, pauseAudio, player, play } from './player.js'
  
  let userSettings = [true, true, true, true, true, true, true];
  const SettingAll = document.querySelectorAll(".setting");
  let SelectLang = document.querySelector(".select-lang");
  const TimeBox = document.querySelector(".time");
  const DateBox = document.querySelector(".date");
  const GreettingBox = document.querySelector(".greeting-container");
  const PlayerBox = document.querySelector(".player");
  const WeatherBox = document.querySelector(".weather");
  const QuotesBox = document.querySelector(".quotes");
  const TodoBox = document.querySelector(".todo__container");
  
  const buttonAudioplayer = document.getElementById("audioplayer");
  
  let nameSetting = [
    TimeBox,
    DateBox,
    GreettingBox,
    PlayerBox,
    WeatherBox,
    QuotesBox,
    TodoBox,
  ];
  
  const SettingText = document.querySelectorAll(".setting__text");
  
  const SettingTitle = document.querySelector(".settings__title");
  
  function getLocalStorageLang() {
    if (localStorage.getItem("lang")) {
      document.querySelector(".select-lang").value = localStorage.getItem("lang");
    } else {
      SelectLang.value = "en";
    }
  }
  
  getLocalStorageLang();
  getLocalStorageSettings();
  let lang = SelectLang.value;
  setItemsSettings();
  
  import { setTitleTodo } from "./todo.js";
  setTitleTodo();
  
  SelectLang.addEventListener("change", (e) => {
    e.target.value == "en" ? (lang = "en") : (lang = "ru");
    setLocalStorageLang();
    getLocalStorageSettings();
    setItemsSettings();
    setTitleSettings();
    showGreeting();
    translatePlaceholderName();
    translatePlaceholderCity();
    getWeather();
    getQuotes();
    setTitleTodo();
    getLocalStorageCity()
  });
  
  function setLocalStorageLang() {
    localStorage.setItem("lang", SelectLang.value);
  }
  
  setLocalStorageLang();
  
  //===Settings===
  
  function setItemsSettings() {
    const translateSettings = [
      {
        en: "Time",
        ru: "Время",
      },
      {
        en: "Date",
        ru: "Дата",
      },
      {
        en: "Greeting",
        ru: "Приветствие",
      },
      {
        en: "Audioplayer",
        ru: "Аудиоплеер",
      },
      {
        en: "Weather",
        ru: "Погода",
      },
      {
        en: "Quote",
        ru: "Цитаты",
      },
      {
        en: "ToDoList",
        ru: "Список дел",
      },
      {
        en: "Language",
        ru: "Язык",
      },
    ];
  
    SettingText.forEach((el, index) => {
      el.textContent = translateSettings[index][lang];
    });
  }
  
  const Settings = document.querySelectorAll(".setting__btn");
  
  const SettingsBox = document.querySelector(".settings");
  const OpenSettings = document.querySelector(".settings__img");
  
  SettingAll.forEach((item, index) => {
    item.addEventListener("click", () => {
  
      nameSetting[index].classList.toggle("_activeblock");
      SettingAll[index].lastElementChild.classList.toggle("_switch-on");
  
      if (SettingAll[index].lastElementChild.classList.contains("_switch-on")) {
        userSettings[index] = true;
      } else {
        userSettings[index] = false;
      }
      if (!player.classList.contains('_activeblock')) {
          pauseAudio()
          play.classList.remove('pause')
      } 
    });
  });
  
  const buttonTime = document.getElementById("time");
  const buttonDate = document.getElementById("date");
  const buttonGreeting = document.getElementById("greeting");
  
  const buttonWeather = document.getElementById("weather");
  const buttonQuote = document.getElementById("quote");
  
  OpenSettings.addEventListener("click", () => {
    SettingsBox.classList.toggle("_activeblock");
  });
  
  function setTitleSettings() {
    const translateTitle = {
      en: "Settings",
      ru: "Настройки",
    };
    SettingTitle.textContent = translateTitle[lang];
  }
  setTitleSettings();
  
  function setLocalStorageSettings() {
    localStorage.setItem("settings", JSON.stringify(userSettings));
  }
  
  SettingsBox.addEventListener("click", setLocalStorageSettings);
  
  function getLocalStorageSettings() {
    if (localStorage.getItem("settings")) {
      userSettings = JSON.parse(localStorage.getItem("settings"));
      userSettings.forEach((item, index) => {
        if (item == false) {
          SettingAll[index].lastElementChild.classList.remove("_switch-on");
          nameSetting[index].classList.remove("_activeblock");
        } else {
          SettingAll[index].lastElementChild.classList.add("_switch-on");
          nameSetting[index].classList.add("_activeblock");
        }
      });
    }
  }
  
  export { getLocalStorageLang, lang };
  export default Settings;