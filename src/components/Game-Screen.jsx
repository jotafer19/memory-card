import { useState } from "react"
import Card from "./Card";
import '../styles/Game-Screen.css'

export default function GameScreen({ pokemonData, goalScore }) {
    const [showCards, setShowCards] = useState(pokemonData.slice(0, 5));
    const [clickedCards, setClickedCards] = useState([]);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false)

    function handleShowCards() {
        const selectedCards = [];
        const availableCards = pokemonData.filter(card => !clickedCards.includes(card.id));

        while (selectedCards.length < 5) {
            const randomCard = pokemonData[Math.floor(Math.random() * pokemonData.length)];
            if (!selectedCards.some(pokemonCard => pokemonCard.id === randomCard.id)) {
                selectedCards.push(randomCard);
            }
        }

        if (!selectedCards.some(selectedCard => availableCards.some(availableCard => availableCard.id === selectedCard.id))) {
            console.log("hey")
            const randomIndex = Math.floor(Math.random() * selectedCards.length);
            selectedCards[randomIndex] = availableCards[Math.floor(Math.random() * availableCards.length)];
        }
        
        setShowCards(selectedCards);
    }
    
    function handleGameOver(event) {
        const cardID = Number(event.target.closest(".card").dataset.id);

        if (clickedCards.includes(cardID)) {
            setIsGameOver(true);
        } else {
            setClickedCards([ ...clickedCards, cardID ])
            setScore(prevScore => {
                const updateScore = prevScore + 1;
                if (updateScore === goalScore) {
                    setIsGameOver(true)
                }

                return updateScore;
            });
        }
    }

    console.log(clickedCards)
    return (
        <div className="game screen">
            <div className="score-container">
                {score + " / " + goalScore}
            </div>
            <div className="cards-container">
                {showCards.map(pokemonCard => <Card key={pokemonCard.id} pokemon={pokemonCard} onClick={(event) => {
                    handleShowCards()
                    handleGameOver(event)
                }} />)}
            </div>
        </div>
    )
}