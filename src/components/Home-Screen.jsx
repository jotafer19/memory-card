import "../styles/Home-Screen.css";

export default function HomeScreen({ handleDifficultyMode, handleLoading }) {
  function handleButtonClick(event) {
    handleDifficultyMode(event);
    handleLoading(true);
  }
  return (
    <div className="home screen">
      <div className="home-screen-container">
        <h1 className="title">Memory Game</h1>
        <div className="difficulty-selector">
          <button className="btn mode-btn easy" data-mode="easy" onClick={handleButtonClick}>
            Easy
          </button>
          <button className="btn mode-btn medium" data-mode="medium" onClick={handleButtonClick}>
            Medium
          </button>
          <button className="btn mode-btn hard" data-mode="hard" onClick={handleButtonClick}>
            Hard
          </button>
          <button className="btn mode-btn endless" data-mode="endless" onClick={handleButtonClick}>
            Endless
          </button>
        </div>
      </div>
    </div>
  );
}
