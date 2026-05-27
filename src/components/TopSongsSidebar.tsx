import { FiTrendingUp } from "react-icons/fi";
import Song from "../classes/Song";
import "../styles/topSongsSidebar.scss";

interface TopSongsSidebarProps {
  songs: Song[];
  onSelectSong: (song: Song) => void;
}

// Sidebar compacto que muestra el top 5 por popularidad.
const TopSongsSidebar = ({ songs, onSelectSong }: TopSongsSidebarProps) => {
  return (
    <aside className="top-sidebar">
      <div className="top-sidebar__header">
        <FiTrendingUp size={16} />
        <h2>Top 5</h2>
      </div>

      <ul className="top-sidebar__list">
        {songs.map((song, index) => (
          <li key={song.name + song.artist}>
            <button
              type="button"
              className="top-sidebar__item"
              onClick={() => onSelectSong(song)}
            >
              <span className="top-sidebar__rank">{index + 1}</span>
              <div className="top-sidebar__meta">
                <span className="top-sidebar__name">{song.name}</span>
                <span className="top-sidebar__artist">{song.artist}</span>
              </div>
              <span className="top-sidebar__rate">{song.popularity}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default TopSongsSidebar;