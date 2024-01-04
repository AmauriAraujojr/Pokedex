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
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/57541cc3-da0f-40dc-94ec-49b954d5805a/d93bs8z-cc196bbd-da41-4167-9fec-798ae39fa542.png/v1/fill/w_894,h_894/pokeball_logo_by_pedronex_d93bs8z-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAwMCIsInBhdGgiOiJcL2ZcLzU3NTQxY2MzLWRhMGYtNDBkYy05NGVjLTQ5Yjk1NGQ1ODA1YVwvZDkzYnM4ei1jYzE5NmJiZC1kYTQxLTQxNjctOWZlYy03OThhZTM5ZmE1NDIucG5nIiwid2lkdGgiOiI8PTEwMDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.X38yrINPG4Dj5tIRHsUm5tGhxdvm77QMyBeOREfr6CY";

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
