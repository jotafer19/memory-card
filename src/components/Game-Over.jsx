import "../styles/Game-Over.css";

export default function GameOverDisplay({
  pokemonData,
  score,
  highScore,
  handlePlayAgain,
  handleGoHome,
}) {
  const isWin = score === pokemonData.length;

  return (
    <div className="game-over screen">
      <div className="game-over-container">
        <div className="message-container">
          <h2 className="message-status">{isWin ? "You win!" : "You lose!"}</h2>
          <h3 className="message-score">Score: {score}</h3>
          <h3 className="message-high-score">High Score: {highScore}</h3>
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
