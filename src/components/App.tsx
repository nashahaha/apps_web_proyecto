import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import RecipeList from './RecipeList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RecipeList />
    </>
  )
}

export default App
