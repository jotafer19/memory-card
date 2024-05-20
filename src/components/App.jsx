import "../styles/App.css";
import { useEffect, useState } from "react";
import HomeScreen from "./Home-Screen";
import LoadingScreen from "./Loading-Screen";
import GameScreen from "./Game-Screen";

function App() {
  const allScores = {
    easy: 0,
    medium: 0,
    hard: 0,
    endless: 0,
  };

  const [pokemonData, setPokemonData] = useState(null);
  const [gameStatus, setGameStatus] = useState("home");
  const [isLoading, setIsLoading] = useState(false);
  const [difficultyMode, setDifficultyMode] = useState(null);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [highScore, setHighScore] = useState(
    JSON.parse(localStorage.getItem("highScore")) || allScores,
  );
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    localStorage.setItem("highScore", JSON.stringify(highScore));
  }, [highScore]);

  useEffect(() => {
    checkGameOver(pokemonData);
  }, [pokemonData]);

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
    setPokemonData((prevData) =>
      prevData.map((pokemon) =>
        pokemon.id === pokemonClicked.id
          ? { ...pokemon, isClicked: true }
          : pokemon,
      ),
    );
  }

  function handleIncrementScore() {
    const updateScore = score + 1;
    const updateHighScore = Math.max(updateScore, highScore[difficultyMode]);
    setScore(updateScore);
    setHighScore((prevHighScore) => ({
      ...prevHighScore,
      [difficultyMode]: updateHighScore,
    }));
  }

  function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  function checkGameOver(pokemonData) {
    if (
      pokemonData &&
      pokemonData.every((pokemonCard) => pokemonCard.isClicked)
    ) {
      if (difficultyMode === "endless") {
        setTimeout(() => setIsLoading(true), 600);
      } else {
        setIsGameOver(true);
      }
    } else {
      setTimeout(() => setIsFlipped(false), 600);
    }
  }

  async function handleCardClick(event) {
    setIsFlipped(true);
    await sleep(600);
    const card = event.target.closest(".card-front");
    const cardID = Number(card.dataset.id);
    const pokemonClicked = pokemonData.filter(
      (pokemon) => pokemon.id === cardID,
    )[0];

    if (pokemonClicked.isClicked) {
      setIsGameOver(true);
    } else {
      updateCardStatus(pokemonClicked);
      handleIncrementScore();
    }
  }

  function handlePlayAgain() {
    setIsGameOver(false);
    setIsLoading(true);
    setScore(0);
    setIsFlipped(false);
    setPokemonData(null);
  }

  function handleGoHome() {
    setIsGameOver(false);
    setGameStatus("home");
    setScore(0);
    setPokemonData(null);
    setIsFlipped(false);
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
          highScore={highScore}
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
          highScore={highScore[difficultyMode]}
          isGameOver={isGameOver}
          isFlipped={isFlipped}
          onClick={handleCardClick}
        />
      ) : null}
    </>
  );
}

export default App;
