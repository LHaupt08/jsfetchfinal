"use strict";

// TODO: Make dropdowns functional...
// TODO: Filter Data based on dropdowns...
// TODO: Choose Better Fonts...
// TODO: Continue to make website look better...

var groupDropdown = document.getElementById("group");
var typeDropdown = document.getElementById("type");

var groupValue = groupDropdown.value;
var typeValue = typeDropdown.value;

var searchBar = document.getElementById("search");
var sumbit = document.getElementById("sumbit");

var pokeimg = document.getElementById("pokeimg");

var pokename = document.getElementById("pokeName");
var pokedexNum = document.getElementById("pokedexNum");

var statbar = [
    document.getElementById("hpbar"),
    document.getElementById("atkbar"),
    document.getElementById("defbar"),
    document.getElementById("satbar"),
    document.getElementById("sdfbar"),
    document.getElementById("spdbar")
];

var bstbar = document.getElementById("bstbar");

var moveMarquee = document.getElementById("moveScroll");

var pokeTest = document.getElementById("pokedexTest");
//----------------------------------------------------------------------------------------------------------------

var allType = document.getElementById("typeAll");
var allName = document.getElementById("nameAll");

var pokedex_main = document.getElementById("pokedex-main");
var pokedex_stats = document.getElementById("pokedex-stats");
var pokedex_abilities = document.getElementById("pokedex-abilities");
var pokedex_types = document.getElementById("pokedex-types");
var pokedex_moves = document.getElementById("pokedex-moves");
var pokedex_entries = document.querySelectorAll("#pokedex-entries")

var pokeDataDisplay;
var pokeSpeciesDisplay;
var pokeAbilityDisplay;

typeDropdown.style.display = "none";

var groupTypes = [
    "Image",
    "Stats",
    "Types",
    "Moves"
];

var ammountOfOptions = document.querySelectorAll("#type option");

// If we change off of all, we need to:
    // Lower the opacity of the elements that do not belong to those catagories
    // Clear said element's html
    // Verify that search only triggers on the specified values.

groupDropdown.onchange = function(){

    groupValue = groupDropdown.value;
    typeValue = typeDropdown.value;


    if (groupValue == "all"){

        if (ammountOfOptions.length >= 5){
            for (var h = 0; h < groupTypes.length; h++){
                var childElem = document.getElementById(groupTypes[h].toLowerCase());
                typeDropdown.removeChild(childElem);
            }
        }

        typeDropdown.style.display = "none";

        pokedex_main.style.opacity = "1";
        pokedex_stats.style.opacity = "1";
        pokedex_types.style.opacity = "1";
        pokedex_moves.style.opacity = "1";

        pokedex_abilities.style.opacity = "1";


        for (var z = 0; z < pokedex_entries.length; z++){
            pokedex_entries[z].style.opacity = "1";
        }

        ammountOfOptions = document.querySelectorAll("#type option");

    }else if (groupValue == "pokemon"){
        // Displays:
            // Pokemon Image and it's name
            // It's stats
            // It's Types
            // The moves it can learn
        typeDropdown.style.display = "block";

        if (ammountOfOptions.length <=4)
        for (var d = 0; d < groupTypes.length; d++){
            var curElement = document.createElement("option");
            curElement.innerHTML = groupTypes[d];
            curElement.value = groupTypes[d].toLowerCase();
            curElement.setAttribute("id", groupTypes[d].toLowerCase());
            typeDropdown.appendChild(curElement);
        }

        pokedex_main.style.opacity = "1";
        pokedex_stats.style.opacity = "1";
        pokedex_types.style.opacity = "1";
        pokedex_moves.style.opacity = "1";

        pokedex_abilities.style.opacity = "0.05";

        for (var z = 0; z < pokedex_entries.length; z++){
            pokedex_entries[z].style.opacity = "0.05";
        }

        ammountOfOptions = document.querySelectorAll("#type option");

    }else if (groupValue == "pokemon-species"){
        // Displays:
            // Pokedex Entries

        typeDropdown.style.display = "none";
        if (ammountOfOptions.length >= 4){
            for (var n = 0; n < groupTypes.length; n++){
                var childElem = document.getElementById(groupTypes[n].toLowerCase());
                typeDropdown.removeChild(childElem);
            }
        }

        pokedex_main.style.opacity = "0.05";
        pokedex_stats.style.opacity = "0.05";
        pokedex_types.style.opacity = "0.05";
        pokedex_moves.style.opacity = "0.05";

        pokedex_abilities.style.opacity = "0.05";

        for (var z = 0; z < pokedex_entries.length; z++){
            pokedex_entries[z].style.opacity = "1";
        }

        ammountOfOptions = document.querySelectorAll("#type option");


    }else if (groupValue == "abilities"){
        // Displays:
            // Abilities

        typeDropdown.style.display = "none";

        if (ammountOfOptions.length >= 4){
            for (var h = 0; h < groupTypes.length; h++){
                var childElem = document.getElementById(groupTypes[h].toLowerCase());
                typeDropdown.removeChild(childElem);
            }
        }

        pokedex_main.style.opacity = "0.05";
        pokedex_stats.style.opacity = "0.05";
        pokedex_types.style.opacity = "0.05";
        pokedex_moves.style.opacity = "0.05";

        pokedex_abilities.style.opacity = "1";

        for (var z = 0; z < pokedex_entries.length; z++){
            pokedex_entries[z].style.opacity = "0.05";
        }

        ammountOfOptions = document.querySelectorAll("#type option");

    }

}








