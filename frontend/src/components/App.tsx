import { Routes, Route } from 'react-router-dom'
import RecipeList from './RecipeList'
import RecipeDetail from './RecipeDetail'
import Login from './Login'
import Register from './Register'
import UserProfile from './UserProfile'

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<RecipeList />} />
      <Route path="/recipe/:id" element={<RecipeDetail />} />
      <Route path="/profile" element={<UserProfile />} />
    </Routes>
  )
}

export default App