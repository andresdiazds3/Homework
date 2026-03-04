// Componentes
import PacienteCard from "./PacienteCard";
import HistorialCard from "./HistorialCard";
import MiembroCard from "./MiembroComiteCard";
import MedicoCard from "./MedicoCard";
import Controls from "./Controls";
import ControlsSinDoubly from "./ControlsSinDoubly";
// Estructuras
import { LinkedList } from "../classes/LinkedList";
import { CircularDoubleLinkedList } from "../classes/CircularDoubleLinkedList";
import { DoublyinkedList } from "../classes/DoublyLinkedList";
import { CircularLinkedList } from "../classes/CircularLinkedList";
import Node from "../classes/NodeLinkedList";
import DoublyNode from "../classes/DoublyNode";
//Clase para el Append por si da error en typescript
import Paciente from "../classesObjects/Paciente";
//Data
import MedicoData from "../data/MedicoData";
import PacienteData from "../data/PacienteData";
import MiembroComiteData from "../data/MiembroComiteData";
//Estilo, se usa el que use en la practica 03
import "../styles/ContactSection.css";
//Hooks
import { useState, useEffect } from "react";

const PanelAdministrativo = () => {
  // Use state para la lista de paciente, se debe poder eliminar pacientes entonces toca usarla en un useState
  const [turnoPaciente, setTurnoPaciente] = useState<LinkedList>(
    () => new LinkedList(),
  );
  const [currentPaciente, setCurrentPaciente] = useState<Node | null>(null);
  // Use state para la lista de historial al eliminar el paciente se debe hacer append del paciente eliminado a esta
  const [historial, setHistorial] = useState<DoublyinkedList>(
    new DoublyinkedList(),
  );
  const [currentHistorial, SetCurrentHistorial] = useState<DoublyNode | null>(
    null,
  );
  // Contador dummy para forzar re-render como he trabajado los anteriores challenges para re renderizar en vez de usar UseRef
  const [trigger, UpdateTrigger] = useState(0);
  //lista de medicos no se añadira ni removera, solo cambiara el que se muestre
  const listMedico = new CircularLinkedList();
  MedicoData.forEach((m) => listMedico.append(m));
  const [currentMedico, setCurrentMedico] = useState(listMedico.head);
  //Lista administrativa, no va a cambiar en caunto a añadir o borrar entonces no hay necesidad del useState crepo
  const listComite = new CircularDoubleLinkedList();
  MiembroComiteData.forEach((c) => listComite.append(c));
  const [currentMiembro, setCurrentMiembro] = useState(listComite.head);

  // Carga de Datos de los pacientes
  useEffect(() => {
    if (turnoPaciente.length === 0) {
      PacienteData.forEach((x) => turnoPaciente.append(x));
      setCurrentPaciente(turnoPaciente.head);
    }
  }, []);

  // metodo pa borrar paciente y añadir a historial
  const manejarAtender = () => {
    if (currentPaciente) {
      const pacienteId = currentPaciente.value.id;
      // añadir al historial el current que se va a borrar
      historial.append(currentPaciente.value);
      // inicializar currentHistorial si es el primero
      if (!currentHistorial) {
        SetCurrentHistorial(historial.head);
      }
      // usar el remove integrado para borrar el paciente con el id del current que ya se declaro arriba
      turnoPaciente.remove(pacienteId);
      setCurrentPaciente(turnoPaciente.head);
      // Forzar re-render
      UpdateTrigger((prev) => prev+1);
    }
  };

  const siguientePaciente = () => {
    if (currentPaciente?.next) {
      // el?, es para verificar que current no sea null, si no lo es da el .next
      setCurrentPaciente(currentPaciente.next);
    } else {
      console.log("Se termino la lista");
    }
  };

  const siguienteHistorial = () => {
    if (currentHistorial?.next) {
      SetCurrentHistorial(currentHistorial.next);
    } else {
      console.log("Se termino el historial");
    }
  };

  const siguienteMiembro = () => {
    if (currentMiembro?.next) {
      setCurrentMiembro(currentMiembro.next);
    } else {
      console.log("Nunca se llegara aqui porque es circular");
    }
  };

  const anteriorHistorial = () => {
    if (currentHistorial?.prev) {
      SetCurrentHistorial(currentHistorial.prev);
    } else {
      console.log("Se inicio el historial");
    }
  };

  const AnteriorMiembro = () => {
    if (currentMiembro?.prev) {
      setCurrentMiembro(currentMiembro.prev);
    } else {
      console.log("No se llegara aqui porque es circular");
    }
  };

  useEffect(() => {
    if (!currentMedico) return;
    const interval = setInterval(() => {
      setCurrentMedico((prev) => prev?.next || null);
    }, 10000);
    return () => clearInterval(interval);
  }, [currentMedico]);

  return (
    <section>
      <div>
        <h1> Pacientes en espera </h1>
        <div>
          {currentPaciente && (
            <PacienteCard
              paciente={currentPaciente.value}
              manejarAtender={manejarAtender}
            />
          )}
          <ControlsSinDoubly onNext={siguientePaciente} />
        </div>
      </div>
      <div>
        <h1> Historial de Pacientes</h1>
        <div>
          {currentHistorial && (
            <HistorialCard paciente={currentHistorial.value} />
          )}
          {historial.size() > 0 && (
            <Controls onNext={siguienteHistorial} onPrev={anteriorHistorial} />
          )}
        </div>
      </div>
      <div>
        <h1>Comite Administrativo</h1>
        {currentMiembro && <MiembroCard miembro={currentMiembro.value} />}
        <Controls onNext={siguienteMiembro} onPrev={AnteriorMiembro} />
      </div>
      <div>
        <h1>Medico de Turno</h1>
        {currentMedico && <MedicoCard medico={currentMedico.value} />}
      </div>
    </section>
  );
};

export default PanelAdministrativo;
