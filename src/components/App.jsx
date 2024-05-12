import "../styles/App.css";
import fetchPokemon from "../fetch";
import { useEffect, useState } from "react";
import Card from "./Card";

function App() {
  const [pokemonList, setPokemonList] = useState([]);

  const pokemon = {
    name: "Passimian",
    imageURL: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/766.png",
    id: 766,
  }

  useEffect(() => {
    async function getPokemon() {
      try {
        const pokemonData = await fetchPokemon();
        setPokemonList(pokemonData);
      } catch (error) {
        console.error('Error fetching:', error)
      }
    }
    getPokemon()
    console.log(pokemonList)
  }, [])

  return (
    <div>
    {pokemonList.map(pokemon => <Card pokemon={pokemon} key={pokemon.id} />)}
    </div>
  )
}

export default App;
