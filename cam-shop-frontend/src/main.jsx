import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BundleProvider } from './context/BundleContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BundleProvider>
      <App />
    </BundleProvider>
  </StrictMode>,
)
