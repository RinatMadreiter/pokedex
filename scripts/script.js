/**
 * define variables and typecolors
 */
let currentPokemon;
let amountOfDigitsInID = 3;
let clickedPokemonHp;
let clickedPokemonAttack;
let clickedPokemonDefense;
let clickedPokemonSpecialattack;
let clickedPokemonSpecialdefense;
let clickedPokemonSpeed;
let i = 1;
let iPlus20 = (i + 20);
let scrollAmountTrigger = 100;
let amountsOfAllPokemons = 151;
let allPokemonNames = [];
let typedSearch;
let searchNamesArray = [];
let loading = false;
let allPokemons = [];
/**
 * JSON variable which stores all colors for type-specific background color change of pokemons
 */
let typeColors = [
    {
        "type": "Grass",
        "color": "#7fd530d1"
    },
    {
        "type": "Fire",
        "color": "#e73820c7"
    },
    {
        "type": "Water",
        "color": "#8ae9ffd9"
    },
    {
        "type": "Bug",
        "color": "#468366a6"
    },
    {
        "type": "Normal",
        "color": "#c3cacd59"
    },
    {
        "type": "Poison",
        "color": "#937ce99c"
    },
    {
        "type": "Electric",
        "color": "#ffe100"
    },
    {
        "type": "Ground",
        "color": "#dcc200d6"
    },
    {
        "type": "Fairy",
        "color": "#f9dad9b3"
    },
    {
        "type": "Fighting",
        "color": "#a3611c61"
    },
    {
        "type": "Psychic",
        "color": "#ee848c94"
    },
    {
        "type": "Rock",
        "color": "#88878080"
    },
    {
        "type": "Ghost",
        "color": "#664497a6"
    },
    {
        "type": "Ice",
        "color": "#84cdf7c9"
    },
    {
        "type": "Dragon",
        "color": "#f9be00d6"
    }
]


/**
 * define variables: audios
 * lower the volume of all audios to 10%
 */
let audioTheme = new Audio('./sounds/themesong.mp3');
audioTheme.volume = 0.1;



/**
 * Load 21 Pokemon, render and style them
 */
async function loadPokemon() {

    for (; i <= iPlus20; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json(); //response as JSON
        allPokemons.push(currentPokemon);
        renderAllPokemon(i, currentPokemon);
        styleAllPokemon(i, currentPokemon);
    }
}



/* function checkIfIncluded(namesMatchingToSearch) {
     if (allPokemonNames.includes(namesMatchingToSearch)) {
        return namesMatchingToSearch
    }
}
 */

/**
 * load 151 Pokemon Names ans save in  Array: "allPokemonNames" for search function
 */
/* async function loadSaveAllPokemonNames() {
    for (k = 1; k <= amountsOfAllPokemons; k++) {
        let urlNames = `https://pokeapi.co/api/v2/pokemon/${k}`;
        let responseNames = await fetch(urlNames);
        currentPokemonName = await responseNames.json();
        allPokemonNames.push(currentPokemonName['name']);
    }
} */


/**
 * render all Pokemon cards
 * 1) create HTML cards
 * 2) render API data of pokemons
 * @param {number} i - index number of for loop 
 * @param {json} currentPokemon - pokemon url response from pokeapi
 */
function renderAllPokemon(i, currentPokemon) {
    createPokemonCardHTML(i);
    renderPokemonInfo(i, currentPokemon);
}


/**
 * style all Pokemoncards
 * @param {number} i - index number of for loop 
 * @param {json} currentPokemon- pokemon url response from pokeapi
 */
function styleAllPokemon(i, currentPokemon) {
    capitalizeFLetterName(i, currentPokemon);
    capitalizeFLetterType(i, currentPokemon);
    let currentID = currentPokemon['id'];
    addLeadingZerosToID(currentID, amountOfDigitsInID);
    updateID(i, currentID);
    styleCardAccordingToType(i);
}


/**
 * lazy load and render 21 Pokemons at "onscroll"
 */
function lazyLoading() {
    if (document.documentElement.scrollTop > scrollAmountTrigger && !loading) {
        loading = true;
        let currentBodyHeight = document.body.scrollHeight;
        scrollAmountTrigger = currentBodyHeight - 200;
        iPlus20 += 20;
        loadPokemon().then( ()=> loading = false);
    }
}


/**
 * load clicked Pokemon-Card from API and render it
 * @param {number} clickedPokemon - pokemons index in allPokemons array
 */
/* async function loadClickedPokemonAsJson(clickedPokemon) {
    let j = clickedPokemon;
    let url = `https://pokeapi.co/api/v2/pokemon/${j}`;
    let response = await fetch(url);
    clickedPokemon = await response.json();
    renderSinglePokemonUpperPart(clickedPokemon);
    renderSinglePokemonLowerPart(clickedPokemon);
}
 */

/**
 * render clicked Pokemons upper Part
 * @param {number} clickedPokemon - pokemons index in allPokemons array
 */
