import '../styles/Cards-Container.css'

export default function CardsContainer({ children }) {
    return (
        <div className="cards-container">
            {children}
        </div>
    )
}