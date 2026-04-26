import { useMemo, useState } from "react";
import { Graph as D3Graph } from "react-d3-graph";
import { Graph as GraphModel } from "../classes/Graph";
import { Node } from "../classes/Node";
import ModalNewObj from "./ModalNewObj";
import { FiPlusCircle, FiUsers, FiMapPin } from "react-icons/fi";
import "../styles/graphDashboard.css";

const graphConfig = {
	directed: true,
	height: 540,
	width: 900,
	panAndZoom: true,
	d3: {
		gravity: -240,
		linkLength: 150,
	},
	nodeHighlightBehavior: true,
	node: {
		size: 420,
		highlightStrokeColor: "#222",
		labelProperty: "label" as const,
		fontColor: "#111",
		fontSize: 14,
	},
	link: {
		color: "#6b4a2f",
		strokeWidth: 2,
		markerHeight: 6,
		markerWidth: 6,
		renderLabel: false,
	},
};

function GraphDashboard() {
	const [graph] = useState(new GraphModel({ nodes: [], adjlist: {} }));
	const [version, setVersion] = useState(0);
	const [selectedCityName, setSelectedCityName] = useState("");
	const [showNodeModal, setShowNodeModal] = useState(false);

	const bump = () => setVersion((prev) => prev + 1);

	const cities = useMemo(() => graph.getCities(), [graph, version]);
	const people = useMemo(() => graph.getPeople(), [graph, version]);

	const graphData = useMemo(() => {
		const nodes = graph.nodes.map((node) => ({
			id: node.id,
			label: node.tipo === "city" ? `Ciudad: ${node.nombre}` : `${node.nombre} (${node.edad})`,
			color: node.tipo === "city" ? "#ce9d49" : "#95b86d",
			symbolType: node.tipo === "city" ? "diamond" : "circle",
		}));

		const links = Object.entries(graph.adjlist).flatMap(([cityId, residents]) =>
			residents.map((person) => ({
				source: cityId,
				target: person.id,
			}))
		);

		return { nodes, links };
	}, [graph, version]);

	const residents = useMemo(() => {
		if (!selectedCityName) {
			return [];
		}

		return graph.getPeopleByCity(selectedCityName);
	}, [graph, version, selectedCityName]);

	const createCity = (nombre: string) => {
		try {
			const city = new Node({
				tipo: "city",
				id: crypto.randomUUID(),
				nombre,
			});

			graph.addNode(city);
			if (!selectedCityName) {
				setSelectedCityName(nombre);
			}
			setShowNodeModal(false);
			bump();
		} catch (error) {
			alert(error instanceof Error ? error.message : "No se pudo crear la ciudad");
		}
	};

	const createPerson = (nombre: string, edad: number, ciudadId: string) => {
		try {
			const person = new Node({
				tipo: "person",
				id: crypto.randomUUID(),
				nombre,
				edad,
				ciudadId,
			});

			graph.addNode(person);
			setShowNodeModal(false);
			bump();
		} catch (error) {
			alert(error instanceof Error ? error.message : "No se pudo crear la persona");
		}
	};

	return (
		<section className="graph-dashboard">
			<header className="graph-dashboard__header">
				<div className="graph-dashboard__headline">
					<FiUsers className="graph-dashboard__headline-icon" />
					<div>
						<h1>Grafo Dirigido de Personas y Ciudades</h1>
						<p>Cada persona apunta a una ciudad donde vive.</p>
					</div>
				</div>
			</header>

			<div className="graph-dashboard__actions">
				<button
					className="graph-dashboard__button graph-dashboard__button--primary"
					onClick={() => setShowNodeModal(true)}
				>
					<FiPlusCircle />
					Nuevo nodo
				</button>
				<div className="graph-dashboard__stats">
					<div className="graph-dashboard__stat">
						<FiMapPin />
						<span>{cities.length} ciudades</span>
					</div>
					<div className="graph-dashboard__stat">
						<FiUsers />
						<span>{people.length} personas</span>
					</div>
				</div>
			</div>

			<div className="graph-dashboard__grid">
				<div className="graph-dashboard__panel">
					<h2>Personas Por Ciudad</h2>
					<select
						className="graph-dashboard__select"
						value={selectedCityName}
						onChange={(e) => setSelectedCityName(e.target.value)}
					>
						<option value="">Selecciona una ciudad</option>
						{cities.map((city) => (
							<option key={city.id} value={city.nombre}>
								{city.nombre}
							</option>
						))}
					</select>

					<ul className="graph-dashboard__list">
						{residents.map((resident) => (
							<li key={resident.id}>
								{resident.nombre} - {resident.edad} añoss
							</li>
						))}
						{selectedCityName && residents.length === 0 && <li>No hay residentes.</li>}
					</ul>
				</div>

				<div className="graph-dashboard__graph">
					{graphData.links.length > 0 ? (
						<D3Graph id="city-people-graph" data={graphData} config={graphConfig} />
					) : (
						<p className="graph-dashboard__empty">
							Crea al menos una ciudad y una persona conectada para visualizar el grafo.
						</p>
					)}
				</div>
			</div>

			{showNodeModal && (
				<ModalNewObj
					cities={cities}
					onClose={() => setShowNodeModal(false)}
					onCreateCity={createCity}
					onCreatePerson={createPerson}
				/>
			)}
		</section>
	);
}

export default GraphDashboard;
