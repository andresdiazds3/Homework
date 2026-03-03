type Props ={
    pages: any;
}

export default function InfoPages({ pages }: Props) {
  if (!pages) return <p>No hay historial</p>;

  return (
    <div className="song-info">
      <h2 className="song-title">{pages.title}</h2>
      <img className= "page-img"src={pages.img} alt="logo" />
      <p className="song-duration">{pages.lastVisit}</p>
      <p className="song-duration">{pages.url}</p>
    </div>
  );
}