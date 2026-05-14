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
        console.log(pokeData);
        //const result = `${pokeData}.${typeValue}.${nameValue}`
        const result = `${pokeData}`
        console.log(result);
        

        // * Insert data onto webpage

        if (result == pokeData) {

            pokeimg.src = pokeData.sprites.front_default;
            pokeimg.style.display = "block";

            pokename.innerHTML = pokeData.name;

            // * Pokemon Dex Number
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
            console.log(bstbar);
            removeItem = bstbar.classList.item(1);
                
            if (removeItem != null) {
                bstbar.classList.remove(removeItem);
            }

            console.log(bsttotal);
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

                    console.log(abilityData.effect_entries[abilityData.effect_entries.length - 1]);
                    
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
                    console.log(curContent);
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

            
        }

    }catch (error) {
        console.error(error.message);
    }

    
}