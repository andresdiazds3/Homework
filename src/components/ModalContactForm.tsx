import { useState } from "react";
import { prefijos } from "../data/prefijosData";
import {v4 as uuidv4} from 'uuid'
import profilePic from '../img/pfp.webp'
import '../styles/ModalContactForm.css'

type ModalContactFormProps = {
  onClose: () => void;
  onAdd: (contacto: any) => void;
}

function ModalContactForm ({onClose, onAdd}:ModalContactFormProps){

  const [inputName, setInputName] = useState("")
  const [inputTel, setInputTel] = useState("")
  const [inputPrefijo, setInputPrefijo] = useState(prefijos[0].countryCode);

  const manejarCambioPrefijo = (e: any) => {
  setInputPrefijo(e.target.value);
    };

  const manejarCambioName = (e:any) => {
        setInputName(e.target.value);
    }

  const manejarCambioTel = (e:any) => {
        setInputTel(e.target.value);
    }

  const manejarEnvio = (e:any) => {
    e.preventDefault();
    console.log("Tratando de Enviar Contacto...");
    const newContact = {
      id: uuidv4(),
      pfp: profilePic,
      prefijo: inputPrefijo,
      numero: inputTel,
      nombre: inputName
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
            name="usuario"
            placeholder="Nombre De Contacto"
            value={inputName}
            onChange={manejarCambioName}
          />

          <select name="texto" onChange={manejarCambioPrefijo}>
            {prefijos.map((x) => (
              <option key={x.code} value={x.countryCode}>
                {x.name} ({x.countryCode})
              </option>
            ))}
          </select>

          <input
            type="number"
            name="TEL"
            placeholder="Numero de Tel"
            value={inputTel}
            onChange={manejarCambioTel}
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