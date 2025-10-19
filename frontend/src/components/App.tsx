import { Routes, Route } from 'react-router-dom'
import RecipeList from './RecipeList'
import RecipeDetail from './RecipeDetail'
import Login from './Login'
import Register from './Register'

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<RecipeList />} />
      <Route path="/recipe/:id" element={<RecipeDetail />} />
    </Routes>
  )
}

export default App