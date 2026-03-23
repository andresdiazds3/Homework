import { useState } from "react";
import { User } from "../classes/User";
import randomArrivalTime from "../utils/RandomArrivalFunction";
import "../styles/NewUserForm.css";

type ModalNewUserProps = {
  onClose: () => void;
  onAdd: (user: User) => void;
}

function ModalNewUser ({onClose, onAdd}:ModalNewUserProps){
  const [inputName, setInputName] = useState("")
  const [inputAmount, setInputAmount] = useState("")

  const validar = () => {
    if (!inputName.trim()) return "Por favor ingresa el nombre";
    if (!inputAmount.trim()) return "Por favor ingresa el monto a retirar";
    if (Number.isNaN(Number(inputAmount)) || Number(inputAmount) <= 0) {
      return "El monto debe ser un numero mayor a 0";
    }
    
    return null;
  };

  const manejarEnvio = (e: any) => {
    e.preventDefault();
    
    const error = validar();
    if (error) {
      alert(error);
      return;
    }
    
    const newUser = new User({
      name: inputName.trim(),
      amount: Number(inputAmount),
      date: randomArrivalTime(),
    });
    
    onAdd(newUser)
    setInputName("")
    setInputAmount("")
  }

    return (
    <div className="user-modal-overlay" onClick={onClose}>
      <div
        className="user-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <form className="user-form" onSubmit={manejarEnvio}>
          <h2 className="user-form__title">Nuevo Usuario</h2>

          <input
            className="user-form__input"
            type="text"
            name="name"
            placeholder="Nombre"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
          <input
            className="user-form__input"
            type="number"
            name="amount"
            placeholder="Monto a retirar"
            value={inputAmount}
            onChange={(e) => setInputAmount(e.target.value)}
          />

          <button className="user-form__button user-form__button--submit" type="submit">Guardar</button>
          <button className="user-form__button user-form__button--cancel" type="button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalNewUser;