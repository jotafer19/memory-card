import "../styles/Game-Over.css";

export default function GameOverDisplay({
  pokemonData,
  score,
  handlePlayAgain,
  handleGoHome,
}) {
  return (
    <div className="game-over screen">
      <div className="game-over-container">
        <div className="message-container">
          <p>{score === pokemonData.length ? "You win!" : "You lose!"}</p>
          <p>Your score: {score}</p>
        </div>
        <div className="options-container">
          <button className="game-over btn" onClick={handlePlayAgain}>
            Play Again
          </button>
          <button className="game-over btn" onClick={handleGoHome}>
            Main Menu
          </button>
        </div>
      </div>
    </div>
  );
}
