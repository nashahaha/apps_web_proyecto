import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import FavoriteButton from "./FavoriteButton";

const getData = async (id: string) => {
  const res = await fetch(`http://localhost:3001/recipes/${id}`)
  return res.json()
  //Falta manejar los codigos de error
}

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [recipe, setRecipe] = useState<any>(null)
  const [fav, setFav] = useState(false);
  useEffect(() => {
    if (id) {
      getData(id).then(data => setRecipe(data))
    }
  }, [id])


  return (
    <div >
      <Navbar view_name="Recipe Details" />
      <div>
        {recipe && (
          <div className="p-16">

            <div className="flex items-center justify-between p-4">
              {/* Back button */}
              <Link to={`/`} className="btn w-40">
                Back to Recipe List
              </Link>

              {/* Title */}
              <h1 className="text-2xl font-bold text-center flex-1">
                {recipe.name}
              </h1>

              {/* Favorite button */}
              <FavoriteButton
                active={fav}
                onToggle={() => setFav(v => !v)}
                size={28}
              />
            </div>
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