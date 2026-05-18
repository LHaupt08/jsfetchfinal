"use strict";

window.addEventListener('load', getTypes)
var pokeType = [];
var pokeTypeImg = [];
async function getTypes() {
    for (var t=1;t<20; t++){
        const typesUrl = `https://pokeapi.co/api/v2/type/${t}`;

            try {
                const response = await fetch(typesUrl, {
                    method: "GET"
            });
            if (!response.ok) {
            throw new Error(`response status: ${response.status}`);
            }
                const typesData = await response.json();

                var typeName = typesData.name;
                pokeType[t]=typeName;

                pokeTypeImg[t]=typesData["sprites"]["generation-ix"]["scarlet-violet"]["symbol_icon"];

            }catch (error) {
                console.error(error.message);
                window.alert(error.message);
            }
    }
}