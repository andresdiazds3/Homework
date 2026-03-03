import "../styles/SongInfo.css"

type Props = {
  song: any;
};

export default function SongInfo({ song }: Props) {
  if (!song) return <p>No hay canción</p>;

  return (
    <div className="song-info">
      <h2 className="song-title">{song.title}</h2>
      <p className="song-artist">{song.artist}</p>
      <p className="song-duration">{song.duration}</p>
    </div>
  );
}