import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/cairo';
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './assets/Context/Theme.context/Theme.context.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
  </StrictMode>,
)
