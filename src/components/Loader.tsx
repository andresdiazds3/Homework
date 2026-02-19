import { motion } from "framer-motion";
import "../styles/Loader.css";

function Loader() {
  return (
    <motion.div
      className="loaderOverlay"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    > 
      <motion.div
        className="loaderCircle"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
      />
      <p>Cargando Contactos</p>
    </motion.div>
  );
}

export default Loader;

