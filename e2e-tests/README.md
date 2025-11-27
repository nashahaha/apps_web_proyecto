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
npm test -- --workers=1
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
- **Edit**: Edición de recetas cambiando el nombre, ingredientes e instrucciones
- **Delete**: Eliminar recetas creadas por el usuario 

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

#### `recipes.ts``
**Utilidades de recetas reutilizables**:
- `resetAndLogin(page: Page, request: APIRequestContext)`: Resetea la bd y hace login de un usuario
- `createRecipe(page: Page)`: Como se crea una receta por test en crud, se asigna con un nombre específico para que entre tests no se confunda.

### Variables de Entorno
- Los tests asumen que el backend corre en `http://localhost:3001`
- El frontend debe correr en `http://localhost:5173`
