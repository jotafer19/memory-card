export default async function fetchPokemon(goalScore) {
  const allIDs = [];
  const allPokemon = [];

  for (let i = 0; i < goalScore; i++) {
    let currentID = Math.floor(Math.random() * 1025) + 1;

    while (allIDs.filter((id) => id === currentID).length > 0) {
      currentID = Math.floor(Math.random() * 1025) + 1;
    }

    allIDs.push(currentID);
  }

  const responses = await Promise.all(
    allIDs.map((id) => fetch("https://pokeapi.co/api/v2/pokemon/" + id)),
  );
  const data = await Promise.all(responses.map((response) => response.json()));

  data.forEach((pokemon) => {
    allPokemon.push({
      name: pokemon.name,
      id: pokemon.id,
      imageURL: pokemon.sprites.front_default,
      isClicked: false,
    });
  });

  return allPokemon;
}
