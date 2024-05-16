function EndGame({ winner, score }) {
    return (
        <div className="modal">
            <h2>{winner ? "You win!" : "You lose"}</h2>
            <div className="options">
                <button>Play Again</button>
                <button>Main Menu</button>
            </div>
        </div>
    )
}