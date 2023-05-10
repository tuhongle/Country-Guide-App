//* Define variables

const search = document.querySelector("label");
const input = document.querySelector('input[type="text"]');
let countryArr = [];

//* Define Functions

async function getCountryList() {
    const url = "https://restcountries.com/v3.1/all?fields=name";
    const response = await fetch(url);
    const jsonResponse = await response.json();
    countryArr = jsonResponse.map(item => {
        return item.name.common.toLowerCase();
    })
};

getCountryList();

function changeInfo(param) {
    document.querySelector(".content").style.display = "flex";
    document.querySelector(".invalid").style.display = "none";
    document.querySelector(".empty").style.display = "none";
    document.querySelector("img").src = param.flags.png;
    document.querySelector(".name").innerHTML = param.name.common;
    document.getElementById("capital").innerHTML = param.capital;
    document.getElementById("continent").innerHTML = param.continents;
    document.getElementById("population").innerHTML = param.population;
    const currencycode = Object.keys(param.currencies)[0];
    document.getElementById("currency").innerHTML = `${param.currencies[currencycode].name} - ${currencycode}`;
    document.getElementById("languages").innerHTML = Object.values(param.languages).join(", ");
};

/* async function getCountryName() {
    const url = "https://restcountries.com/v3.1/name/";
    const urlToFetch = url.concat(input.value.toLowerCase());  
    const response = await fetch(urlToFetch);
    const jsonResponse = await response.json();
    const {name, flags, capital, continents, population, currencies, languages,...rest} = jsonResponse[0];
    return {name, flags, capital, continents, population, currencies, languages};
}; */

async function getCountryName() {
    const url = "https://restcountries.com/v3.1/name/";
    const urlToFetch = url.concat(input.value.toLowerCase());  
    const response = await fetch(urlToFetch);
    const jsonResponse = await response.json();
    const jsonObj = jsonResponse.find(x => x.name.common.toLowerCase() === input.value.toLowerCase());
    const {name, flags, capital, continents, population, currencies, languages,...rest} = jsonObj;
    return {name, flags, capital, continents, population, currencies, languages};
};

async function changeCountry() {
    if (countryArr.includes(input.value.toLowerCase())) {
        const countryName = await getCountryName();
        changeInfo(countryName);
    } else if (input.value == "") {
        document.querySelector(".content").style.display = "none";
        document.querySelector(".invalid").style.display = "none";
        document.querySelector(".empty").style.display = "block";
    } else {
        document.querySelector(".content").style.display = "none";
        document.querySelector(".invalid").style.display = "block";
        document.querySelector(".empty").style.display = "none";
    }
};

search.onclick = changeCountry;

input.onkeydown = function(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        search.click();
    }
};

//? Add background image

async function getImage(param) {
    const endpoint = "https://pixabay.com/api/?key=36220735-2be18ee133b8c012655383fc0&image_type=photo&per_page=10&q="
    const input = param.toLowerCase().replaceAll(" ","+");
    const urlToFetch = endpoint.concat(input);

    const response = await fetch(urlToFetch);
    const jsonResponse = await response.json();
    return jsonResponse["hits"].map(item => item.largeImageURL);
};

const changeImage = async () => {
    const imgArr = await getImage(input.value);
    let i = Math.floor(Math.random() * 9.99);
    document.body.style.backgroundImage = `url(${imgArr[i]})`;
    document.body.style.backgroundColor = 'transparent';
};

search.addEventListener("click", changeImage);