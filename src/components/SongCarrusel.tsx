import Song from "../classes/Song";
import SongCard from "./SongCard";
import { FiMusic } from "react-icons/fi";
import "../styles/songCarrusel.scss";

interface SongCarruselProps {
  recommendations: { song: Song; reasons: string[] }[];
}

// Muestra la lista de canciones relacionadas debajo de la canción abierta.
const SongCarrusel = ({ recommendations }: SongCarruselProps) => {
  return (
    <section className="song-carrusel">
      <div className="song-carrusel__header">
        <FiMusic size={18} />
        <h2>Canciones relacionadas</h2>
      </div>
      {recommendations.map(({ song, reasons }) => (
        <SongCard
          key={`${song.name}-${song.artist}`}
          song={song}
          reason={reasons.join(" / ")}
        />
      ))}
    </section>
  );
};

export default SongCarrusel;