function renderSinglePokemonUpperPart(clickedPokemon) {
    let currentPokemonImg = clickedPokemon['sprites']['other']['dream_world']['front_default'];
    document.getElementById(`single-pokemoncard-view-img`).src = currentPokemonImg;
    document.getElementById(`single-pokemoncard-view-name`).innerHTML = clickedPokemon['name'];
    document.getElementById(`single-pokemoncard-view-type`).innerHTML = clickedPokemon['types'][0]['type']['name'];
    document.getElementById(`single-pokemoncard-view-id`).innerHTML = `#${clickedPokemon['id']}`;
    capitalizeFLetterNameSinglePokemon(clickedPokemon);
    capitalizeFLetterTypeSinglePokemon(clickedPokemon);
    renderSinglePokemonID(clickedPokemon);
    styleCardAccordingToTypeSingle();
}


/**
 * render clicked Pokemons lower part
 * @param {number} clickedPokemon - pokemons index in allPokemons array
 */
function renderSinglePokemonLowerPart(clickedPokemon) {
    renderSinglePokemonStats(clickedPokemon);
}


/**
 * render clicked Pokemon's base-stats
 * @param {number} clickedPokemon - pokemons index in allPokemons array
 */
function renderSinglePokemonStats(clickedPokemon) {
    loadSinglePokemonStatsVariables(clickedPokemon)
    addBaseStatsToChart();
    myChart.update();
}


/**
 * load clicked Pokemon's base-stats
 * @param {number} clickedPokemon - pokemons index in allPokemons array
 */
function loadSinglePokemonStatsVariables(clickedPokemon) {
    clickedPokemonHp = clickedPokemon['stats']['0']['base_stat'];
    clickedPokemonAttack = clickedPokemon['stats']['1']['base_stat'];
    clickedPokemonDefense = clickedPokemon['stats']['2']['base_stat'];
    clickedPokemonSpecialattack = clickedPokemon['stats']['3']['base_stat'];
    clickedPokemonSpecialdefense = clickedPokemon['stats']['4']['base_stat'];
    clickedPokemonSpeed = clickedPokemon['stats']['5']['base_stat'];
}


/**
 * animate Pokemon when clicked to preview
 * @param {number} clickedPokemon - pokemons index in allPokemons array
 */
function displayClickedPokemon(clickedPokemon) {
    // loadClickedPokemonAsJson(clickedPokemon);
    let pokemon = allPokemons.find( p => p.id == clickedPokemon);
    renderSinglePokemonUpperPart(pokemon);
    renderSinglePokemonLowerPart(pokemon);
    document.body.style = 'overflow:hidden;';
    document.getElementById('single-pokemon-view').classList.remove('d-none');
    document.getElementById('single-pokemoncard-view').classList.remove('animate-zoom-out');
    document.getElementById('single-pokemoncard-view').classList.add('animate-zoom-in');
}


/**
 * animate Pokemon when clicked to close
 */
function closeClickedPokemon() {
    document.getElementById('single-pokemoncard-view').classList.remove('animate-zoom-in');
    document.getElementById('single-pokemoncard-view').classList.add('animate-zoom-out');
    document.body.style = 'overflow:visible;';
    setTimeout(hideSinglePokemonView, 480);
}


/**
 * hide clicked Pokemon when closing
 */
function hideSinglePokemonView() {
    document.getElementById('single-pokemon-view').classList.add('d-none');
}


/**
 * save "Base-Stats" Data from API in variables
 */
function addBaseStatsToChart() {
    data.datasets[0].data[0] = clickedPokemonHp;
    data.datasets[0].data[1] = clickedPokemonAttack;
    data.datasets[0].data[2] = clickedPokemonDefense;
    data.datasets[0].data[3] = clickedPokemonSpecialattack;
    data.datasets[0].data[4] = clickedPokemonSpecialdefense;
    data.datasets[0].data[5] = clickedPokemonSpeed;
}


/**
 * render HTML for all Pokemon cards for overview
 * @param {number} currentNumber  - current index number of for loop main render function
 */
function createPokemonCardHTML(currentNumber) {
    let pokemonCardsContainer = document.getElementById('pokemon-cards-container');
    pokemonCardsContainer.innerHTML += `
    <div class="pokemon-card" id="pokemon-card${currentNumber}" onclick="displayClickedPokemon(${currentNumber})">
        <div class="pokemon-id-number" id= "pokemon-id${currentNumber}"></div>
        <div class="pokemon-name" id="pokemonName${currentNumber}">Name</div>
        <div class="pokemon-img-type-container">
            <div class="type-container" >
                <span id="type${currentNumber}"></span>
            </div>
            <div class="img-container">
                <img id="pokemonMainImg${currentNumber}" class="pokemon-img"></img>
            </div>
        </div>
    </div>`;
}


/**
 * render API-Data from all pokemon cards 
 * @param {number} currentNumber - current index number of for loop main render function
 * @param {json} currentPokemon - pokemon url response from pokeapi
 */
