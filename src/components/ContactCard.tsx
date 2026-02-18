import {AiOutlineCloseCircle} from 'react-icons/ai';
import '../styles/ContactCard.css'

type ContactCardProps = {
    id:number;
    pfp: string; 
    prefijo: number;
    numero: number;
    nombre: string;
    manejarDelete: (id:number) => void;
}

function ContactCard({id, pfp, prefijo, numero, nombre, manejarDelete}: ContactCardProps){
    return (
      <div className="contactCard">
          <img src={pfp} alt="ProfilePic" />
        <div className="infoContactCard">
          <h1>{nombre}</h1>
          <p>+{prefijo} {numero}</p>
        </div>
        <div>
            <AiOutlineCloseCircle onClick={() => manejarDelete(id) }/>
        </div>
      </div>
    );

}

export default ContactCard;