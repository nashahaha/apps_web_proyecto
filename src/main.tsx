import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import RecipesExplorer from './RecipesExplorer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecipesExplorer />
  </StrictMode>,
)
