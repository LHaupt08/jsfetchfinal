"use strict";

var groupDropdown = document.getElementById("group");
var typeDropdown = document.getElementById("type");
var nameDropdown = document.getElementById("name");

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

            var bsttotal=0;
            for (var i=0; i < 6; i++) {

                var pokestat = pokeData.stats[i].base_stat;
                statbar[i].innerHTML = pokestat;

                var widthValue = (pokestat * 100) / 250;
                statbar[i].setAttribute("aria-valuenow",widthValue);
                statbar[i].style.width=widthValue + "%";

                if (pokestat <= 50){
                    statbar[i].classList.add("bg-danger");
                } else if(pokestat > 50 & pokestat <= 100) {
                    statbar[i].classList.add("bg-warning");
                } else if(pokestat > 100 & pokestat <= 175){
                    statbar[i].classList.add("bg-success");
                } else {
                    statbar[i].classList.add("bg-info");
                }
                bsttotal+=pokestat;

            }

            // Work on displaying BST, could be included in the stats but if not calculate it.
            bstbar = bsttotal;



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