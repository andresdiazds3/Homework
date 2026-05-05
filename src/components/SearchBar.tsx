import { useState } from "react";
import { FiSearch, FiTrendingUp } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import SearchEngine from "../classes/SearchEngine";
import "./SearchBar.css";

interface Product {
  name: string;
  popularity: number;
}

const SearchBar = () => {
  const [searchEngine] = useState(() => {
    const engine = new SearchEngine();
    // Datos iniciales de ejemplo
    engine.insert("air max", 90);
    engine.insert("air force", 95);
    engine.insert("air jordan", 85);
    engine.insert("adidas boost", 80);
    engine.insert("adidas ultraboost", 88);
    engine.insert("nike react", 92);
    engine.insert("nike zoom", 87);
    return engine;
  });

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (value: string) => {
    setQuery(value);

    if (value.trim().length === 0) {
      setResults([]);
      setShowResults(false);
      return;
    }

    // Buscar Top 5 productos con ese prefijo
    const topResults = searchEngine.searchTopK(value, 5);
    setResults(topResults);
    setShowResults(true);
  };

  const handleResultClick = (product: Product) => {
    setQuery(product.name);
    setShowResults(false);
  };

  const getPopularityColor = (popularity: number) => {
    if (popularity >= 90) return "#8b7355";
    if (popularity >= 80) return "#a89968";
    return "#c9b8a8";
  };

  return (
    <div className="search-container">
      <div className="search-wrapper">
        <FiSearch className="search-icon" size={20} />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query.trim().length > 0 && setShowResults(true)}
          placeholder="Busca productos..."
          className="search-input"
        />
      </div>

      {showResults && results.length > 0 && (
        <div className="results-dropdown">
          <div className="results-header">
            <span className="header-title">Resultados</span>
            <span className="result-count">{results.length}</span>
          </div>
          <ul className="results-list">
            {results.map((product, index) => (
              <li
                key={index}
                onClick={() => handleResultClick(product)}
                className="result-item"
              >
                <div className="result-content">
                  <span className="result-name">{product.name}</span>
                  <div className="popularity-badge" style={{ borderColor: getPopularityColor(product.popularity) }}>
                    <FiTrendingUp size={14} />
                    <span style={{ color: getPopularityColor(product.popularity) }}>
                      {product.popularity}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showResults && results.length === 0 && query.trim().length > 0 && (
        <div className="results-dropdown">
          <div className="no-results">
            <MdOutlineClose size={20} />
            <span>Sin resultados para "{query}"</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
