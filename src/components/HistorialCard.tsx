import "../styles/TurnoCard.css"
import Paciente from "../classesObjects/Paciente";

type Props = {
    paciente: Paciente;
}

function HistorialCard({paciente}: Props){
    return (
      <div className="turnoCard">
        <div className="infoTurnoCard">
          <h1>{paciente.nombre}</h1>
          <p className="turnoNumber">Sintoma: <span>{paciente.sintoma}</span></p>
          <p className="turnoNumber">Estado: <span>Atendido</span></p>
        </div>
      </div>
    );

}

export default HistorialCard;
