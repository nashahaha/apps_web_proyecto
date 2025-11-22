# E2E Tests - Aplicación de Recetas

Este directorio contiene las pruebas end-to-end (E2E) para la aplicación de recetas utilizando [Playwright](https://playwright.dev/).

## Configuración y Ejecución

### Prerrequisitos
1. **Backend**: Debe estar ejecutándose en modo test
   ```bash
   cd backend
   npm run start:test
   ```

2. **Frontend**: Debe estar ejecutándose en desarrollo
   ```bash
   cd frontend
   npm run dev
   ```

### Ejecutar los Tests
```bash
cd e2e-tests
npm test
```

## Estructura de Archivos

### `/tests/` - Archivos de Pruebas

#### `auth.spec.ts`
**Funcionalidad**: Pruebas de autenticación y autorización
- Login exitoso con credenciales válidas
- Login fallido con credenciales incorrectas
- Verificación de estado de autenticación
- Funcionalidad de logout

#### `crud.spec.ts`
**Funcionalidad**: Operaciones CRUD (Create, Read, Update, Delete) de recetas
- **Create**: Creación de nuevas recetas con imagen, ingredientes e instrucciones
- **Read**: Visualización y búsqueda de recetas

#### `favs.spec.ts`
**Funcionalidad**: Verificación de favoritos de recetas 
- **Add Favs**: Adición de recetas favoritas al perfil del usuario.

#### `frontpage.spec.ts`
**Funcionalidad**: Pruebas de la página principal
- Verificación de elementos de navegación (Header, links)
- Funcionalidad de búsqueda
- Responsividad y elementos visuales
- Navegación entre páginas

### `/helpers/` - Funciones Auxiliares

#### `auth.ts`
**Utilidades de autenticación reutilizables**:
- `registerDefaultUser(request)`: Registra un usuario de prueba
- `login(page)`: Función helper para hacer login en los tests
- Reseteo de base de datos para tests aislados


### Variables de Entorno
- Los tests asumen que el backend corre en `http://localhost:3001`
- El frontend debe correr en `http://localhost:5173`
