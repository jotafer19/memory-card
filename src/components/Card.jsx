import "../styles/Card.css";
import cardBack from "../assets/images/card-back.png";

export default function Card({ pokemon, isFlipped, onClick }) {
  return (
      <div className={`card ${isFlipped ? "flipped" : ""}`}>
        <div className="card-inner">
          <div className="card-front" data-id={pokemon.id} onClick={onClick}>
            <div className="card-image">
              <img
                src={pokemon.imageURL}
                alt={editName(pokemon.name) + " " + "sprite"}
                draggable={false}
              />
            </div>
            <div className="card-title">{editName(pokemon.name)}</div>
          </div>
          <div className="card-back">
            <img src={cardBack} alt="Card back" className="card-back-image" draggable={false} />
          </div>
        </div>
      </div>
  );
}

function editName(name) {
  if (name.includes("-")) {
    let splitName = name.split("-");
    splitName = splitName.map(
      (element) => element.charAt(0).toUpperCase() + element.slice(1),
    );
    return splitName.join(" ");
  }
  return name.charAt(0).toUpperCase() + name.slice(1);
}
