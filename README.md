# Proyecto Aplicaciones Web Reactivas

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
