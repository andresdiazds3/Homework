import TurnoCard from "./TurnoCard";
import { useState, useEffect } from "react";
import { LinkedList } from "../classes/LinkedList";
import TurnoData from "../data/TurnoData";
import Controls from "./Controls";
import Node from "../classes/Node";
import "../styles/ContactSection.css";
import ModalNewTurn from "./ModalNewTurn";
import type Turno from "../classes/Turno";
import { use } from "framer-motion/m";

const TurnerSystem = () => {
  const [turno, setTurno] = useState<LinkedList>(new LinkedList());
  const [current, setCurrent] = useState<Node | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false)
  const [trigger, updateTrigger] = useState(0) // Este va a ser el contador para re-rendirzar cuando se necestite

  useEffect(() => {
    if (turno.length === 0) {
    TurnoData.forEach((x) => turno.append(x));
      setCurrent(turno.head);
    }
  }, []);

  useEffect(() => {
    if (!current) return;
    console.log("El numero de turno cambio ", current.value.turno)
  }, [current])

  const nextTurno = () => {
    if (current?.next) {
      setCurrent(current.next);
    } else {
      console.log("Nunca llegara aqui");
    }
  };

  const prevTurno = () => {
    if (current?.prev) {
      setCurrent(current.prev);
    }
  };

  const agregarTurno = (newTurno: Turno) => {
    turno.append(newTurno);
    setCurrent(turno.tail);
    updateTrigger((prev) => prev+1)
    setMostrarModal(false);
  }

  useEffect(() => {
    if(!current) return;
    console.log("Se ha añadido un nuevo turno", turno.tail?.value)
  }, [trigger])


  return (
    <section>
      <h1> Turnos </h1>
      <button className="btnAdd" onClick={()=> setMostrarModal(true)}> Agregar Turno </button>
      <div className="contactList">
        {current && <TurnoCard turno={current.value} />}
      </div>
      <Controls onNext={nextTurno} onPrev={prevTurno} />
      {
        mostrarModal && (
        <ModalNewTurn
          onClose={() => setMostrarModal(false)}
          onAdd={agregarTurno}
        />
      )}
    </section>
  );
};

export default TurnerSystem;