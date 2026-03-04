import "../styles/TurnoCard.css"

type TurnoCardProps = {
    turno : any
}

function TurnoCard({turno, }: TurnoCardProps){
    return (
      <div className="turnoCard">
        <div className="infoTurnoCard">
          <h1>{turno.nombre}</h1>
          <p className="turnoNumber">Turno: <span>{turno.turno}</span></p>
        </div>
      </div>
    );

}

export default TurnoCard;