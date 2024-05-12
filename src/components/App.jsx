import '../styles/App.css'
import getPokemon from '../fetch'

function App() {
  getPokemon()
  return (
    <div>
      Hello
    </div>
  )
}

export default App
