import {AiOutlineCloseCircle} from 'react-icons/ai';
import "../styles/StudentCard.css"

type StudentCardProps = {
    student : any
    manejarDelete: (id:number) => void;
}

function StudentCard({student, manejarDelete}: StudentCardProps){
    return (
      <div className="contactCard">
          <img src={student.pfp} alt="ProfilePic" />
        <div className="infoContactCard">
          <h1>{student.name}</h1>
          <p>Edad: {student.age}</p>
          <p>Codigo: {student.code}</p>
        </div>
        <div>
            <AiOutlineCloseCircle onClick={() => manejarDelete(student.id) }/>
        </div>
      </div>
    );

}

export default StudentCard;