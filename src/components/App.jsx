import "../styles/App.css";
import { useEffect, useState } from "react";
import HomeScreen from "./Home-Screen";
import LoadingScreen from "./Loading-Screen";
import GameScreen from "./Game-Screen";

function App() {
  const [pokemonData, setPokemonData] = useState(null);
  const [gameStatus, setGameStatus] = useState("home");
  const [isLoading, setIsLoading] = useState(false);
  const [difficultyMode, setDifficultyMode] = useState(null);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [highScore, setHighScore] = useState(JSON.parse(localStorage.getItem("highScore")) || 0);

  useEffect(() => {
    localStorage.setItem("highScore", JSON.stringify(highScore))
  }, [highScore])

  function handleGoalScore() {
    if (difficultyMode === "endless") {
      return pokemonData ? pokemonData.length + 2 : 5;
    } else {
      return difficultyMode === "easy"
        ? 5
        : difficultyMode === "medium"
          ? 7
          : 10;
    }
  }

  function handleDifficultyMode(event) {
    setDifficultyMode(event.target.dataset.mode);
  }

  function handleLoading(status) {
    setIsLoading(status);
  }

  function handlePokemonData(data) {
    setPokemonData(data);
  }

  function handleGameStatus(status) {
    setGameStatus(status);
  }

  function updateCardStatus(pokemonClicked) {
    const updateData = [...pokemonData];
    const cardIndex = updateData.findIndex(
      (pokemon) => pokemon.id === pokemonClicked.id,
    );
    updateData[cardIndex].isClicked = true;
    setPokemonData(updateData);
  }

  function handleIncrementScore() {
    const updateScore = score + 1;
    const updateHighScore = Math.max(updateScore, highScore)
    setScore(updateScore);
    setHighScore(updateHighScore)
  }

  function handleCardClick(event) {
    const card = event.target.closest(".card");
    const cardID = Number(card.dataset.id);
    const pokemonClicked = pokemonData.filter(
      (pokemon) => pokemon.id === cardID
    )[0];

    if (pokemonClicked.isClicked) {
      setIsGameOver(true);
    } else {
      updateCardStatus(pokemonClicked);
      handleIncrementScore();
      if (pokemonData.every((pokemonCard) => pokemonCard.isClicked)) {
        if (difficultyMode === "endless") {
          setIsLoading(true);
        } else {
          setIsGameOver(true);
        }
      }
    }
  }

  function handlePlayAgain() {
    setIsGameOver(false);
    setIsLoading(true);
    setScore(0);
  }

  function handleGoHome() {
    setIsGameOver(false);
    setGameStatus("home");
    setScore(0);
    setPokemonData(null);
  }

  return (
    <>
      {isLoading ? (
        <LoadingScreen
          goalScore={handleGoalScore}
          handlePokemonData={handlePokemonData}
          handleGameStatus={handleGameStatus}
          handleLoading={handleLoading}
        />
      ) : gameStatus === "home" ? (
        <HomeScreen
          handleDifficultyMode={handleDifficultyMode}
          handleLoading={handleLoading}
        />
      ) : gameStatus === "game" ? (
        <GameScreen
          pokemonData={pokemonData}
          handleLoading={handleLoading}
          handleCardClick={handleCardClick}
          handlePlayAgain={handlePlayAgain}
          handleGoHome={handleGoHome}
          difficultyMode={difficultyMode}
          score={score}
          highScore={highScore}
          isGameOver={isGameOver}
        />
      ) : null}
    </>
  );
}

export default App;
