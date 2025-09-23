import { Routes, Route } from 'react-router-dom'
import RecipeList from './RecipeList'
import RecipeDetail from './RecipeDetail'

function App() {

  return (
    <Routes>
      <Route path="/" element={<RecipeList />} />
      <Route path="/recipe/:id" element={<RecipeDetail />} />
    </Routes>
  )
}

export default App