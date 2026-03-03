import { useState } from "react";
import {v4 as uuidv4} from 'uuid'
import profilePic from '../img/pfp.webp'
import '../styles/ModalContactForm.css'

type ModalContactFormProps = {
  onClose: () => void;
  onAdd: (student: any) => void;
}

function ModalContactForm ({onClose, onAdd}:ModalContactFormProps){
  const [inputName, setInputName] = useState("")
  const [inputAge, setInputAge] = useState()
  const [inputCode, setInputCode] = useState();

  const manejarCambioAge = (e: any) => {
  setInputAge(e.target.value);
    };

  const manejarCambioName = (e:any) => {
        setInputName(e.target.value);
    }

  const manejarCambioCode = (e:any) => {
        setInputCode(e.target.value);
    }

  const manejarEnvio = (e:any) => {
    e.preventDefault();
    console.log("Tratando de Enviar Contacto...");
    const newContact = {
      id: uuidv4(),
      pfp: profilePic,
      name: inputName,
      age: inputAge,
      code: inputCode
    }
    console.log("Enviando Contacto: ", newContact)
    onAdd(newContact)
  }

    return (
    <div className="overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={manejarEnvio}>
          <h2>Nuevo Contacto</h2>

          <input
            type="text"
            name="nombre"
            placeholder="Nombre De Estudiante"
            value={inputName}
            onChange={manejarCambioName}
          />
          <input
            type="number"
            name="age"
            placeholder="Edad"
            value={inputAge}
            onChange={manejarCambioAge}
          />

          <input
            type="number"
            name="code"
            placeholder="Codigo Estudiantil"
            value={inputCode}
            onChange={manejarCambioCode}
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

export default ModalContactForm;