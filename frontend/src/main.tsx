import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './style.css'
import App from './App.tsx'
import { useAuthStore } from './stores/authStore'

// Componente wrapper para restaurar sesión
function AppWrapper() {
  const restoreSession = useAuthStore(state => state.restoreSession);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  return <App />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  </StrictMode>,
)
