import StackCard from "./QueueCard";
import { Queue } from "../classes/Queue";
import { useEffect, useState } from "react";
import { MockedUsers } from "../data/UsersData";
import type { User } from "../classes/User";
import "../styles/stackSection.css";
import ModalNewUser from "./newUserForm";

function QueueSection() {
  const [users, setUsers] = useState<Queue>(new Queue());
  const [trigger, updateTrigger] = useState(0);
  const [mostrarModal, setMostrarModal] = useState(false);

  //Inicializar con mocked data
  useEffect(() => {
    if (users.size() === 0) {
      MockedUsers.forEach((x) => {
        users.enqueue(x);
      });

      //Actualizamos el contador dummy para desplegar correctamente los datos
      updateTrigger((prev) => prev + 1);
    }
  }, []);


  const encolarUsuario = (user: User) => {
    //Metodo integrado de la clase stack
    users.enqueue(user);
    updateTrigger((prev) => prev + 1);
    setMostrarModal(false);
  };

  return (
    <>
      <div className="stack-section__header">
        <h1 className="stack-section__title"> COLA DE ATM </h1>
      </div>

      <div className="stack-section__actions">
        <button
          className="stack-section__button stack-section__button--secondary"
          onClick={() => setMostrarModal(true)}
        >
          Abrir Modal
        </button>
      </div>
      {mostrarModal && (
        <div className="stack-section__modal-host">
          <ModalNewUser
            onClose={() => setMostrarModal(false)}
            onAdd={encolarUsuario}
          />
        </div>
      )}

      <div className="stack-section__stack">
        {users
          .print()
          .sort((a, b) => a.date.getTime() - b.date.getTime())
          .map((x) => (
            <StackCard key={x.name + x.date} user={x} />
          ))}
      </div>
    </>
  );
}

export default QueueSection;
