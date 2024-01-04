
const createModal = (id, array) => {
  const modalContainer = document.createElement("div");
  const modalContainerBox = document.createElement("div");
  const modalImg = document.createElement("img");
  const modalPokemonName = document.createElement("h2");
  const modalButton = document.createElement("button");
  const pokemonTypes=document.createElement("ol")
  const boxTypes=document.createElement("div")
  
  const pokemonFound = array.find((pokemon) => {
    return pokemon.number === Number(id);
  });

  pokemonFound.types.map((type) => {
    const pokemonTypeOne = document.createElement("li");
    pokemonTypeOne.innerText = type;
    pokemonTypes.append(pokemonTypeOne);
    pokemonTypeOne.className = `pokemonTypes ${type}`;
  });

  modalContainer.classList.add("modal__container");
  modalContainer.classList.add(pokemonFound.type);
  modalContainerBox.classList.add("modal__box");
  modalButton.classList.add("close");
  pokemonTypes.classList.add("pokemonTypes")
  modalPokemonName.classList.add("pokemonName")
  boxTypes.classList.add("boxtypes")

  modalImg.src = pokemonFound.photo;
  modalPokemonName.innerText = pokemonFound.name;
  modalButton.innerText = "X";

  boxTypes.append(modalPokemonName,pokemonTypes)
  modalContainerBox.append(modalImg,boxTypes);

  modalContainer.append(modalContainerBox, modalButton);

  return modalContainer;
};

const closeModal = (modalContent) => {
  const modal = document.querySelector("#modalControler");
  const closeBtn = document.querySelector(".close");

  console.log(modalContent);

  closeBtn.addEventListener("click", () => {
    modal.close();
    
  });
};
export const openModal = (array) => {
  const modal = document.querySelector("#modalControler");
  const btnShow = document.querySelectorAll(".pokeballImg");

  btnShow.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modalContent = createModal(btn.dataset.cardId, array);
      modal.innerHTML = "";
      modal.appendChild(modalContent);
      modal.showModal();
      closeModal(btn.dataset.cardId);
    });
  });
};
