import '../styles/Card.css';

export default function Card({ pokemon }) {
    return(
        <div className="card">
            <div className="card-image">
                <img src={pokemon.imageURL} alt={pokemon.name + "sprite"} />
            </div>
            <div className="card-title">
                {editName(pokemon.name)}
            </div>
        </div>
    )
}

function editName(name) {
    if (name.includes("-")) {
        let splitName = name.split("-")
        splitName = splitName.map(element => element.charAt(0).toUpperCase() + element.slice(1));
        return splitName.join(" ")
    }
    return name.charAt(0).toUpperCase() + name.slice(1);
}