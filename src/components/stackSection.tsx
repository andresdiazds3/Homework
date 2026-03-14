import ModalNewBook from "./newBookForm";
import StackCard from "./stackCard";
import { Stack } from "../classes/Stack";
import { useEffect, useState } from "react";
import { librosData } from "../data/librosData";

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

  return (
    <>
      <div>
        <h1> STACK DE LIBROS </h1>
      </div>

      <div>
        {libros.print().map((x) => (
          <StackCard key={`${x.ISBN}}`} book={x} />
        ))}
      </div>
      <div>
        <button onClick={() => console.log("porahora bitch")}>
          Tomar Libro
        </button>
      </div>
    </>
  );
}

export default StackSection;
