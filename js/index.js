"use strict";

var groupDropdown = document.getElementById("group");
var typeDropdown = document.getElementById("type");
var nameDropdown = document.getElementById("name");

var searchBar = document.getElementById("search");
var sumbit = document.getElementById("sumbit");

var pokeimg = document.getElementById("pokeimg");
var pokename = document.getElementById("pokeName");
var pokedexNum = document.getElementById("pokedexNum");

var hpbar = document.getElementById("hpbar");
var atkbar = document.getElementById("atkbar");
var defbar = document.getElementById("defbar");
var satbar = document.getElementById("spabar");
var spdbar = document.getElementById("spdbar");
var spdbar = document.getElementById("spdbar");

var bsdbar = document.getElementById("bsdbar");


// *Function for taking data from api
async function getData() {

    var groupValue = groupDropdown.value;
    var typeValue = typeDropdown.value;
    var nameValue = nameDropdown.value;
    var searchInput = searchBar.value.toLowerCase();


    const url = `https://pokeapi.co/api/v2/pokemon/${searchInput}`;
    try {

        const response = await fetch(url, {
            method: "GET"
        });
        if (!response.ok) {
            throw new Error(`response status: ${response.status}`);
        }

        const pokeData = await response.json();
        console.log(pokeData);
        //const result = `${pokeData}.${typeValue}.${nameValue}`
        const result = `${pokeData}`
        console.log(result);
        

        // * Insert data onto webpage

        if (result == pokeData) {

            pokeimg.src = pokeData.sprites.front_default;
            pokeimg.style.display = "block";

            pokename.innerHTML = pokeData.name;


            hpbar.innerHTML = pokeData.stats[0].base_stat;


            const speciesurl = `https://pokeapi.co/api/v2/pokemon-species/${searchInput}`;

            try {
                const response = await fetch(speciesurl, {
                    method: "GET"
            });
            if (!response.ok) {
            throw new Error(`response status: ${response.status}`);
            }
                const speciesData = await response.json();

                pokedexNum.innerHTML = "#" + speciesData.pokedex_numbers[0].entry_number;


            }catch (error) {
                console.error(error.message);
            }


            
        }

    }catch (error) {
        console.error(error.message);
    }

    
}