import "../styles/Home-Screen.css";

export default function HomeScreen({ handleDifficultyMode, handleLoading }) {
  function handleButtonClick(event) {
    handleDifficultyMode(event);
    handleLoading(true);
  }
  return (
    <div className="home screen">
      <h1 className="title">Memory Game</h1>
      <div className="difficulty-selector">
        <button data-mode="easy" onClick={handleButtonClick}>
          Easy
        </button>
        <button data-mode="medium" onClick={handleButtonClick}>
          Medium
        </button>
        <button data-mode="hard" onClick={handleButtonClick}>
          Hard
        </button>
        <button data-mode="endless" onClick={handleButtonClick}>
          Endless
        </button>
      </div>
    </div>
  );
}
