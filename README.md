# Proyecto Aplicaciones Web Reactivas
## Navegación Página Web

```
http://localhost:5173/ → vista principal con el display de todas las recetas 
http://localhost:5173/recipe/52966 → vista secundaria con información detallada de una receta en específico (ingredientes que usa, receta en sí, etc.)
```

## Backend json-server
Por ahora cargue en db.json dos recetas de la API TheMealDB.com para probar 

Primero correr backend:

```
cd backend
npm install
npm install json-server
npm start
````
Para ver los endpoint disponibles

```
http://localhost:3001/recipes → todas las recetas
http://localhost:3001/recipes/52966 → receta específica 
```

Luego correr frontend:

````
cd ../ 
npm install
npm run dev
`````


## Instalar Daisy UI

Este proyecto utiliza DaisyUI, para instalarlo se debe ejecutar:
```
npm install tailwindcss@latest @tailwindcss/vite@latest daisyui@latest
```
- Documentación componentes Daisy UI: https://daisyui.com/components/


## Paquetes requeridos

- Instalar iconos: 
```
npm install @heroicons/react
```

- Instalar React Router: 
```
npm install react-router-dom
```
## Integrantes 

- Martín Avendaño F.
- Ignacia Galaz Alvarado
- Mariano Mora H.
- Gabriela Urbina G.
