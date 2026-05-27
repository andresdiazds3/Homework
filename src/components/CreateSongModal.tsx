import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import Song from "../classes/Song";
import "../styles/createSongModal.scss";

interface CreateSongModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateSong: (song: Song) => void;
}

//Url default por si no tienen la url de la imagen
const DEFAULT_MUSIC_ICON_URL = "https://img.icons8.com/ios-filled/200/music--v1.png";

// Modal simple para insertar canciones 
const CreateSongModal = ({ isOpen, onClose, onCreateSong }: CreateSongModalProps) => {
  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [popularity, setPopularity] = useState("70");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setName("");
    setArtist("");
    setGenre("");
    setImgUrl("");
    setPopularity("70");
  }, [isOpen]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsedPopularity = Number(popularity);

    if (!Number.isFinite(parsedPopularity) || parsedPopularity < 1 || parsedPopularity > 100) {
      alert("La popularidad debe estar entre 1 y 100.");
      return;
    }

    const safeImgUrl = imgUrl.trim().length > 0 ? imgUrl.trim() : DEFAULT_MUSIC_ICON_URL;
    const newSong = new Song(name.trim(), artist.trim(), genre.trim(), safeImgUrl, parsedPopularity);

    onCreateSong(newSong);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="create-modal" role="dialog" aria-modal="true" aria-label="Insertar canción">
      <div className="create-modal__backdrop" onClick={onClose} />

      <form className="create-modal__card" onSubmit={handleSubmit}>
        <h2>Insertar canción</h2>

        <label>
          Nombre
          <input value={name} onChange={(event) => setName(event.target.value)} required />
        </label>

        <label>
          Artista
          <input value={artist} onChange={(event) => setArtist(event.target.value)} required />
        </label>

        <label>
          Género
          <input value={genre} onChange={(event) => setGenre(event.target.value)} required />
        </label>

        <label>
          URL de imagen
          <input
            value={imgUrl}
            onChange={(event) => setImgUrl(event.target.value)}
            placeholder="Opcional"
          />
        </label>

        <label>
          Popularidad
          <input
            type="number"
            min={1}
            value={popularity}
            onChange={(event) => setPopularity(event.target.value)}
            required
          />
        </label>

        <div className="create-modal__actions">
          <button type="button" onClick={onClose}>Cancelar</button>
          <button type="submit">Guardar</button>
        </div>
      </form>
    </div>
  );
};

export default CreateSongModal;