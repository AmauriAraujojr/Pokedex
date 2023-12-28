import { getPokemons } from "./requisitions.js";

const createPokemon = (pokemon) => {
  const pokemonCard = document.createElement("li");
  const pokemonNumber = document.createElement("span");
  const pokemonName = document.createElement("span");
  const pokemonContainer = document.createElement("div");
  const pokemonTypes = document.createElement("ol");
  const pokemonImg = document.createElement("img");

  pokemon.types.map((type) => {
    const pokemonTypeOne = document.createElement("li");
    pokemonTypeOne.innerText = type;
    pokemonTypes.append(pokemonTypeOne);
    pokemonTypeOne.className = `pokemonTypes ${type}`;
  });

  pokemonName.innerText = `${pokemon.name}`;
  pokemonNumber.innerText = `#${pokemon.number}`;
  pokemonImg.src = pokemon.photo;

  pokemonCard.className = `pokemon ${pokemon.type}`;

  pokemonNumber.className = "pokemonNumber";
  pokemonName.className = "pokemonName";
  pokemonContainer.className = "pokemonDetail";
  pokemonTypes.className = "pokemonTypes";
  pokemonImg.className = "pokemonImg";

  pokemonContainer.append(pokemonTypes, pokemonImg);
  pokemonCard.append(pokemonNumber, pokemonName, pokemonContainer);

  return pokemonCard;
};

export const renderPokemon = async (limit,offset) => {
  const ol = document.querySelector("#pokemonList");
  ol.innerHTML = "";
  const response = await getPokemons(limit,offset);

  
  const listPokemon = response;

  listPokemon.map((pokemon) => {
    const pokemonLi = createPokemon(pokemon);
    ol.appendChild(pokemonLi);
  });
};

const loadMorePokemon = () => {
  const loadButton = document.querySelector("#loadMoreButton");

  let limit = 5;
  let offset= 0;
  loadButton.addEventListener("click", () => {

limit+=5
    renderPokemon(limit,offset);
  });
};

loadMorePokemon();
