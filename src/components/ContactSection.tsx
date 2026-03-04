import StudentCard from "./StudentCtard";
import ModalContactForm from "./ModalContactForm";
import { useState, useEffect } from "react";
import { LinkedList } from "../classes/LinkedList";
import studentsData from "../data/studentData";
import Controls from "./Controls";
import Node from "../classes/node";
import "../styles/ContactSection.css";

const ContactCardSection = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [students, setStudents] = useState<LinkedList>(new LinkedList());
  const [updateTrigger, setUpdateTrigger] = useState(0); // Contador dummy para forzar re-render
  const [current, setCurrent] = useState<Node | null>(null);

  useEffect(() => {
    if (students.length === 0) {
      studentsData.forEach((s) => students.append(s));
      setCurrent(students.head);
    }
  }, []);

  const agregarStudent = (newStudent: any) => {
    students.append(newStudent);
    setCurrent(students.head);
    setUpdateTrigger(prev => prev + 1); // Fuerza re-render
    setMostrarModal(false)
  };

  const nextStudent = () => {
    if (current?.next) {
      setCurrent(current.next);
    } else {
      console.log("Terminaste la Playlist!");
    }
  };

  const manejarDelete = (id: number) => {
    const confirmacionDelete = window.confirm(
      "¿Estás seguro que deseas eliminar este contacto?",
    );
    if (confirmacionDelete) {
      students.remove(id);
      setCurrent(students.head);
      setUpdateTrigger(prev => prev + 1); // Fuerza re-render
    }
  };

  return (
    <section>
      <h1> Mis Contactos </h1>
      <button className="btnAdd" onClick={() => setMostrarModal(true)}>
        Añadir Contacto
      </button>
      <div className="contactList">
        {current && (
          <StudentCard student={current.value} manejarDelete={manejarDelete} />
        )}
      </div>
      <Controls onNext={nextStudent} />
      {mostrarModal && (
        <div className="modal">
          <ModalContactForm
            onClose={() => setMostrarModal(false)}
            onAdd={agregarStudent}
          />
        </div>
      )}
    </section>
  );
};

export default ContactCardSection;

// Alternativa previa usando useRef:

/* const initialized = useRef(false);
  useEffect(() => {
    if (initialized.current) return;
    studentsData.forEach((s) => studentsRef.current.append(s));
    setCurrent(studentsRef.current.head);
    initialized.current = true;
  }, []);

  const agregarStudent = (newStudent: any) => {
    studentsRef.current.append(newStudent);
    setCurrent(studentsRef.current.head);
    setMostrarModal(false)
  };

  const nextStudent = () => {
    if (current?.next) {
      setCurrent(current.next);
    } else {
      console.log("Terminaste la Playlist!");
    }
  };

  const manejarDelete = (id: number) => {
    const confirmacionDelete = window.confirm(
      "¿Estás seguro que deseas eliminar este contacto?",
    );
    if (confirmacionDelete) {
      studentsRef.current.remove(id);
      setCurrent(studentsRef.current.head)
    }
  };
 */
