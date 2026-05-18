"use strict"

var entryText = document.getElementById("pokeEntry");
var entryTextGame = document.getElementById("pokeEntryGame");

entryText.innerHTML="Pokedex Entrys Appear Here...";
entryTextGame.innerHTML="Game";

function pokedexEntries(pokedexEntrys, pokedexGame, pokedexIndex) {
    
    // Select all of the anchor tags with games and whenever one is clicked, display it's entry at a single spot.

    var gameLinks = document.querySelectorAll("li.page-item > a");
    var gameButtons = document.querySelectorAll("li.page-item");

    var gameLinksIds = [];

    for (var c=0; c<gameLinks.length; c++){
        gameLinksIds[c] = gameLinks[c].id;

        if (gameLinksIds[c] !== 'previous' && gameLinksIds[c] !== 'next') {

            gameButtons[c].classList.add("disabled");

            for (var d=0; d < pokedexGame.length; d++){

                if (pokedexGame[d] == gameLinksIds[c]) {
                    
                    if (gameButtons[c].classList.contains("disabled")){
                        gameButtons[c].classList.remove("disabled");

                        continue;
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