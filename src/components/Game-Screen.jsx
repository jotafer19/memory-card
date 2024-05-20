import { useEffect, useState } from "react";
import Card from "./Card";
import GameOverDisplay from "./Game-Over";
import "../styles/Game-Screen.css";

export default function GameScreen({
  pokemonData,
  handlePlayAgain,
  handleGoHome,
  score,
  highScore,
  isGameOver,
  isFlipped,
  onClick,
}) {
  const [showCards, setShowCards] = useState([]);

  const cardsClicked = pokemonData.filter((pokemon) => pokemon.isClicked);

  useEffect(() => {
    if (isGameOver) return;
    setShowCards(handleShowCards());
  }, [pokemonData]);

  function handleShowCards() {
    const selectedCards = [];
    const availableCards = pokemonData.filter(
      (pokemonCard) => !pokemonCard.isClicked,
    );

    while (selectedCards.length < 5) {
      const randomCard =
        pokemonData[Math.floor(Math.random() * pokemonData.length)];
      if (
        !selectedCards.some((pokemonCard) => pokemonCard.id === randomCard.id)
      ) {
        selectedCards.push(randomCard);
      }
    }

    if (
      selectedCards.every((selectedCard) => selectedCard.isClicked) &&
      availableCards.length > 0
    ) {
      const randomIndex = Math.floor(Math.random() * selectedCards.length);
      selectedCards[randomIndex] =
        availableCards[Math.floor(Math.random() * availableCards.length)];
    }

    return selectedCards;
  }

  return (
    <div className="game screen">
      <header className="header">
        <div className="logo-container" onClick={handleGoHome}>
          MEMORY GAME
        </div>
        <div className="score-container">
            <span className="current-score score">SCORE: {score}</span>
            <span className="high-score score">HIGH SCORE: {highScore}</span>
          </div>
      </header>
      <div className="game-container">
          <div className="progress-data">
            {cardsClicked.length + " / " + pokemonData.length}
          </div>
        <div className="cards-container">
          {showCards.map((pokemonCard) => (
            <Card
              key={pokemonCard.id}
              pokemon={pokemonCard}
              isFlipped={isFlipped}
              onClick={onClick}
            />
          ))}
      </div>
      </div>
      {isGameOver && (
        <GameOverDisplay
          pokemonData={pokemonData}
          score={score}
          highScore={highScore}
          handlePlayAgain={handlePlayAgain}
          handleGoHome={handleGoHome}
        />
      )}
    </div>
  );
}
