// crear una versión única cada vez que se recarga la página.
const version = Date.now(); // Toma la fecha y hora actual como versión
document.querySelector('link[rel="stylesheet"]').href += `?v=${version}`;

// Función asincrónica para obtener información de un Pokémon
async function fetchPokemon() {
    // Obtiene el valor del input por su ID y lo convierte a minúsculas para evitar errores con mayúsculas
    const pokemon = document.querySelector(".pokemonSearch__id").value;
    
    // Construye la URL con el nombre o ID del Pokémon
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    
    try {
        // Realiza la petición HTTP a la API usando fetch
        const response = await fetch(url);
        
        // Valida si la respuesta no es correcta (404 o error de API)
        if (!response.ok) throw new Error("Pokémon no encontrado");
        
        // Convierte la respuesta en formato JSON
        const data = await response.json();
        
        // Obtiene la URL de la imagen frontal del Pokémon desde la propiedad sprites
        // Está accediendo a la URL de la imagen frontal normal del Pokémon para mostrarla en la página.
        // {
        //     "name": "pikachu",
        //     "sprites": {
        //       "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
        //       "back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png"
        //     }
        //   }
        const imageUrl = data.sprites.front_default;
        const name = data.name;
        const baseExperience = data.base_experience;        

         // Mostrar nombre
        document.querySelector(".cards__title").textContent = `Name: ${name.toUpperCase()}`;

        // Asigna la imagen al atributo "src" de la etiqueta <img> con el ID "pokemonImage"
        document.querySelector(".cards__image").src = imageUrl;

        document.querySelector(".cards__experience").textContent = `Experience: ${baseExperience}`;

    } catch (error) {
        // Si hay algún error, muestra una alerta con el mensaje del error
        alert(error.message);
        document.querySelector(".cards__title").textContent = ""; // Limpia el nombre si hay error
        document.querySelector(".cards__image").src = ""; // Limpia la imagen si hay error
    }
}

// Evento para presionar Enter
document.querySelector(".pokemonSearch__id").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        fetchPokemon();
    }
});
