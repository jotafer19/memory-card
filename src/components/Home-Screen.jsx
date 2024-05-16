import '../styles/Home-Screen.css'

export default function HomeScreen({ handleGameStart }) {
    return (
        <div className="home screen">
            <h1 className="title">Memory Game</h1>
            <div className="difficulty-selector">
                <button value="easy" onClick={handleGameStart}>Easy</button>
                <button value="medium" onClick={handleGameStart}>Medium</button>
                <button value="hard" onClick={handleGameStart}>Hard</button>
            </div>
        </div>
    )
}