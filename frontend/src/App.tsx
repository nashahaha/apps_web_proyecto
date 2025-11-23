import { Routes, Route } from 'react-router-dom'
import RecipeDetail from './pages/RecipeDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import UserProfile from './pages/UserProfile'
import AddNewRecipe from './pages/AddNewRecipe'
import RecipesExplorer from './pages/RecipesExplorer'

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<RecipesExplorer />} />
      <Route path="/recipe/:id" element={<RecipeDetail />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/newRecipe" element={<AddNewRecipe />} />
    </Routes>
  )
}

export default App