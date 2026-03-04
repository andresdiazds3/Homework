import "../styles/TurnoCard.css"
import Medico from "../classesObjects/Medico";

type Props = {
    medico: Medico;
}

function MedicoCard({medico}: Props){
    return (
      <div className="turnoCard">
        <div className="infoTurnoCard">
          <h1>{medico.nombre}</h1>
          <p className="turnoNumber">Especializado: <span>{medico.rol}</span></p>
        </div>
      </div>
    );

}

export default MedicoCard;