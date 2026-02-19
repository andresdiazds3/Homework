import { prefijos } from "../data/prefijosData";
import '../styles/ModalContactForm.css'

type ModalContactFormProps = {
  onClose: () => void;
}

function ModalContactForm ({onClose}:ModalContactFormProps){
    return (
    <div className="overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <form>
          <h2>Nuevo Contacto</h2>

          <input
            type="text"
            name="usuario"
            placeholder="Nombre De Contacto"
          />

          <select name="texto">
            {prefijos.map((x) => (
              <option key={x.code} value={x.code}>
                {x.name} ({x.countryCode})
              </option>
            ))}
          </select>

          <input
            type="number"
            name="TEL"
            placeholder="Numero de Tel"
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