import './App.css'
import SearchBar from './components/SearchBar'

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Smart Search Engine</h1>
        <p>Busca productos por nombre y encuentra los más populares</p>
      </header>
      <main className="app-main">
        <SearchBar />
      </main>
    </div>
  )
}

export default App
