import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecipesStore } from "../stores/recipeStores";
import RecipeCard from "../components/RecipeCard";


const RecipeList = () => {
  const recipes = useRecipesStore(state => state.recipes);
  const fetchRecipes = useRecipesStore(state => state.fetchRecipes);
  const loading = useRecipesStore(state => state.loading);
  const navigate = useNavigate();
  const tags = useRecipesStore(state => state.tags);

  let filteredRecipes = recipes;
  if (tags.length > 0) {
    console.log("Filtrando recetas por tags:", tags);
    filteredRecipes = recipes.filter(recipe =>
      tags.every(tag =>
        recipe.ingredients.some((ingredient: any) =>
          ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())
        )
      )
    );
  }

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  return (
    <div className="min-h-screen flex flex-col gap-6">
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="px-10 pb-5 flex flex-wrap gap-4">
          {filteredRecipes.map(recipe => (
            <div
              key={recipe.id}
              onClick={() => navigate(`/recipe/${recipe.id}`)}
              className="block hover:shadow-lg transition-shadow cursor-pointer"
            >
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default RecipeList;