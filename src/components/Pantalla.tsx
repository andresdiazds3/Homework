import { useMemo, useState } from "react";
import songsData from "../data/data.json";
import SearchBar from "./SearchBar";
import SongCard from "./SongCard";
import SongCarrusel from "./SongCarrusel";
import TopSongsSidebar from "./TopSongsSidebar";
import CreateSongModal from "./CreateSongModal";
import Song from "../classes/Song";
import { Graph } from "../classes/Graph";
import SearchEngine from "../classes/SearchEngine";
import "../styles/pantalla.scss";

// Pantalla principal que junta búsqueda, canción abierta y recomendaciones.
const Pantalla = () => {
	const [songs, setSongs] = useState<Song[]>(songsData as Song[]);
	const [selectedSong, setSelectedSong] = useState<Song | null>((songsData as Song[])[0] ?? null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const graph = useMemo(() => {
		const createdGraph = new Graph();
		createdGraph.buildFromSongs(songs);
		return createdGraph;
	}, [songs]);

	const topSongs = useMemo(() => {
		const engine = new SearchEngine();
		songs.forEach((song) => engine.insert(song));
		return engine.searchTopK("", 1000);
	}, [songs]);

	const handleCreateSong = (newSong: Song) => {
		setSongs((prev) => [...prev, newSong]);
		setSelectedSong(newSong);
	};

	const recommendations = selectedSong ? graph.getRecommendationsBySong(selectedSong, 5) : [];

	return (
		<div className="pantalla">
			<div className="pantalla__top">
				<h1 className="pantalla__title">Buscador De Canciones!</h1>
				<p className="pantalla__subtitle">
					Busca una canción y mira otras del mismo artista o género.
				</p>
				<div className="pantalla__actions">
					<button
						type="button"
						className="pantalla__add-btn"
						onClick={() => setIsModalOpen(true)}
					>
						Insertar canción
					</button>
				</div>
				<SearchBar songs={songs} onSelectSong={setSelectedSong} />
			</div>

			<div className="pantalla__body">
				<TopSongsSidebar songs={topSongs.slice(0, 5)} onSelectSong={setSelectedSong} />

				<main className="pantalla__content">
				{selectedSong ? (
					<>
						<section className="pantalla__now-playing">
							<p className="pantalla__section-label">Canción abierta</p>
							<SongCard song={selectedSong} />
						</section>

						<section className="pantalla__recommendations">
							<SongCarrusel recommendations={recommendations} />
						</section>
					</>
				) : (
					<section className="pantalla__empty-state">
						<h2>Elige una canción para empezar</h2>
						<p>Las recomendaciones aparecerán debajo cuando selecciones una canción.</p>
					</section>
				)}
				</main>
			</div>

			<CreateSongModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onCreateSong={handleCreateSong}
			/>
		</div>
	);
};

export default Pantalla;
