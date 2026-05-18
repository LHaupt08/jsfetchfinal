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

var moveMarquee = document.getElementById("moveScroll");

var pokeTest = document.getElementById("pokedexTest");

// *Function for taking data from api
async function getData() {
    console.clear();

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
        //const result = `${pokeData}.${typeValue}.${nameValue}`
        const result = `${pokeData}`
        

        // * Insert data onto webpage

        if (result == pokeData) {

            pokeimg.src = pokeData.sprites.front_default;
            pokeimg.style.display = "block";

            pokename.innerHTML = pokeData.name;

            // * Pokemon Dex Number

            // ! Certain Forms (ex: Zygarde-10) give an error here. The api accepts it for looking up the pokemon but not the pokemon species. need to determine a way to convert the value from the search input and change it so this can understand it.
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

                if (speciesData.evolves_from_species !== null) {
                    // window.alert(speciesData.evolves_from_species.name) use this data later :)
                }

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
                        // Find better thing to display this on with conjunction with current bootstrap data.   

                    }

                }

                // ! Send data to a function.

                        pokedexEntries(pokedexEntrys, pokedexGame, pokedexIndex);

            }catch (error) {
                console.error(error.message);
                window.alert(error.message);
            }


            // * Stats
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


            var pokeAble = pokeData.abilities;

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
                    
                    // carouselInd[0]: <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    // carouselInd[1-2]: <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>

                    /* carouselArea[0]: <div class="carousel-item active">
                                            <img src="./img/pose.png" class="d-block w-100" alt="..." style="opacity: 0.5;">
                                            <div class="carousel-caption d-none d-md-block">
                                                <h5>First slide label</h5>
                                                <p>Some representative placeholder content for the first slide.</p>
                                            </div>
                                        </div>*/
                    
                    /* carouselArea[1-2]: <div class="carousel-item">
                                            <img src="..." class="d-block w-100" alt="...">
                                                <div class="carousel-caption d-none d-md-block">
                                                    <h5>Second slide label</h5>
                                                    <p>Some representative placeholder content for the second slide.</p>
                                                </div>
                                            </div>*/

                    var curSlide = document.getElementById("slide-" + (j+1));
                    var curLabel = document.getElementById("label-" + (j+1));
                    var curContent = document.getElementById("content-" + (j+1));
                    curLabel.innerHTML = current;
                    curContent.innerHTML = abilityData.effect_entries[abilityData.effect_entries.length - 1].short_effect;


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

            // Find the pokemon's type and display it.
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

            var moveText= "";

            for (var m=0; m < pokeData.moves.length; m++){

                var curMove = pokeData.moves[m].move.name;
                moveText += curMove + " ";

            }

            moveMarquee.innerHTML = moveText;
            
        }

    }catch (error) {
        console.error(error.message);
    }

    
}