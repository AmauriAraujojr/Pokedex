const convertPokeApiDetailToPokemon = (pokeDetail) => {
  const pokemon = {};
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  const abilities = pokeDetail.moves.map((typeMoves) => typeMoves.move.name);
  pokemon.abilities = abilities;

  const status = pokeDetail.stats.map(
    (typeStats) => `${typeStats.stat.name}: ${typeStats.base_stat}`
  );

  pokemon.status = status;

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon;
};

export const getPokemons = (limit, offset) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  const requestHeaders = {
    "Content-Type": "application/json",
  };
  const pokemons = fetch(`${url}`, {
    headers: requestHeaders,
  })
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) =>
      pokemons.map((pokemon) =>
        fetch(pokemon.url, { headers: requestHeaders })
          .then((response) => response.json())
          .then((pokeDetail) => convertPokeApiDetailToPokemon(pokeDetail))
      )
    )
    .then((pokeRequest) => Promise.all(pokeRequest))
    .then((pokemonsRequest) => pokemonsRequest);

  return pokemons;
};
