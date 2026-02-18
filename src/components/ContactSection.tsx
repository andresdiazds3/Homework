
import ContactCard from "./ContactCard"
import { useState } from "react";
import {contactosIniciales} from '../data/contactData'
import '../styles/ContactSection.css'

const ContactCardSection = () => {

    const [contactos, setContactos] = useState(contactosIniciales)

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
      <div>
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
    </section>
  );
}

export default ContactCardSection;