import { useMemo, useState } from "react";
import { Node } from "../classes/Node";
import "../styles/modalNewObj.css";

type Props = {
	cities: Node[];
	onClose: () => void;
	onCreateCity: (nombre: string) => void;
	onCreatePerson: (nombre: string, edad: number, ciudadId: string) => void;
};

function ModalNewObj({ cities, onClose, onCreateCity, onCreatePerson }: Props) {
	const [tipo, setTipo] = useState<"city" | "person">("city");
	const [nombre, setNombre] = useState("");
	const [edad, setEdad] = useState("");
	const [ciudadId, setCiudadId] = useState("");

	const availableCities = useMemo(
		() => cities.filter((node) => node.tipo === "city"),
		[cities]
	);

	const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!nombre.trim()) {
			alert("Ingresa un nombre");
			return;
		}

		if (tipo === "city") {
			onCreateCity(nombre.trim());
			return;
		}

		const parsedAge = Number(edad);

		if (!Number.isInteger(parsedAge) || parsedAge <= 0) {
			alert("La edad debe ser un numero entero mayor a 0");
			return;
		}

		if (!ciudadId) {
			alert("Selecciona una ciudad para la persona");
			return;
		}

		onCreatePerson(nombre.trim(), parsedAge, ciudadId);
	};

	return (
		<div className="overlay" onClick={onClose}>
			<div className="modal" onClick={(e) => e.stopPropagation()}>
				<form className="new-obj-form" onSubmit={submitForm}>
					<h2 className="new-obj-form__title">Crear Nodo</h2>

					<label className="new-obj-form__label">Tipo</label>
					<select
						className="new-obj-form__input"
						value={tipo}
						onChange={(e) => {
							const value = e.target.value as "city" | "person";
							setTipo(value);
							if (value === "city") {
								setCiudadId("");
								setEdad("");
							}
						}}
					>
						<option value="city">Ciudad</option>
						<option value="person">Persona</option>
					</select>

					<label className="new-obj-form__label">Nombre</label>
					<input
						className="new-obj-form__input"
						placeholder={tipo === "city" ? "Nombre de la ciudad" : "Nombre de la persona"}
						value={nombre}
						onChange={(e) => setNombre(e.target.value)}
					/>

					{tipo === "person" && (
						<>
							<label className="new-obj-form__label">Edad</label>
							<input
								className="new-obj-form__input"
								type="number"
								min={1}
								value={edad}
								onChange={(e) => setEdad(e.target.value)}
							/>

							<label className="new-obj-form__label">Ciudad</label>
							<select
								className="new-obj-form__input"
								value={ciudadId}
								onChange={(e) => setCiudadId(e.target.value)}
							>
								<option value="">Selecciona una ciudad</option>
								{availableCities.map((city) => (
									<option key={city.id} value={city.id}>
										{city.nombre}
									</option>
								))}
							</select>
							{availableCities.length === 0 && (
								<p className="new-obj-form__hint">Primero crea una ciudad.</p>
							)}
						</>
					)}

					<div className="new-obj-form__actions">
						<button className="new-obj-form__button new-obj-form__button--submit" type="submit">
							Guardar
						</button>
						<button
							className="new-obj-form__button new-obj-form__button--cancel"
							type="button"
							onClick={onClose}
						>
							Cancelar
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ModalNewObj;
