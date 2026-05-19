"use strict"

var entryText = document.getElementById("pokeEntry");
var entryTextGame = document.getElementById("pokeEntryGame");

var gameLinks = document.querySelectorAll("li.page-item > a");
var gameButtons = document.querySelectorAll("li.page-item");

function pokedexEntries(pokedexEntrys, pokedexGame, pokedexIndex) {

    entryText.innerHTML="Click on a tab below to see the pokedex entry..";
    entryTextGame.innerHTML="This will show the game..";
    
    // Select all of the anchor tags with games and whenever one is clicked, display it's entry at a single spot.

    var gameLinksIds = [];

    for (var c=0; c<gameLinks.length; c++){
        gameLinksIds[c] = gameLinks[c].id;

        if (gameLinksIds[c] !== 'previous' && gameLinksIds[c] !== 'next') {

            gameButtons[c].classList.add("disabled");

            for (var d=0; d < pokedexGame.length; d++){

                if (pokedexGame[d] == gameLinksIds[c]) {
                    
                    if (gameButtons[c].classList.contains("disabled")){
                        gameButtons[c].classList.remove("disabled");
                    }

                }

            }

        }

    }

    for (var b = 0; b < gameLinks.length; b++) {

        gameLinks[b].onmousedown = function(e){

            for (var a = 0; a < pokedexIndex; a++){

                if (pokedexGame[a] == e.target.id) {

                    entryText.innerHTML = pokedexEntrys[a];
                    entryTextGame.innerHTML = pokedexGame[a];

                }

            }

        }

    }

}

function pokedexError(){

    for (var f=0; f < gameButtons.length; f++){

        if (!gameButtons[f].classList.contains("disabled")){
            gameButtons[f].classList.add("disabled");
        }

    }

    entryText.innerHTML = "Unable to retrieve pokedex data for this pokemon.";
    entryTextGame.innerHTML = "This pokemon may be a form that does not currently have data for it's pokedex entries.";

}