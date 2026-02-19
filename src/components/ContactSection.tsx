
import ContactCard from "./ContactCard"
import ModalContactForm from "./ModalContactForm";
import { useState } from "react";
import {contactosIniciales} from '../data/contactData'
import '../styles/ContactSection.css'

const ContactCardSection = () => {

    const [contactos, setContactos] = useState(contactosIniciales)
    const [mostrarModal, setMostrarModal] = useState(false)

    const manejarDelete = (id: number) => {
      const confirmacionDelete = window.confirm(
        "¿Estás seguro que deseas eliminar este contacto?",
      );
      if (confirmacionDelete) {
        const contactosActuales = contactos.filter((x) => x.id !== id);
        setContactos(contactosActuales);
      }
    };
    

  return (
    <section>
      <h1> Mis Contactos </h1>
      <button className = "btnAdd" onClick={() => setMostrarModal(true)}>
        Añadir Contacto
      </button>
      <div className="contactList">
        {contactos.map((x) => (
          <ContactCard
            key={x.id}
            id={x.id}
            pfp={x.pfp}
            prefijo={x.prefijo}
            numero={x.numero}
            nombre={x.nombre}
            manejarDelete={manejarDelete}
          />
        ))}
      </div>
      {mostrarModal && (
          <div className="modal">
            <ModalContactForm onClose={() => setMostrarModal(false)} />
          </div>
      )}
    </section>
  );
}

export default ContactCardSection;