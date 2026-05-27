import { useMemo, useState } from "react";
import { FiSearch, FiTrendingUp } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import SearchEngine from "../classes/SearchEngine";
import Song from "../classes/Song";
import "../styles/searchBar.scss";

interface SearchBarProps {
  songs: Song[];
  onSelectSong: (song: Song) => void;
}

// Busca canciones por nombre y avisa cuál se abrió.
const SearchBar = ({ songs, onSelectSong }: SearchBarProps) => {
  const searchEngine = useMemo(() => {
    const engine = new SearchEngine();

    // Carga el trie con las canciones actuales.
    songs.forEach((song) => {
      engine.insert(song);
    });

    return engine;
  }, [songs]);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);
  const [showResults, setShowResults] = useState(false);

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setShowResults(false);
  };

  // Actualiza la búsqueda mientras el usuario escribe.
  const handleSearch = (value: string) => {
    setQuery(value);

    if (value.trim().length === 0) {
      setResults([]);
      setShowResults(false);
      return;
    }

    // Busca las canciones más populares que coinciden con el prefijo.
    const topResults = searchEngine.searchTopK(value, 50);
    setResults(topResults);
    setShowResults(true);
  };

  // Abre la canción seleccionada y cierra el listado.
  const handleResultClick = (song: Song) => {
    onSelectSong(song);
    setQuery(song.name);
    setShowResults(false);
  };

  // Cambia el color solo para distinguir popularidad alta o baja.
  const getPopularityColor = (popularity: number) => {
    if (popularity >= 90) return "#8b7355";
    if (popularity >= 80) return "#a89968";
    return "#c9b8a8";
  };

  return (
    <div className="search-bar">
      <div className="search-bar__field">
        <FiSearch className="search-bar__icon" size={20} />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query.trim().length > 0 && setShowResults(true)}
          placeholder="Busca canciones..."
          className="search-bar__input"
        />
        {query.trim().length > 0 && (
          <button
            type="button"
            className="search-bar__clear"
            onClick={clearSearch}
            aria-label="Limpiar búsqueda"
          >
            <MdOutlineClose size={18} />
          </button>
        )}
      </div>

      {showResults && results.length > 0 && (
        <div className="search-bar__dropdown">
          <div className="search-bar__header">
            <span>Resultados</span>
            <span>{results.length}</span>
          </div>
          <ul className="search-bar__list">
            {results.map((result) => (
              <li
                key={`${result.name}-${result.artist}`}
                onClick={() => handleResultClick(result)}
                className="search-bar__item"
              >
                <div className="search-bar__item-content">
                  <div>
                    <span className="search-bar__title">{result.name}</span>
                    <span className="search-bar__artist">{result.artist}</span>
                  </div>
                  <div
                    className="search-bar__badge"
                    style={{ borderColor: getPopularityColor(result.popularity) }}
                  >
                    <FiTrendingUp size={14} />
                    <span style={{ color: getPopularityColor(result.popularity) }}>
                      {result.popularity}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showResults && results.length === 0 && query.trim().length > 0 && (
        <div className="search-bar__dropdown search-bar__dropdown--empty">
          <div className="search-bar__empty">
            <MdOutlineClose size={20} />
            <span>Sin resultados para "{query}"</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
