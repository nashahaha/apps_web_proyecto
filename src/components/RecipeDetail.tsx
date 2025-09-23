import Recipe from "./Recipe"
import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"

const getData = async (id: string) => {
  const res = await fetch(`http://localhost:3001/recipes/${id}`)
  return res.json()
}

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [recipe, setRecipe] = useState<any>(null)

  useEffect(() => {
    if (id) {
      getData(id).then(data => setRecipe(data))
    }
  }, [id])
  return (
    <div className="card">
      <Navbar view_name="Recipe Details" />
      <Link to={`/`} className="btn flex justify-start m-4 w-40">
        Back to Recipe List
      </Link>
      <div className="p-10">
      {recipe && (
        <div className="card-body">
          <h1 className="flex justify-center text-2xl font-bold">{recipe.name}</h1>
           <p className="mt-4">Category: {recipe.category}</p>
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full max-w-md mt-4"
        />
        <h2 className="mt-6 text-xl font-semibold">Ingredients:</h2>
        <ul className="list-disc list-inside">
          {recipe.ingredients.map((item: { ingredient: string; measure: string }, index: number) => (
          <li key={index}>
            {item.ingredient} - {item.measure}
          </li>
          ))}
        </ul>
        <h2 className="mt-6 text-xl font-semibold">Instructions:</h2>
        <p className="mt-2">{recipe.instructions}</p>
        </div> 
      )}
      </div>
      <Footer />
    </div>
  )
}

export default RecipeDetail