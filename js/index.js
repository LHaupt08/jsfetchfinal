"use strict";

// TODO: Make dropdowns functional...
// TODO: Filter Data based on dropdowns...
// TODO: Choose Better Fonts...
// TODO: Continue to make website look better...

var groupDropdown = document.getElementById("group");
var typeDropdown = document.getElementById("type");
var nameDropdown = document.getElementById("name");

var searchBar = document.getElementById("search");
var sumbit = document.getElementById("sumbit");

var pokeimg = document.getElementById("pokeimg");
var displaySprite;
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

var requestAllData = false;

window.addEventListener("keyup", function(e) {
    if (e.keyCode === 13) {
        getData();
    }
});

// *First request from the API. It takes the search request and sends it, recieving data back. It also uses the search to obtain more data that might not be included in the first catagory, Pokemon.
async function getData() {
    console.clear();

    var groupValue = groupDropdown.value;
    var typeValue = typeDropdown.value;
    var nameValue = nameDropdown.value;
    var searchInput = searchBar.value.toLowerCase();

    searchInput = searchInput.replace(/\s+/g,"-");


    const url = `https://pokeapi.co/api/v2/pokemon/${searchInput}`;
    try {

        const response = await fetch(url, {
            method: "GET"
        });
        if (!response.ok) {
            throw new Error(`response status: ${response.status}`);
        }

        const pokeData = await response.json();
        //const result = `${pokeData}.${typeValue}.${nameValue}`
        const result = `${pokeData}`
        

        // * General result.

        if (result == pokeData) {
            requestAllData = true;

            displaySprite = "front_default";
            displayPokemon(displaySprite, pokeData);

            // ! If we get to being able to request specific data, make sure to either set the specific request to result, or replace the result variable.
            pokemonSpecies(searchInput, requestAllData, result);

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
    async function pokemonSpecies(searchInput, requestAllData, result) {

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

                if (requestAllData == true) {

                    pokedexNumber(speciesData);
                    gatherForEntries(speciesData);

                }

                function pokedexNumber(speciesData){

                    pokedexNum.innerHTML = "#" + speciesData.pokedex_numbers[0].entry_number;

                }

                function evolvesFrom(speciesData){
                    if (speciesData.evolves_from_species !== null) {
                        // window.alert(speciesData.evolves_from_species.name) use this data later :)
                    }
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
                window.alert(error.message);
            }

        }

    }





    // * Inserts the Pokemon's image and name into the first box
    function displayPokemon(displaySprite, pokeData) {

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