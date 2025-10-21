import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FavoriteToggle from "./FavoriteToggle";
import type { Recipe } from "../types/Recipe"; // importamos el tipo

const getData = async (id: string): Promise<Recipe> => {
  const res = await fetch(`http://localhost:3001/api/recipes/${id}`);
  return res.json() as Promise<Recipe>;
  // Falta manejar los códigos de error si quieres robustez
};

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    if (id) {
      getData(id).then((data) => setRecipe(data));
    }
  }, [id]);

  const imageUrl = recipe?.image.startsWith("/uploads/")
    ? `http://localhost:3001${recipe.image}`
    : recipe?.image;


  return (
    <div>
      <Navbar />
      <div>
        {recipe && (
          <div className="pb-15">
            <div className="flex items-center justify-between p-4">
              {/* Back button */}
              <Link to={`/`} className="btn w-40">
                Back to Recipe List
              </Link>

              {/* Title */}
              <h1 className="text-2xl font-bold text-center flex-1">
                {recipe.name}
              </h1>
            </div>

            <div className="card card-side justify-center items-start">
              {/* 👇 contenedor RELATIVE que “encierra” la imagen */}
              <div className="relative inline-block max-w-[500px] overflow-hidden rounded-xl">
                <img
                  src={imageUrl}
                  alt={recipe.name}
                  className="block w-full h-auto object-cover"
                />

                {/* ⭐ ahora sí queda en la esquina de la FOTO */}
                {id && (
                  <div className="absolute top-2 right-2">
                    <FavoriteToggle recipeId={id} size={28} />
                  </div>
                )}
              </div>
              <div className="card-body max-w-xl">
                <p className="mt-4">Category: {recipe.category}</p>

                <h2 className="mt-6 text-xl font-semibold">Ingredients:</h2>
                <ul className="list-disc list-inside">
                  {recipe.ingredients.map((item, index) => (
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
  );
};

export default RecipeDetail;