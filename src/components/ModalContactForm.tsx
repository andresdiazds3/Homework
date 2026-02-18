import { prefijos } from "../data/prefijosData";

function ModalContactForm (){
    return (
      <form>
        <input type="text" name="usuario" placeholder="Nombre De Contacto"/>
        <select name="texto">
          {prefijos.map((x) => (
            <option key={x.code} value={x.code}>
              {x.name} ({x.countryCode})
            </option>
          ))}
        </select>
        <input type="number" name="TEL" placeholder="Numero de Tel" />
      </form>
    );
}

export default ModalContactForm;