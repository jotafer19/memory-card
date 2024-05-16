import "../styles/App.css";
import fetchPokemon from "../fetch";
import { useEffect, useState } from "react";
import HomeScreen from "./Home-Screen";
import LoadingScreen from "./Loading-Screen";
import GameScreen from "./Game-Screen";

function App() {
  const [pokemonData, setPokemonData] = useState(null);
  const [gameStatus, setGameStatus] = useState("home")
  const [isLoading, setIsLoading] = useState(false);
  const [goalScore, setGoalScore] = useState(null);

  async function handleGameStart(event) {
    const difficultyMode = event.target.value;
    const pokemonNumber = difficultyMode === "easy" ? 5 : difficultyMode === "medium" ? 7 : 10;
    
    setIsLoading(true);
    setGoalScore(pokemonNumber)

    try {
      const data = await fetchPokemon(pokemonNumber);
      setPokemonData(data);
      await sleep(4000)
    } catch(error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function sleep(timeInMS) {
    return new Promise(resolve => setTimeout(resolve, timeInMS));
  }

  return (
    <>
    {isLoading ? (
      <LoadingScreen />
    ) : gameStatus === "home" ? (
      <HomeScreen handleGameStart={(event) => {
        handleGameStart(event);
        setGameStatus("game");
      }} />
    ) : gameStatus === "game" ? (
      <GameScreen pokemonData={pokemonData} goalScore={goalScore} />
    ) : null}
    </>
  )
}

export default App;
