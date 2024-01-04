
const createModal = (id, array) => {
  const modalContainer = document.createElement("div");
  const modalContainerBox = document.createElement("div");
  const modalImg = document.createElement("img");
  const modalPokemonName = document.createElement("h2");
  const modalButton = document.createElement("img");
  const pokemonTypes=document.createElement("ol")
  const pokemonStatus=document.createElement("ol")

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

  pokemonFound.status.map((state)=>{
    const pokemonState=document.createElement("li")
    pokemonState.innerText = state
    pokemonStatus.append(pokemonState)
    pokemonState.classList.add("pokemonState")

  })

  modalContainer.classList.add("modal__container");
  modalContainer.classList.add(pokemonFound.type);
  modalContainerBox.classList.add("modal__box");
  modalButton.classList.add("close");
  pokemonTypes.classList.add("pokemonTypesModal")
  modalPokemonName.classList.add("pokemonNameModal")
  boxTypes.classList.add("boxtypes")
  pokemonStatus.classList.add("pokemonStatus")

  modalImg.src = pokemonFound.photo;
  modalPokemonName.innerText = pokemonFound.name;
  modalButton.src=
"../poke2.png"
boxTypes.append(modalPokemonName,pokemonTypes)
  modalContainerBox.append(modalImg,boxTypes,pokemonStatus);

  modalContainer.append(modalContainerBox, modalButton);

  return modalContainer;
};

const closeModal = (modalContent) => {
  const modal = document.querySelector("#modalControler");
  const closeBtn = document.querySelector(".close");


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
