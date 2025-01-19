const searchButton = document.getElementById("search-button");
const pokemonInput = document.getElementById("search-input");
const pokeDisplay = document.getElementById("pokemon-display");
const statsContainer = document.getElementsByClassName("stats-display");

async function getPokemonData(pokemon) {
    const url = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemon}`;

    try {
        const response = await fetch(url);

        if(!response.ok) {
            throw new Error("Pokemon not found");
        }

        const data = await response.json();
        console.log(data);
        return data;

    } catch(error) {
        console.error('Error fetching Pokemon data:', error);
    }
}


const cleanInput = (input) => {
    input = input.trim().toLowerCase(); 
    input = input.replace(/♀/g, '-f').replace(/♂/g, '-m'); 
    input = input.replace(/[^a-z0-9-]/g, ""); 
    input = input.replace(/\s+/g, '-'); 
    return input;
};

const updateStatsDisplay = (data) => {
    if(!data){
        alert("Pokemon not found");
        return;
    }

    const mappings = {
        "pokemon-name": `Name: ${data.name || "Unknown"}`,
        "pokemon-id": `ID: ${data.id || "Unknown"}`,
        "weight": `Weight: ${(data.weight ? data.weight / 10 : 0).toFixed(1)} kg`,
        "height": `Height: ${(data.height ? data.height / 10 : 0).toFixed(1)} m`,
        "types": `Types: ${
            data.types
                ? data.types.map((type) => type.type.name).join(", ")
                : "Unknown"
        }`,
        "hp": `HP: ${
            data.stats
                ? data.stats.find((stat) => stat.stat.name === "hp")?.base_stat || "Unknown"
                : "Unknown"
        }`,
        "attack": `Attack: ${
            data.stats
                ? data.stats.find((stat) => stat.stat.name === "attack")?.base_stat || "Unknown"
                : "Unknown"
        }`,
        "defense": `Defense: ${
            data.stats
                ? data.stats.find((stat) => stat.stat.name === "defense")?.base_stat || "Unknown"
                : "Unknown"
        }`,
        "special-attack": `Special Attack: ${
            data.stats
                ? data.stats.find((stat) => stat.stat.name === "special-attack")?.base_stat || "Unknown"
                : "Unknown"
        }`,
        "special-defense": `Special Defense: ${
            data.stats
                ? data.stats.find((stat) => stat.stat.name === "special-defense")?.base_stat || "Unknown"
                : "Unknown"
        }`,
        "speed": `Speed: ${
            data.stats
                ? data.stats.find((stat) => stat.stat.name === "speed")?.base_stat || "Unknown"
                : "Unknown"
        }`,
    }

    Object.keys(mappings).forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = mappings[id]; 
        } else {
            console.warn(`No element found with id: ${id}`); 
        }
    });

    if(data.sprites && data.sprites.front_default){
        pokeDisplay.innerHTML = `<img src= "${data.sprites.front_default}" alt="${data.name}">`;
    } else {
        pokeDisplay.innerHTML = `<p>No image available</p>`
    }
}

searchButton.addEventListener("click", async ()=>{
    console.log(getPokemonData)
    const pokemon = cleanInput(pokemonInput.value);
    const pokemonData = await getPokemonData(pokemon);
    console.log(pokemonData);
    updateStatsDisplay(pokemonData);
})

document.addEventListener("keydown", async (event) => {
    if(event.key === "Enter"){
        const pokemon = cleanInput(pokemonInput.value);
        const pokemonData = await getPokemonData(pokemon);
        updateStatsDisplay(pokemonData);
    }
})