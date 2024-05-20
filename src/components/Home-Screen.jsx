import "../styles/Home-Screen.css";

export default function HomeScreen({
  handleDifficultyMode,
  handleLoading,
  highScore,
}) {
  function handleButtonClick(event) {
    handleDifficultyMode(event);
    handleLoading(true);
  }
  return (
    <div className="home screen">
      <div className="home-screen-container">
        <h1 className="title">Memory Game</h1>
        <div className="difficulty-selector">
          <div className="mode-item">
            <button
              className="btn mode-btn easy"
              data-mode="easy"
              onClick={handleButtonClick}
            >
              Easy
            </button>
            <div className="mode-score easy">
              <p>High Score: {highScore.easy}</p>
            </div>
          </div>
          <div className="mode-item">
            <button
              className="btn mode-btn medium"
              data-mode="medium"
              onClick={handleButtonClick}
            >
              Medium
            </button>
            <div className="mode-score medium">
              <p>High Score: {highScore.medium}</p>
            </div>
          </div>
          <div className="mode-item">
            <button
              className="btn mode-btn hard"
              data-mode="hard"
              onClick={handleButtonClick}
            >
              Hard
            </button>
            <div className="mode-score hard">
              <p>High Score: {highScore.hard}</p>
            </div>
          </div>
          <div className="mode-item">
            <button
              className="btn mode-btn endless"
              data-mode="endless"
              onClick={handleButtonClick}
            >
              Endless
            </button>
            <div className="mode-score endless">
              <p>High Score: {highScore.endless}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
