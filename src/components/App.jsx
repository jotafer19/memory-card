import "../styles/App.css";
import fetchPokemon from "../fetch";
import { useEffect, useState } from "react";
import Card from "./Card";
import CardsContainer from "./Cards-Container";
import shuffle from "../shuffle-cards"

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonClicked, setPokemonClicked] = useState([]);
  const [displayedCards, setDisplayedCards] = useState([])
  const [score, setScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  
  function handleDisplayedCards() {
    shuffle(pokemonList)
    const availableCards = pokemonList.filter(pokemon => !pokemonClicked.includes(pokemon.id));
    const selectedCards = [];
    while (selectedCards.length < 5) {
      const randomCard = pokemonList[Math.floor(Math.random() * pokemonList.length)];
      if (!selectedCards.includes(randomCard)) {
        selectedCards.push(randomCard);
      }
    }
    if (!selectedCards.some(pokemon => availableCards.includes(pokemon))) {
      const randomIndex = Math.floor(Math.random() * selectedCards.length)
      selectedCards[randomIndex] = availableCards[Math.floor(Math.random() * availableCards.length)]
    }

    return selectedCards;
  }

  function handleCardClick(event) {
    const cardID = Number(event.target.closest(".card").dataset.id);
    if (!isGameOver) {
      if (pokemonClicked.filter(id => id === cardID).length > 0) {
        console.log("Already clicked")
        setIsGameOver(!isGameOver)
      } else {
        setPokemonClicked([ ...pokemonClicked, cardID ]);
        setDisplayedCards(handleDisplayedCards())
        setScore(lastScore => lastScore + 1);
      }
    }
  }
  
  useEffect(() => {
    async function getPokemon() {
      try {
        const pokemonData = await fetchPokemon();
        setPokemonList(pokemonData);
        setDisplayedCards(pokemonData.slice(0, 5))
      } catch (error) {
        console.error('Error fetching:', error)
      }
    }
    getPokemon()
    
  }, [])
 
  return (
    <CardsContainer>
      {score}
      {displayedCards.map(pokemon => <Card pokemon={pokemon} key={pokemon.id} onClick={handleCardClick} />)}
    </CardsContainer>
  )
}

export default App;
