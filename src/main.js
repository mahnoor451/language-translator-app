
import "./style.scss";

const sourceLanguageEl = document.getElementById("source-language");
const targetLanguageEl = document.getElementById("target-language");
const translationInputEl = document.getElementById("translation--input");
const translationOutputEl = document.getElementById("translation--output");

function translateLanguage() {
  const fromLang = sourceLanguageEl.value.trim();
  const toLang = targetLanguageEl.value.trim();
  const textToTranslate = translationInputEl.value.trim();

  if (!textToTranslate) {
    translationOutputEl.value = "";
    return;
  }

  if (!fromLang || !toLang) {
    translationOutputEl.value =
      "Please enter both languages (e.g., English to Urdu)";
    return;
  }

  const langCode = convertToLanguageCode(fromLang);
  const targetCode = convertToLanguageCode(toLang);
  const AUTHOR_EMAIL = "mahnoorishaq83@gmail.com";
  if (!langCode || !targetCode) {
    translationOutputEl.value =
      "Language not recognized. Try 'English' or 'Urdu'.";
    return;
  }

  translationOutputEl.value = "Translating...";

  fetch(
    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=${langCode}|${targetCode}&de=${AUTHOR_EMAIL}`,
  )
    .then((res) => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    })
    .then((data) => {
      if (data.responseData && data.responseData.translatedText) {
        translationOutputEl.value = data.responseData.translatedText;
      } else {
        translationOutputEl.value = "Translation not available.";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      translationOutputEl.value = "Error connecting to server.";
    });
}

let typingTimer;
const doneTypingInterval = 1000; 

translationInputEl.addEventListener('keyup', () => {
    clearTimeout(typingTimer);
    
    if (translationInputEl.value.trim()) {
        typingTimer = setTimeout(translateLanguage, doneTypingInterval);
    } else {
        translationOutputEl.value = "";
    }
});

function convertToLanguageCode(languageName) {
  const languageMap = {
    // English variations
    english: "en",
    en: "en",
    eng: "en",
    ingles: "en",
    inglés: "en",

    // Spanish
    spanish: "es",
    es: "es",
    spa: "es",
    espanol: "es",
    español: "es",

    // French
    french: "fr",
    fr: "fr",
    fra: "fr",
    francais: "fr",
    français: "fr",

    // German
    german: "de",
    de: "de",
    ger: "de",
    aleman: "de",
    alemán: "de",

    // Italian
    italian: "it",
    it: "it",
    ita: "it",
    italiano: "it",

    // Portuguese
    portuguese: "pt",
    pt: "pt",
    por: "pt",
    portugues: "pt",
    português: "pt",

    // Russian
    russian: "ru",
    ru: "ru",
    rus: "ru",
    ruso: "ru",

    // Japanese
    japanese: "ja",
    ja: "ja",
    jpn: "ja",
    japones: "ja",
    japonés: "ja",

    // Chinese
    chinese: "zh",
    zh: "zh",
    chi: "zh",
    mandarin: "zh",
    chino: "zh",

    // Arabic
    arabic: "ar",
    ar: "ar",
    ara: "ar",
    arabe: "ar",
    árabe: "ar",

    // Hindi
    hindi: "hi",
    hi: "hi",
    hin: "hi",
    hind: "hi",

    // Urdu
    urdu: "ur",
    ur: "ur",
    urd: "ur",

    // Korean
    korean: "ko",
    ko: "ko",
    kor: "ko",
    coreano: "ko",

    // Turkish
    turkish: "tr",
    tr: "tr",
    tur: "tr",
    turco: "tr",

    // Dutch
    dutch: "nl",
    nl: "nl",
    nld: "nl",
    holandes: "nl",
    holandés: "nl",

    // Swedish
    swedish: "sv",
    sv: "sv",
    swe: "sv",
    sueco: "sv",

    // Greek
    greek: "el",
    el: "el",
    ell: "el",
    griego: "el",

    // Polish
    polish: "pl",
    pl: "pl",
    pol: "pl",
    polaco: "pl",

    // Punjabi
    punjabi: "pa",

    // Pashto
    pashto: "ps",

    // Sindhi
    sindhi: "sd",

    // Balochi
    balochi: "bal",

    // Bengali
    bengali: "bn",

    // Nepali
    nepali: "ne",
  };

  return languageMap[languageName.toLowerCase().trim()];
}

sourceLanguageEl.addEventListener("keypress", (e) => {
  if (e.key === "Enter") translateLanguage();
});

targetLanguageEl.addEventListener("keypress", (e) => {
  if (e.key === "Enter") translateLanguage();
});
