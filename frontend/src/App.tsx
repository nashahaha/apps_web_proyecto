import { Routes, Route } from 'react-router-dom'
import RecipeDetail from './pages/RecipeDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import UserProfile from './pages/UserProfile'
import AddNewRecipe from './pages/AddNewRecipe'
import RecipesExplorer from './pages/RecipesExplorer'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<RecipesExplorer />} />
      <Route path="/recipe/:id" element={<RecipeDetail />} />
      <Route path="/profile" element={
        <ProtectedRoute>
          <UserProfile />
        </ProtectedRoute>
      } />
      <Route path="/newRecipe" element={
        <ProtectedRoute>
          <AddNewRecipe />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App