import Song from "../classes/Song";
import { FiPlay } from "react-icons/fi";
import "../styles/songCard.scss";

interface SongCardProps {
  song: Song;
  reason?: string;
}

// Muestra una canción con su portada y sus datos principales.
const SongCard = ({ song, reason }: SongCardProps) => {
  return (
    <article className="song-card">
      <div className="song-card__artwork">
        <img src={song.imgUrl} alt={`${song.name} cover`} />
        <div className="song-card__play">
          <FiPlay size={18} />
        </div>
      </div>
      <div className="song-card__content">
        <h3 className="song-card__title">{song.name}</h3>
        <p className="song-card__artist">{song.artist}</p>
        <p className="song-card__genre">{song.genre}</p>
        {reason && <p className="song-card__reason">{reason}</p>}
      </div>
    </article>
  );
};

export default SongCard;