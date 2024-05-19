import "../styles/Card.css";

export default function Card({ pokemon, onClick }) {
  return (
    <button className="card" onClick={onClick} data-id={pokemon.id}>
      <div className="card-image">
        <img
          src={pokemon.imageURL}
          alt={editName(pokemon.name) + " " + "sprite"}
          draggable={false}
        />
      </div>
      <div className="card-title">{editName(pokemon.name)}</div>
    </button>
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
