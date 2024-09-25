import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import "./css-transtitions/wipe-transition.css";
import "./css-transtitions/slides-transition.css";
import "./css-transtitions/flip-transition.css";
import "./css-transtitions/vertical-transition.css";
import "./css-transtitions/angled-transition.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