typeDropdown.onchange = function() {

    typeValue = typeDropdown.value;

    if (typeValue == "image" && groupValue == "pokemon"){

        pokedex_main.style.opacity = "1";
        pokedex_stats.style.opacity = "0.05";
        pokedex_types.style.opacity = "0.05";
        pokedex_moves.style.opacity = "0.05";
        
    }else if (typeValue == "stats" && groupValue == "pokemon"){

        pokedex_main.style.opacity = "0.05";
        pokedex_stats.style.opacity = "1";
        pokedex_types.style.opacity = "0.05";
        pokedex_moves.style.opacity = "0.05";

    }else if (typeValue == "types" && groupValue == "pokemon"){

        pokedex_main.style.opacity = "0.05";
        pokedex_stats.style.opacity = "0.05";
        pokedex_types.style.opacity = "1";
        pokedex_moves.style.opacity = "0.05";
        
    }else if (typeValue == "moves" && groupValue == "pokemon"){

        pokedex_main.style.opacity = "0.05";
        pokedex_stats.style.opacity = "0.05";
        pokedex_types.style.opacity = "0.05";
        pokedex_moves.style.opacity = "1";
        
    }else {

        pokedex_main.style.opacity = "1";
        pokedex_stats.style.opacity = "1";
        pokedex_types.style.opacity = "1";
        pokedex_moves.style.opacity = "1";

    }

}

// ---------------------------------------------------------------------------------------------------------------------

window.addEventListener("keyup", function(e) {
    if (e.keyCode === 13) {
        getData();
    }
});

