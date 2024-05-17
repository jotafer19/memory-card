import "../styles/App.css";
import fetchPokemon from "../fetch";
import { useEffect, useState } from "react";
import HomeScreen from "./Home-Screen";
import LoadingScreen from "./Loading-Screen";
import GameScreen from "./Game-Screen";

function App() {
  const [pokemonData, setPokemonData] = useState(null);
  const [gameStatus, setGameStatus] = useState("home");
  const [isLoading, setIsLoading] = useState(false);
  const [difficultyMode, setDifficultyMode] = useState(null);

  function handleGameStart(event) {
    const mode = event.target.dataset.mode;
    setDifficultyMode(mode)
    handleGameSetUp(mode)
  }

  async function handleGameSetUp(mode) {
    const goalScore = mode === "easy" ? 5 : mode === "medium" ? 7 : 10;
    
    setIsLoading(true);

    try {
      const data = await fetchPokemon(goalScore);
      setPokemonData(data);
      await sleep(4000);
    } catch (error) {
      console.error("Failed to fetch Pokémon data:", error);
    } finally {
      setIsLoading(false);
      setGameStatus("game")
    }
  }

  function sleep(timeInMS) {
    return new Promise((resolve) => setTimeout(resolve, timeInMS));
  }

  function handleGoHome() {
    setGameStatus("home")
  }
  
  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : gameStatus === "home" ? (
        <HomeScreen
          handleGameStart={handleGameStart}
        />
      ) : gameStatus === "game" ? (
        <GameScreen pokemonData={pokemonData} playAgain={() => handleGameSetUp(difficultyMode)} handleGoHome={handleGoHome} />
      ) : null}
    </>
  );
}

export default App;
