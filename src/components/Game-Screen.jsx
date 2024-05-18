import { useEffect, useState } from "react";
import Card from "./Card";
import GameOverDisplay from "./Game-Over";
import "../styles/Game-Screen.css";

export default function GameScreen({
  pokemonData,
  handleLoading,
  handleCardClick,
  handlePlayAgain,
  handleGoHome,
  difficultyMode,
  score,
  highScore,
  isGameOver,
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
      <div className="score-container">
        <p>Score: {score} | High Score: {highScore}</p>
        <p>{cardsClicked.length + " / " + pokemonData.length}</p>
      </div>
      <div className="cards-container">
        {showCards.map((pokemonCard) => (
          <Card
            key={pokemonCard.id}
            pokemon={pokemonCard}
            onClick={handleCardClick}
          />
        ))}
      </div>
      {isGameOver && (
        <GameOverDisplay
          pokemonData={pokemonData}
          score={score}
          handlePlayAgain={handlePlayAgain}
          handleGoHome={handleGoHome}
        />
      )}
    </div>
  );
}
