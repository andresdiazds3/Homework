import { useState } from "react";
import { Book } from "../classes/Book";

type ModalNewBookProps = {
  onClose: () => void;
  onAdd: (book: Book) => void;
}

function ModalNewBook ({onClose, onAdd}:ModalNewBookProps){
  const [inputName, setInputName] = useState("")
  const [inputISBN, setInputISBN] = useState("")
  const [inputAutor, setInputAutor] = useState("")
  const [inputEditorial, setInputEditorial] = useState("");

  const validar = () => {
    if (!inputName.trim()) return "Por favor ingresa el nombre del libro";
    if (!inputISBN.trim()) return "Por favor ingresa el ISBN";
    if (!inputAutor.trim()) return "Por favor ingresa el autor";
    if (!inputEditorial.trim()) return "Por favor ingresa la editorial";
    
    return null;
  };

  const manejarEnvio = (e: any) => {
    e.preventDefault();
    
    const error = validar();
    if (error) {
      alert(error);
      return;
    }
    
    const newBook = new Book({
      name: inputName.trim(),
      ISBN: inputISBN.trim(),
      autor: inputAutor.trim(),
      editorial: inputEditorial.trim(),
    });
    
    onAdd(newBook)
    setInputName("")
    setInputISBN("")
    setInputAutor("")
    setInputEditorial("")
  }

    return (
    <div className="overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={manejarEnvio}>
          <h2>Nuevo Libro</h2>

          <input
            type="text"
            name="name"
            placeholder="Nombre del libro"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
          <input
            type="text"
            name="isbn"
            placeholder="ISBN"
            value={inputISBN}
            onChange={(e) => setInputISBN(e.target.value)}
          />

          <input
            type="text"
            name="autor"
            placeholder="Autor"
            value={inputAutor}
            onChange={(e) => setInputAutor(e.target.value)}
          />

          <input
            type="text"
            name="editorial"
            placeholder="Editorial"
            value={inputEditorial}
            onChange={(e) => setInputEditorial(e.target.value)}
          />

          <button type="submit">Guardar</button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalNewBook;