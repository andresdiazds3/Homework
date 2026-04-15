import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/base.css'
import './styles/index.scss'
import App from './App.tsx'
import { AuthProvider } from './context/authContext.tsx'
import { TreeProvider } from './context/treeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TreeProvider>
          <App />
        </TreeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