// *First request from the API. It takes the search request and sends it, recieving data back. It also uses the search to obtain more data that might not be included in the first catagory, Pokemon.
async function getData() {
    console.clear();

    groupValue = groupDropdown.value;
    typeValue = typeDropdown.value;
    var searchInput = searchBar.value.toLowerCase();

    searchInput = searchInput.replace(/\s+/g,"-");


    var url = `https://pokeapi.co/api/v2/pokemon/${searchInput}`;
    try {

        const response = await fetch(url, {
            method: "GET"
        });
        if (!response.ok) {
            throw new Error(`response status: ${response.status}`);
        }

        const pokeData = await response.json();
        const result = `${pokeData}`
        

        // * General result.

        if (result == pokeData) {

            displayPokemon(pokeData);

            // ! If we get to being able to request specific data, make sure to either set the specific request to result, or replace the result variable.
            pokemonSpecies(searchInput);

            displayStats(pokeData);

            var pokeAble = pokeData.abilities;
            pokemonAbilities(pokeAble, pokeData);

            displayTypes(pokeData);

            displayMoves(pokeData);
            
        }

    }catch (error) {
        typingError();
        console.error(error.message);
    }

    // ? Picks up Pokemon Species Data. In additon, directs data towards several functions that uses it's data.
    async function pokemonSpecies(searchInput) {

        // ! Certain Forms (ex: Zygarde-10) give an error here. The api accepts it for looking up the pokemon but not the pokemon species. need to determine a way to convert the value from the search input and change it so this can understand it.

        var formCheck = searchInput.replace(/^[a-z]*[A-Z]*/i, "")
        formCheck = formCheck.replace(/[-]+/g,"");

        if (formCheck !== "alola" && formCheck !== "galar" && formCheck !== "paldea") {

            var normalEntry = searchInput.replace(/[-]+/g," ");
            normalEntry = normalEntry.replace(/\b\W\w*/g,"");
            var speciesurl = `https://pokeapi.co/api/v2/pokemon-species/${normalEntry}`;

        }else {

            var speciesurl = `https://pokeapi.co/api/v2/pokemon-species/${searchInput}`;

        }

            try {
                const response = await fetch(speciesurl, {
                    method: "GET"
            });
            if (!response.ok) {
            throw new Error(`response status: ${response.status}`);
            }
                const speciesData = await response.json();

                    pokedexNumber(speciesData);
                    gatherForEntries(speciesData);

                function pokedexNumber(speciesData){

                    pokedexNum.innerHTML = "#" + speciesData.pokedex_numbers[0].entry_number;

                }

                function evolvesFrom(speciesData){
                }

                function gatherForEntries(speciesData){
                    var pokedexEntrys = [];
                        var pokedexGame = [];
                        var pokedexIndex=0;

                        var curEntry = [];

                        for (var p=0; p < speciesData.flavor_text_entries.length; p++){

                            var curLang = speciesData.flavor_text_entries[p].language.name;

                            if (curLang === "en"){

                                if (speciesData.flavor_text_entries[p].version.name !== "blue" || speciesData.flavor_text_entries[p].version.name !== "lets-go-eevee"){
                                    pokedexEntrys[pokedexIndex]=speciesData.flavor_text_entries[p].flavor_text;
                                    pokedexGame[pokedexIndex]=speciesData.flavor_text_entries[p].version.name;
                                    
                                    
                                    curEntry[pokedexIndex] = pokedexEntrys[pokedexIndex] + " " + pokedexGame[pokedexIndex] + " " + pokedexIndex + " ";

                                    pokedexIndex += 1;
                                }

                            }

                        }

                        // Send obtained data to a function.

                    pokedexEntries(pokedexEntrys, pokedexGame, pokedexIndex);
                }
                

            }catch (error) {
                pokedexError();
                console.error(error.message);
            }

    }

    // ? Displays the pokemon's abilities on the third element (the carousel).
    async function pokemonAbilities(pokeAble, pokeData){

        for(var j=0; j < pokeData.abilities.length; j++){
            const current = pokeAble[j].ability.name;

            const abilityurl = `https://pokeapi.co/api/v2/ability/${current}`;

            try {
                const response = await fetch(abilityurl, {
                    method: "GET"
            });
            if (!response.ok) {
            throw new Error(`response status: ${response.status}`);
            }
                const abilityData = await response.json();

                var curSlide = document.getElementById("slide-" + (j+1));
                var curLabel = document.getElementById("label-" + (j+1));
                var curContent = document.getElementById("content-" + (j+1));
                curLabel.innerHTML = current;

                for (var q = 0; q < abilityData.effect_entries.length; q++) {

                    if (abilityData.effect_entries[q].language.name == "en"){

                        curContent.innerHTML = abilityData.effect_entries[q].short_effect;
                        continue;

                    }

                }


                if (pokeData.abilities.length == 1 && j==0) {

                    for (var g=0; g < 2; g++){

                    curLabel = document.getElementById("label-" + (j+2+g));
                    curContent = document.getElementById("content-" + (j+2+g));

                    curLabel.innerHTML = "n/a";
                    curContent.innerHTML = "n/a";
                    
                    }
                

                } else if (pokeData.abilities.length == 2 && j==1) {

                    curLabel = document.getElementById("label-" + (j+2));
                    curContent = document.getElementById("content-" + (j+2));

                    curLabel.innerHTML = "n/a";
                    curContent.innerHTML = "n/a";

                }



            }catch (error) {
                console.error(error.message);
            }

        }

    }





    // * Inserts the Pokemon's image and name into the first box
    function displayPokemon(pokeData) {
        pokeimg.src = pokeData.sprites.front_default;
        pokeimg.style.display = "block";

        var pokemonName = pokeData.name;
        pokemonName = pokemonName.replace(/[-]+/g," ");

        pokename.innerHTML = pokemonName;

    }

    function displayStats(pokeData){

        var bsttotal=0;
            for (var i=0; i < pokeData.stats.length; i++) {

                var removeItem = statbar[i].classList.item(1);
                
                
                if (removeItem != null) {
                    statbar[i].classList.remove(removeItem);
                }

                

                var pokestat = pokeData.stats[i].base_stat;
                statbar[i].innerHTML = pokestat;

                var widthValue = (pokestat * 100) / 250;
                statbar[i].setAttribute("aria-valuenow",widthValue);
                statbar[i].style.width=widthValue + "%";

                
                if (pokestat < 50){
                    statbar[i].classList.add("bg-danger");
                } else if(pokestat >= 50 & pokestat <= 99) {
                    statbar[i].classList.add("bg-warning");
                } else if(pokestat >= 100 & pokestat <= 174){
                    statbar[i].classList.add("bg-success");
                } else if(pokestat >= 175) {
                    statbar[i].classList.add("bg-info");
                }
                bsttotal += pokestat;
            }

            removeItem = bstbar.classList.item(1);
                
            if (removeItem != null) {
                bstbar.classList.remove(removeItem);
            }

            bstbar.innerHTML = bsttotal;
            widthValue = (bsttotal * 100) / 780;
            bstbar.setAttribute("aria-valuenow",widthValue);
            bstbar.style.width=widthValue + "%";

            if (bsttotal < 50){
                bstbar.classList.add("bg-danger");
            } else if(bsttotal >= 200 & bsttotal <= 449) {
                bstbar.classList.add("bg-warning");
            } else if(bsttotal >= 450 & bsttotal <= 649){
                bstbar.classList.add("bg-success");
            } else if(bsttotal >= 650) {
                bstbar.classList.add("bg-info");
            }

    }

    // * Finds the Pokemon's Type(s) and displays them. if the pokemon beforehand had two types and the next has one, it removes the 2nd type's image and replaces the text to N/A
    function displayTypes(pokeData){

            for (var t=0; t<pokeData.types.length; t++){

                var displayType = document.getElementById(`typeText-${t+1}`)
                var displayTypeImg = document.getElementById(`typeImg-${t+1}`)

                var thisType = pokeData.types[t].type.name;
                var typeIndex = pokeType.indexOf(thisType);

                if (typeIndex !== -1) {

                    displayType.innerHTML =thisType;
                    
                    displayTypeImg.setAttribute("src",pokeTypeImg[typeIndex]);
                    displayTypeImg.style.display="block";
                    
                }else{
                    console.log("Not found");
                }

                if (pokeData.types.length == 1) {
                    displayType = document.getElementById(`typeText-${t+2}`)
                    displayTypeImg = document.getElementById(`typeImg-${t+2}`)

                    displayType.innerHTML="N/A";
                    displayTypeImg.setAttribute("src", "");
                    displayTypeImg.style.display="none";
                }

            }

    }

    // * Displays each move a pokemon can learn (in no particular order) and applies that string to a marquee.
    function displayMoves(pokeData){
        var moveText= "";

            for (var m=0; m < pokeData.moves.length; m++){

                var curMove = pokeData.moves[m].move.name;
                curMove = curMove.replace(/[-]+/g," ");
                moveText += curMove + ", ";

            }

            moveMarquee.innerHTML = moveText;
    }

    function typingError(){
        moveMarquee.innerHTML = "Could not retrieve pokemon data. Make sure you have typed the pokemon's name right.";
    }

}