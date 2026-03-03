import { useState } from "react";
import { DoublyLinkedList } from "../classes/DoublyLinkedList";
import { BrowserHistory } from "../data/browserHistory";
import InfoPages from "./InfoPages";
import ButtonsDoubly from "./ButtonsDoubly";


export default function Browser() {
  const browser = new DoublyLinkedList();
  BrowserHistory.forEach(page => browser.append(page));

  const [current, setCurrent] = useState(browser.head);

  const nextPage = () => {
    if (current?.next) {
      setCurrent(current.next);
    } else {
        console.log("Terminaste el historial")
    }
  };


  const prevPage = () => {
    if(current?.prev){
        setCurrent(current.prev)
    } else {
        console.log("Estas en el primero de la lista")
    }
  }
  return (
    <div className = "player">
      <h1>Historial</h1>

      <InfoPages pages={current?.value} />

      <ButtonsDoubly onNext={nextPage} onPrev={prevPage}/>
    </div>
  );
}