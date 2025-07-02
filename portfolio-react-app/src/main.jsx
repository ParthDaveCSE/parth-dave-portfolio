import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css' // Keep this commented out for now, as we're using App.css
import App from './App.jsx'

// CORRECTED LINE: Change 'root' to 'react-projects-root'
createRoot(document.getElementById('react-projects-root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)