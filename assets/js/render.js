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
  pokeballImg.src = "../poke1.png";

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
  // console.log(listPokemon)
  findPokemon(listPokemon);

  listPokemon.map((pokemon) => {
    const pokemonLi = createPokemon(pokemon);
    ol.appendChild(pokemonLi);
  });
  openModal(listPokemon);
};

const findPokemon = (array) => {
  const ol = document.querySelector("#pokemonList");
  ol.innerHTML = "";

  const input = document.querySelector(".findPokemonInput");
  const button = document.querySelector(".sarch");

  button.addEventListener("click", () => {
    const pokemonEncounter = array.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(input.value.toLowerCase());
    });
    console.log(pokemonEncounter);
    const limit = pokemonEncounter.length;
    const offset = pokemonEncounter[0].number - 1;
    renderPokemon(limit, offset);
  });
};

const filteredPokemons = () => {
  const regions = [
    "Kanto",
    "Johto",
    "Hoenn",
    "Sinnoh",
    "Unova",
    "Kalos",
    "Aiola",
    "Galar",
    "Paldea",
  ];

  const box = document.querySelector(".navBar");

  const select = document.createElement("select");
  const option = document.createElement("option");
  option.classList.add("option");
  option.innerText = "Find for region";

  select.appendChild(option);

  regions.map((region) => {
    const options = document.createElement("option");
    options.innerText = region;
    options.classList.add("options");

    if (options.innerText == "Kanto") {
      options.value = 0;
    }
    if (options.innerText == "Johto") {
      options.value = 151;
    }
    if (options.innerText == "Hoenn") {
      options.value = 251;
    }
    if (options.innerText == "Sinnoh") {
      options.value = 386;
    }

    if (options.innerText == "Unova") {
      options.value = 494;
    }
    if (options.innerText == "Kalos") {
      options.value = 649;
    }

    if (options.innerText == "Aiola") {
      options.value = 721;
    }
    if (options.innerText == "Galar") {
      options.value = 809;
    }
    if (options.innerText == "Paldea") {
      options.value = 905;
    }

    select.append(options);
  });
  select.addEventListener("change", () => {
    const limit = 9;
    renderPokemon(limit, select.value);
  });

  box.append(select);
};
filteredPokemons();

const loadMorePokemon = () => {
  const loadButton = document.querySelector("#loadMoreButton");

  const select = document.querySelector("select");

  let limit = 9;
  loadButton.addEventListener("click", () => {
    limit += 3;
    renderPokemon(limit, select.value);
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

const refresh = () => {
  const button = document.querySelector(".refresh");

  button.addEventListener("click", () => {
    window.location.reload();
  });
};
refresh();
