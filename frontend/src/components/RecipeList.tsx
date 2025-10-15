import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RecipeCard from "../components/RecipeCard";
import type { Recipe } from "../types/Recipe";

const RecipeList = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/recipes")
      .then(res => res.json())
      .then((data: Recipe[]) => setRecipes(data));
  }, []);

  return (
    <div className="min-h-screen flex flex-col gap-6">
      <Navbar />
      <div className="px-10 pb-5 flex flex-wrap gap-4">
        {recipes.map(recipe => (

          <div
            key={recipe.id}
            onClick={() => navigate(`/recipe/${recipe.id}`)}
            className="block hover:shadow-lg transition-shadow cursor-pointer"
          >

            <RecipeCard
              recipe={recipe}
            />
          </div>

        ))}
      </div>
      <Footer />
    </div>
  );
};

export default RecipeList;