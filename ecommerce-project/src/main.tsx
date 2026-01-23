import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router';
import './index.css'
import App from './App.tsx'

// The ! tells ts that this value exists(it will not be null)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