function renderPokemonInfo(currentNumber, currentPokemon) {
    let currentPokemonImg = currentPokemon['sprites']['other']['dream_world']['front_default'];
    document.getElementById(`pokemonMainImg${currentNumber}`).src = currentPokemonImg;
    document.getElementById(`pokemonName${currentNumber}`).innerHTML = currentPokemon['name'];
    document.getElementById(`type${currentNumber}`).innerHTML += currentPokemon['types'][0]['type']['name'];
    document.getElementById(`pokemon-id${currentNumber}`).innerHTML = `#${currentPokemon['id']}`;
}


/**
 * style all pokemon according to their type
 * @param {number} currentNumber - current index number of for loop main render function
 */
function styleCardAccordingToType(currentNumber) {
    let currentType = document.getElementById(`type${currentNumber}`);
    let currentPokemonCard = document.getElementById(`pokemon-card${currentNumber}`);
    for (let index = 0; index < typeColors.length; index++) {
        if (currentType.innerHTML == typeColors[index]['type']) {
            currentPokemonCard.style.backgroundColor = typeColors[index]['color'];
        }
    }
}


/**
 * style clicked Pokemon according to its type
 */
function styleCardAccordingToTypeSingle() {
    let currentType = document.getElementById(`single-pokemoncard-view-type`);
    let clickedPokemonUpperPart = document.getElementById(`single-pokemon-upper-part`);
    for (let index = 0; index < typeColors.length; index++) {
        if (currentType.innerHTML == typeColors[index]['type']) {
            clickedPokemonUpperPart.style.backgroundColor = typeColors[index]['color'];
        }
    }
}


/**
 * capitalize first letter of all pokemons name
 * @param {number} currentNumber - current index number of for loop main render function
 * @param {json} currentPokemon - pokemon url response from pokeapi
 */
function capitalizeFLetterName(currentNumber, currentPokemon) {
    let input = document.getElementById(`pokemonName${currentNumber}`);
    let string = currentPokemon['name'];
    input.innerHTML = string[0].toUpperCase() +
        string.slice(1);
}


/**
 * capitalize first letter of clicked pokemons name
 * @param {number} clickedPokemon - pokemons index in allPokemons array
 */
function capitalizeFLetterNameSinglePokemon(clickedPokemon) {
    let input = document.getElementById(`single-pokemoncard-view-name`);
    let string = clickedPokemon['name'];
    input.innerHTML = string[0].toUpperCase() +
        string.slice(1);
}


/**
 * capitalize first letter of all pokemons type
 * @param {number} currentNumber - current index number of for loop main render function
 * @param {json} currentPokemon - pokemon url response from pokeapi
 */
function capitalizeFLetterType(currentNumber, currentPokemon) {
    let input = document.getElementById(`type${currentNumber}`);
    let string = currentPokemon['types'][0]['type']['name'];
    input.innerHTML = string[0].toUpperCase() +
        string.slice(1);
}


/**
 * capitalize first letter of clicked pokemons type
 * @param {number} currentNumber - current index number of for loop main render function
 * @param {json} currentPokemon currentPokemon - pokemon url response from pokeapi
 */
function capitalizeFLetterTypeSinglePokemon(clickedPokemon) {
    let input = document.getElementById(`single-pokemoncard-view-type`);
    let string = clickedPokemon['types'][0]['type']['name'];
    input.innerHTML = string[0].toUpperCase() +
        string.slice(1);
}


/**
 * update all pokemons ID to display  leading zeros
 * @param {number} currentNumber - current index number of for loop main render function
 * @param {number} currentID - pokemons id number without leading zeros
 */
function updateID(currentNumber, currentID) {
    let updatedID = addLeadingZerosToID(currentID, amountOfDigitsInID);
    document.getElementById(`pokemon-id${currentNumber}`).innerHTML = `#${updatedID}`;
}


/**
 * update clicked pokemons id to display  leading zeros
 * @param {number} SinglecurrentID - id number of clicked Pokemon without leading zeros
 */
function updateSingleID(SinglecurrentID) {
    let updatedID = addLeadingZerosToID(SinglecurrentID, amountOfDigitsInID);
    document.getElementById(`single-pokemoncard-view-id`).innerHTML = `#${updatedID}`;
}


/**
 * add leading zeros to id number
 * @param {number} num - number which should have leading zeros
 * @param {number} size - amount of expected digits
 * @returns {number}   n number with added leading zeros
 */
function addLeadingZerosToID(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}


/**
 * render clicked pokemons id to display  leading zeros
 * @param {string} clickedPokemon 
 */
function renderSinglePokemonID(clickedPokemon) {
    let SinglecurrentID = clickedPokemon['id'];
    addLeadingZerosToID(SinglecurrentID, amountOfDigitsInID)
    updateSingleID(SinglecurrentID);
}


/**
 * enable play button to play music
 */
function playTheme() {
    audioTheme.play();
}


/**
 * enable butten to pause music
 */
function stopTheme() {
    audioTheme.pause();
}

