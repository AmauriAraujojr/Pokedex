import { getPokemons } from "./requisitions.js";
import { openModal } from "./modal.js";

const createPokemon = (pokemon) => {
  const pokemonCard = document.createElement("li");
  const pokemonNumber = document.createElement("span");
  const pokemonName = document.createElement("span");
  const pokemonContainer = document.createElement("div");
  const pokemonTypes = document.createElement("ol");
  const pokemonImg = document.createElement("img");
  const pokemonTitleContainer = document.createElement("div");
  const pokeballImg = document.createElement("img");

  pokemon.types.map((type) => {
    const pokemonTypeOne = document.createElement("li");
    pokemonTypeOne.innerText = type;
    pokemonTypes.append(pokemonTypeOne);
    pokemonTypeOne.className = `pokemonTypes ${type}`;
  });

  pokemonName.innerText = `${pokemon.name}`;
  pokemonNumber.innerText = `#${pokemon.number}`;
  pokemonImg.src = pokemon.photo;
  pokeballImg.src =
  "../poke1.png"

  pokemonCard.className = `pokemon ${pokemon.type}`;

  pokemonNumber.className = "pokemonNumber";
  pokemonName.className = "pokemonName";
  pokemonContainer.className = "pokemonDetail";
  pokemonTypes.className = "pokemonTypes";
  pokemonImg.className = "pokemonImg";
  pokeballImg.className = "pokeballImg";
  pokeballImg.dataset.cardId = pokemon.number;
  pokemonTitleContainer.className = "pokemonTitleContainer";

  pokemonTitleContainer.append(pokemonName, pokemonNumber, pokeballImg);
  pokemonContainer.append(pokemonTypes, pokemonImg);
  pokemonCard.append(pokemonTitleContainer, pokemonContainer);

  return pokemonCard;
};

export const renderPokemon = async (limit, offset) => {
  const ol = document.querySelector("#pokemonList");
  ol.innerHTML = "";
  const response = await getPokemons(limit, offset);

  const listPokemon = response;
  console.log(listPokemon);

  listPokemon.map((pokemon) => {
    const pokemonLi = createPokemon(pokemon);
    ol.appendChild(pokemonLi);
  });
  openModal(listPokemon);
};

const loadMorePokemon = () => {
  const loadButton = document.querySelector("#loadMoreButton");

  let limit = 3;
  let offset = 0;
  loadButton.addEventListener("click", () => {
    limit += 3;
    renderPokemon(limit, offset);
  });
};

loadMorePokemon();

const darkMode = () => {
  const buttonDark = document.querySelector(".darkMode");
  const backGround = document.querySelector(".content");
  const icon = document.querySelector(".icon");

  buttonDark.addEventListener("click", () => {
    backGround.classList.toggle("contentDark");
    buttonDark.classList.toggle("ligthMode");
    if (buttonDark.className != "darkMode") {
      icon.src =
        "https://static-00.iconduck.com/assets.00/mode-light-icon-2048x2048-no286vfd.png";
    } else {
      icon.src = "https://static.thenounproject.com/png/4498020-200.png";
    }
  });
};

darkMode();
