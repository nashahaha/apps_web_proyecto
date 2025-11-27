# NomNom - Aplicación de Recetas

Aplicación web fullstack para explorar, crear y gestionar recetas de cocina con sistema de favoritos y perfiles de usuario.

**URL Producción**: http://fullstack.dcc.uchile.cl:7062

---

## 📋 Tema del Proyecto

NomNom es una aplicación SPA (Single Page Application) que permite a los usuarios:
- Explorar un catálogo de recetas
- Crear y compartir sus propias recetas
- Gestionar recetas favoritas
- Ver perfiles de usuario con sus recetas creadas

---

## 🏗️ Estado Global

**Librería utilizada**: **Zustand**

### Stores implementados:

#### 1. `authStore` (Autenticación de usuarios)
- Estado: `user`, `isAuthenticated`, `loading`
- Acciones: `login()`, `register()`, `logout()`, `restoreSession()`
- Maneja la sesión del usuario y tokens JWT

#### 2. `recipeStores` (Gestión de recetas)
- Estado: `recipes`, `myRecipes`, `favoriteRecipes`, `selectedRecipe`, `loading`
- Acciones:
  - `fetchRecipes()`: Obtener todas las recetas
  - `fetchMyRecipes()`: Recetas del usuario autenticado
  - `fetchFavorites()`: Recetas favoritas del usuario
  - `createRecipe()`: Crear nueva receta
  - `deleteRecipe()`: Eliminar receta
  - `addToFavorites()` / `removeFromFavorites()`: Gestión de favoritos

---

## 🗺️ Mapa de Rutas

### Rutas Públicas:
- `/` - Explorador de recetas (página principal)
- `/login` - Inicio de sesión
- `/register` - Registro de nuevos usuarios
- `/recipe/:id` - Detalle de una receta específica

### Rutas Protegidas (requieren autenticación):
- `/profile` - Perfil del usuario con sus recetas
- `/newRecipe` - Formulario para crear nueva receta

### Flujo de Autenticación:
1. Usuario accede a una ruta protegida
2. `ProtectedRoute` verifica `isAuthenticated` del `authStore`
3. Si no está autenticado → redirige a `/login`
4. Si está autenticado → permite el acceso
5. El token JWT se almacena en cookies HttpOnly
6. Se valida CSRF token en cada petición protegida

---

## 🧪 Tests E2E (Playwright)

## Configuración y Ejecución

### Prerrequisitos
1. **Backend**: Debe estar ejecutándose en modo test
   ```bash
   cd backend
   npm install
   npm run start:test
   ```

2. **Frontend**: Debe estar ejecutándose en desarrollo
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Ejecutar los Tests
```bash
cd e2e-tests
npm install
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

---

## 🎨 Diseño y Estilos

**Librerías utilizadas**:
- **Tailwind CSS**: Framework de utilidades CSS
- **DaisyUI**: Librería de componentes sobre Tailwind

### Decisiones de diseño:
- **Mobile-first**: Diseño responsivo que prioriza dispositivos móviles
- **Sistema de grid**: Layout adaptativo con grid de Tailwind
- **Componentes consistentes**: Uso de componentes de DaisyUI (cards, buttons, modals)
- **Animaciones**: Transiciones suaves en hover y loading states

---

## 🚀 Desarrollo Local

### Backend:
```bash
cd backend
npm install

# Poblar base de datos
npm run populate-db

# Iniciar servidor desarrollo
npm run dev
```

### Frontend:
```bash
cd frontend
npm install
npm run dev
```

### Variables de entorno (.env):
```env
# Backend
MONGODB_URI=mongodb://localhost:27017/nomnom
PORT=3001
JWT_SECRET=tu_secret_aqui
NODE_ENV=development
```

---

## Despliegue en Producción

**Servidor**: fullstack.dcc.uchile.cl  
**Puerto**: 7062  
**URL**: http://fullstack.dcc.uchile.cl:7062

### Variables de entorno en producción:
```env
MONGODB_URI=mongodb://fulls:fulls@fullstack.dcc.uchile.cl:27019/fullstack?authSource=admin
PORT=7062
HOST=0.0.0.0
NODE_ENV=production
JWT_SECRET=secret_produccion_seguro
```

### Pasos de deploy:

#### 1. Compilar localmente:
```bash
cd backend
npm run build:ui  # Compila frontend y lo copia a backend/dist/public
npm run build     # Compila backend TypeScript
```

#### 2. Subir archivos al servidor:
```bash
# Subir carpeta dist con frontend y backend compilados
scp -P219 -r backend/dist fullstack@fullstack.dcc.uchile.cl:nomnom/backend/

# Subir package.json
scp -P219 backend/package*.json fullstack@fullstack.dcc.uchile.cl:nomnom/backend/
```

#### 3. En el servidor:
```bash
ssh -p 219 fullstack@fullstack.dcc.uchile.cl
cd nomnom/backend

# Crear archivo .env con las variables de producción
vim .env

# Instalar dependencias
npm install --production

npm start


#### 4. Poblar base de datos (opcional):
```bash
node scripts/populate-db-prod.js
```

### Actualizar después de cambios:
```bash
# Local
cd backend
npm run build:ui
npm run build
cd ..
scp -P219 -r backend/dist fullstack@fullstack.dcc.uchile.cl:nomnom/backend/

# Servidor
ssh -p 219 fullstack@fullstack.dcc.uchile.cl
npm start
```

---

## 📚 Tecnologías Utilizadas

### Frontend:
- React + TypeScript
- Vite
- Zustand (estado global)
- React Router (ruteo)
- Tailwind CSS + DaisyUI (estilos)
- Axios (peticiones HTTP)

### Backend:
- Node.js + Express + TypeScript
- MongoDB + Mongoose
- JWT (autenticación)
- Bcrypt (encriptación)
- Multer (carga de imágenes)

### Testing:
- Playwright (E2E)

## Integrantes 

- Martín Avendaño F.
- Ignacia Galaz Alvarado
- Mariano Mora H.
- Gabriela Urbina G.
