import QueueCard from "../components/QueueCard";
import { Queue } from "../classes/Queue";
import { useEffect, useState } from "react";
import { MockedUsers } from "../data/UsersData";
import type { User } from "../classes/User";
import "../styles/QueueSection.css";
import ModalNewUser from "../components/NewUserForm";

function QueueSection() {
  const [users] = useState<Queue>(new Queue());
  const [, updateTrigger] = useState(0);
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
      <div className="queue-section__header">
        <h1 className="queue-section__title"> COLA DE ATM </h1>
      </div>

      <div className="queue-section__actions">
        <button
          className="queue-section__button queue-section__button--secondary"
          onClick={() => setMostrarModal(true)}
        >
          Abrir Modal
        </button>
      </div>
      {mostrarModal && (
        <div className="queue-section__modal-host">
          <ModalNewUser
            onClose={() => setMostrarModal(false)}
            onAdd={encolarUsuario}
          />
        </div>
      )}

      <div className="queue-section__list">
        {users
          .print()
          .sort((a, b) => a.date.getTime() - b.date.getTime())
          .map((x) => (
            <QueueCard key={x.name + x.date} user={x} />
          ))}
      </div>
    </>
  );
}

export default QueueSection;