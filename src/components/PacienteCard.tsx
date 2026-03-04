import "../styles/TurnoCard.css"
import Paciente from "../classesObjects/Paciente";

type Props = {
    paciente: Paciente;
    manejarAtender() : void
}

function PacienteCard({paciente, manejarAtender}: Props){
    return (
      <div className="turnoCard">
        <div className="infoTurnoCard">
          <h1>{paciente.nombre}</h1>
          <p className="turnoNumber">Sintoma: <span>{paciente.sintoma}</span></p>
          <button className ="controls" onClick={manejarAtender}> Atender </button>
        </div>
      </div>
    );

}

export default PacienteCard;