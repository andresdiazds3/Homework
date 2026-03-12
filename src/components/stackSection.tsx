import ModalNewBook from "./newBookForm";
import StackCard from "./stackCard";
import { Stack } from "../classes/Stack";
import { useEffect, useState } from "react";
import { librosData } from "../data/librosData";
import type { Book } from "../classes/Book";
import "../styles/stackSection.css";

function StackSection() {
  const [libros, setLibros] = useState<Stack>(new Stack());
  const [trigger, updateTrigger] = useState(0);
  const [mostrarModal, setMostrarModal] = useState(false);

  //Inicializar con mocked data
  useEffect(() => {
    if (libros.size() === 0) {
      librosData.forEach((x) => {
        libros.push(x);
      });

      //Actualizamos el contador dummy para desplegar correctamente los datos
      updateTrigger((prev) => prev + 1);
    }
  }, []);

  const manejarPop = () => {
    //Metodo integrado de la clase stack
    libros.pop()
    updateTrigger((prev) => prev + 1)
  }

  const agregarLibro = (book:Book) => {
    //Metodo integrado de la clase stack
    libros.push(book)
    updateTrigger((prev) => prev + 1)
    setMostrarModal(false)
  }

  return (
    <>
      <div className="stack-section__header">
        <h1 className="stack-section__title"> STACK DE LIBROS </h1>
      </div>

      <div className="stack-section__actions">
        <button className="stack-section__button stack-section__button--primary" onClick={manejarPop}>
          Tomar Libro
        </button>
        <button className="stack-section__button stack-section__button--secondary" onClick={() => setMostrarModal(true)}> 
            Abrir Modal 
        </button>
      </div>
      {mostrarModal && (
          <div className="stack-section__modal-host">
            <ModalNewBook onClose={() => setMostrarModal(false)} onAdd={agregarLibro}/>
          </div>
        )}

      <div className="stack-section__stack">
        {libros.print().map((x) => (
          <StackCard key={`${x.ISBN}}`} book={x} />
        ))}
      </div>
      
    </>
  );
}

export default StackSection;
