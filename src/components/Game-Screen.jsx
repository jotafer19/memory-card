import { useState } from "react";
import Card from "./Card";
import GameOverDisplay from "./Game-Over";
import "../styles/Game-Screen.css";

export default function GameScreen({ pokemonData, playAgain, handleGoHome }) {
  const [showCards, setShowCards] = useState(pokemonData.slice(0, 5));
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

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
      selectedCards.every(selectedCard => selectedCard.isClicked) && availableCards.length > 0
    ) {
      const randomIndex = Math.floor(Math.random() * selectedCards.length);
      selectedCards[randomIndex] =
        availableCards[Math.floor(Math.random() * availableCards.length)];
    }

    setShowCards(selectedCards);
  }

  function handleGameOver(card) {
    if (card.isClicked) {
      setIsGameOver(true);
    } else {
      card.isClicked = true;
      setScore((prevScore) => {
        const updatedScore = prevScore + 1;
        if (updatedScore === pokemonData.length) {
          setIsGameOver(true)
        }

        return updatedScore;
      }) 
    }
  }

  return (
    <div className="game screen">
      <div className="score-container">
        <p>Score: {score} | High Score:</p>
        <p>{score + " / " + pokemonData.length}</p>
        </div>
      <div className="cards-container">
        {showCards.map((pokemonCard) => (
          <Card
            key={pokemonCard.id}
            pokemon={pokemonCard}
            onClick={() => {
              if (isGameOver) return;
              handleGameOver(pokemonCard)
              handleShowCards();
            }}
          />
        ))}
      </div>
      {isGameOver && <GameOverDisplay pokemonData={pokemonData} score={score} playAgain={playAgain} handleGoHome={handleGoHome} />}
    </div>
  );
}
