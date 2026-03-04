import "../styles/TurnoCard.css"
import MiembroComite from "../classesObjects/MiembroComite";

type Props = {
    miembro: MiembroComite;
}

function MiembroCard({miembro}: Props){
    return (
      <div className="turnoCard">
        <div className="infoTurnoCard">
          <h1>{miembro.nombre}</h1>
          <p className="turnoNumber">Rol: <span>{miembro.puesto}</span></p>
        </div>
      </div>
    );

}

export default MiembroCard;