import ContactCardSection from './components/ContactSection'
import Loader from './components/Loader'
import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
        {loading ? <Loader /> : <ContactCardSection />}
    </>
  )
}

export default App
