import "../styles/Home-Screen.css";

export default function HomeScreen({ handleGameStart }) {
  return (
    <div className="home screen">
      <h1 className="title">Memory Game</h1>
      <div className="difficulty-selector">
        <button data-mode="easy" onClick={handleGameStart}>
          Easy
        </button>
        <button data-mode="medium" onClick={handleGameStart}>
          Medium
        </button>
        <button data-mode="hard" onClick={handleGameStart}>
          Hard
        </button>
      </div>
    </div>
  );
}
