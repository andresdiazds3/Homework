import { useState } from "react";
import {v4 as uuidv4} from 'uuid'
import '../styles/ModalContactForm.css'

type ModalNewTurnProps = {
  onClose: () => void;
  onAdd: (student: any) => void;
}

function ModalNewTurn ({onClose, onAdd}:ModalNewTurnProps){
  const [inputName, setInputName] = useState("")
  const [inputAge, setInputAge] = useState("")
  const [inputCode, setInputCode] = useState("");

  const validar = () => {
    if (!inputName.trim()) return "Por favor ingresa el nombre del paciente";
    if (!inputAge.trim()) return "Por favor ingresa la edad";
    if (!inputCode.trim()) return "Por favor ingresa el número de turno";
    
    const edad = parseInt(inputAge);
    const turno = parseInt(inputCode);
    
    if (isNaN(edad)) return "La edad debe ser un número válido";
    if (isNaN(turno)) return "El número de turno debe ser un número válido";
    if (edad < 0 || edad > 150) return "La edad debe estar entre 0 y 150";
    if (turno <= 0) return "El número de turno debe ser mayor a 0";
    
    return null;
  };

  const manejarEnvio = (e:any) => {
    e.preventDefault();
    
    const error = validar();
    if (error) {
      alert(error);
      return;
    }
    
    const newContact = {
      id: uuidv4(),
      nombre: inputName.trim(),
      edad: parseInt(inputAge),
      turno: parseInt(inputCode)
    }
    
    onAdd(newContact)
    setInputName("")
    setInputAge("")
    setInputCode("")
  }

    return (
    <div className="overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={manejarEnvio}>
          <h2>Nuevo Turno</h2>

          <input
            type="text"
            name="nombre"
            placeholder="Nombre del Paciente"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
          <input
            type="number"
            name="age"
            placeholder="Edad"
            value={inputAge}
            onChange={(e) => setInputAge(e.target.value)}
          />

          <input
            type="number"
            name="code"
            placeholder="Número de Turno"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
          />

          <button type="submit">Guardar</button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalNewTurn;