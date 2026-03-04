import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import { LinkedList } from "../classes/LinkedList";
import productData from "../data/ProductData";
import Controls from "./Controls";
import Node from "../classes/Node";
import "../styles/ContactSection.css";

const ContactCardSection = () => {
  const [products, setProducts] = useState<LinkedList>(new LinkedList());
  const [current, setCurrent] = useState<Node | null>(null);

  useEffect(() => {
    if (products.length === 0) {
      productData.forEach((p) => products.append(p));
      setCurrent(products.head);
    }
  }, []);

  useEffect(() => {
    if (!current) return;

    const interval = setInterval(() => {
      setCurrent((prev) => prev?.next || null);
    }, 6000);

    return () => clearInterval(interval);
  }, [current]);

  const nextProduct = () => {
    if (current?.next) {
      setCurrent(current.next);
    } else {
      console.log("Nunca llegara aqui");
    }
  };

  const prevProduct = () => {
    if (current?.prev) {
      setCurrent(current.prev);
    }
  };

  return (
    <section>
      <h1> Mis Productos </h1>
      <div className="contactList">
        {current && <ProductCard product={current.value} />}
      </div>
      <Controls onNext={nextProduct} onPrev={prevProduct} />
    </section>
  );
};

export default ContactCardSection;
