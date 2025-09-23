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
    <div >
      <Navbar view_name="Recipe Details" />
      <Link to={`/`} className="btn flex justify-start m-4 w-40">
        Back to Recipe List
      </Link>
      <div>
        {recipe && (
          <div className="p-4">
            <h1 className="flex justify-center text-2xl font-bold p-4">{recipe.name}</h1>
            <div className="card card-side justify-center items-start">
              <figure>
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full object-contain rounded-lg"
                />
              </figure>
              <div className="card-body max-w-xl">
                <p className="mt-4">Category: {recipe.category}</p>
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
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default RecipeDetail