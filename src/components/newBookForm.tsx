import { useState } from "react";
import { Book } from "../classes/Book";
import "../styles/newBookForm.css";

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
        <form className="new-book-form" onSubmit={manejarEnvio}>
          <h2 className="new-book-form__title">Nuevo Libro</h2>

          <input
            className="new-book-form__input"
            type="text"
            name="name"
            placeholder="Nombre del libro"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
          <input
            className="new-book-form__input"
            type="text"
            name="isbn"
            placeholder="ISBN"
            value={inputISBN}
            onChange={(e) => setInputISBN(e.target.value)}
          />

          <input
            className="new-book-form__input"
            type="text"
            name="autor"
            placeholder="Autor"
            value={inputAutor}
            onChange={(e) => setInputAutor(e.target.value)}
          />

          <input
            className="new-book-form__input"
            type="text"
            name="editorial"
            placeholder="Editorial"
            value={inputEditorial}
            onChange={(e) => setInputEditorial(e.target.value)}
          />

          <button className="new-book-form__button new-book-form__button--submit" type="submit">Guardar</button>
          <button className="new-book-form__button new-book-form__button--cancel" type="button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalNewBook;