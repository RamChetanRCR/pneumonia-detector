import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import MedicalAIDashboard from './MedicalAiDashboard'
//import ProjectInfo from './ProjectInfo'
//import ModelOverview from './ModelOverview'
//import RadiomicsApp from './RadiomicsApp.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MedicalAIDashboard />
  </StrictMode>,
)
