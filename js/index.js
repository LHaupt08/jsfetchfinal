"use strict";

var groupDropdown = document.getElementById("group")
var typeDropdown = document.getElementById("type")
var nameDropdown = document.getElementById("name")

var searchBar = document.getElementById("search")
var sumbit = document.getElementById("sumbit")

var pokeimg = document.getElementById("pokeimg")


// *Function for taking data from api
async function getData() {

    var groupValue = groupDropdown.value;
    var typeValue = typeDropdown.value;
    var nameValue = nameDropdown.value
    var searchInput = searchBar.value.toLowerCase();


    const url = `https://pokeapi.co/api/v2/${groupValue}/${searchInput}`;
    try {

        const response = await fetch(url, {
            method: "GET"
        });
        if (!response.ok) {
            throw new Error(`response status: ${response.status}`);
        }

        const pokeData = await response.json();
        console.log(pokeData);
        // ! Fix this
        const result = `${pokeData}.${typeValue}.${nameValue}`
        pokeimg.src = pokeData.sprites.front_default;
        pokeimg.style.display = "block";

    }catch (error) {
        console.error(error.message);
    }

    // * Insert Data onto page

    
}